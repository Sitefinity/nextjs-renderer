
import { Metadata } from 'next';
import { RenderPage } from '../_sf/components/render-page';
import { PageParams } from '../_sf/page-params';
import { pageMetadata } from '../_sf/utils';

export async function generateMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: PageParams) {
    return RenderPage({ params, searchParams });
}
