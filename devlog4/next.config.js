/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  env: {
    DB_URI: "mongodb://localhost:27017/next13-auth",
    NEXTAUTH_SECRET: "seodongwon",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true,
      },
    ];
  },
};
