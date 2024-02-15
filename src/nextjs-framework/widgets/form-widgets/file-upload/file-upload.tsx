import React from 'react';
import { WidgetContext, getUniqueId, htmlAttributes } from '../../../editor';
import { FileTypes } from './interface/FileTypes';
import { NumericRange } from '../common/NumericRange';
import { FileUploadClient } from './file-upload-client';

const predefinedAcceptValues: {[key: string]: string[]} = {
    'Audio': [ '.mp3', '.ogg', '.wav', '.wma' ],
    'Video': [ '.avi', '.mpg', '.mpeg', '.mov', '.mp4', '.wmv' ],
    'Image': [ '.jpg', '.jpeg', '.png', '.gif', '.bmp' ],
    'Document': [ '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.pps', '.ppsx', '.xls', '.xlsx' ]
};
const getAcceptedFileTypes = (entity: FileFieldEntity): string[] | null => {
            const parsedArray: string[] = [];
            const fileTypes = entity.FileTypes;
            if (!fileTypes || !fileTypes.Type) {
                return null;
            }

            const types = fileTypes.Type.split(',').map(x => x.trim());

            for (let type of types) {
                if (predefinedAcceptValues[type]) {
                    parsedArray.push(...predefinedAcceptValues[type]);
                }

                if (type === 'Other') {
                    const fileTypesSplit = fileTypes.Other
                        .split(',')
                        .map(t => t.trim().toLowerCase())
                        .map(t => t.startsWith('.') ? t : '.' + t);

                    for (let value of fileTypesSplit) {
                        parsedArray.push(value);
                    }
                }
            }

            return parsedArray;
        };

export async function FileUpload(props: WidgetContext<FileFieldEntity>) {
    const entity = {
        Label: 'Upload file',
        RequiredErrorMessage: '{0} field is required',
        FileSizeViolationMessage: 'The size of the selected file is too large',
        FileTypeViolationMessage: 'File type is not allowed to upload',
        ...props.model.Properties
    };
    const context = props.requestContext;
    const allowedFileTypes = getAcceptedFileTypes(entity);
    const viewModel: any = {...entity};
    viewModel.MinFileSizeInMb = entity.Range?.Min,
    viewModel.MaxFileSizeInMb = entity.Range?.Max,
    viewModel.AllowedFileTypes = allowedFileTypes,
    viewModel.ViolationRestrictionsJson =  {
        maxSize: entity.Range?.Max,
        minSize: entity.Range?.Min,
        required: entity.Required,
        allowMultiple: entity.AllowMultipleFiles,
        allowedFileTypes: allowedFileTypes
    };
    const fileFieldUniqueId = viewModel.SfFieldName;
    const fileFieldErrorMessageId = getUniqueId('FileFieldErrorMessage');
    const fileFieldInfoMessageId = getUniqueId('FileFieldInfo');
    const dataAttributes = htmlAttributes(props);
    const defaultRendering = (<>
      <script data-sf-role={`start_field_${fileFieldUniqueId}`} data-sf-role-field-name={fileFieldUniqueId} />
      <FileUploadClient viewModel={viewModel}
        fileFieldUniqueId={fileFieldUniqueId}
        fileFieldErrorMessageId={fileFieldErrorMessageId}
        fileFieldInfoMessageId={fileFieldInfoMessageId}
        context={context}
        />
      <script data-sf-role={`end_field_${fileFieldUniqueId}`} />
    </>);
     return (props.requestContext.isEdit
        ? <div {...dataAttributes}> {defaultRendering} </div>
        :defaultRendering);
}

export interface FileFieldEntity {
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
