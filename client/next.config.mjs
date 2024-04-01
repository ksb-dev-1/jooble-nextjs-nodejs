/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/register",
        destination: "http://localhost:8000/jooble/api/auth/register",
      },
      {
        source: "/verifyEmail",
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
    ];
  },
};

export default nextConfig;
