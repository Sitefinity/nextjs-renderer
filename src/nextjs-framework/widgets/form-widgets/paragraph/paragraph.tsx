import React from 'react';
import { WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';

export async function Paragraph(props: WidgetContext<ParagraphEntity>) {
    const entity = {
        ...props.model.Properties
    };
    const viewModel: any = {...entity};

    const paragraphUniqueId = viewModel.SfFieldName;
    let ariaDescribedByAttribute = '';
    if (viewModel.HasDescription) {
        const paragraphErrorMessageId = getUniqueId('ParagraphErrorMessage');
        if (viewModel.InstructionalText) {
            ariaDescribedByAttribute = `${paragraphUniqueId} ${paragraphErrorMessageId}`;
        } else {
            ariaDescribedByAttribute = paragraphErrorMessageId;
        }
    }
    const dataAttributes = htmlAttributes(props);
   const defaultRendering = (<>
     <script data-sf-role={`start_field_${paragraphUniqueId}`} data-sf-role-field-name={paragraphUniqueId} />
     <div className={classNames('mb-3', viewModel.CssClass)} data-sf-role="paragraph-text-field-container">
       <input data-sf-role="violation-restrictions" type="hidden" value={viewModel.ViolationRestrictionsJson} />
       <input data-sf-role="violation-messages" type="hidden" value={viewModel.ViolationRestrictionsMessages} />

       <label className="h6" htmlFor={paragraphUniqueId}>{viewModel.Label}</label>
       <textarea id={paragraphUniqueId}
         className="form-control"
         name={viewModel.FieldName}
         placeholder={viewModel.PlaceholderText}
         data-sf-role="paragraph-text-field-textarea"
         readOnly={viewModel.Readonly}
         aria-describedby={ariaDescribedByAttribute}
         {...viewModel.ValidationAttributes}>{viewModel.PredefinedValue}</textarea>
       { viewModel.HasDescription &&
       <div id={getUniqueId('ParagraphInfo')} className="form-text">{viewModel.InstructionalText}</div>
        }
       <div id={getUniqueId('ParagraphErrorMessage')} data-sf-role="error-message" role="alert" aria-live="assertive" className="invalid-feedback" />
     </div>
     <script data-sf-role={`end_field_${paragraphUniqueId}`} />
   </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface ParagraphEntity {
}
