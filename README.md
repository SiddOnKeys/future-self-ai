# Future Self AI

An AI-powered personal development platform where users interact with their successful "future self."

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd future-self-ai
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start Supabase locally:

```bash
npm run supabase:start
```

5. Apply database migrations:

```bash
npm run supabase:db:push
```

6. Generate TypeScript types:

```bash
npm run supabase:gen:types
```

7. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # React components
├── contexts/           # React contexts
├── lib/                # Utility libraries
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── DashboardPage.tsx
└── assets/             # Static assets

supabase/
├── config.toml         # Supabase configuration
├── migrations/         # Database migrations
├── functions/          # Edge functions
└── README.md          # Supabase documentation
```

## 📋 Sprint Progress

### ✅ **Completed (Day 1-4)**:

- React 18 + TypeScript + Tailwind CSS setup
- Beautiful gradient theme with modern UI
- Supabase client configuration with proper structure
- Authentication system with email/password
- Beautiful login and signup pages
- Protected routing with React Router
- Database schema with name field support
- Row Level Security (RLS) policies
- Edge functions for persona generation
- Comprehensive development workflow

### 🔄 **In Progress**:

- Multi-step onboarding form
- Persona generation workflow

### 📅 **Next Steps**:

- Chat interface development
- AI integration for persona generation
- Real-time messaging

## 🎨 Beautiful UI Features

- **Gradient Theme**: Modern gradient backgrounds and buttons
- **Glass Morphism**: Beautiful glass-like cards and components
- **Animations**: Smooth floating animations and transitions
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Works perfectly on all devices
- **Custom Fonts**: Inter and Poppins for modern typography

## 🗄️ Database Schema

The application uses the following Supabase tables:

- **user_profiles**: User data including name, goals, and preferences
- **personas**: AI-generated future self personas
- **conversations**: Chat sessions with personas
- **messages**: Individual messages in conversations

## 🔐 Authentication

The app supports:

- Email/password authentication
- Automatic user profile creation with name
- Protected routes and navigation
- Secure session management

## 🔧 Edge Functions

- **generate-persona**: Creates AI personas based on user data
- Extensible architecture for additional AI features

## 🛠️ Development Commands

```bash
# Supabase
npm run supabase:start          # Start local Supabase
npm run supabase:stop           # Stop local Supabase
npm run supabase:status         # Check Supabase status
npm run supabase:db:push        # Apply migrations
npm run supabase:db:reset       # Reset database
npm run supabase:gen:types      # Generate TypeScript types
npm run supabase:functions:deploy # Deploy edge functions

# Development
npm run dev                     # Start development server
npm run build                   # Build for production
npm run lint                    # Run ESLint
```

## 🎨 UI Components

Built with:

- Tailwind CSS with custom gradients and animations
- Lucide React for beautiful icons
- Glass morphism and modern design patterns
- Dark mode support with smooth transitions

## 📚 Documentation

- [Supabase Setup](./supabase/README.md) - Complete Supabase documentation
- [Database Schema](./supabase/migrations/) - Database migrations and schema
- [Edge Functions](./supabase/functions/) - Serverless functions

## 🔍 Local Development

### Supabase Studio

Access the local Supabase Studio at: http://localhost:54323

### Database

- Local database runs on port 54322
- API runs on port 54321
- Studio runs on port 54323

### Edge Functions

Serve edge functions locally:

```bash
npm run supabase:functions:serve
```

## 🚀 Deployment

1. **Link to production Supabase project**:

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

2. **Deploy database changes**:

```bash
npm run supabase:db:push
```

3. **Deploy edge functions**:

```bash
npm run supabase:functions:deploy
```

4. **Deploy frontend** (Vercel, Netlify, etc.)
