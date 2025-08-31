# Supabase Setup for Future Self AI

This directory contains all Supabase-related configurations, migrations, functions, and development tools for the Future Self AI application.

## 📁 Directory Structure

```
supabase/
├── config.toml              # Supabase configuration
├── migrations/              # Database migrations
│   ├── 001_initial_schema.sql
│   └── 002_functions_and_triggers.sql
├── functions/               # Edge functions
│   ├── _shared/
│   │   └── cors.ts
│   ├── generate-persona/
│   │   └── index.ts
│   └── import_map.json
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

1. **Install Supabase CLI** (if not already installed):

   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

### Local Development

1. **Start Supabase locally**:

   ```bash
   npm run supabase:start
   ```

2. **Apply migrations**:

   ```bash
   npm run supabase:db:push
   ```

3. **Generate TypeScript types**:

   ```bash
   npm run supabase:gen:types
   ```

4. **Serve edge functions locally**:
   ```bash
   npm run supabase:functions:serve
   ```

### Production Deployment

1. **Link to your Supabase project**:

   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

2. **Push database changes**:

   ```bash
   npm run supabase:db:push
   ```

3. **Deploy edge functions**:
   ```bash
   npm run supabase:functions:deploy
   ```

## 📊 Database Schema

### Tables

- **user_profiles**: User onboarding data and preferences
- **personas**: AI-generated future self personas
- **conversations**: Chat sessions with personas
- **messages**: Individual messages in conversations

### Views

- **conversation_summaries**: Aggregated conversation data

### Functions

- **get_conversation_context**: Get recent messages for AI context
- **get_user_persona_summary**: Get user's current persona
- **get_user_stats**: Get user engagement statistics

## 🔧 Edge Functions

### generate-persona

Generates AI personas based on user goals, values, and communication preferences.

**Endpoint**: `/functions/v1/generate-persona`

**Request Body**:

```typescript
{
  userId: string;
  timeframe: string; // "5_years" | "10_years"
  goals: string[];
  values: string[];
  communicationStyle: any;
}
```

**Response**:

```typescript
{
  persona: {
    id: string;
    user_id: string;
    timeframe: string;
    system_prompt: string;
    personality_summary: string;
    communication_style: any;
    achievements: string[];
    created_at: string;
    last_updated: string;
  };
}
```

## 🔐 Security

### Row Level Security (RLS)

All tables have RLS enabled with policies that ensure users can only access their own data:

- Users can only view/update their own profiles
- Users can only access their own personas
- Users can only access conversations with their personas
- Users can only access messages in their conversations

### Authentication

- Email/password authentication
- Google OAuth support
- Automatic user profile creation on signup
- JWT token management

## 🛠️ Development Workflow

### Creating New Migrations

1. **Create a new migration file**:

   ```bash
   supabase migration new migration_name
   ```

2. **Edit the generated SQL file** in `supabase/migrations/`

3. **Apply the migration**:
   ```bash
   npm run supabase:db:push
   ```

### Creating New Edge Functions

1. **Create a new function directory**:

   ```bash
   mkdir supabase/functions/your-function-name
   ```

2. **Create the function file**:

   ```bash
   touch supabase/functions/your-function-name/index.ts
   ```

3. **Deploy the function**:
   ```bash
   npm run supabase:functions:deploy
   ```

### Updating Types

After making database changes, regenerate TypeScript types:

```bash
npm run supabase:gen:types
```

## 📝 Environment Variables

Make sure your `.env.local` file contains:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For edge functions, you'll also need:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔍 Useful Commands

```bash
# Check Supabase status
npm run supabase:status

# Reset local database
npm run supabase:db:reset

# Stop local Supabase
npm run supabase:stop

# View local Supabase Studio
open http://localhost:54323
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: If ports are already in use, stop other services or change ports in `config.toml`

2. **Migration errors**: Reset the database with `npm run supabase:db:reset`

3. **Function deployment fails**: Check that you're logged in with `supabase login`

4. **Type generation fails**: Ensure local Supabase is running with `npm run supabase:start`

### Getting Help

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
