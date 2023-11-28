
import { Metadata } from 'next';
import { RenderPage } from '../../nextjs-framework/pages/render-page';
import { PageParams } from '../../nextjs-framework/pages/page-params';
import { pageMetadata } from '../../nextjs-framework/pages/utils';

export async function generateMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: PageParams) {
    return RenderPage({ params, searchParams });
}
