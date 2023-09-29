Server side rending (Next.js)
======================================================

## Running the Next.js server
Install the modules:
``` bash
npm install
```

Run the server:
``` bash
npm run dev # Runs in dev environment.
```
**NOTE -> Running under https requires a valid https certificate to be installed. Checkout [the SSL doc](./SSL.md)**

The [server.js file](../server.js) is used to configure the server under https.

## Routing
The Next.js Renderer uses the 'app router' by default. Since all of the pages are located on the CMS, all of the routes are fetched dynamically through the generateStaticParams method in [the slug file](/src/app/[...slug]/page.tsx) or dynamically if static generation is not used. All of the pages for the Renderer of type 'React' are fetched and are rendered.

## Environment variables legend

### Development (.env.development)
* **'NEXT_CMS_URL'** -> The URL of the CMS for server-side requests.

### Production (.env.production)
* **'NEXT_CMS_URL'** -> The URL of the CMS for server-side requests.

# Static file generation & Deployment
Run the command:
``` bash
npm run build # Runs in production environment.
```


