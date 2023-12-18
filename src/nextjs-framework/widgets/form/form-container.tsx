'use client';

import React, { createContext } from 'react';
import { FormViewModel } from './form';
import { StylingConfig } from '../styling/styling-config';
import { VisibilityStyle } from '../styling/visibility-style';
import { FormRulesExecutor } from './rules/form-rules-executor';
export const FormContext = createContext<{
    formViewModel: FormViewModel,
    validationMessages?: {[key:string]: boolean},
    hiddenInputs: {[key:string]: boolean},
    skippedInputs: {[key:string]: boolean},
    sfFormValueChanged: ()=>void
}>({
    formViewModel: {
        CustomSubmitAction: false,
        VisibilityClasses: StylingConfig.VisibilityClasses,
        InvalidClass: StylingConfig.InvalidClass
    },
    sfFormValueChanged: ()=>{},
    hiddenInputs: {},
    skippedInputs: {}
});

const generateHiddenFields = (fields: string[]) =>{
    return fields.reduce((obj: object, item: string) =>
    Object.assign(obj, { [item]: true })
    , {});
};

export function FormContainer(props: FromContainerProps) {
    const {children, viewModel, className } = props;
    const formRef = React.useRef<HTMLDivElement>();
    const formRules = React.useRef<FormRulesExecutor>();
    const splitHiddenFields = viewModel.HiddenFields?.split(',') || [];
    const [hiddenInputs, setHiddenInputs] = React.useState<{[key: string]: boolean}>(generateHiddenFields(splitHiddenFields));
    const [skippedInputs, setSkippedInputs] = React.useState<{[key: string]: boolean}>({});
    const sfFormValueChanged = () => {
        formRules.current!.process();
    };

    const updateFields = React.useCallback((args: {
        show?: string;
        hide?: string;
        skip?: string;
        unSkip?: string;
    }) => {
        if (args.show) {
            const newHiddenFields = {...hiddenInputs};
            delete newHiddenFields[args.show];
            setHiddenInputs(newHiddenFields);
        }

        if (args.hide) {
            const newHiddenFields = {...hiddenInputs};
            newHiddenFields[args.hide] = true;
            setHiddenInputs(newHiddenFields);
        }

        if (args.skip) {
            const newSkippedFields = {...skippedInputs};
            delete newSkippedFields[args.skip];
            setSkippedInputs(newSkippedFields);
        }

        if (args.unSkip) {
            const newSkippedFields = {...skippedInputs};
            newSkippedFields[args.unSkip] = true;
            setSkippedInputs(newSkippedFields);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const formCreateRef = React.useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            formRef.current = node;
            const fr = new FormRulesExecutor(node, updateFields);
            formRules.current = fr;
            fr.process();
        }
      }, [updateFields]);

    return (
      <FormContext.Provider value={{ formViewModel: viewModel, sfFormValueChanged, hiddenInputs, skippedInputs }}>
        <div
          ref={formCreateRef}
          className={className}
          data-sf-role="form-container"
          data-sf-invalid={viewModel.InvalidClass}
          data-sf-visibility-inline-visible={viewModel.VisibilityClasses[VisibilityStyle.InlineVisible]}
          data-sf-visibility-hidden={viewModel.VisibilityClasses[VisibilityStyle.Hidden]}
          data-sf-visibility-visible={viewModel.VisibilityClasses[VisibilityStyle.Visible]}>
          {children}
        </div>
      </FormContext.Provider>
    );
}

export interface FromContainerProps {
    children: React.ReactNode;
    className: string;
    viewModel: FormViewModel;
}
