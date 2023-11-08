import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { UserClient } from './user.client';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { KendoHorizontal } from '../menu/horizontal';

export function User(props: WidgetContext<UserModel>) {
    const dataAttributes = htmlAttributes(props);
    // TODO: Fix empty widget as this needs to be updated in the sitefinity-react-framework project
    dataAttributes['data-sfiscontentwidget'] = false;
    const items = [
        {
            Title: 'Alex Watson',
            ChildNodes: [{
                Title: 'Test'
            }]
        }
    ];

    return (
      <div {...dataAttributes}>
        {/* <KendoHorizontal items={items} /> */}
        <UserClient />
      </div>
    );
}

interface UserModel {

}
