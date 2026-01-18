# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wedding invitation management application built with Next.js 16, Supabase, and Prisma. No authentication is implemented.

**Domain Model:**
- Wedding events with associated invitations

## Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run ESLint

# Database (Prisma)
pnpm prisma generate      # Generate Prisma client after schema changes
pnpm prisma db push       # Push schema to database (development)
pnpm prisma migrate dev   # Create and apply migrations
pnpm prisma studio        # Open Prisma Studio GUI
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19 with React Compiler enabled
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma 7
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm

## Architecture

### Directory Structure

```
src/
├── app/           # Next.js App Router pages and layouts
├── components/    # React components
├── lib/           # Utilities, Prisma client, Supabase client
└── types/         # TypeScript type definitions
prisma/
└── schema.prisma       # Database schema
prisma.config.ts        # Prisma 7 config (in project root)
```

### Path Alias

Use `@/*` to import from `src/*`:
```typescript
import { prisma } from '@/lib/prisma'
```

### Prisma 7 Configuration

Prisma 7 separates URL configuration:
- **Runtime**: `DATABASE_URL` passed to PrismaClient via `datasourceUrl` in `src/lib/prisma.ts`
- **CLI (migrations, db push)**: `DIRECT_URL` configured in `prisma.config.ts` (project root)
- **Schema**: Only contains provider and models (no URLs)

## Code Conventions

### View Specs / Tests

When writing view/component tests, only check for:
- Element IDs
- Data attributes
- Content (specific text strings)

Do NOT make assumptions about HTML tags or CSS classes.
