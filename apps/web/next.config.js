module.exports = {
  reactStrictMode: true, // Enables React's Strict Mode for highlighting potential problems in an application
  env: {
    API_URL: process.env.API_URL, // Exposes the API_URL environment variable to the client-side
  },
  async redirects() {
    return [
      {
        source: '/old-path', // Redirects from an old path
        destination: '/new-path', // To a new path
        permanent: true, // Indicates that this is a permanent redirect
      },
    ];
  },
  images: {
    domains: ['example.com'], // Allows images to be loaded from specified domains
  },
};