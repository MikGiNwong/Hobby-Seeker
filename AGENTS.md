# Hobby-Seeker

## Product

Hobby-Seeker helps users discover and grow hobbies from their everyday life.

The core idea is not to recommend a list of hobbies.
Instead, the app learns from the user's diary entries and conversations,
finds small activities that fit their current lifestyle,
and helps those activities gradually grow into hobbies.

The MVP should prioritize activities that the user is likely to actually try,
rather than activities that merely match their interests.

Example:

walking
→ walking with photography
→ short outdoor trips
→ picnic
→ day camping
→ camping

## Core User Flow

Login
→ Daily conversation / diary
→ AI activity recommendation
→ Small mission
→ Activity feedback
→ Hobby Garden
→ Daily conversation again

Only one primary activity recommendation should be shown to the user at a time.

## Hobby Growth

Activities can grow through these stages:

DISCOVERED
→ TRIED
→ SPROUT
→ GROWING
→ HOBBY

Growth should eventually consider signals such as:

- enjoyment
- difficulty
- willingness to repeat
- repeated diary mentions
- completed missions

Do not reduce hobby growth to simple activity counts.

## MVP Screens

The MVP has six primary screens:

1. Login
2. Daily conversation / diary
3. AI activity recommendation
4. Today's mission
5. Activity feedback
6. Hobby Garden

## MVP Constraints

Do not add GPS tracking or background behavior tracking.

The primary source of user context is:

- diary entries
- conversations with AI
- mission completion
- activity feedback

Avoid unnecessary gamification such as rankings, competition, or forced streaks.

Focus on personal discovery and gradual growth.

## Tech Stack

Mobile:

- React Native
- Expo
- TypeScript
- Expo Router
- Zustand
- TanStack Query

Backend:

- Python
- FastAPI

Database / Auth:

- Supabase
- PostgreSQL

## Repository Structure

The repository root is the Git root.

Current mobile app:

`apps/mobile`

Future backend code should live outside the mobile app, preferably under:

`apps/api`

Do not move the Expo project out of `apps/mobile`.

## Development Principles

Prioritize the MVP.

Do not introduce complex architecture before it is needed.

Avoid unnecessary abstractions.

Keep UI code and business logic reasonably separated.

Prefer small, readable modules over large files.

Use TypeScript for mobile application code.

Do not use `any` unless there is a clear reason.

Reuse existing dependencies before adding new ones.

Do not add a new dependency unless it provides clear value.

Do not modify `package-lock.json` unless dependencies actually change.

Before changing project configuration, inspect the existing configuration first.

## Mobile Development

The Expo app is located at:

`apps/mobile`

Run mobile commands from that directory unless there is a clear reason not to.

Example:

```bash
cd apps/mobile
npm start