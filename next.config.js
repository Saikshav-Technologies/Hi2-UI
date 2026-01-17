/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Environment variable validation can be hooked here or in lib/env.ts
    env: {
        // Expose specific env vars to client if needed, though publicRuntimeConfig/NEXT_PUBLIC_ is preferred
    },
    images: {
        domains: [], // Add generic domains here for now
    },
};

module.exports = nextConfig;
