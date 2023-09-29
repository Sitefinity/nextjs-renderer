import { WidgetRegistry } from "./framework/widgets/widget-registry";
import { ContentBlock } from "./components/content-block/content-block";
import { ContentList } from "./components/content-list/content-list";
import { Section } from "./components/section/section";

import sitefinityContentBlockJson from './components/content-block/designer-metadata.json'
import sitefinitySectionJson from './components/section/designer-metadata.json';
import sitefinityContentListJson from './components/content-list/designer-metadata.json';

export const widgetRegistry: WidgetRegistry = {
    widgets: {
        "SitefinityContentBlock":  {
            designerMetadata: sitefinityContentBlockJson,
            componentType: ContentBlock,
            editorMetadata: {
                Title: "Content block"
            }
        },
        "SitefinitySection": {
            designerMetadata: sitefinitySectionJson,
            componentType: Section,
            selectorCategory: 'Layout',
            editorMetadata: {
                Title: "Section"
            }
        },
        "SitefinityContentList": {
            designerMetadata: sitefinityContentListJson,
            componentType: ContentList,
            editorMetadata: {
                Title: "Content list",
                EmptyIconText: "Select content",
                EmptyIcon: "plus-circle",
            },
        }
    }
}
