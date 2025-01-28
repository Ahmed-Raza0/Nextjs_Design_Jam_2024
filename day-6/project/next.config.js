/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
        {
          protocol: 'https',
          hostname: '67800beb0476123f76a9578a.mockapi.io',
        },
        
      ],
    },
  };
  
  module.exports = nextConfig;
  