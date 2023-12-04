import { CategoryModel, MetadataModel, PropertyModel, SectionModel } from '../../src/metadata/entity-metadata-generator';

export function verifyPropertyKeyValues(property: any, expectedValues: {[key: string] : any}) {
    for (const key in expectedValues) {
        if (Object.prototype.hasOwnProperty.call(expectedValues, key)) {
            const element = expectedValues[key];
            expect(property[key]).toBe(element);
        }
    }
}

export function verifyFullDesigner(actual: MetadataModel, expected: MetadataModel) {
    expect(actual.Name).toBe(expected.Name);
    expect(actual.Caption).toBe(expected.Caption);
    expect(actual.PropertyMetadata.length).toBe(expected.PropertyMetadata.length);

    // go on each section
    actual.PropertyMetadata.forEach(actualCategory => {
        const expectedCategory = expected.PropertyMetadata.find(x => x.Name === actualCategory.Name);
        verifyCategory(actual.Name, actualCategory, expectedCategory!);
    });
}

function verifyCategory(widgetName: string, actual: CategoryModel, expected: CategoryModel) {
    expect(actual.Name).toBe(expected.Name);
    const actualSections = actual.Sections.map(x => x.Name).join(', ');
    const expectedSections = expected.Sections.map(x => x.Name).join(', ');
    expect(`${actual.Name} sections: ${actualSections}`).toBe(`${expected.Name} sections: ${expectedSections}`);

    // verify each section
    actual.Sections.forEach((actualSection, i) => {
        const expectedSection = expected.Sections[i];
        expect(expectedSection).not.toBeNull();
        expect(actualSection.Name).toBe(expectedSection.Name);
        verifySection(widgetName, actualSection, expectedSection);
    });
}

function verifySection(widgetName: string, actual: SectionModel, expected: SectionModel) {
    expect(actual.Name).toBe(expected.Name);
    expect(actual.Title).toBe(expected.Title);
    expect(actual.CategoryName).toBe(expected.CategoryName);
    expect(`${actual.Name} ${actual.Properties.map(x => x.Name).join(', ')}`)
        .toBe(`${expected.Name} ${expected.Properties.map(x => x.Name).join(', ')}`);

    // verify each property
    actual.Properties.forEach(actualProp => {
        const expectedProp = expected.Properties.find(x => x.Name === actualProp.Name);
        expect(expectedProp).not.toBeNull();
        verifyProperty(actualProp, expectedProp!);
    });
}

function verifyProperty(actual: PropertyModel, expected: PropertyModel) {
    expect(actual.Name).toBe(expected.Name);
    expect(actual.Title).toBe(expected.Title);
    // null fallbacks to string in iris
    if (!(actual.Type === 'string' && expected.Type === null)) {
        expect(`${actual.Name} type: ${actual.Type}`)
           .toBe(`${expected.Name} type: ${expected.Type}`);
    }
    expect(actual.CategoryName).toBe(expected.CategoryName);
    if (expected.SectionName !== null && expected.SectionName !== '') {
        expect(actual.SectionName).toBe(expected.SectionName);
    }
    expect(`${actual.Name} default value: ${actual.DefaultValue}`).toBe(`${expected.Name} default value: ${expected.DefaultValue}`);
    expect(`${actual.Name} position: ${actual.Position}`).toBe(`${expected.Name} position: ${expected.Position}`);

    // verify properties count
    const actualPropertyKeys = Object.keys(actual.Properties).sort().join(', ');
    const expectedPropertyKeys = Object.keys(expected.Properties).sort().join(', ');
    expect(`${actual.Name} ${actualPropertyKeys}`).toBe(`${expected.Name} ${expectedPropertyKeys}`);
    // eslint-disable-next-line guard-for-in
    for (const key in expected.Properties) {
            let expectedElement = expected.Properties[key];
            let actualElement = actual.Properties[key];

            switch (key) {
                case 'Meta_LengthDependsOn_ExtraRecords':
                case 'Meta_ViewMetaData':
                case 'Meta_Choices':
                    verifyJsonProperty(actual.Name, actualElement, expectedElement);
                break;
                default:
                    expect(`${actual.Name}:${key} -> ${actualElement}`).toBe(`${expected.Name}:${key} -> ${expectedElement}`);
                break;
            }
    }

    // verify typechildproperties
    expect(`${actual.Name} TypeChildProperties count: ${actual.TypeChildProperties.length}`)
        .toBe(`${expected.Name} TypeChildProperties count: ${expected.TypeChildProperties.length}`);

    actual.TypeChildProperties.forEach(typeChildProp => {
        const expectedProperty = expected.TypeChildProperties.find(x => x.Name === typeChildProp.Name);
        verifyProperty(typeChildProp, expectedProperty!);
    });
}

function verifyJsonProperty(propName: string, expected: string, actual: string) {
    const expectedParsed = JSON.parse(expected);
    const actualParsed = JSON.parse(actual);

    const expectedKeys = Object.keys(expectedParsed);
    const actualKeys = Object.keys(actualParsed);

    expect(`${propName} keys: ${actualKeys.join(', ')}`).toBe(`${propName} keys: ${expectedKeys.join(', ')}`);

    expectedKeys.forEach(key => {
        let actualValue = actualParsed[key];
        let expectedValue = expectedParsed[key];
        if (typeof(expectedValue) === 'object') {
            actualValue = JSON.stringify(actualValue);
            expectedValue = JSON.stringify(expectedValue);
        }
        expect(`${propName}.${key} -> ${actualValue}`).toBe(`${propName}.${key} -> ${expectedValue}`);
    });
}
