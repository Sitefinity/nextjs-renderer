import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { UserClient } from './user.client';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';

export function User(props: WidgetContext<any>) {
    const dataAttributes = htmlAttributes(props);
    // TODO: Fix empty widget as this needs to be updated in the sitefinity-react-framework project
    dataAttributes['data-sfiscontentwidget'] = false;

    return (
      <div {...dataAttributes}>
        <UserClient />
      </div>
    );
}
