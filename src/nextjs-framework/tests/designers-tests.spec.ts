import { EntityMetadataGenerator, MetadataModel } from '@progress/sitefinity-widget-designers-sdk';
import { verifyFullDesigner } from '@progress/sitefinity-widget-designers-sdk';
import { ContentListEntity } from '../widgets/content-list/content-list-entity';

import { SectionEntity } from '../widgets/section/section.entity';
import { ContentBlockEntity } from '../widgets/content-block/content-block.entity';
import { ImageEntity } from '../widgets/image/image.entity';
import { SearchFacetsEntity } from '../widgets/search-facets/search-facets.entity';
import { ClassificationEntity } from '../widgets/classification/classification-entity';

import sitefinityContentListJson from '../widgets/content-list/designer-metadata.json';
import sitefinitySectionJson from '../widgets/section/designer-metadata.json';
import contentBlockJson from '../widgets/content-block/designer-metadata.json';
import imageJson from '../widgets/image/designer-metadata.json';
import sitefinitySearchFacetsListJson from '../widgets/search-facets/designer-metadata.json';
import sitefinityClassificationJson from '../widgets/classification/designer-metadata.json';

describe('Widget entity designer generation tests', () => {
    testDesigner('Content list designer generation', ContentListEntity, sitefinityContentListJson as any);
    testDesigner('Section widget desginer generation', SectionEntity, sitefinitySectionJson as any);
    testDesigner('Content block desginer generation', ContentBlockEntity, contentBlockJson as any);
    testDesigner('Image widget desginer generation', ImageEntity, imageJson);
    testDesigner('Search facets designer generation', SearchFacetsEntity, sitefinitySearchFacetsListJson as any);
    testDesigner('Search facets designer generation', ClassificationEntity, sitefinityClassificationJson as any);


    function testDesigner(testTitle: string, widgetEntity: any, designerMetadata: MetadataModel) {
        test(testTitle, () => {
            const designer = EntityMetadataGenerator.extractMetadata(widgetEntity);
            verifyFullDesigner(designer!, designerMetadata);
        });
    }
});
