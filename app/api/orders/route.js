import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ORDERS_FILE = path.join(process.cwd(), 'data', 'orders.json');

// Helper to read orders safely
function getStoredOrders() {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const content = fs.readFileSync(ORDERS_FILE, 'utf8');
      return JSON.parse(content || '[]');
    }
  } catch (err) {
    console.error('Error reading orders file:', err);
  }
  // Fallback to global in-memory if file read fails
  if (!globalThis.ordersStore) {
    globalThis.ordersStore = [];
  }
  return globalThis.ordersStore;
}

// Helper to save orders safely
function saveStoredOrders(orders) {
  try {
    const dir = path.dirname(ORDERS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing orders file:', err);
  }
  globalThis.ordersStore = orders;
}

export async function GET() {
  const orders = getStoredOrders();
  return NextResponse.json(orders, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const currentOrders = getStoredOrders();

    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customer: {
        firstName: body?.customer?.firstName || 'Valued',
        lastName: body?.customer?.lastName || 'Customer',
        email: body?.customer?.email || 'N/A',
        address: body?.customer?.address || 'Pickup / Dine-in',
      },
      items: Array.isArray(body?.items) ? body.items : [],
      total: Number(body?.total) || 0,
      source: body?.source || (body?.orderNotes?.includes('Voice') ? 'ai_voice_call' : 'web'),
      orderNotes: body?.orderNotes || '',
      status: "New"
    };

    const updatedOrders = [newOrder, ...currentOrders];
    saveStoredOrders(updatedOrders);

    return NextResponse.json({ success: true, order: newOrder }, {
      headers: {
        'Cache-Control': 'no-store',
      }
    });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE() {
  saveStoredOrders([]);
  return NextResponse.json({ success: true }, {
    headers: {
      'Cache-Control': 'no-store',
    }
  });
}
