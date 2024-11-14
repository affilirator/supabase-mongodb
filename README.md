# Supabase Auth and MongoDb Database Integration Guide

## Overview

This project implements a secure authentication system using Supabase Auth for user management and MongoDB for storing additional user data. The application follows a dual-database approach:

1. **Supabase**: Handles authentication and session management
2. **MongoDB**: Stores additional user information and profile data

## Architecture Flow

### Registration Process

1. User submits registration form with email and password
2. The data is sent to `/api/register` endpoint
3. Supabase creates a new user account
4. MongoDB stores additional user details with the Supabase ID as reference
5. User is redirected to the dashboard upon successful registration

### Login Process

1. User submits login form
2. Credentials are verified through Supabase Auth
3. Upon successful authentication, a session is created
4. User is redirected to the protected dashboard

## File Structure Explanation

```

/src
├── components/
│   ├── AuthForm.astro        # Reusable auth form
│   ├── Navigation.astro      # Site navigation
│   └── sections/             # Homepage sections
│       ├── Hero.astro
│       ├── Features.astro
│       ├── CodeExample.astro
│       └── CTA.astro
├── layouts/
│   └── Layout.astro         # Base layout
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   └── supabase.ts        # Supabase client
└── pages/
    ├── api/               # API endpoints
    │   ├── login.ts
    │   ├── logout.ts
    │   └── register.ts
    ├── index.astro       # Homepage
    ├── login.astro      # Login page
    ├── register.astro  # Registration page
    └── dashboard.astro # Protected dashboard
```

## Environment Variables Required

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
MONGODB_URI=your_mongodb_connection_string
```

## Security Features

1. **Server-Side Rendering (SSR)**

   - Protected routes check session status server-side
   - Unauthorized users are redirected to login

2. **Database Security**
   - Supabase handles password hashing and security
   - MongoDB stores non-sensitive user data
   - User IDs are linked between both databases

## User Flow

1. **Registration**

   ```
   User Input → Supabase Auth → MongoDB → Dashboard
   ```

2. **Login**

   ```
   User Input → Supabase Auth → Session Created → Dashboard
   ```

   4. **Logout**

   ```
   Logout Request → Clear Session → Login Page
   ```

## Data Structure

### Supabase Auth Table

- `id`: Unique identifier
- `email`: User's email
- `password`: Hashed password (managed by Supabase)

### MongoDB Users Collection

- `email`: User's email
- `supabaseId`: Reference to Supabase user ID
- `createdAt`: Account creation timestamp

## Protected Routes

The `/dashboard` route is protected and requires authentication:

```typescript
// pages/dashboard.astro
const { cookies, redirect } = Astro;
const accessToken = cookies.get("sb-access-token");

if (!accessToken) {
  return redirect("/login");
}

const {
  data: { user },
  error,
} = await supabase.auth.getUser(accessToken.value);

if (error || !user) {
  return redirect("/login");
}
```

## Error Handling

- Invalid credentials trigger user-friendly error messages
- Network errors are caught and displayed appropriately
- Session expiration redirects to login page

## Best Practices

1. **Security**

   - Never store sensitive data in MongoDB
   - Always verify sessions server-side
   - Use environment variables for sensitive credentials

2. **Performance**

   - Minimal database queries
   - Efficient session management
   - Optimized API responses

3. **User Experience**
   - Clear error messages
   - Smooth authentication flow
   - Responsive design for all devices

## Development Setup

1. Create a Supabase project
2. Set up a MongoDB database
3. Configure environment variables
4. Run the development server

## Production Considerations

1. **Environment Variables**

   - Secure storage of credentials
   - Different values for development/production

2. **Database Indexes**

   - Create appropriate indexes in MongoDB
   - Optimize query performance

3. **Error Logging**
   - Implement proper error tracking
   - Monitor authentication failures

## Maintenance

1. **Regular Updates**

   - Keep dependencies updated
   - Monitor security advisories

2. **Backup Strategy**

   - Regular MongoDB backups
   - Supabase data export plan

3. **Monitoring**
   - Track failed login attempts
   - Monitor database performance

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
