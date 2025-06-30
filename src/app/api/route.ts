// C:/nextjs/learning2/src/app/api/route.ts

import { NextResponse } from 'next/server'

export function GET(request: Request) {
  return NextResponse.json({ message: 'Hello from GET' })
}

export function POST(request: Request) {
  return NextResponse.json({ message: 'Hello from POST' })
}
