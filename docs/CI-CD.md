CI & CD
======================================================

# Running in local development mode

When developing you will need access to the WYSIWYG editor and the backend at the same time to drop your widgets and configure them. The 'development mode' enables this by using the 'http-proxy-middleware' package to proxy any CMS related requests to the CMS and allows the Renderer to handle only the frontend rendering of the pages.

Running in dev mode **does not require installing additional software and works on any nodejs supported OS**. Follow these steps:

1. Run in the console
``` bash
    npm i
```
2. Go to [.env.development file](/.env.development) and set the 'PROXY_URL' variable to point to the URL of the CMS.

3. Setup the CMS to allow proxying requests from localhost

   If CMS is hosted on azure -> [instructions](https://www.progress.com/documentation/sitefinity-cms/host-the-asp.net-core-rendered-application#configure-sitefinity-cms-for-azure-app-services)

   If CMS is hosted on local IIS (Step 5 to 14) -> [instructions](https://www.progress.com/documentation/sitefinity-cms/host-sitefinity-cms-and-the-.net-core-renderer-on-the-same-iis)

   If CMS is hosted in Sitefinity cloud, make sure to enter your validation key in the 'SF_CLOUD_KEY' environment variable as shown in env.development

   Configure the CMS web service -> Follow the instructions [here](https://www.progress.com/documentation/sitefinity-cms/setup-the-asp.net-core-renderer#configure-sitefinity-cms)

4. Run in the console
``` bash
    npm start
```

## Running under https
If you wish to run the local node dev server under https, generate an ssl certificate and reference the files in [.env.development file](/.env.development). Uncomment the HTTPS setting there as well.
**NOTE -> this requires a valid https certificate to be installed. Checkout [the SSL doc](./SSL.md)**

## Environment variables legend

### Development (.env.development)

* **'PROXY_URL'** -> The URL of the CMS, where to proxy all of the requests that are not pages.
* **'PROXY_ORIGINAL_HOST'** -> The host of the dev server. Defaults to 'localhost'.
* **'PROXY_ORIGINAL_HOST'** -> The port of the dev server. Defaults to '5001'.
* **'SF_CLOUD_KEY'** -> The secret to work with Sitefinity Cloud.

* **'SSL_CRT_FILE'** -> The crt file for https [See](./SSL.md).
* **'SSL_KEY_FILE'** -> The key file for https [See](./SSL.md).

