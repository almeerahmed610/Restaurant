import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
let geminiAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    console.log('[Gemini API] Initialized successfully with gemini-3.8-flash');
  } catch (err) {
    console.warn('[Gemini API] Failed to initialize GoogleGenAI instance:', err);
  }
}

// AI Assistant endpoint
app.post('/api/assistant', async (req, res) => {
  try {
    const { message, branchId = 'UTG-KHI-001', history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (geminiAI && process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `You are "Urban Dost", the intelligent AI restaurant assistant for "Urban Tandoor & Grill", a premier 24/7 multi-cuisine family restaurant in Karachi, Pakistan.
Locations:
1. PECHS Branch (UTG-KHI-001): Main Shahrah-e-Faisal, Block 2, PECHS (18 tables, 72 seats).
2. Gulshan-e-Iqbal Branch (UTG-KHI-002): Main University Road, Block 6, Gulshan (24 tables, 112 seats, includes 6 large group banquet tables up to 10 persons).

Core Menu Highlights:
- Pakistani Cuisine: Desi Chicken Karahi (PKR 1450/2400), Shinwari Mutton Karahi (PKR 2800/4950), Boneless Chicken White Handi (PKR 1650), UTG Special Chicken Biryani (PKR 650), Dum Pukht Mutton Pulao (PKR 980), Shahi Daal Makhni (PKR 550), Paneer Reshmi Karahi (PKR 1250).
- BBQ & Grills: Charcoal Chicken Tikka (PKR 580), Malai Boti (PKR 890), Beef Seekh Kabab 4 pcs (PKR 950), Reshmi Kabab (PKR 880), UTG Grand BBQ Platter (PKR 3850), Bihari Boti (PKR 920).
- Burgers & Fast Food: Classic Zinger Crunch (PKR 620), Royal Beef Smash Burger (PKR 850), Club Sandwich (PKR 680), Shawarma Roll (PKR 420), Loaded Peri Fries (PKR 480).
- Pizza & Pasta: Chicken Fajita Pizza (PKR 1290), Smoky BBQ Pizza (PKR 1350), Fettuccine Alfredo (PKR 1150), Penne Arrabbiata (PKR 980).
- Chinese & Continental: Chicken Chow Mein (PKR 890), Egg Fried Rice (PKR 650), Chicken Manchurian (PKR 980), Grilled Chicken Steak (PKR 1490).
- Breakfast (24/7 available): Halwa Puri Thali (PKR 450), Anda Paratha Roll (PKR 320).
- Desserts & Drinks: Hot Gulab Jamun (PKR 260), Matka Kheer (PKR 320), Sizzling Brownie (PKR 550), Mango Lassi (PKR 340), Mint Lemonade (PKR 280), Karak Chai (PKR 160).
- Combos: Karachi Dawat Feast (PKR 3150), Midnight BBQ Craver (PKR 2190).

Key Business Rules:
- Currency is in Pakistani Rupees (PKR).
- Bank Card Promotion: 10% instant discount on eligible cards (HBL, Meezan, Bank Alfalah, SCB, MCB, Faysal Bank) up to PKR 500 cap on min spend of PKR 1000.
- Fulfillment methods: Dine-in, Over-the-counter takeaway (OTC), In-house delivery across Karachi, and Pre-orders (future scheduled orders).
- If customer asks to order items, list the items, calculate total with estimated delivery time, and invite them to confirm.
- If customer asks about table reservations, inquire about branch, party size (we have 2, 4, 7, 9, 10 person tables), and date/time.
- If customer has a complaint or issue, empathize sincerely, apologize, provide an instant complaint escalation ticket reference (e.g., TCK-UTG-xxx), and assure them the Duty Manager is resolving it.
- Keep responses warm, hospitable (Karachi hospitality: "Khush Amdeed", "Janab", polite English with authentic Pakistani culinary warmth), concise, and helpful.`;

        const response = await geminiAI.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            ...history.slice(-6).map((h: any) => ({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }]
            })),
            {
              role: 'user',
              parts: [{ text: `Customer says: "${message}". Current branch context: ${branchId}.` }]
            }
          ],
          config: {
            systemInstruction
          }
        });

        const replyText = response.text || 'I am delighted to assist you with our menu, table reservations, or live order tracking at Urban Tandoor & Grill!';
        return res.json({ reply: replyText, source: 'gemini' });
      } catch (geminiError) {
        console.warn('[Gemini API call failed, falling back to local engine]:', geminiError);
      }
    }

    // Fallback rule-based response
    const reply = generateLocalAssistantResponse(message, branchId);
    return res.json({ reply, source: 'local' });
  } catch (error) {
    console.error('Error in /api/assistant:', error);
    res.status(500).json({ error: 'Internal assistant error' });
  }
});

