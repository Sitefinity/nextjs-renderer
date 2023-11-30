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
    expect(actual.Properties.length).toBe(expected.Properties.length);

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
    expect(actual.CategoryName).toBe(expected.CategoryName);
    if (expected.SectionName !== null) {
        expect(actual.SectionName).toBe(expected.SectionName);
    }
    expect(`${actual.Name} default value: ${actual.DefaultValue}`).toBe(`${expected.Name} default value: ${expected.DefaultValue}`);
    expect(`${actual.Name} position: ${actual.Position}`).toBe(`${expected.Name} position: ${expected.Position}`);

    // verify properties count
    const actualPropertyKeys = Object.keys(actual.Properties).sort().join(', ');
    const expectedPropertyKeys = Object.keys(expected.Properties).sort().join(', ');
    expect(`${actual.Name} ${actualPropertyKeys}`).toBe(`${expected.Name} ${expectedPropertyKeys}`);
    for (const key in expected.Properties) {
        if (Object.prototype.hasOwnProperty.call(expected.Properties, key)) {
            const element = expected.Properties[key];
            expect(`${actual.Name}:${key} -> ${actual.Properties[key]}`).toBe(`${expected.Name}:${key} -> ${element}`);
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
