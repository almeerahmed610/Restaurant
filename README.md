# 🍽️ Urban Tandoor & Grill
### Smart Restaurant Management & AI-Powered Food Ordering System

<p align="center">

**A Modern, Multi-Branch Restaurant Management Platform**

Built with React, TypeScript, Vite, Express.js and Google Gemini AI.

</p>

---

## 📌 About The Project

**Urban Tandoor & Grill** is a modern restaurant website and management application designed to streamline restaurant operations, online food ordering, table reservations, kitchen workflows, inventory management and customer support.

The platform provides a digital restaurant experience with an interactive menu, shopping cart, multiple restaurant branches, live-style order tracking, staff portal, inventory analytics and an AI-powered virtual restaurant assistant called **Urban Dost**.

The application is designed around a multi-branch restaurant business operating in Karachi, Pakistan.

## ✨ Key Features

### 🛍️ Customer Website & Food Ordering
- Modern and responsive restaurant website.
- Interactive food menu.
- Multiple food categories.
- Food item details and customization.
- Shopping cart management.
- Quantity updates and item removal.
- Order placement interface.
- Branch-based ordering experience.
- Pakistani Rupees (PKR) pricing.

### 📅 Table Reservations
- Interactive table reservation system.
- Multiple table sizes.
- Branch-specific table availability.
- Reservation management.
- Reservation cancellation.
- Family and group dining support.

### 🍳 Kitchen Management
- Kitchen order pipeline.
- Order status management.
- Order preparation workflow.
- Pre-order scheduling and release workflow.
- Order tracking interface.
- Five-stage order status:
  1. Accepted
  2. Preparing
  3. Ready
  4. Dispatched
  5. Delivered

### 📦 Inventory Management
- Ingredient-level inventory management.
- Branch-specific stock records.
- Recipe-linked inventory calculations.
- Available-to-Promise (ATP) stock engine.
- Ingredient consumption calculations.
- Reserved stock tracking.
- Low-stock alerts.
- Reorder level monitoring.
- Menu portion availability.
- Recipe specifications.

### 📊 Management Dashboard
- Restaurant operations overview.
- Order volume analytics.
- Daily order volume chart.
- Branch performance overview.
- Inventory monitoring.
- Kitchen workflow visibility.
- Restaurant management interface.

### 🏢 Multi-Branch Management

The system includes two configured restaurant branches:

**1. PECHS Flagship Branch**
- Location: Main Shahrah-e-Faisal, Block 2, PECHS, Karachi.
- 18 tables.
- 72 seats.
- Family dining and takeaway facilities.

**2. Gulshan-e-Iqbal Mega Branch**
- Location: Main University Road, Block 6, Gulshan-e-Iqbal, Karachi.
- 24 tables.
- 112 seats.
- Group banquet tables.
- Family dining facilities.

### 🤖 AI Restaurant Assistant – Urban Dost
- AI-powered restaurant assistant.
- Google Gemini API integration.
- Customer menu assistance.
- Food recommendations.
- Table reservation assistance.
- Order tracking assistance.
- Bank card discount information.
- Complaint assistance.
- Text-to-speech responses.
- Browser speech recognition support.
- Local rule-based fallback when Gemini is unavailable.

### 🎤 Voice Assistant
- Voice input using browser speech recognition.
- Text-to-speech responses.
- Interactive AI chat interface.
- Customer assistance through voice and text.

### 🧾 Customer Support & Complaints
- Customer complaint submission interface.
- Complaint ticket management.
- Complaint escalation workflow.
- Customer issue tracking.

### 👨‍🍳 Staff Portal
- Staff-facing restaurant interface.
- Kitchen and operational workflow access.
- Restaurant staff management experience.

### 📍 Additional Features
- Restaurant branches information.
- About restaurant section.
- Live ticker interface.
- Interactive website navigation.
- Responsive user interface.
- Modern restaurant-themed design.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI |
| TypeScript | Type safety |
| Vite 8 | Development and build tooling |
| Node.js | JavaScript runtime |
| Express.js | Backend server |
| Google Gemini AI | AI assistant |
| Tailwind CSS 4 | Styling |
| Lucide React | Icons |
| Recharts | Data visualization |
| Motion | UI animations |
| dotenv | Environment configuration |
| tsx | TypeScript server execution |

---

## 📂 Project Structure

