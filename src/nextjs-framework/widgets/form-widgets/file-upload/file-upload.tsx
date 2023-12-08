import React from 'react';
import { WidgetContext, classNames, getUniqueId, htmlAttributes } from '../../../editor';
import { FileTypes } from './interface/FileTypes';
import { NumericRange } from '../common/NumericRange';

export async function FileUpload(props: WidgetContext<FileUploadEntity>) {
    const entity = {
        Label: 'Upload file',
        RequiredErrorMessage: '{0} field is required',
        FileSizeViolationMessage: 'The size of the selected file is too large',
        FileTypeViolationMessage: 'File type is not allowed to upload',
        ...props.model.Properties
    };
    const context = props.requestContext;
    const viewModel: any = {...entity};
    const fileFieldUniqueId = viewModel.SfFieldName;
    const fileFieldErrorMessageId = getUniqueId('FileFieldErrorMessage');
    const labelAdditionalClassList = viewModel.HasDescription ? 'mb-1' : null;
    const ariaDescribedByAttribute = viewModel.HasDescription ? `${fileFieldUniqueId} ${fileFieldErrorMessageId}` : fileFieldErrorMessageId;
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<>
      <script data-sf-role={`start_field_${fileFieldUniqueId}`} data-sf-role-field-name={fileFieldUniqueId} />
      <div className={classNames('mb-3', viewModel.CssClass)} data-sf-role="file-field-container">
        <label className={classNames('h6', 'd-block', labelAdditionalClassList)} htmlFor={fileFieldUniqueId}>{viewModel.Label}</label>
        { viewModel.HasDescription &&
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
      </div>
      <script data-sf-role={`end_field_${fileFieldUniqueId}`} />
    </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
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
