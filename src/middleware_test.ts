// import { NextResponse } from 'next/server';
// import type { NextFetchEvent, NextRequest } from 'next/server';
// import { RootUrlService } from 'sitefinity-react-framework/sdk/root-url.service';
// import { initLayout } from './app/[...slug]/page';

// export function middleware(request: NextRequest, event: NextFetchEvent) {

//     if (request.nextUrl.basePath.indexOf('_next') !== -1) {
//         return NextResponse.next();
//     }

//     const response = NextResponse.next();
//     event.waitUntil(
//         (async () => {
//             response.headers.set('Cache-Control', 'max-age=1');
//         })()
//     );

//     return response;
// }
