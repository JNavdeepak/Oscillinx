# OSCILLINX

Responsive React and Next.js redesign of the OSCILLINX website. The App Router preserves the home, documentation, model library, command line, privacy, and terms routes.

## Preview the packaged build

After extracting the ZIP, run `python preview.py` from the oscillinx folder. It opens the prebuilt site in your browser. Press Ctrl+C in the terminal to stop the local server.

## Run locally

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` to generate the production site in `out/`. Serve that directory with a static web server, or deploy the project to Vercel with Next.js framework detection.

## Branding and releases

Edit `app/tokens.css` for the brand palette, theme-specific surfaces, text, borders, and interaction colors. The selected theme is stored locally. Use the shared Brand component in `components/Frame.tsx` to add the approved full-color logo when supplied. The current header and footer use the typographic OSCILLINX wordmark.

The site's original Windows installer belongs at `public/downloads/Oscillinx.exe`. The Android release URL is centralized in `components/Release.tsx`. The product image is from the original desktop website. The terminal transcript and mobile conversation are illustrative previews.


