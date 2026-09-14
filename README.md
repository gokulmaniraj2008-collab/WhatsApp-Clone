# ChatWave — Angular WhatsApp-style Clone

ChatWave is an independent, mobile-first messaging app built with **Angular + TypeScript**. It uses familiar chat UX patterns without WhatsApp proprietary assets or branding.

## Angular stack
- Angular 20 standalone components
- TypeScript
- Responsive mobile/desktop UI
- Supabase-ready database schema
- Capacitor Android packaging
- GitHub Actions APK workflow

## Current app
- Chat list and search
- 1-to-1 and group-style conversations
- Online/offline states
- Unread badges
- Message composer and send interaction
- Read-check UI
- Mobile conversation navigation
- PWA manifest

## Backend foundation
`supabase/schema.sql` contains profiles, conversations, members, messages, RLS policies and a private media bucket. The next production stage is connecting Angular services to Supabase Auth, Realtime and Storage.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```

## Android
The Capacitor configuration targets `com.gokul.chatwave`. GitHub Actions builds a debug APK on pushes to `main` and supports manual runs.

## Status
**Angular migration complete for the frontend foundation.** Persistent authenticated realtime messaging is intentionally not claimed until the Supabase client wiring and end-to-end verification are completed.
