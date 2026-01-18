import { NextResponse } from 'next/server'
import { stubbedWeddingEvents } from '@/lib/stubbed-data'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const event = stubbedWeddingEvents.find((e) => e.id === id)

  if (!event) {
    return NextResponse.json({ error: 'Wedding event not found' }, { status: 404 })
  }

  return NextResponse.json(event)
}
