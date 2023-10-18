import { WidgetRegistry } from "sitefinity-react-framework/widgets/widget-registry";
import { ContentBlock } from "./components/content-block/content-block";
import { ContentList } from "./components/content-list/content-list";
import { CallToAction } from "./components/call-to-action/call-to-action";
import { Section } from "./components/section/section";
import { GridComponent } from "./components/kendo/grid/grid";
import { ButtonComponent } from "./components/kendo/button/button";
import { TextBoxComponent } from "./components/kendo/textbox/textbox";
import { ChartComponent } from "./components/kendo/chart/chart";

import sitefinityContentBlockJson from './components/content-block/designer-metadata.json'
import sitefinitySectionJson from './components/section/designer-metadata.json';
import sitefinityContentListJson from './components/content-list/designer-metadata.json';
import sitefinityCAllToActionJson from './components/call-to-action/designer-metadata.json';
import gridMetadataJson from "./components/kendo/grid/designer-metadata.json";
import buttonMetadataJson from "./components/kendo/button/designer-metadata.json";
import textBoxMetadataJson from "./components/kendo/textbox/designer-metadata.json";
import chartMetadataJson from "./components/kendo/chart/designer-metadata.json";

export const widgetRegistry: WidgetRegistry = {
    widgets: {
        "SitefinityKendoGrid": {
            designerMetadata: gridMetadataJson,
            componentType: GridComponent,
            editorMetadata: {
                Title: "Kendo Grid"
            },
        },
        "SitefinityKendoButton": {
            designerMetadata: buttonMetadataJson,
            componentType: ButtonComponent,
            editorMetadata: {
                Title: "Kendo Button"
            },
        },
        "SitefinityChart": {
            designerMetadata: chartMetadataJson,
            componentType: ChartComponent,
            editorMetadata: {
                Title: "Kendo Chart"
            },
        },
        "KendoTextBox": {
            designerMetadata: textBoxMetadataJson,
            componentType: TextBoxComponent,
            editorMetadata: {
                Title: "Kendo Textbox"
            },
        },
        "SitefinityButton":  <any>{
            designerMetadata: sitefinityCAllToActionJson,
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
