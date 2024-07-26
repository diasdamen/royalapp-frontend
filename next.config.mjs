/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'royalapp-backend.onrender.com',
      },
    ],
  },
};

export default nextConfig;
