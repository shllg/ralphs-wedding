import { NextResponse } from 'next/server'
import { stubbedWeddingEvents } from '@/lib/stubbed-data'

export async function GET() {
  return NextResponse.json(stubbedWeddingEvents)
}
