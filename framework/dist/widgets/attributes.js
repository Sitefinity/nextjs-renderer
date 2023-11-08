export function htmlAttributes(widgetContext, error = undefined) {
    const model = widgetContext.model;
    const metadata = widgetContext.metadata;
    const editorMetadata = metadata?.editorMetadata;
    const attributes = {
        'data-sfname': model.Name,
        'data-sftitle': model.Caption || editorMetadata?.Title || model.Name,
        'data-sfid': model.Id,
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
    attributes['data-sfiscontentwidget'] = widgetContext.metadata?.selectorCategory !== 'Layout';
    attributes['data-sfisemptyvisualhidden'] = false;
    attributes['data-sfisempty'] = false;
    attributes['draggable'] = true;
    attributes['data-sfhasquickeditoperation'] = true;
    if (error) {
        attributes['data-sferror'] = error;
    }
    return attributes;
}
export const generateAnchorAttrsFromLink = (linkModel, classList = '') => {
    if (!linkModel) {
        return null;
    }
    const attributes = {};
    attributes.target = linkModel.target;
    attributes.href = linkModel.href;
    attributes.title = linkModel.tooltip || undefined;
    attributes.className = linkModel.classList.join(' ') + classList ? ' ' + classList : '';
    return attributes;
};
export const getCustomAttributes = (attributes, part) => {
    if (!attributes || !attributes[part]) {
        return {};
    }
    return attributes[part].reduce((current, customAttribute) => {
        return ({ ...current, [customAttribute.Key]: customAttribute.Value });
    }, {});
};
