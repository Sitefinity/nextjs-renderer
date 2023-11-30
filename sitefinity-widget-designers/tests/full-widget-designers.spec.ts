import { CategoryModel, EntityMetadataGenerator, MetadataModel, PropertyModel, SectionModel } from '../src/metadata/entity-metadata-generator';
import { CONTENT_BLOCK_DESIGNER, ContentBlockEntity } from './mocks/content-block/content-block.entity';
import { verifyFullDesigner } from './utils/common';

describe('Full witget designers', () => {
    test('Verify content block designer', () => {
        const designerMetadata = EntityMetadataGenerator.extractMetadata(ContentBlockEntity);
        verifyFullDesigner(designerMetadata!, CONTENT_BLOCK_DESIGNER as any);
    });
});
