# 🍕 PizzaCraft - Custom Pizza Ordering Frontend

A modern, interactive pizza ordering application built with Next.js that allows users to create custom pizzas with a beautiful, animated interface. Craft your perfect pizza by selecting from premium crusts, sizes, and fresh toppings.

## ✨ Features

### 🎯 Core Functionalities
- **Interactive Pizza Builder**: Step-by-step pizza customization process
- **Real-time Price Calculation**: Dynamic pricing based on selections
- **Shopping Cart Management**: Add, edit, remove, and manage pizza quantities
- **Responsive Design**: Beautiful UI that works on all devices
- **Smooth Animations**: Engaging user experience with Framer Motion
- **Order Checkout**: Complete order placement with customer information

### 🍕 Pizza Customization Options
- **8 Premium Crust Types**:
  - Neapolitan Crust
  - New York Style Crust
  - Sicilian Crust
  - Thin Crust
  - Thick Crust
  - Stuffed Crust
  - Gluten-Free Crust
  - Whole Wheat/Multigrain Crust

- **3 Size Options**:
  - Small (8–10 Inches)
  - Medium (12–14 Inches)
  - Large (14–16 Inches)

- **7 Fresh Toppings**:
  - Pepperoni
  - Mushrooms
  - Onions
  - Sausages
  - Black Olives
  - Bacon
  - Pineapple

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Smooth animations and transitions
- **Lucide React 0.542.0** - Beautiful icon library
- **clsx 2.1.1** - Conditional className utility

### State Management & Data Fetching
- **TanStack React Query 5.85.6** - Server state management
- **React Context API** - Client state management for cart
- **Axios 1.11.0** - HTTP client for API calls

### Development Tools
- **Turbopack** - Fast bundler for development
- **React Query DevTools** - Development debugging tools
- **TypeScript** - Static type checking

## 🏗️ Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Badge)
│   ├── pizza/           # Pizza-specific components
│   ├── cart/            # Cart-related components
│   ├── checkout/        # Checkout components
│   ├── home/            # Home page components
│   └── layout/          # Layout components (Header)
├── contexts/            # React Context providers
│   └── cart-context.tsx # Shopping cart state management
├── controllers/         # API controllers
│   └── api.controllers.ts # Backend API integration
├── types/               # TypeScript type definitions
│   ├── pizza.ts         # Pizza-related types
│   ├── cart.ts          # Cart-related types
│   └── order.ts         # Order-related types
├── utils/               # Utility functions
├── pizza-builder/       # Pizza builder page
├── cart/                # Shopping cart page
├── checkout/            # Checkout page
└── globals.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pizza-ordering-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_BASEURL=http://localhost:3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

## 🎨 Key Features Explained

### 1. Interactive Pizza Builder
The pizza builder follows a step-by-step process:
1. **Base Selection**: Choose from 8 different crust types
2. **Size Selection**: Pick from 3 size options
3. **Toppings Selection**: Add multiple toppings to your pizza

Each step includes:
- Visual feedback and animations
- Real-time price updates
- Validation to ensure complete selections
- Smooth transitions between steps

### 2. Dynamic Pricing System
- Base prices vary by size
- Additional costs for premium crusts
- Per-topping pricing
- Real-time calculation as you build

### 3. Shopping Cart Management
- Add multiple pizzas to cart
- Edit existing pizzas
- Adjust quantities
- Remove items
- Automatic total calculation
- Persistent cart state

### 4. Responsive Design
- Mobile-first approach
- Beautiful animations on all devices
- Touch-friendly interface
- Optimized for all screen sizes

## 🔧 API Integration

The application integrates with a backend API for:
- Fetching pizza bases, sizes, and toppings
- Submitting orders
- Data transformation for backend compatibility

### API Endpoints Used
- `GET /api/pizza/bases` - Fetch available crust types
- `GET /api/pizza/sizes` - Fetch available sizes
- `GET /api/pizza/toppings` - Fetch available toppings
- `POST /api/orders` - Submit customer orders

## 🎯 User Experience Features

### Visual Design
- **Gradient Backgrounds**: Beautiful orange-themed gradients
- **Floating Animations**: Subtle emoji animations in the background
- **Smooth Transitions**: Framer Motion powered animations
- **Modern Typography**: Clean, readable fonts
- **Consistent Spacing**: Well-structured layout

### Interactive Elements
- **Hover Effects**: Visual feedback on interactive elements
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation animations

## 🔒 Type Safety

The application is built with TypeScript for:
- Compile-time error checking
- Better developer experience
- IntelliSense support
- Reduced runtime errors

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Styled with Tailwind CSS
- Animated with Framer Motion
- Icons from Lucide React

---

**PizzaCraft** - Where every pizza tells a story! 🍕✨
