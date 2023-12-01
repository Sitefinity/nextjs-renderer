import { ReactWidgetRegistry, RenderWidget, WidgetExecutionError, initRendering } from '@progress/sitefinity-react-framework';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    await initRendering(ReactWidgetRegistry, WidgetExecutionError);
    return RenderWidget({ searchParams });
}
