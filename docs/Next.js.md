Server side rending (Next.js)
======================================================

## Running the Next.js server
Install the modules:
``` bash
npm install
```

Run the server:
``` bash
npm run next:start # Runs in dev environment.
```
## Running the Next.js server under https:

``` bash
npm run start:next:https # Runs in dev environment.
```
**NOTE -> this requires a valid https certificate to be installed. Checkout [the SSL doc](./SSL.md)**

The [server.js file](../server.js) is used to configure the server under https.

## Routing & Pages
Since all of the pages are located on the CMS, all of the routes are fetched dynamically through the getStaticPaths method in [the slug file](/src/pages/[[...slug]].tsx). All of the pages for the Renderer of type 'React' are fetched and are rendered. After which getStaticProps() is called and the logic to fetch the layout for each page kicks in. This layout is then passed to the [App.tsx](./src/App.tsx) component to render the page.

**The components themselves cannot be statically rendered if they have HTTP calls. These calls are either made client-side(when running static file generation) or server-side.**

## Limitations
Not all components can render through next.js. Some of them require the window object to be present. One example for this is the [KendoChart component](./src/components/chart/chart-component.tsx).

## Environment variables legend

### Development (.env.development)

* **'NEXT_PUBLIC_CMS_URL'** -> The URL of the CMS for client-side requests.
* **'NEXT_CMS_URL'** -> The URL of the CMS for server-side requests.

### Production (.env.production)
* **'NEXT_PUBLIC_CMS_URL'** -> The URL of the CMS for client-side requests.
* **'NEXT_CMS_URL'** -> The URL of the CMS for server-side requests.

# Static file generation & Deployment
Run the command:
``` bash
npm run start next:build # Runs in production environment.
```

This outputs the files under the './next/export' folder. This is configured in the [package.json file](../package.json). Deploy the files to your preferred server.

