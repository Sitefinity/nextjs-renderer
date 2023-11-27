import { RenderWidget } from '../_sf/components/render-widget';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    return RenderWidget({ searchParams });
}
