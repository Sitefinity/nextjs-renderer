import { widgetRegistry, RenderWidget, WidgetExecutionError, initRendering } from '@progress/sitefinity-react-framework';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initRendering(widgetRegistry, WidgetExecutionError);
    return RenderWidget({ searchParams });
}
