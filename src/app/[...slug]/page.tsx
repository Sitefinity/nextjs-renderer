
import { Metadata } from 'next';
import { ReactWidgetRegistry, RenderPage, WidgetExecutionError, initRendering, pageMetadata } from '@progress/sitefinity-react-framework';

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
    initRendering(ReactWidgetRegistry, WidgetExecutionError);
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: any) {
    initRendering(ReactWidgetRegistry, WidgetExecutionError);
    return RenderPage({ params, searchParams });
}
