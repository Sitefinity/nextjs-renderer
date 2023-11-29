
import { Metadata } from 'next';
import { cookies } from 'next/headers';

import { RenderPage } from '@progress/sitefinity-react-framework';
import { pageMetadata } from '@progress/sitefinity-react-framework';

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
    return await pageMetadata({ params, searchParams, cookie: cookies().toString() });
}

export default async function Page({ params, searchParams }: any) {
    return RenderPage({ params, searchParams, cookie: cookies().toString() });
}
