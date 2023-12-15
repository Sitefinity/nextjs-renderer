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


const restServiceModule = require('./src/nextjs-framework/rest-sdk/rest-service');
const utilsModule = require('./src/nextjs-framework/pages/utils');
let createdItems = [];
global.beforeAll(async () => {
    const originalFuncCreate = restServiceModule.RestService.createItem;
    restServiceModule.RestService.createItem = async (args) => {
        const actualResult = await originalFuncCreate(args);
        createdItems.push({ type: args.Type, id: actualResult.Id });

        return actualResult;
    };

    const originalFuncUpload = restServiceModule.RestService.uploadItem;
    restServiceModule.RestService.uploadItem = async (args) => {
        const actualResult = await originalFuncUpload(args);
        createdItems.push({ type: args.Type, id: actualResult.Id });

        return actualResult;
    };

    await utilsModule.initRestSdk();
});

global.afterEach(async () => {
    for (let i = 0; i < createdItems.length; i++) {
        const createdItem = createdItems[i];
        await restServiceModule.RestService.deleteItem({
            Id: createdItem.id,
            Type: createdItem.type
        });
    }

    createdItems = [];
});
