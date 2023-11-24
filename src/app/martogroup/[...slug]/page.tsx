
import RenderPage from '@/framework/next/components/render-page';
import { PageParams } from '@/framework/next/page-params';

export const dynamic = 'force-static';
export const revalidate = 30;

export default async function Page({ params, searchParams }: PageParams) {
    params.slug.splice(0, 0, 'martogroup');
    return RenderPage({ params, searchParams });
}
