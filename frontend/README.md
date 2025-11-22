# Her Beautiful Universe - Frontend

A romantic 3D web application where memories float in a spherical universe.

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **3D Universe**: Explore memories in a three-dimensional space using Three.js
- **Interactive Memory Nodes**: Click on memories to view them in detail
- **Hidden Heart Star**: A secret discovery feature for users to find
- **Responsive Design**: Works on both desktop and mobile devices
- **Music Controller**: Background music with volume control
- **Admin Dashboard**: Manage memories and settings

## Project Structure

- `app/` - Next.js app router pages
- `components/` - React components
  - `3d/` - Three.js 3D components
  - `layout/` - Navigation and layout components
  - `ui/` - Reusable UI components
- `lib/` - Utilities and API configuration
- `public/` - Static assets (music, images)

## Technology Stack

- Next.js 16 + React 19 + TypeScript
- Three.js + react-three-fiber + @react-three/drei
- Tailwind CSS 4
- Framer Motion
- Axios

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Notes

- The 3D universe requires WebGL support
- Mobile devices automatically fallback to a 2D gallery
- Background music requires user interaction to play (browser policy)