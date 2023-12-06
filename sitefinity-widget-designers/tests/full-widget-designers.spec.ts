import { EntityMetadataGenerator } from '../src/metadata/entity-metadata-generator';
import { verifyFullDesigner } from '../src/testing/common';
import { CONTENT_BLOCK_DESIGNER } from './mocks/content-block/content-block.designer';
import { ContentBlockEntity } from './mocks/content-block/content-block.entity';
import { CONTENT_LIST_DESIGNER } from './mocks/content-list/content-list.designer';
import { ContentListEntity } from './mocks/content-list/content-list.entity';

describe('Full witget designers', () => {
    test('Verify content block designer', () => {
        const designerMetadata = EntityMetadataGenerator.extractMetadata(ContentBlockEntity);
        verifyFullDesigner(designerMetadata!, CONTENT_BLOCK_DESIGNER as any);
    });

    test('Verify content list designer', () => {
        const designerMetadata = EntityMetadataGenerator.extractMetadata(ContentListEntity);
        verifyFullDesigner(designerMetadata!, CONTENT_LIST_DESIGNER as any);
    });
});
