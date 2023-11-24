/** @type {import('next').NextConfig} */

module.exports = {
    logging: {
      fetches: {
        fullUrl: true
      }
    },
    async headers() {
        return [
          {
            source: '/martoreact',
            headers: [
              {
                key: 'Cache-Control',
                value: 's-maxage=1, stale-while-revalidate=59'
              }
            ]
          }
        ];
      }
  };
