import { NextResponse } from 'next/server';

// Global in-memory store for orders during the demo
let orders = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      ...body,
      status: "New"
    };
    // Prepend so newest is first
    orders = [newOrder, ...orders];
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE() {
    orders = [];
    return NextResponse.json({ success: true });
}
