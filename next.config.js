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
                value: 'public, max-age=0, s-maxage=43200'
              }
            ]
          }
        ];
      }
  };
