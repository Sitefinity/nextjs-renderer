
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ReactWidgetRegistry, RenderPage, WidgetExecutionError, initRendering, pageMetadata } from '@progress/sitefinity-react-framework';

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
    initRendering(ReactWidgetRegistry, WidgetExecutionError);
    return await pageMetadata({ params, searchParams, cookie: cookies().toString() });
}

export default async function Page({ params, searchParams }: any) {
    initRendering(ReactWidgetRegistry, WidgetExecutionError);
    return RenderPage({ params, searchParams, cookie: cookies().toString() });
}
