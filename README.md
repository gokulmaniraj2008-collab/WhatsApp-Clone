# ChatWave — WhatsApp-style Clone

A mobile-first, independent messaging application inspired by familiar chat UX patterns. It does not use WhatsApp proprietary assets or branding.

## Included
- Responsive chat list and conversation UI
- Search, unread badges, groups and presence states
- Send-message interaction with timestamps/read-check UI
- Mobile conversation navigation
- PWA manifest
- Capacitor Android configuration
- GitHub Actions debug APK build
- Supabase-ready schema for profiles, conversations, members and messages
- Row Level Security policies and private media bucket

## Run locally
```bash
npm install
npm run dev
```

## Supabase
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Copy `.env.example` to `.env.local` and add the project URL and anon key.
4. Connect the client to Supabase Auth/Realtime/Storage before production use.

## Android
The GitHub Actions workflow builds `app-debug.apk` using Capacitor. Open Actions → Build Android APK to run it manually, or push to `main`.

## Production readiness
The repository currently contains a polished functional frontend/demo state and backend schema. Persistent authenticated realtime messaging requires wiring the frontend to the supplied Supabase environment variables and enabling the desired Auth providers.
