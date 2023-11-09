import { WidgetContext } from 'sitefinity-react-framework/widgets/widget-context';
import { htmlAttributes } from 'sitefinity-react-framework/widgets/attributes';
import { ThemeButtonClient } from './theme-button.client';

export function ThemeButton(props: WidgetContext<any>) {
    const dataAttributes = htmlAttributes(props);
    // TODO: Fix empty widget as this needs to be updated in the sitefinity-react-framework project
    dataAttributes['data-sfiscontentwidget'] = false;

    return (
      <div {...dataAttributes}>
        <ThemeButtonClient />
      </div>
    );
}
