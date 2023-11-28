import { RenderWidget } from '../../nextjs-framework/pages/render-widget';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    return RenderWidget({ searchParams });
}
