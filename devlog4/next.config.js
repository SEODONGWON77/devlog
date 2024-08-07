/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  env: {
    ACCESS_KEY: process.env.NEXT_PUBLIC_ACCESS_KEY,
    SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    REGION: process.env.NEXT_PUBLIC_REGION,
    S3_BUCKET: process.env.NEXT_PUBLIC_S3_BUCKET,
    ELASTIC_SEARCH_URI: process.env.ELASTIC_SEARCH_URI,
  },
  async rewrites() {
    return [
      {
        source: "/_search/:path*",
        destination: "http://14.4.75.234:9200/test.posts/_search/:path*",
      },
    ];
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
  },
};
