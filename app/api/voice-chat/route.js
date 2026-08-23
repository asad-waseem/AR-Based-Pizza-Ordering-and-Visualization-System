import { NextResponse } from 'next/server';
import { pizzas } from '@/data/pizzas';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Build menu string with all sizes for the AI
    const pizzaMenu = pizzas.map(p =>
      `${p.name}: Small $${p.sizes.small.price}, Medium $${p.sizes.medium.price}, Large $${p.sizes.large.price}`
    ).join('\n');

    const systemPrompt = {
      role: 'system',
      content: `You are Slice, a professional and friendly phone order-taking representative for FoodKing pizza restaurant.
You are speaking with a customer over a voice call. Keep your responses SHORT and conversational (1-3 sentences max), like a real phone call.

MENU:
${pizzaMenu}

SIZES: Small, Medium, Large.

YOUR TASK:
1. Greet the customer warmly.
2. Ask what they'd like to order.
3. Help them choose from the menu above. DO NOT invent items not on this menu.
4. For each item, confirm: pizza name, size, quantity.
5. The customer can order multiple items. Ask "Anything else?" after each item.
6. When they're done ordering items, collect: Full Name, Phone Number, Delivery Address.
7. Once you have ALL details, read back the complete order summary with itemized prices and total, then ask "Should I confirm this order?"
8. If they say yes/confirm, respond with a friendly closing AND append the order JSON block.

RULES:
- Speak naturally as if on a phone call. Use short sentences.
- If the customer is unclear, ask them to repeat.
- If they want to change/remove an item, do it and confirm.
- If they ask for something not on the menu, politely say it's unavailable and suggest alternatives.
- Calculate prices accurately from the menu above.
- NEVER make up prices or items.

When the customer confirms the final order, you MUST append this JSON block at the very end:
\`\`\`order_json
{
  "customer_name": "...",
  "phone": "...",
  "address": "...",
  "items": [
    {"name": "...", "size": "Small|Medium|Large", "quantity": 1, "price": 0.00}
  ],
  "subtotal": 0.00,
  "total": 0.00
}
\`\`\`
`
    };

    const sanitizedMessages = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      content: m.content || ''
    }));

    const groqMessages = [systemPrompt, ...sanitizedMessages];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: groqMessages,
        temperature: 0.5,
        max_tokens: 600
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq Voice-Chat Error:", data.error);
      return NextResponse.json({ text: "I'm sorry, I'm having a connection issue. Could you repeat that?", order: null });
    }

    const rawContent = data.choices[0]?.message?.content || "";

    // Extract order JSON if present
    const orderMatch = rawContent.match(/```order_json\s*([\s\S]*?)\s*```/);
    let orderData = null;
    let cleanText = rawContent;

    if (orderMatch && orderMatch[1]) {
      try {
        orderData = JSON.parse(orderMatch[1]);
        cleanText = rawContent.replace(/```order_json[\s\S]*?```/, '').trim();
      } catch (e) {
        console.error("Failed to parse voice order JSON:", e);
      }
    }

    return NextResponse.json({
      text: cleanText || "Could you say that again?",
      order: orderData
    });

  } catch (error) {
    console.error("Voice Chat API Error:", error);
    return NextResponse.json({ text: "I'm sorry, something went wrong. Please try again.", order: null }, { status: 500 });
  }
}
