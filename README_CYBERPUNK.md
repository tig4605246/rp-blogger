# Cyberpunk Redesign: RP-Blogger

This repository has been extended with a cyberpunk-style high-tech redesign.

## Features
- **Cyberpunk Aesthetic**: Dark red and gray color palette with neon accents.
- **Three-Column Layout**:
  - **Left Sidebar**: Navigation with placeholders for future operations.
  - **Middle Content**: Original blog content (Home and Log entries) styled to fit the theme.
  - **Right Sidebar**: Live-simulated message board that auto-scrolls with randomized "netrunner" chat.
- **Visual Effects**: Scanlines, CRT-style flickering, glitch text animations, and neon borders.
- **Responsive-ish**: Designed for a high-tech terminal feel on desktop.

## Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps
1. Navigate to the `rp-blogger` directory:
   ```bash
   cd rp-blogger
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run develop
   ```
4. Open your browser to `http://localhost:8000`.

## Checklist of Changes
- [x] Modified `src/components/layout.js`: Replaced the simple wrapper with a grid-based cyberpunk layout including sidebars and live chat simulation.
- [x] Modified `src/style.css`: Completely overhauled the CSS with cyberpunk variables, animations (glitch, scanlines), and themed component styles.
- [x] Modified `gatsby-config.js`: Updated manifest colors to match the new dark-red theme.
- [x] Maintained original Gatsby functionality: All blog posts and logic remain intact, just re-styled.

## Future Extensions (Coming Soon Placeholders)
- **Signals**: Could be integrated with an external API (e.g., RSS, Twitter, or Discord) to show real-time alerts.
- **Archives**: A specialized view for searching historical logs with a matrix-like filter.
- **Ops**: Admin tools for managing the site directly from the UI.
- **Settings**: UI for toggling visual effects (scanlines, glitch intensity) or color themes.

---
*SYS_MSG: Connection Secure. Happy Coding.*
