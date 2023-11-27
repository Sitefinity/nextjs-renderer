
import { Metadata } from 'next';
import RenderPage from '@/framework/next/components/render-page';
import { pageMetadata } from '@/framework/next/utils';
import { PageParams } from '@/framework/next/page-params';

export async function generateMetadata({ params, searchParams }: PageParams): Promise<Metadata> {
    return await pageMetadata({ params, searchParams });
}

export default async function Page({ params, searchParams }: PageParams) {
    return RenderPage({ params, searchParams });
}
