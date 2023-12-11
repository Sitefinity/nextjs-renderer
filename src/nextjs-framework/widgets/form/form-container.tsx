'use client';

import React, { createContext } from 'react';
import { FormViewModel } from './form';
import { StylingConfig } from '../styling/styling-config';

export const FormContext = createContext<{
    formViewModel: FormViewModel,
    validationMessages?: {[key:string]: boolean},
    hiddenInputs?: {[key:string]: boolean},
    sfFormValueChanged: ()=>void
}>({
    formViewModel: {
        CustomSubmitAction: false,
        VisibilityClasses: StylingConfig.VisibilityClasses,
        InvalidClass: StylingConfig.InvalidClass
    },
    sfFormValueChanged: ()=>{}
});

export function FromContainer(props: FromContainerProps) {
    const {children, viewModel } = props;

    const sfFormValueChanged = () => {
        console.log('sfFormValueChanged');
    };
    return (
      <FormContext.Provider value={{ formViewModel: viewModel, sfFormValueChanged }}>
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
