# 🍕 FoodKing — AR Pizza Ordering & AI Voice/Chat Assistant System

> **Next.js 14** full-stack restaurant application featuring **3D/Augmented Reality (AR) Pizza Visualization**, a conversational **AI Text Chatbot**, an **AI Voice Call Ordering System** powered by **Groq (120B)** and **Microsoft Edge Neural TTS**, and a real-time **Admin Panel** with **POS Receipt Printing**.

---

## 📋 Table of Contents

1. [Key Features](#-key-features)
2. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
3. [Exact Package Versions](#-exact-package-versions)
4. [Step-by-Step Setup Guide (For Laptop / New Machine)](#-step-by-step-setup-guide-for-laptop--new-machine)
5. [Environment Variables](#-environment-variables)
6. [Available Scripts](#-available-scripts)
7. [Project Architecture & File Structure](#-project-architecture--file-structure)
8. [Teacher Presentation / Demo Walkthrough](#-teacher-presentation--demo-walkthrough)
9. [Troubleshooting & FAQs](#-troubleshooting--faqs)

---

## 🌟 Key Features

| Feature | Description | Technology |
|---|---|---|
| **📞 AI Voice Call Ordering** | Floating call button on bottom-left. Talk directly with "Slice" (AI). Natural human speech output, live speech recognition, order extraction, and auto-dispatch to Admin. | Microsoft Edge Neural TTS (`en-US-JennyNeural`), Web Speech API, Groq LLM |
| **💬 AI Text Chatbot** | Floating bot on bottom-right. Natural text chat that understands casual language, takes orders, and syncs to backend. | Groq AI (`openai/gpt-oss-120b`), Next.js Route Handlers |
| **🥽 3D & Augmented Reality (AR)** | Interactive 3D pizza models with 360° rotation and real-world AR placement on mobile phones via WebXR / QuickLook. | `@google/model-viewer` (GLB / USDZ) |
| **🛒 Full Cart & Checkout** | Global cart state persisted across page reloads, size selection, dynamic pricing, and Cash on Delivery checkout. | React Context API, `localStorage` |
| **🖨️ Admin Panel & POS Print** | Live dashboard displaying all customer orders (Web, Chatbot, Voice Call) with a branded POS thermal receipt print layout. | `@media print` CSS, Next.js API Routes |

---

## 💻 Prerequisites & System Requirements

Before running the project on your laptop, ensure you have:

1. **Node.js**: `v18.17.0` or higher (Recommended: `v20.x` or `v22.x` LTS)
   - Check version: `node -v`
   - Download: [nodejs.org](https://nodejs.org/)
2. **npm**: `v9.x` or higher (comes with Node.js)
   - Check version: `npm -v`
3. **Supported Browser**:
   - **Desktop**: Google Chrome or Microsoft Edge (Required for Web Speech Recognition API)
   - **Mobile (for AR)**: Chrome on Android (supports WebXR) or Safari on iOS (supports QuickLook AR)
4. **Internet Connection**: Required for Groq AI API and Microsoft Edge Neural TTS audio streaming.

---

## 📦 Exact Package Versions

These are the exact dependencies configured in `package.json`:

```json
{
  "name": "foodking-react",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@google/model-viewer": "^4.3.1",
    "msedge-tts": "^2.0.7",
    "next": "14.2.8",
    "rc-slider": "^11.1.7",
    "react": "^18",
    "react-bootstrap": "^1.6.1",
    "react-dom": "^18",
    "react-nice-select": "^1.0.6",
    "react-player": "^2.16.0",
    "swiper": "^11.1.14",
    "wowjs": "^1.1.3"
  }
}
```

---

## 🚀 Step-by-Step Setup Guide (For Laptop / New Machine)

Follow these exact steps when running this project on your laptop:

### Step 1: Open the Project Directory
Open your terminal (PowerShell, Command Prompt, or VS Code Terminal) and navigate to the project folder:
```bash
cd /path/to/foodking
```

### Step 2: Create the `.env.local` File
Ensure a file named `.env.local` exists in the root of the project with your Groq API key:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
> **Note:** If `.env.local` already exists, you don't need to recreate it.

### Step 3: Install Dependencies
Run the install command:
```bash
npm install
```
*(Wait 1-2 minutes until all packages finish installing).*

### Step 4: Run the Development Server
```bash
npm run dev
```

### Step 5: Open in Browser
Open your browser and visit:
```
http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable | Description | Default / Example |
|---|---|---|
| `GROQ_API_KEY` | Groq Cloud API Key for AI conversations | `gsk_your_groq_api_key_here` |

File location: `.env.local` in project root.

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js development server on `http://localhost:3000` |
| `npm run build` | Creates an optimized production build |
| `npm start` | Runs the production build server |
| `npm run lint` | Runs Next.js ESLint checks |

---

## 🏗️ Project Architecture & File Structure

```
foodking/
├── .env.local                    # Environment configuration (Groq API Key)
├── package.json                  # Dependencies & scripts
├── data/
│   ├── pizzas.js                 # Centralized pizza catalog (prices, sizes, 3D models, images)
│   └── sizes.js                  # Pizza size specifications (Small, Medium, Large)
├── context/
│   └── CartContext.js            # Global cart state (React Context + localStorage)
├── components/
│   ├── Chatbot.js                # AI Text Chatbot floating widget (Groq powered)
│   ├── VoiceCall.js              # AI Voice Call System (Edge TTS + Speech API + Groq)
│   ├── PageBanner.js             # Reusable hero banner
│   └── pizza/
│       ├── PizzaCard.js          # Interactive pizza card component
│       └── PizzaModelViewer.js   # 3D model & WebXR AR viewer
├── layouts/
│   ├── FoodKingLayout.js         # Main layout wrapper
│   ├── Header.js                 # Navigation bar (includes link to /admin)
│   └── Footer.js                 # Footer component
└── app/
    ├── layout.js                 # Root layout (injects Chatbot & VoiceCall globally)
    ├── page.js                   # Homepage (dynamic pizza catalog)
    ├── menu/                     # Full Pizza Catalog page
    ├── pizza/[id]/               # Pizza Details & 3D AR Viewer page
    ├── checkout/                 # Checkout & Order Placement page
    ├── order-success/            # Order confirmation landing page
    ├── admin/                    # Admin Dashboard & Thermal POS Receipt Print
    └── api/
        ├── chat/route.js         # Text chat Groq API endpoint
        ├── voice-chat/route.js   # Voice chat Groq API endpoint (order extraction)
        ├── tts/route.js          # Microsoft Edge Neural TTS audio streaming endpoint
        └── orders/route.js       # In-memory orders CRUD endpoint
```

---

## 🎓 Teacher Presentation / Demo Walkthrough

Use this checklist during your presentation to demonstrate every feature:

### 1. 🍕 Homepage & Dynamic Cart
- Go to `http://localhost:3000/`.
- Scroll to **"Best Selling Dishes"** — show the dynamic pizza cards.
- Click **"Add to Cart"** on any pizza.
- Show the top-right cart counter update instantly with item price and count.

### 2. 🥽 3D & Augmented Reality (AR) View
- Click on any pizza title (e.g. **"Classic Margherita"**) to visit its detail page (`/pizza/margherita`).
- Show the interactive **3D Model**: drag with mouse to rotate 360°, scroll to zoom.
- Point out the **"View in AR"** button (for mobile phones to place the pizza on real tables).

### 3. 💬 AI Text Chatbot
- Click the **Red Bot Icon** on the bottom-right corner.
- Type: `I want 1 large pepperoni pizza. My name is Asad, phone 03001234567, address House 123 Block A`.
- The AI will understand, summarize, and ask you to confirm.
- Reply: `Yes`.
- The bot confirms the order with total amount and sends it to the Admin Panel.

### 4. 📞 AI Voice Call Assistant (Highlight Feature!)
- Click the **Green Animated Call Button** on the bottom-left corner.
- The phone call overlay opens with a live voice visualizer.
- "Slice" will speak to you using **Microsoft Edge Neural voice**: *"Hello! Welcome to FoodKing..."*
- Speak into your microphone: *"I want two medium BBQ Chicken pizzas"*.
- The AI responds naturally, collects your name and delivery address, reads back the bill, and books the order.
- Features to demonstrate during the call:
  - **Mute / Unmute** microphone button
  - **Live transcript** of speech
  - **Visualizer animation** (Listening ring, Speaking wave bars, Thinking dots)
  - **End Call** button

### 5. 🖨️ Admin Panel & POS Receipt
- Click **"Admin"** in the top navigation bar or go to `http://localhost:3000/admin`.
- Point out the newly created orders:
  - Orders from voice calls show a green **"Voice Call"** badge.
  - Customer name, phone, address, items, and total price are listed.
- Click **"Print POS Receipt"**:
  - A branded, thermal POS-style restaurant receipt is generated.
  - Show the teacher the clean PDF preview ready to print.

---

## ❓ Troubleshooting & FAQs

### Q1: Voice Call says "Microphone access denied"
- **Fix:** Click the microphone icon in your browser's URL address bar and set permission to **"Allow"**.
- Ensure you are using **Google Chrome** or **Microsoft Edge**.

### Q2: Voice Call says speech recognition not supported
- **Fix:** Web Speech Recognition is native to Chromium browsers (Chrome / Edge / Opera). Open the project in Chrome or Edge.

### Q3: How do I test mobile AR on my phone?
- Find your laptop's local IP address (e.g., `ipconfig` on Windows -> IPv4: `192.168.1.15`).
- Make sure your phone is connected to the same Wi-Fi.
- Open `http://192.168.1.15:3000` on your mobile browser.
- Open any pizza page and tap **"View in AR"**.

### Q4: Orders disappear when I restart the server
- **Explanation:** For presentation convenience, orders are stored in fast in-memory storage (`app/api/orders/route.js`). They persist throughout your session without requiring an external database setup like MongoDB or PostgreSQL.

---

**Made for FoodKing AR & AI Presentation** 🍕✨
