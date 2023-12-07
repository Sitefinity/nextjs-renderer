import React from 'react';
import { WidgetContext, htmlAttributes } from '../../../editor';
import { Dropdown } from '../dropdown/dropdown';
import { Checkboxes } from '../checkboxes/checkboxes';

export async function DynamicList(props: WidgetContext<DynamicListEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (viewModel.SfViewName === 'dropdown'
        ? <Dropdown {...props} />
        : <Checkboxes {...props as any} />);
    return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface DynamicListEntity {
}
