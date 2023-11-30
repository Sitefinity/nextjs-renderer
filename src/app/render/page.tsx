import { RenderWidget, WidgetExecutionError, initRendering } from '@progress/sitefinity-react-framework';
import { widgetRegistry } from '@progress/sitefinity-react-framework';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initRendering(widgetRegistry, WidgetExecutionError);
    return RenderWidget({ searchParams });
}
