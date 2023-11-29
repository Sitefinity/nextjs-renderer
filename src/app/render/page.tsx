import { RenderWidget } from '@progress/sitefinity-react-framework';

export default async function Render({ searchParams }: { searchParams: { [key: string]: string } }) {
    return RenderWidget({ searchParams });
}
