# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Bank Resume is a personal finance tracking application built with Next.js 15, TypeScript, and Prisma. It allows users to manage monthly balances and track spending across different categories and payment methods.

## Development Commands

### Development
```powershell
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint with auto-fix
```

### Database
```powershell
npx prisma db push         # Push schema changes to database
npx prisma db pull         # Pull schema from database
npx prisma generate        # Generate Prisma client
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create and apply migration
```

## Architecture Overview

### Authentication & Authorization
- JWT-based authentication using `jose` library
- Custom middleware (`src/middleware.ts`) handles route protection
- Token stored in HTTP-only cookies for security
- Public routes defined in middleware configuration
- Authentication logic centralized in `src/lib/auth.ts`

### Database Architecture
**Core Models:**
- **User**: Basic user authentication (email/password)
- **Balance**: Monthly balance records with unique period format (`month-year`)
- **Spent**: Individual spending transactions linked to balances

**Key Relationships:**
- Balance → Spent (one-to-many)
- Each Balance has a unique period identifier
- Spents categorized by Category enum and PayMode enum

### API Structure
The application follows a custom API routing pattern:
- **API Routes**: Located in `src/api-routes/` (not standard Next.js `app/api/`)
- **HTTP Client**: Client-side API calls in `src/http/`
- **Route Handlers**: Minimal route handlers in `src/app/api/`

**Key API Patterns:**
- Authentication flow through `src/api-routes/sign-in/`
- Balance management in `src/api-routes/balances/`
- Spent operations in `src/api-routes/spents/`
- Zod validation schemas in `src/schemas/`

### State Management
- **React Query**: Used for server state management with custom hooks
- **Query Keys**: Centralized in `src/lib/query-keys.ts`
- **Custom Hooks**: Located in `src/hooks/` for data fetching logic

### Component Architecture
- **Form Components**: Centralized in `src/components/forms/`
- **UI Components**: Shadcn/ui components in `src/components/ui/`
- **Feature Components**: Balance cards, graphics, and domain-specific components
- **Loading States**: Dedicated loading components in `src/components/loadings/`

### Type Safety
- **Custom Types**: Extended Prisma types in `src/@types/index.ts`
- **Schema Validation**: Zod schemas for all forms and API validation
- **TypeScript**: Strict configuration with path aliases (`@/*` → `./src/*`)

## Key Development Patterns

### Environment Configuration
- Database connection via `DATABASE_URL` and `DIRECT_URL`
- JWT secret in `JWT_SECRET`
- Environment variables loaded from `.env`

### Styling & UI
- **Tailwind CSS**: Primary styling framework
- **Shadcn/ui**: Component library foundation
- **Theme Support**: Dark/light mode via `next-themes`
- **Responsive Design**: Mobile-first approach with `max-md:` breakpoints

### Data Flow
1. **Authentication**: Middleware → JWT verification → Route protection
2. **Balance Creation**: Auto-created when accessing non-existent period
3. **Spending Tracking**: Linked to monthly balance periods
4. **Real-time Updates**: React Query invalidation after mutations

### File Organization
- **API Logic**: `src/api-routes/` - Server-side route handlers
- **Client API**: `src/http/` - Client-side HTTP requests
- **Components**: `src/components/` - React components organized by feature
- **Database**: `prisma/schema.prisma` - Single source of truth for data models
- **Types**: `src/@types/` - Custom TypeScript definitions
- **Utilities**: `src/lib/` - Shared utility functions and configurations

## Database Considerations

- PostgreSQL as primary database
- Period-based partitioning using string format (`month-year`)
- Soft relationships between Balance and Spent entities
- Category and PayMode enums defined in schema
- Auto-generated UUIDs for all primary keys

## Security Notes

- JWT tokens with 24-hour expiration
- Password hashing using bcrypt
- HTTP-only cookies prevent XSS attacks
- Middleware validates all protected routes
- Environment variables for sensitive data
