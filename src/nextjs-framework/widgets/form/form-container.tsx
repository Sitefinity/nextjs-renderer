'use client';

import React, { createContext } from 'react';
import { FormViewModel } from './form';
import { StylingConfig } from '../styling/styling-config';

export const FormContext = createContext<{
    formViewModel: FormViewModel,
    validationMessages?: {[key:string]: boolean},
    hiddenInputs: {[key:string]: boolean},
    sfFormValueChanged: ()=>void
}>({
    formViewModel: {
        CustomSubmitAction: false,
        VisibilityClasses: StylingConfig.VisibilityClasses,
        InvalidClass: StylingConfig.InvalidClass
    },
    sfFormValueChanged: ()=>{},
    hiddenInputs: {}
});

const generateHiddenFields = (hiddenFields: string) =>{
    return (hiddenFields?.split(',') || []).reduce((obj: object, item: string) =>
    Object.assign(obj, { [item]: true })
    , {});
};

export function FromContainer(props: FromContainerProps) {
    const {children, viewModel } = props;
    const [hiddenInputs, setHiddenInputs] = React.useState(generateHiddenFields(viewModel.HiddenFields || ''));
    const sfFormValueChanged = () => {
        console.log('sfFormValueChanged');
    };
    return (
      <FormContext.Provider value={{ formViewModel: viewModel, sfFormValueChanged, hiddenInputs }}>
        <div data-sf-role="fields-container" >
          {children}
        </div>
      </FormContext.Provider>
    );
}

export interface FromContainerProps {
    children: React.ReactNode;
    viewModel: FormViewModel;
}
