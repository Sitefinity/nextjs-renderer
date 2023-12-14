// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import fetch from 'isomorphic-fetch';

const https = require('https');

window.fetch = (url, args) => {
    if (!args) {
        args = {};
    }

    args.agent = new https.Agent({
        rejectUnauthorized: false
    });

    return fetch(url, args);
};

process.env['SF_CMS_URL'] = 'https://localhost';
process.env['SF_ACCESS_KEY'] = 'OTQ4M2QyMzItYTlkNi00ZGI2LTlkMmYtOTNhNmExYTMyMjQ2LT1wcm92aWRlcj0tRGVmYXVsdC09c2VjcmV0a2V5PS13czBUODQ2SXZVK2tEeCRbbW50dy9WKlN1JjdNNEZ8Mks9NS4zZEw+KVRbajk2L2FLK2llOm8pVXAxemZ9VWMubntCVzJtR2RYLStIVDdnUFN8SzB2MEhyJV81L2QwLXh5ODpwdUdRZzlLZHdxUmZWQFhFbTtqck1pfCsoJV9dIQ==';
