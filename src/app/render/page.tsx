import RenderWidget from '@/framework/components/render-widget';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    return RenderWidget({ searchParams });
}
