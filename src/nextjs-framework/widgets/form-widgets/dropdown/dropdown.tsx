import React from 'react';
import { WidgetContext, htmlAttributes } from '../../../editor';
import { DropdownFieldSet } from './dropdown-client';

export async function Dropdown(props: WidgetContext<DropdownEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};
    const dropdownUniqueId = viewModel.SfFieldName;
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<>
      <script data-sf-role={`start_field_${dropdownUniqueId}`} data-sf-role-field-name={dropdownUniqueId} />
      <DropdownFieldSet viewModel={viewModel}
        dropdownUniqueId={dropdownUniqueId}
        />
      <script data-sf-role={`end_field_${dropdownUniqueId}`} />
    </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface DropdownEntity {
}
