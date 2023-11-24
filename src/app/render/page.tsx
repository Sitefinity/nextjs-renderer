import RenderWidget from '@/framework/next/components/render-widget';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    return RenderWidget({ searchParams });
}
