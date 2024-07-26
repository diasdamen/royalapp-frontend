/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'royalapp-backend.onrender.com',
        port: "",
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
