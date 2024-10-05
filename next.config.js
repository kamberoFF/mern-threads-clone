/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},  // Set it as an object. Add specific properties if needed.
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,  // Move this to the root level
  },
};

module.exports = nextConfig;