import { Fragment } from 'react';

export const dynamic = 'force-static';
export const revalidate = 30;

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {

    return (
      <Fragment>
        {children}
      </Fragment>
    );
}
