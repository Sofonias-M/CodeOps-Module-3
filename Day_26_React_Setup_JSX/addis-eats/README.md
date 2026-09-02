# Addis Eats

A modern React-based restaurant menu application showcasing Ethiopian cuisine.

## Features

- **Responsive Menu Display** - Browse menu items with automatic layout adjustment
- **Dynamic Pricing** - View original prices and calculated VAT (15%)
- **Category Organization** - Menu items categorized by type
- **Hover Effects** - Interactive card animations for better UX

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:** Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── App.jsx          # Main app component
├── Header.jsx       # Header navigation component
├── Footer.jsx       # Footer component
├── MenuItem.jsx     # Dish & menu item components
├── Menu.jsx         # Menu data & exports
├── main.jsx         # Entry point
├── App.css          # App-specific styles
└── index.css        # Global styles
```

## Components

- **Header** - Navigation and branding
- **Footer** - Footer information and links
- **Menu** - Menu data structure
- **MenuItem** - Individual dish display with pricing

## Responsive Design

- **Desktop (1024px+):** 2 items per row
- **Tablet (768px - 1024px):** 2 items per row  
- **Mobile (< 768px):** 1 item per row

## Tech Stack

- React
- CSS3 (Flexbox)
- Vite

## License

Educational Project - IBT SQ4 Module 3
