import { defineConfig } from 'prisma/config'
import { config } from 'dotenv'

// Load .env.local for local development
config({ path: '.env.local' })

export default defineConfig({
  schema: 'prisma/schema.prisma',

  datasource: {
    url: process.env.DIRECT_URL!,
  },
})
