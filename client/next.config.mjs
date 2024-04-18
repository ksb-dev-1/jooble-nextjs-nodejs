/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/register",
        destination: "http://localhost:8000/jooble/api/auth/register",
      },
      {
        source: "/verify-email",
        destination: "http://localhost:8000/jooble/api/auth/verify-email",
      },
      {
        source: "/login",
        destination: "http://localhost:8000/jooble/api/auth/login",
      },
      {
        source: "/logout",
        destination: "http://localhost:8000/jooble/api/auth/logout",
      },
      {
        source: "/forgot-password",
        destination: "http://localhost:8000/jooble/api/auth/forgot-password",
      },
      {
        source: "/reset-password",
        destination: "http://localhost:8000/jooble/api/auth/reset-password",
      },
      {
        source: "/show-me",
        destination: "http://localhost:8000/jooble/api/users/show-me",
      },
      {
        source: "/edit-profile",
        destination: "http://localhost:8000/jooble/api/users/edit-profile",
      },
    ];
  },
};

export default nextConfig;
