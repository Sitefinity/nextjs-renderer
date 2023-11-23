import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    if (!url) {
        return Response.error();
    }

    revalidatePath(url);

    return new Response(null, {
        status: 200
    });
}
