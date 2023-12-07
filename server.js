const next = require('next');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

// note the "https" not "http" required module. You will get an error if trying to connect with https
const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev: dev });

const sslOptions = {
    key: fs.readFileSync(process.env['SSL_CRT_FILE']),
    cert: fs.readFileSync(process.env['SSL_KEY_FILE'])
};

const handle = app.getRequestHandler();
app.prepare().then(() => {
    const originalHost = process.env.PROXY_ORIGINAL_HOST || 'localhost';
    const devProxy = {
        secure: false,
        target: process.env.PROXY_URL,
        changeOrigin: true,
        selfHandleResponse: true,
        onProxyReq: (proxyReq, req, res) => {
            if (process.env.SF_CLOUD_KEY && process.env.PORT) {
                // for Sitefinity cloud
                proxyReq.setHeader('X-SF-BYPASS-HOST', `localhost:${process.env.PORT}`);
                proxyReq.setHeader('X-SF-BYPASS-HOST-VALIDATION-KEY', process.env.SF_CLOUD_KEY);
            } else if (process.env.PORT && originalHost) {
                // when using a custom port
                proxyReq.setHeader('X-ORIGINAL-HOST', `${originalHost}:${process.env.PORT}`);
            }
        },
        onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
            if ((req.url.indexOf('pages/Default.GetPageTemplates') !== -1 || req.url.indexOf('templates/Default.GetPageTemplates') !== -1) && res.statusCode === 200) {
                const response = responseBuffer.toString('utf8');
                let responseAsJson = JSON.parse(response);
                responseAsJson.value.splice(0, 0, {
                    Subtitle: 'New editor',
                    Title: 'Local React Templates',
                    Type: 0,
                    Visible: true,
                    Templates: [{
                        Framework: 1,
                        Id: '00000000-0000-0000-0000-000000000000',
                        Name: 'React.Default',
                        ThumbnailUrl: '/assets/thumbnail-default.png',
                        Title: 'Default',
                        UsedByNumberOfPages: 0
                    }]
                });

                return JSON.stringify(responseAsJson);
            }

            return responseBuffer;
        })
    };

    const proxy = createProxyMiddleware(devProxy);

    const paths = ['/adminapp', '/sf/system', '/api/default', '/ws', '/restapi', '/contextual-help', '/res', '/admin-bridge', '/sfres', '/images', '/documents', '/videos'];
    const server = https.createServer(sslOptions, async (req, res) => {
        if (req.url.indexOf('.axd?') !== -1 || paths.some(path => req.url.toUpperCase().startsWith(path.toUpperCase())) || /\/sitefinity(?!\/template)/i.test(req.url)) {
            return proxy(req, res);
        }

        return handle(req, res);
    });

    server.listen(process.env.PORT, (err) => {
        if (err) {
            throw err;
        };
        console.log('> Ready on https://localhost:' + process.env.PORT);
    });
});
