import { EntityMetadataGenerator, MetadataModel } from '@progress/sitefinity-widget-designers';
import { verifyFullDesigner } from '@progress/sitefinity-widget-designers';
import { ContentListEntity } from '../widgets/content-list/content-list-entity';

import sitefinityContentListJson from '../widgets/content-list/designer-metadata.json';
import sitefinitySectionJson from '../widgets/section/designer-metadata.json';
import { SectionEntity } from '../widgets/section/section.entity';

describe('Widget entity designer generation tests', () => {
    test('Content list designer generation', () => {
        const designer = EntityMetadataGenerator.extractMetadata(ContentListEntity);
        verifyFullDesigner(designer!, sitefinityContentListJson);
    });

    testDesigner('Section widget desginer generation', SectionEntity, sitefinitySectionJson);


    function testDesigner(testTitle: string, widgetEntity: any, designerMetadata: MetadataModel) {
        test(testTitle, () => {
            const designer = EntityMetadataGenerator.extractMetadata(widgetEntity);
            verifyFullDesigner(designer!, designerMetadata);
        });
    }
});
