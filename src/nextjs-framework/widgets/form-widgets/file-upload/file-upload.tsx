import React from 'react';
import { WidgetContext, getUniqueId, htmlAttributes } from '../../../editor';
import { FileTypes } from './interface/FileTypes';
import { NumericRange } from '../common/NumericRange';
import { FileUploadClient } from './file-upload-client';

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
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<>
      <script data-sf-role={`start_field_${fileFieldUniqueId}`} data-sf-role-field-name={fileFieldUniqueId} />
      <FileUploadClient viewModel={viewModel}
        fileFieldUniqueId={fileFieldUniqueId}
        fileFieldErrorMessageId={fileFieldErrorMessageId}
        context={context}
        />
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
