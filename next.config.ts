import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host
  : "*.supabase.co";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      // Apply security headers to every route
      source: "/(.*)",
      headers: [
        // Prevent clickjacking — only allow framing by the same origin
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        // Stop browsers from MIME-type sniffing
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        // Control referrer information sent to third-party pages
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        // Disable client-side features not needed by this app
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        // Force HTTPS for 1 year (only effective on production HTTPS deployments)
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
        // Content Security Policy — restrict resource origins
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            // Scripts: only same-origin + Next.js inline scripts (nonce not used here, so unsafe-inline needed for Next.js RSC hydration)
            `script-src 'self' 'unsafe-inline' ${
              process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""
            }`,
            // Styles: same-origin + inline styles used by Next.js
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            // Fonts
            "font-src 'self' https://fonts.gstatic.com",
            // Images: same-origin + Supabase storage + data URIs
            `img-src 'self' data: https://${supabaseHost}`,
            // Frames: Supabase storage for the PDF iframe
            `frame-src 'self' https://${supabaseHost}`,
            // Connections: Supabase API
            `connect-src 'self' https://${supabaseHost}`,
            // Block all object/embed tags
            "object-src 'none'",
            // Upgrade insecure requests in production
            "upgrade-insecure-requests",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
