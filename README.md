# Sunkar Finance — Landing + Backend (prepared)

This package contains a minimal React + Vite landing page and a simple Node/Express backend that accepts leads at POST /api/leads.

## What I included
- Frontend (React + Vite)
- Backend (Express) with simple file storage (server/server.js)
- Placeholder logos in `public/assets/` — replace with real logos if available
- Build scripts in package.json

## How to run locally

1. Install dependencies:
   ```
   npm install
   ```

2. Run frontend in dev:
   ```
   npm run dev
   ```
   Open http://localhost:5173

3. Run backend (separate terminal):
   ```
   node server/server.js
   ```
   Backend listens on port 3000 by default.

4. To connect frontend to backend in development:
   - Create a `.env` in project root with:
     ```
     VITE_API_URL=http://localhost:3000
     ```
   - Then restart `npm run dev`.

5. Build for production:
   ```
   npm run build
   ```
   The `dist/` folder will contain the built frontend.

6. Start combined server (serves `dist/` and API):
   - First build: `npm run build`
   - Then start: `npm start`
   - Open http://localhost:3000

## Logos & brand colors
- Expected logo files (place in `public/assets/`):
  - `logo-dark.png`  — gold-on-black (used in hero)
  - `logo-light.png` — gold-on-dark-blue (used in footer)

- Brand colors are defined in `src/index.css` variables:
  - `--brand-1: #0b3b52` (deep blue)
  - `--brand-2: #0f2530` (darker)
  - `--accent: #cfa544` (gold-ish)

Replace logos with your real ones; sizes used:
- hero logo ~160–220px width
- footer logo ~120px width

If you want, I can replace the placeholder logos with your uploaded images — just attach them here.

