'use client';

import React from 'react';
import { RequestContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';
import { FileTypes } from './interface/FileTypes';
import { NumericRange } from '../common/NumericRange';
import { FormContext } from '../../form/form-container';
import { StylingConfig } from '../../styling/styling-config';
import { VisibilityStyle } from '../../styling/visibility-style';

export function FileUploadClient(props: {
    viewModel: any,
    fileFieldUniqueId: string,
    fileFieldErrorMessageId: string,
    context: RequestContext
}) {
    const {viewModel, fileFieldUniqueId, fileFieldErrorMessageId, context} = props;
    const { formViewModel, sfFormValueChanged, hiddenInputs, skippedInputs } = React.useContext(FormContext);
    const isHidden = hiddenInputs[fileFieldUniqueId];
    const isSkipped = skippedInputs[fileFieldUniqueId];
    const labelAdditionalClassList = viewModel.InstructionalText ? 'mb-1' : null;
    const ariaDescribedByAttribute = viewModel.InstructionalText ? `${fileFieldUniqueId} ${fileFieldErrorMessageId}` : fileFieldErrorMessageId;

     return ( <div className={classNames(
        'mb-3',
        viewModel.CssClass,
        isHidden
            ? StylingConfig.VisibilityClasses[VisibilityStyle.Hidden]
            : StylingConfig.VisibilityClasses[VisibilityStyle.Visible]
        )} data-sf-role="file-field-container">
       <label className={classNames('h6', 'd-block', labelAdditionalClassList)} htmlFor={fileFieldUniqueId}>{viewModel.Label}</label>
       { viewModel.InstructionalText &&
       <div id={getUniqueId('FileFieldInfo')} className="form-text mt-1 mb-2">{viewModel.InstructionalText}</div>
 }
       <input data-sf-role="violation-restrictions" type="hidden" value={viewModel.ViolationRestrictionsJson} />
       <div data-sf-role="file-field-inputs">

         { context.isEdit &&
         <div data-sf-role="single-file-input">
           <input
             className="form-control"
             id={fileFieldUniqueId}
             title={viewModel.Label}
             name={fileFieldUniqueId}
             type="file"
             disabled={isHidden || isSkipped}
             aria-describedby={ariaDescribedByAttribute}
             {...viewModel.ValidationAttributes} />
         </div>
     }

       </div>
       { viewModel.AllowMultipleFiles &&
       <button data-sf-role="add-input" className="btn btn-secondary my-2">+</button>
 }

       { viewModel.Required &&
       <div data-sf-role="required-violation-message" className="invalid-feedback" role="alert" aria-live="assertive">{viewModel.RequiredViolationMessage}</div>
 }

       { (!context.isEdit) &&

       <div data-sf-role="single-file-input-wrapper">
         <div className="d-flex mb-2" data-sf-role="single-file-input">
           <input
             className="form-control"
             id={fileFieldUniqueId}
             title={viewModel.Label}
             name={viewModel.FieldName}
             type="file"
             aria-describedby={ariaDescribedByAttribute}
             {...viewModel.ValidationAttributes} />

           { viewModel.AllowMultipleFiles &&
           <button title="Remove" data-sf-role="remove-input" className="btn btn-light ms-1">X</button>
             }
         </div>
         { (viewModel.MinFileSizeInMb > 0 || viewModel.MaxFileSizeInMb > 0) &&
         <div data-sf-role="filesize-violation-message" className="invalid-feedback my-2" role="alert" aria-live="assertive">{viewModel.FileSizeViolationMessage}</div>
         }
         { (viewModel.AllowedFileTypes != null) &&
         <div data-sf-role="filetype-violation-message" className="invalid-feedback my-2" role="alert" aria-live="assertive">{viewModel.FileTypeViolationMessage}</div>
         }
       </div>
 }
     </div>);
}

export interface FileUploadEntity {
    Label?: string;
    InstructionalText?: string;
    AllowMultipleFiles: boolean;
    Required: boolean;
    Hidden: boolean;
    RequiredErrorMessage?: string;
    Range: NumericRange;
    FileSizeViolationMessage?: string;
    FileTypes: FileTypes;
    FileTypeViolationMessage?: string;
    SfViewName?: string;
    CssClass?: string;
    SfFieldType?: string;
    SfFieldName?: string;
}
