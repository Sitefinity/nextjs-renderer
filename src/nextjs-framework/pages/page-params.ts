export interface PageParams {
    params: {
        slug: string[]
    },
    searchParams: { [key: string]: string },
    cookie: string;
}