```text
Restaurant/
│
├── src/
│   ├── components/
│   │   ├── AboutView.tsx
│   │   ├── BranchesView.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── ComplaintsDesk.tsx
│   │   ├── DailyOrderVolumeChart.tsx
│   │   ├── DashboardTab.tsx
│   │   ├── InventoryDashboard.tsx
│   │   ├── ItemDetailModal.tsx
│   │   ├── KitchenPipeline.tsx
│   │   ├── LiveOrbitCircle.tsx
│   │   ├── LiveTickerBar.tsx
│   │   ├── MenuSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── StaffPortalView.tsx
│   │   ├── TableReservations.tsx
│   │   ├── TrackOrderView.tsx
│   │   ├── VoiceAssistantModal.tsx
│   │   └── WebsiteHome.tsx
│   │
│   ├── data/
│   │   ├── analyticsData.ts
│   │   └── restaurantData.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── inventoryEngine.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💻 Installation & Setup

Follow these instructions to run the project on your local machine.

### Prerequisites

Install the following:

- Node.js (Node.js 22.12+ recommended).
- npm.
- Visual Studio Code.
- Git (optional, for version control).

Verify your installation:

```bash
node -v
npm -v
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/almeerahmed610/Restaurant.git
```

### 2. Open Project Folder

```bash
cd Restaurant
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

If using a fresh installation and a missing `react-is` dependency error occurs, install it:

```bash
npm install react-is --legacy-peer-deps
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

You can copy `.env.example` and rename the copy to `.env`.

Configure:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
APP_URL=http://localhost:3000
PORT=3000
```

**Important:**
- Obtain your Gemini API key from Google AI Studio.
- Keep your API key private.
- Never upload your actual `.env` file to GitHub.
- `.env.example` is provided as a configuration template.
- Gemini integration is optional; the assistant has a local fallback.

### 5. Start Development Server

```bash
npm run dev
```

The server will start at:

```text
http://localhost:3000
```

Open the URL in your browser.

---

## ⚙️ Available Commands

| Command | Description |
|---|---|
| `npm install --legacy-peer-deps` | Install project dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build production frontend |
| `npm run preview` | Preview Vite production build |
| `npm run lint` | Run TypeScript checks |
| `npm start` | Start the Express application |

---

## 🤖 Gemini AI Configuration

Urban Dost uses Google's Gemini API to provide intelligent restaurant assistance.

To enable Gemini:

1. Visit Google AI Studio.
2. Generate an API key.
3. Create a `.env` file in the project root.
4. Add your API key:

```env
GEMINI_API_KEY=your_actual_api_key
```

5. Save the file.
6. Restart the development server.

If Gemini is unavailable or no API key is configured, the application can use its local rule-based assistant fallback.

---

## 🍛 Restaurant Menu Categories

The restaurant features multiple food categories, including:

- Pakistani Cuisine
- BBQ & Grills
- Burgers & Fast Food
- Pizza & Pasta
- Chinese & Continental
- Breakfast
- Desserts & Drinks
- Special Food Combos

All displayed prices use Pakistani Rupees (PKR).

---

## 🔐 Security & Configuration

- Environment variables are used for sensitive configuration.
- Gemini API keys should never be committed to source control.
- `.gitignore` excludes environment files and generated build folders.
- Express backend validates assistant messages.
- Production deployment should use HTTPS and secure server configuration.

---

## 🚀 Production Build

Generate the production frontend:

```bash
npm run build
```

The generated frontend files will be available in:

```text
dist/
```

For production server execution, configure:

```text
NODE_ENV=production
PORT=3000
```

Then start:

```bash
npm start
```

On Windows CMD, you can use:

```cmd
set NODE_ENV=production&& npm start
```

The production server serves the generated Vite frontend from the `dist` directory.

---

## 📌 Current Project Scope & Notes

- The current application uses initial/sample restaurant data defined in its TypeScript source files.
- Orders, reservations, stock records and complaint tickets are managed in application memory.
- Data changes are not permanently saved to a database and may reset when the server or application restarts.
- The current Express backend provides the AI assistant API endpoint.
- Persistent database storage, production authentication, payment gateway integration and real-time external delivery integrations require additional implementation.
- Order tracking and kitchen workflows currently operate using the application's internal state and sample data.

---

## 🔮 Future Enhancements

Potential future improvements include:

- MongoDB or PostgreSQL database integration.
- Secure customer registration and login.
- Dedicated admin authentication and role-based access.
- Persistent order and reservation management.
- Online payment gateway integration.
- JazzCash and Easypaisa support.
- Real-time order tracking using WebSockets.
- Advanced sales and financial reports.
- Supplier and purchase management.
- Employee attendance and payroll.
- Cloud-based image storage.
- Production deployment and monitoring.

---

## 👨‍💻 Developer

**Almeer Ahmed**

GitHub: [@almeerahmed610](https://github.com/almeerahmed610)

Project Repository: [Urban Tandoor & Grill – Restaurant](https://github.com/almeerahmed610/Restaurant)

---

## 📄 License

This project contains source code marked under the Apache License 2.0 in parts of the application. Refer to the applicable source-file license notices before redistributing the complete project.

---

## ❤️ Acknowledgements

- React
- Vite
- TypeScript
- Express.js
- Google Gemini
- Tailwind CSS
- Lucide Icons
- Recharts

---

<p align="center">

**Urban Tandoor & Grill**

*Khush Amdeed – Bringing Great Food and Smart Technology Together!*

</p>
