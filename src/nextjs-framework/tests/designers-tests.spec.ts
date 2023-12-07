import { EntityMetadataGenerator, MetadataModel } from '@progress/sitefinity-widget-designers';
import { verifyFullDesigner } from '@progress/sitefinity-widget-designers';
import { ContentListEntity } from '../widgets/content-list/content-list-entity';

import { SectionEntity } from '../widgets/section/section.entity';
import { ContentBlockEntity } from '../widgets/content-block/content-block.entity';
import { ImageEntity } from '../widgets/image/image.entity';

import sitefinityContentListJson from '../widgets/content-list/designer-metadata.json';
import sitefinitySectionJson from '../widgets/section/designer-metadata.json';
import contentBlockJson from '../widgets/content-block/designer-metadata.json';
import imageJson from '../widgets/image/designer-metadata.json';

describe('Widget entity designer generation tests', () => {
    testDesigner('Content list designer generation', ContentListEntity, sitefinityContentListJson);
    testDesigner('Section widget desginer generation', SectionEntity, sitefinitySectionJson);
    testDesigner('Content block desginer generation', ContentBlockEntity, contentBlockJson);
    testDesigner('Image widget desginer generation', ImageEntity, imageJson);


    function testDesigner(testTitle: string, widgetEntity: any, designerMetadata: MetadataModel) {
        test(testTitle, () => {
            const designer = EntityMetadataGenerator.extractMetadata(widgetEntity);
            verifyFullDesigner(designer!, designerMetadata);
        });
    }
});
