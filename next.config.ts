// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',       // user goes to /
        destination: '/public', // redirect to login/register
        permanent: true,       // 308 redirect
      },
    ];
  },
};

module.exports = nextConfig;
