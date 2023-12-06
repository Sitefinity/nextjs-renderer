import React from 'react';
import { WidgetContext } from '../../../editor';
import { Dropdown } from '../dropdown/dropdown';
import { Checkboxes } from '../checkboxes/checkboxes';

export async function DynamicList(props: WidgetContext<DynamicListEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};

    return (viewModel.SfViewName === 'dropdown'
        ? <Dropdown {...props} />
        : <Checkboxes {...props} />);
}

export interface DynamicListEntity {
}
