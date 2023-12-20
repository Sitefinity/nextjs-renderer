
import { Dictionary } from '../../typings/dictionary';
import { LinkModel } from './link-model';
import { WidgetContext } from './widget-context';

export function htmlAttributes(widgetContext: WidgetContext<any>, error: string | undefined = undefined): { [key: string]: any } {
    if (!widgetContext.requestContext.isEdit) {
        return {};
    }

    const model = widgetContext.model;
    const metadata = widgetContext.metadata;
    const editorMetadata = metadata?.editorMetadata;

    const attributes: any = {
        'data-sfname': model.Name,
        'data-sftitle': model.Caption || editorMetadata?.Title || model.Name,
        'data-sfid' : model.Id,
        'data-sfisorphaned': false
    };

    if (editorMetadata) {
        if (editorMetadata.EmptyIcon) {
            attributes['data-sfemptyicon'] = editorMetadata.EmptyIcon;
        }

        if (editorMetadata.EmptyIconAction) {
            attributes['data-sfemptyiconaction'] = editorMetadata.EmptyIconAction;
        }

        if (editorMetadata.EmptyIconText) {
            attributes['data-sfemptyicontext'] = editorMetadata.EmptyIconText;
        }
    }

    attributes['data-sfiscontentwidget'] = widgetContext.metadata?.editorMetadata?.Category !== 'Layout & Presets';
    attributes['data-sfisemptyvisualhidden'] = false;
    attributes['data-sfisempty'] = false;
    attributes['draggable'] = true;

    if (widgetContext.metadata.editorMetadata?.HasQuickEditOperation) {
        attributes['data-sfhasquickeditoperation'] = true;
    }

    if (error) {
        attributes['data-sferror'] = error;
    }

    return attributes;
}

export const generateAnchorAttrsFromLink = (linkModel?: LinkModel | null, classList: string = '') => {
    if (!linkModel) {
        return null;
    }

    const attributes = {} as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    attributes.target = linkModel.target;
    attributes.href = linkModel.href;
    attributes.title = linkModel.tooltip || undefined;
    attributes.className = linkModel.classList.join(' ') + classList ? ' ' + classList : '';

    return attributes;
};

export const getCustomAttributes = (attributes: { [key: string]: Array<{ Key: string, Value: string }> } | undefined, part: string): Dictionary => {
    if (!attributes || !attributes[part]){
        return {};
    }

    let returnVal: Dictionary = {};

    attributes[part].forEach((attribute) => {
        returnVal[attribute.Key] = attribute.Value;
    });

    return returnVal;
};
