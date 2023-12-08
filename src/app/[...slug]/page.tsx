
import { Metadata } from 'next';
import { widgetRegistry, RenderPage, WidgetExecutionError, initRendering, pageMetadata } from '@progress/sitefinity-react-framework';

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
    initRendering(widgetRegistry, WidgetExecutionError);
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: any) {
    initRendering(widgetRegistry, WidgetExecutionError);
    return RenderPage({ params, searchParams });
}
