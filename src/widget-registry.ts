import { WidgetRegistry } from "sitefinity-react-framework/widgets/widget-registry";
import { ContentBlock } from "./components/content-block/content-block";
import { ContentList } from "./components/content-list/content-list";
import { CallToAction } from "./components/call-to-action/call-to-action";
import { Classification } from "./components/classification/classification";
import { Breadcrumb } from "./components/breadcrumb/breadcrumb";
import { Navigation } from "./components/navigation/navigation";
import { Section } from "./components/section/section";

import sitefinityContentBlockJson from './components/content-block/designer-metadata.json'
import sitefinitySectionJson from './components/section/designer-metadata.json';
import sitefinityContentListJson from './components/content-list/designer-metadata.json';
import sitefinityCallToActionJson from './components/call-to-action/designer-metadata.json';
import sitefinityClassificationJson from './components/classification/designer-metadata.json';
import sitefinityBreadcrumbJson from './components/breadcrumb/designer-metadata.json';
import sitefinityNavigationJson from './components/navigation/designer-metadata.json';

export const widgetRegistry: WidgetRegistry = {
    widgets: {
        "SitefinityBreadcrumb":  <any>{
            designerMetadata: sitefinityBreadcrumbJson,
            componentType: Breadcrumb,
            editorMetadata: {
                Title: "Breadcrumb"
            },
            ssr: true
        },
        "SitefinityClassification":  <any>{
            designerMetadata: sitefinityClassificationJson,
            componentType: Classification,
            editorMetadata: {
                Title: "Classification"
            },
            ssr: true
        },
        "SitefinityNavigation":  <any>{
            designerMetadata: sitefinityNavigationJson,
            componentType: Navigation,
            editorMetadata: {
                Title: "Navigation"
            },
            ssr: true
        },
        "SitefinityButton":  <any>{
            designerMetadata: sitefinityCallToActionJson,
            componentType: CallToAction,
            editorMetadata: {
                Title: "Call to action"
            },
            ssr: true
        },
        "SitefinityContentBlock":  <any>{
            designerMetadata: sitefinityContentBlockJson,
            componentType: ContentBlock,
            editorMetadata: {
                Title: "Content block"
            },
            ssr: true
        },
        "SitefinitySection": <any>{
            designerMetadata: sitefinitySectionJson,
            componentType: Section,
            selectorCategory: 'Layout',
            editorMetadata: {
                Title: "Section"
            },
            ssr: true
        },
        "SitefinityContentList":  <any>{
            designerMetadata: sitefinityContentListJson,
            componentType: ContentList,
            editorMetadata: {
                Title: "Content list",
                EmptyIconText: "Select content",
                EmptyIcon: "plus-circle",
            },
            ssr: true
        }
    }
}