// Helper for local conversational intelligence fallback
function generateLocalAssistantResponse(message: string, branchId: string): string {
  const lower = message.toLowerCase();
  const branchName = branchId === 'UTG-KHI-001' ? 'PECHS (Shahrah-e-Faisal)' : 'Gulshan-e-Iqbal (University Road)';

  if (lower.includes('karahi') || lower.includes('desi') || lower.includes('handi')) {
    return `Assalam-o-Alaikum! Our Chef's signature Desi Chicken Karahi (PKR 1,450 half / 2,400 full) and Boneless Chicken White Handi (PKR 1,650) are cooked fresh over high flame with pure spices. They pair beautifully with our Garlic Butter Roghani Naans. Would you like to add these to your order?`;
  }

  if (lower.includes('bbq') || lower.includes('tikka') || lower.includes('boti') || lower.includes('kabab')) {
    return `Our babul charcoal grill is fired up 24/7! I highly recommend the tender Chicken Malai Boti (PKR 890), Royal Beef Seekh Kababs (PKR 950 for 4 skewers), or our Grand BBQ Platter (PKR 3,850, feeds 4-5 guests). All served with fresh mint raita and salad.`;
  }

  if (lower.includes('discount') || lower.includes('bank') || lower.includes('promo') || lower.includes('card')) {
    return `We offer a 10% instant discount on eligible bank cards including HBL, Meezan Bank, Bank Alfalah, Standard Chartered, and MCB (up to PKR 500 discount on orders of PKR 1,000+). You can select your card during checkout!`;
  }

  if (lower.includes('table') || lower.includes('reserve') || lower.includes('booking') || lower.includes('seat')) {
    return `We would be honored to host you! At our ${branchName} branch, we have 2-person, 4-person, 7-person, and private banquet tables (up to 10 persons). You can select your preferred table directly in our 'Table Reservation' tab or let me know your party size and time!`;
  }

  if (lower.includes('pre order') || lower.includes('pre-order') || lower.includes('schedule') || lower.includes('later')) {
    return `Yes! We accept scheduled pre-orders 24/7 for advance takeaway or delivery. Our kitchen holds and releases your order exactly at the scheduled time to ensure piping hot freshness.`;
  }

  if (lower.includes('track') || lower.includes('status') || lower.includes('where is my order') || lower.includes('utg-')) {
    return `To track your order, please check the 'Live Kitchen & Tracking' tab or share your Order ID (e.g. UTG-1041). Our kitchen operates on a transparent 5-stage pipeline: Accepted -> Preparing -> Ready -> Dispatched -> Delivered.`;
  }

  if (lower.includes('complaint') || lower.includes('late') || lower.includes('cold') || lower.includes('issue') || lower.includes('wrong')) {
    return `We sincerely apologize for any inconvenience caused! Your satisfaction is our top priority. We have logged this directly with the Duty Manager (Ticket Ref: TCK-UTG-${Math.floor(100 + Math.random() * 900)}). You can also submit full details in the Complaints tab for rapid resolution and compensation.`;
  }

  if (lower.includes('halwa puri') || lower.includes('breakfast') || lower.includes('paratha')) {
    return `Our breakfast favorites like the Traditional Halwa Puri Thali (PKR 450) with chana, aloo bhujia, suji halwa, and Lacha Anda Paratha Rolls (PKR 320) are prepared fresh around the clock!`;
  }

  return `Khush Amdeed to Urban Tandoor & Grill (${branchName})! I can assist you with our multi-cuisine menu (Pakistani Karahis, BBQ Grills, Burgers, Pizzas, Breakfast & Desserts), reserve a table, track your order, or apply the 10% bank discount. What would you like to enjoy today?`;
}

// Dev and Prod setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Urban Tandoor & Grill Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
