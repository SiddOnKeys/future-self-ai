-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to handle conversation title generation
CREATE OR REPLACE FUNCTION generate_conversation_title()
RETURNS TRIGGER AS $$
BEGIN
    -- Set a default title if none is provided
    IF NEW.title IS NULL OR NEW.title = '' THEN
        NEW.title := 'Conversation with Future Self - ' || to_char(NOW(), 'Mon DD, YYYY');
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to validate message content
CREATE OR REPLACE FUNCTION validate_message_content()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure message content is not empty
    IF NEW.content IS NULL OR trim(NEW.content) = '' THEN
        RAISE EXCEPTION 'Message content cannot be empty';
    END IF;
    
    -- Ensure role is valid
    IF NEW.role NOT IN ('user', 'assistant') THEN
        RAISE EXCEPTION 'Invalid message role. Must be "user" or "assistant"';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to get conversation context for AI
CREATE OR REPLACE FUNCTION get_conversation_context(conversation_uuid UUID, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    role TEXT,
    content TEXT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        m.role,
        m.content,
        m.created_at
    FROM messages m
    WHERE m.conversation_id = conversation_uuid
    ORDER BY m.created_at DESC
    LIMIT limit_count;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Function to get user's persona summary
CREATE OR REPLACE FUNCTION get_user_persona_summary(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    timeframe TEXT,
    personality_summary TEXT,
    communication_style JSONB,
    achievements TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.timeframe,
        p.personality_summary,
        p.communication_style,
        p.achievements
    FROM personas p
    WHERE p.user_id = user_uuid
    ORDER BY p.created_at DESC
    LIMIT 1;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for conversation title generation
CREATE TRIGGER generate_conversation_title_trigger
    BEFORE INSERT ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION generate_conversation_title();

-- Create trigger for message validation
CREATE TRIGGER validate_message_content_trigger
    BEFORE INSERT OR UPDATE ON messages
    FOR EACH ROW
    EXECUTE FUNCTION validate_message_content();

-- Create indexes for better performance on common queries
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at);
CREATE INDEX IF NOT EXISTS idx_personas_timeframe ON personas(timeframe);
CREATE INDEX IF NOT EXISTS idx_user_profiles_updated_at ON user_profiles(updated_at);

-- Create a view for conversation summaries
CREATE OR REPLACE VIEW conversation_summaries AS
SELECT 
    c.id as conversation_id,
    c.title,
    c.created_at,
    c.updated_at,
    p.personality_summary,
    p.timeframe,
    COUNT(m.id) as message_count,
    MAX(m.created_at) as last_message_at
FROM conversations c
LEFT JOIN personas p ON c.persona_id = p.id
LEFT JOIN messages m ON c.id = m.conversation_id
GROUP BY c.id, c.title, c.created_at, c.updated_at, p.personality_summary, p.timeframe;

-- Grant permissions on the view
GRANT SELECT ON conversation_summaries TO authenticated;

-- Create a function to archive old conversations (for future use)
CREATE OR REPLACE FUNCTION archive_old_conversations(months_old INTEGER DEFAULT 6)
RETURNS INTEGER AS $$
DECLARE
    archived_count INTEGER;
BEGIN
    -- This is a placeholder for future archiving functionality
    -- You can implement actual archiving logic here
    SELECT COUNT(*) INTO archived_count
    FROM conversations
    WHERE updated_at < NOW() - INTERVAL '1 month' * months_old;
    
    RETURN archived_count;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Create a function to get user statistics
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE (
    total_conversations BIGINT,
    total_messages BIGINT,
    active_personas BIGINT,
    last_activity TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(DISTINCT c.id)::BIGINT as total_conversations,
        COUNT(m.id)::BIGINT as total_messages,
        COUNT(DISTINCT p.id)::BIGINT as active_personas,
        MAX(GREATEST(c.updated_at, m.created_at)) as last_activity
    FROM user_profiles up
    LEFT JOIN personas p ON up.user_id = p.user_id
    LEFT JOIN conversations c ON p.id = c.persona_id
    LEFT JOIN messages m ON c.id = m.conversation_id
    WHERE up.user_id = user_uuid;
END;
$$ language 'plpgsql' SECURITY DEFINER;
