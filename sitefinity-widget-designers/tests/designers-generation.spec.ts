
import { EntityMetadataGenerator } from '../src/metadata/entity-metadata-generator';
import { ComplexFieldsEntitiy } from './mocks/complex-designer/complex-designer.entity';
import { SimpleWidgetCaption, SimpleWidgetEntity, SimpleWidgetName } from './mocks/simple-designer';
import { verifyFullDesigner, verifyPropertyKeyValues } from '../src/testing/common';
import { COMLPEX_DESIGNER_DESIGNER } from './mocks/complex-designer/complex-designer.designer';

describe('Designers autogeneration', () => {
    test('Generate simple designer', () => {
        const designerMetadata = EntityMetadataGenerator.extractMetadata(SimpleWidgetEntity);

        expect(designerMetadata).not.toBeNull();
        expect(designerMetadata?.Name).toBe(SimpleWidgetName);
        expect(designerMetadata?.Caption).toBe(SimpleWidgetCaption);

        // 1 section, 1 category
        expect(designerMetadata?.PropertyMetadata.length).toBe(1);
        const basicCategory = designerMetadata?.PropertyMetadata[0];
        expect(basicCategory?.Name).toBe('Basic');
        expect(basicCategory?.Sections.length).toBe(1);

        const mainSection = basicCategory?.Sections[0];
        const simpleStringProperty = mainSection?.Properties[0];

        expect(simpleStringProperty).not.toBeNull();
        verifyPropertyKeyValues(simpleStringProperty, {
            SectionName: 'Main',
            Type: 'string',
            Title: 'String field title',
            DefaultValue: null
        });

        // test default value set in model and getting basic type
        const stringPropWithValue = mainSection?.Properties[1];
        verifyPropertyKeyValues(stringPropWithValue, {
            Name: 'StringFieldWithDefaultValue',
            Type: 'string',
            DefaultValue: 'default-value',
            SectionName: 'Main',
            CategoryName: null
        });
    });

    test('Generate complex fields designer', () => {
        const designer = EntityMetadataGenerator.extractMetadata(ComplexFieldsEntitiy);
        verifyFullDesigner(designer!, COMLPEX_DESIGNER_DESIGNER as any);
    });
});
