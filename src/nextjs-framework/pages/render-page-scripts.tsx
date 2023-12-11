
'use client';

import { RootUrlService } from '../rest-sdk/root-url.service';
import { PageLayoutServiceResponse } from '../rest-sdk/services';
import { PageScriptLocation } from '../rest-sdk/services/scripts';

export function RenderPageScripts({ layout }: { layout: PageLayoutServiceResponse }) {
    RootUrlService.rootUrl = `${process.env['NEXT_PUBLIC_CMS_URL'] || ''}`;
    if (!RootUrlService.rootUrl.endsWith('/')) {
        RootUrlService.rootUrl += '/';
    }

    if (typeof window !== 'undefined') {
        layout.Scripts.forEach((script) => {
            const scriptElementName = script.IsNoScript ? 'noscript' : 'script';
            const scriptElement = document.createElement(scriptElementName);
            if (script.Source) {
                if (script.Source[0] === '/') {
                    script.Source = RootUrlService.rootUrl + script.Source.substring(1);
                }

                scriptElement.setAttribute('src', script.Source);
            }

            script.Attributes.forEach((attribute) => {
                scriptElement.setAttribute(attribute.Key, attribute.Value);
            });

            if (script.Value) {
                scriptElement.innerText = script.Value;
            }

            if (script.Location === PageScriptLocation.BodyBottom) {
                window.document.body.appendChild(scriptElement);
            } else if (script.Location === PageScriptLocation.BodyTop) {
                window.document.body.prepend(scriptElement);
            } else if (script.Location === PageScriptLocation.Head) {
                window.document.head.appendChild(scriptElement);
            }
        });
    }

    return <></>;
}


