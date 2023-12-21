import React from 'react';
import { WidgetContext, classNames } from '../../../editor';

export async function SubmitButton(props: WidgetContext<SubmitButtonEntity>) {
    const entity = {
        Label: 'Submit',
        ...props.model.Properties
    };

    const viewModel: any = {...entity};

    return (<div className={classNames('mb-3', viewModel.CssClass)} data-sf-role="submit-button-container">
      <button type="submit" className="btn btn-primary">{viewModel.Label}</button>
    </div>);
}

export interface SubmitButtonEntity {
    Label?: string;
    SfViewName?: string;
    CssClass?: string;
}
