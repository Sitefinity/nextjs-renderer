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
                value: 'public, s-maxage=120'
              }
            ]
          }
        ];
      }
  };
