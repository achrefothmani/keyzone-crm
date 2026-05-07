/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    domains: ["localhost", "127.0.0.1", "0.0.0.0", "162.19.228.222", "keyzonestates.com", "www.keyzonestates.com", "crm.keyzonestates.com", "api.keyzonestates.com"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "keyzonestates.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "www.keyzonestates.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "crm.keyzonestates.com", port: "", pathname: "/**" },
      { protocol: "https", hostname: "api.keyzonestates.com", port: "", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "*", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", port: "*", pathname: "/**" },
      { protocol: "http", hostname: "[::1]", port: "*", pathname: "/**" },
      { protocol: "http", hostname: "162.19.228.222", port: "*", pathname: "/**" },
    ],
  },
};

export default nextConfig;
