<div align="center">
  <h1>Convert.io 🔄</h1>
  <p>A modern, minimal, universal unit and currency converter.</p>
</div>

---

## Overview

Convert.io is a fast, offline-capable (planned) web application that allows you to instantly convert between a wide range of units and currencies. Built with modern web technologies, it features a sleek, Google Material Design 3 inspired interface for a seamless user experience across devices.

## Features

- **Universal Conversion:** Instantly convert Length, Weight, Temperature, Area, Volume, and Currency.
- **Bidirectional Input:** Type in either the "From" or "To" field—conversions happen instantly in both directions.
- **Modern UI/UX:** A clean, uncluttered interface heavily inspired by Android's Material You, featuring large rounded corners, soft shadows, and smooth transitions.
- **Dark Mode Support:** Fully supports system dark and light themes.
- **Developer Friendly:** Comprehensive AI agent guidelines (`AGENTS.md`), full test suite (Vitest), and strict TypeScript configurations.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **UI Components:** NextUI
- **Icons:** Lucide React
- **Testing:** Vitest & Testing Library

## Getting Started

First, ensure you have Node.js (v20+) installed. Then, clone the repository and install dependencies:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

The project includes a full suite of commands for development and testing:

- `npm run dev`: Start the local development server.
- `npm run test:ci`: Run the Vitest test suite.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run typecheck`: Run TypeScript compilation check.
- `npm run build`: Create an optimized production build.

## License

This project is licensed under a **Personal Use Only** license. You are free to use, modify, and distribute this software for personal, non-commercial purposes. See the [LICENSE](LICENSE) file for more details.
