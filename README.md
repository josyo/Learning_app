# Developer Learning Platform

This project is a Next.js 15 App Router application with Prisma, Better Auth, and role-based learner/mentor/admin flows. It is prepared for a Vercel deployment, but it must be connected to a real PostgreSQL database and a real auth secret before it is usable in production.

## Production deployment

### 1. Connect the repository to Vercel

1. Import the repository into Vercel.
2. Set the framework to Next.js.
3. Use the repository root as the app root.
4. Keep the default Next.js build settings unless Vercel requires a different install command.
5. Set the production build command to:

```bash
npm run build
```

The project does not require a custom `vercel.json` file for standard app-router routing and middleware behavior.

### 2. Required production environment variables

Add the following environment variables in Vercel:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

If you use optional trusted-origin overrides or preview deployments, add only additional host origins that are intentionally trusted. Do not open the app to arbitrary redirects.

### 3. Configure the production database

Use a managed PostgreSQL database such as Neon, Supabase Postgres, Railway, or another hosted Postgres provider. The schema is configured for PostgreSQL and Prisma Migrate is the source of truth.

### 4. Apply Prisma migrations

After deployment, run:

```bash
npx prisma migrate deploy
```

Do not run `prisma migrate dev` or `prisma migrate reset` against production.

### 5. Create the first admin safely

Create the first administrative user only after the production database and auth secrets are configured.

Recommended process:

1. Sign up through the normal app route or create the user via a secure admin-only action.
2. Set the user role to `ADMIN` through the admin panel or an authorized admin workflow.
3. Use a strong, environment-specific credential that is not hard-coded in source control.
4. Never store production admin credentials in `.env.local`, a Git repo, logs, screenshots, or docs.

### 6. Verify Better Auth

After deployment, confirm:

- `/api/auth` routes are reachable
- the login page loads without server errors
- sign-in creates a valid session cookie
- protected routes redirect unauthenticated users to `/login`
- role-protected pages reject unauthorized access

### 7. Production smoke test

Run the following checks against the deployed environment:

- Public: `/`, `/login`, `/register`
- Auth: login, logout, invalid login, session persistence
- Learner: learner dashboard, course/lesson pages, progress page, protected-route behavior
- Mentor: mentor dashboard and protected mentor routes
- Admin: admin dashboard, user creation, role protection
- Database: read/write access, migration status, no broken schema

## Local development

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

For isolated E2E verification, use the test database with `.env.test` and the Playwright setup scripts.

## Security rules

- Never commit `.env.local`, `.env.production`, or any local secrets.
- Never put `DATABASE_URL` or `BETTER_AUTH_SECRET` in frontend code.
- Never use public or shared default seed passwords.
- Never run `prisma migrate reset` in production.
- Never disable middleware auth or weaken role checks for deployment convenience.

## Deployment status

The project is build-safe and test-safe in its current state, but deployment still requires the operator to provide production database and auth values in the hosting platform environment.
