/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    domains: ["localhost", "127.0.0.1", "0.0.0.0", "162.19.228.222"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "http", hostname: "localhost", port: "*", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "*", pathname: "/**" },
      { protocol: "http", hostname: "[::1]", port: "*", pathname: "/**" },
      { protocol: "http", hostname: "162.19.228.222", port: "*", pathname: "/**" },
    ],
  },
};

export default nextConfig;
