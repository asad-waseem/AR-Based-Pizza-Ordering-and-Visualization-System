import { NextResponse } from 'next/server';
import { pizzas } from '@/data/pizzas';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const pizzaMenu = pizzas.map(p => `${p.name} ($${p.sizes.medium.price})`).join(', ');

    const systemPrompt = {
      role: 'system',
      content: `You are Slice, the friendly and smart AI Pizza Assistant for FoodKing restaurant.
Available Pizzas on menu: ${pizzaMenu}.
Available Sizes: Small, Medium, Large.

Your goal is to converse naturally with the customer and take their order.
Required details before confirming:
1. Pizza Name
2. Size (Small, Medium, Large)
3. Quantity
4. Customer Name
5. Phone / Email
6. Delivery Address

Guidelines:
- Keep all responses very short, clear, friendly, and helpful (max 2-3 sentences).
- If the user provides partial info (e.g. name, address, pizza), acknowledge what you understood and ask for the missing parts.
- When all 6 details are known, summarize the order with total price and ask for final confirmation (e.g. "Reply 'Yes' to confirm").
- Once the user explicitly confirms (e.g. "yes", "confirm", "ok", "place order"), provide a friendly closing message AND MUST append the following JSON block at the very end of your response:
\`\`\`order_json
{
  "customer_name": "...",
  "phone": "...",
  "address": "...",
  "pizza_name": "...",
  "size": "Small|Medium|Large",
  "quantity": 1
}
\`\`\`
`
    };

    // Filter messages to only role and content
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
        temperature: 0.6,
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API Error:", data.error);
      return NextResponse.json({ text: "I'm having a slight connection issue. Please tell me your order again!" });
    }

    const rawContent = data.choices[0]?.message?.content || "";

    // Check for ```order_json block
    const orderMatch = rawContent.match(/```order_json\s*([\s\S]*?)\s*```/);
    let orderData = null;
    let cleanText = rawContent;

    if (orderMatch && orderMatch[1]) {
      try {
        orderData = JSON.parse(orderMatch[1]);
        // Remove the json block from the visible text
        cleanText = rawContent.replace(/```order_json[\s\S]*?```/, '').trim();
      } catch (e) {
        console.error("Failed to parse order JSON from LLM:", e);
      }
    }

    return NextResponse.json({
      text: cleanText || "Order processed!",
      order: orderData
    });

  } catch (error) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json({ text: "I had a hiccup processing that. Please try again." }, { status: 500 });
  }
}
