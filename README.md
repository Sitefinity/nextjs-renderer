Progress® Sitefinity® CMS sample next.js standalone renderer app
======================================================

> **NOTE**: Latest supported version: Sitefinity CMS 14.2.7924.0 and above

# Overview

The sample code in this repo implements a decoupled frontend SPA renderer for Sitefinity CMS. It uses the Sitefinity Layout API services to render the layout and widget content in Sitefinity MVC pages. The sample code uses the React framework.

## Capabilities

The sample supports:

* Local Development on any node.js supported OS
* Integration with thw WYSIWYG editor
* Server-side rendering with Next.js
* Widget development with React
* OOB widgets - Section, Content list, Content block
* Rendering of pages created through the 'Next.js Renderer'


## Getting started

To quickly set-up a dev environment, look at the docs in [**CI & CD**](./docs/CI-CD.md).

To learn more about widget development, look at [**Widget development**](./docs/Widget-development.md)


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
* **'SF_CMS_URL'** -> The URL of the CMS for server-side requests.

### Production (.env.production)
* **'SF_CMS_URL'** -> The URL of the CMS for server-side requests.

## Static file generation & Deployment
In order to use static generation, uncomment the generateStaticParams method in [the slug file](/src/app/[...slug]/page.tsx). Then run the command

Run the command:
``` bash
npm run build # Runs in production environment.
```
