
import { Metadata } from 'next';

import { RenderPage, initRendering } from '@progress/sitefinity-react-framework';
import { pageMetadata } from '@progress/sitefinity-react-framework';
import { widgetRegistry } from '../../nextjs-framework/widgets';
import { WidgetExecutionError } from '../../nextjs-framework/widgets/error/widget-execution-error-component';

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
    initRendering(widgetRegistry, WidgetExecutionError);
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: any) {
    initRendering(widgetRegistry, WidgetExecutionError);
    return RenderPage({ params, searchParams });
}
