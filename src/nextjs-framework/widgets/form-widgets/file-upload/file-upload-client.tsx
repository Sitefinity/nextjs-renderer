'use client';

import React from 'react';
import { RequestContext, classNames, getUniqueId } from '../../../editor';
import { FileTypes } from './interface/FileTypes';
import { NumericRange } from '../common/NumericRange';
import { FormContext } from '../../form/form-container';
import { StylingConfig } from '../../styling/styling-config';
import { VisibilityStyle } from '../../styling/visibility-style';

export function FileUploadClient(props: {
    viewModel: any,
    fileFieldUniqueId: string,
    fileFieldErrorMessageId: string,
    fileFieldInfoMessageId: string,
    context: RequestContext
}) {
    const {viewModel, fileFieldUniqueId, fileFieldErrorMessageId, fileFieldInfoMessageId, context} = props;
    const { formViewModel, sfFormValueChanged, hiddenInputs, skippedInputs } = React.useContext(FormContext);
    const [initialLoad, setInitialLoad] = React.useState(true);
    const [ fileInputs, setFileInputs ] = React.useState<{[key: string]: {
        value?: string;
        fileSizeMessage?: boolean;
        fileTypeMessage?: boolean;
    }}>({
        [fileFieldUniqueId]: {}
    });
    let delayTimer: ReturnType<typeof setTimeout>;
    function dispatchValueChanged() {
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function () {
             sfFormValueChanged();
        }, 300);
     }

    const someInputHasValue = React.useMemo(()=>{
        return initialLoad || viewModel.Required && Object.values(fileInputs).some(i=>i.value);
    },[fileInputs, viewModel.Required, initialLoad]);


    const containerRef = React.useRef<HTMLDivElement>(null);
    const isHidden = hiddenInputs[fileFieldUniqueId];
    const isSkipped = skippedInputs[fileFieldUniqueId];
    const labelAdditionalClassList = viewModel.InstructionalText ? 'mb-1' : null;
    const ariaDescribedByAttribute = viewModel.InstructionalText ? `${fileFieldUniqueId} ${fileFieldErrorMessageId}` : fileFieldErrorMessageId;

    const handleFileValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newInputs = {...fileInputs};
        const fileInput = event.target as HTMLInputElement;
        const hasFiles = fileInput.files && fileInput.files.length;

        const validationRestrictions = viewModel.ViolationRestrictionsJson;
        setInitialLoad(false);
        if (!fileInput.value) {
            newInputs[fileInput.id] = {};
        }

        if (hasFiles && validationRestrictions.required) {
            if (fileInput.value) {
                newInputs[fileInput.id] = {
                    ...newInputs[fileInput.id],
                    value: fileInput.value
                };
            } else {
                const newInputOptions = {
                    ...newInputs[fileInput.id]
                };
                delete newInputOptions.value;
                newInputs[fileInput.id] = newInputOptions;
            }
        }

        if (hasFiles && (validationRestrictions.maxSize || validationRestrictions.minSize)) {

            let minSize = validationRestrictions.minSize * 1000 * 1000;
            let maxSize = validationRestrictions.maxSize * 1000 * 1000;
            let file = fileInput.files![0];
            const isFileOutOfSize = (minSize > 0 && file.size < minSize) || (maxSize > 0 && file.size > maxSize);

            if (isFileOutOfSize) {
                newInputs[fileInput.id] = {
                    ...newInputs[fileInput.id],
                    fileSizeMessage: true
                };

            } else {
                const newInputOptions = {
                    ...newInputs[fileInput.id]
                };
                delete newInputOptions.fileSizeMessage;
                newInputs[fileInput.id] = newInputOptions;
            }
        }

        if (hasFiles && validationRestrictions.allowedFileTypes) {

            if (fileInput.value) {
                let stopIndex = fileInput.value.lastIndexOf('.');
                if (stopIndex >= 0) {
                    let extension = fileInput.value.substring(stopIndex).toLowerCase();
                    if (validationRestrictions.allowedFileTypes.indexOf(extension) < 0) {
                        newInputs[fileInput.id] = {
                            ...newInputs[fileInput.id],
                            fileTypeMessage: true
                        };
                        fileInput.focus();
                    } else {
                        const newInputOptions = {
                            ...newInputs[fileInput.id]
                        };
                        delete newInputOptions.fileTypeMessage;
                        newInputs[fileInput.id] = newInputOptions;
                    }
                }
            }
        }
        setFileInputs(newInputs);
        dispatchValueChanged();
    };

    const handleAddInput = () =>{
        const newInputs = {...fileInputs};
        newInputs[getUniqueId(fileFieldUniqueId)] = {};
        setFileInputs(newInputs);
    };

    const handleRemoveInput = (event: React.MouseEvent<HTMLButtonElement>) =>{
        const newInputs = {...fileInputs};

        delete newInputs[(event.target as HTMLButtonElement).id.split('remove-')[1]];
        setFileInputs(newInputs);
    };

     return ( <div
       ref={containerRef}
       className={classNames(
        'mb-3',
        viewModel.CssClass,
        isHidden
            ? StylingConfig.VisibilityClasses[VisibilityStyle.Hidden]
            : StylingConfig.VisibilityClasses[VisibilityStyle.Visible]
        )} data-sf-role="file-field-container">
       <label className={classNames('h6', 'd-block', labelAdditionalClassList)} htmlFor={fileFieldUniqueId}>{viewModel.Label}</label>
       { viewModel.InstructionalText &&
       <div id={fileFieldInfoMessageId} className="form-text mt-1 mb-2">{viewModel.InstructionalText}</div>
        }
       <input data-sf-role="violation-restrictions" type="hidden" value={viewModel.ViolationRestrictionsJson} />
       <div data-sf-role="file-field-inputs">
         { context.isEdit ?
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
           </div> :
            (
                Object.entries(fileInputs).map(([inputKey, inputValue]) =>{
                    const isInvalid = (inputValue.fileSizeMessage || inputValue.fileTypeMessage || !someInputHasValue);
                    return (<div data-sf-role="single-file-input-wrapper" key={inputKey}>
                      <div
                        className={classNames('d-flex', 'mb-2')}
                        data-sf-role="single-file-input">
                        <input
                          className={classNames('form-control',
                                {
                                    [formViewModel.InvalidClass!]: formViewModel.InvalidClass
                                        && isInvalid
                            })}
                          id={inputKey}
                          title={viewModel.Label}
                          name={viewModel.FieldName}
                          type="file"
                          onChange={handleFileValidation}
                          onInvalid={handleFileValidation}
                          aria-describedby={ariaDescribedByAttribute}
                          {...viewModel.ValidationAttributes} />

                        { viewModel.AllowMultipleFiles && Object.entries(fileInputs).length > 1 &&
                        <button type="button" title="Remove" data-sf-role="remove-input" id={'remove-' + inputKey} onClick={handleRemoveInput} className="btn btn-light ms-1">X</button>
                       }
                      </div>
                      { (viewModel.MinFileSizeInMb > 0 || viewModel.MaxFileSizeInMb > 0) && inputValue.fileSizeMessage &&
                      <div data-sf-role="filesize-violation-message" className={classNames('invalid-feedback my-2',
                      {
                        [StylingConfig.VisibilityClasses[VisibilityStyle.Visible]]: isInvalid
                        }
                      )} role="alert" aria-live="assertive">
                        {viewModel.FileSizeViolationMessage}
                      </div>
                   }
                      { (viewModel.AllowedFileTypes !== null) && inputValue.fileTypeMessage &&
                      <div data-sf-role="filetype-violation-message" className={classNames('invalid-feedback my-2',
                      {
                        [StylingConfig.VisibilityClasses[VisibilityStyle.Visible]]: isInvalid
                        }
                      )} role="alert" aria-live="assertive">
                        {viewModel.FileTypeViolationMessage}
                      </div>
                     }
                    </div>);
                })

            )
        }
       </div>
       { viewModel.AllowMultipleFiles &&
       <button type="button" data-sf-role="add-input" onClick={handleAddInput} className="btn btn-secondary my-2">+</button>
        }

       { viewModel.Required && !someInputHasValue &&
       <div data-sf-role="required-violation-message" className={classNames(
        'invalid-feedback',{
            [StylingConfig.VisibilityClasses[VisibilityStyle.Visible]]: !someInputHasValue
        }
          )} role="alert" aria-live="assertive">
         {viewModel.RequiredErrorMessage.replace('{0}', viewModel.Label)}
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
