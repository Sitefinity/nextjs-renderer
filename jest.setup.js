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

process.env['SF_CMS_URL'] = '';
process.env['SF_ACCESS_KEY'] = '';

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
