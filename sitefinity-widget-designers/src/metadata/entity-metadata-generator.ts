import { getBasicType } from '../decorators/property-decorators/common/utls';
import { ChoiceSettings, ComlexType as ComplexType, KnownFieldTypes } from '../decorators';
import { keys } from '../symbols/known-keys';

export class EntityMetadataGenerator {
    public static extractMetadata(target: any) {
        if (target == null) {
            return;
        }

        const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
        const metadata = descriptors[keys.metadata].value;

        const meta = this.buildMetadata(metadata);

        return meta;
    }

    private static buildMetadata(metadata: {[key: string]: any}): MetadataModel {
        const meta: MetadataModel = {
            Name: metadata[keys.name],
            Caption: metadata[keys.caption],
            PropertyMetadata: []
        };

        // remove Name and Caption
        delete(metadata[keys.name]);
        delete(metadata[keys.caption]);

        // order properties by sections
        let sectionsOrder = metadata[keys.sectionsOrder];
        if (sectionsOrder) {
            sectionsOrder = JSON.parse(JSON.stringify(sectionsOrder));
            delete(metadata[keys.sectionsOrder]);
        }

        const propertyKeys = Object.keys(metadata);
        const properties: {[key: string]: any}[] = [];
        propertyKeys.forEach(key => {
            const value = metadata[key];
            if (typeof(value) === 'object') {
                const compiledValue = this.compileProperty(value, true);
                properties.push(compiledValue);
            }
        });

        const basicCategory = this.generateCategory('Basic');
        const advancedCategory = this.generateCategory('Advanced');
        const quickEditCategory = this.generateCategory('QuickEdit');

        const uniqueSections: string[] = [];
        let generatedSections: SectionModel[] = [];
        properties.forEach(p => {
            const sectionName = p[keys.sectionName];
            const categoryName = p[keys.categoryName];
            if (!uniqueSections.includes(sectionName)) {
                uniqueSections.push(sectionName);
                const section = this.generateSection(sectionName, categoryName);
                generatedSections.push(section);
            }
        });

        if (sectionsOrder) {
            generatedSections = generatedSections.sort((a, b) => sectionsOrder.indexOf(a.Name) - sectionsOrder.indexOf(b.Name));
        }

        generatedSections.forEach(section => {
            if (section.CategoryName === 'Advanced') {
                advancedCategory.Sections.push(section);
            } else if (section.CategoryName === 'QuickEdit') {
                quickEditCategory.Sections.push(section);
            } else {
                basicCategory.Sections.push(section);
            }
        });


        properties.forEach(prop => {
            const categoryName = prop[keys.categoryName] || 'Basic';
            const sectionName = prop[keys.sectionName];
            let categoryObject;

            if (categoryName === 'Advanced') {
                categoryObject = advancedCategory;
            } else if (categoryName === 'QuickEdit') {
                categoryObject = quickEditCategory;
            } else {
                categoryObject = basicCategory;
            }

            const section = categoryObject.Sections.find(x => x.Name === sectionName);
            if (!section) {
                throw new Error(`Section ${sectionName} was not found on ${categoryObject.Name}`);
            }

            section.Properties.push(prop as PropertyModel);
        });

        this.pushIfHasSections(basicCategory, meta.PropertyMetadata);
        this.pushIfHasSections(advancedCategory, meta.PropertyMetadata);
        this.pushIfHasSections(quickEditCategory, meta.PropertyMetadata);

        return meta;
    }

    private static pushIfHasSections(category: CategoryModel, propertyMeta: any[]) {
        if (category.Sections.length > 0) {
            category.Sections = category.Sections.map(s => {
                s.Properties = s.Properties.sort((a, b) => a.Position - b.Position);
                return s;
            });
            propertyMeta.push(category);
        }
    }

    private static compileProperty(propertyMeta: {[key: string]: any}, firstLevel = false) {
        const propertyObject: {[key: string]: any} = {
            [keys.sectionName]: null,
            [keys.categoryName]: null,
            [keys.properties]: {},
            [keys.typeChildProperties]: [],
            [keys.position] : 0,
            [keys.type]: null
        };

        this.modifyPropertyMeta(propertyMeta);

        const metaKeys = Object.keys(propertyMeta);
        metaKeys.forEach(key => {
            const value = propertyMeta[key];
            // handle object decorators

            if (value != null && typeof(value) === 'object' && key !== keys.dataModel) {
                propertyObject[keys.properties] = Object.assign(propertyObject[keys.properties], this.compileSpecialProperties(key, value));
            } else if (value != null && typeof(value) === 'object' && key === keys.dataModel) {
                const dataModelValue = value?.value || value;
                propertyObject[keys.typeChildProperties] = propertyObject.TypeChildProperties.concat(this.unpackDataModel(dataModelValue));
                propertyObject[keys.type] ||= dataModelValue['type'] || ComplexType.Complex;
            } else {
                if (key === keys.defaultValue && propertyMeta[keys.type] === undefined) {
                    const typeName = getBasicType(typeof(value));
                    if (typeName) {
                        propertyObject[keys.type] ||= typeName;
                    }
                }

                propertyObject[key] = this.modifyValue(value);
            }
        });

        if (firstLevel) {
            // this.assignIfEmpty(propertyObject, 'CategoryName', 'Basic');
            this.assignIfEmpty(propertyObject, keys.sectionName, propertyObject[keys.categoryName] === 'Advanced' ? 'AdvancedMain' : 'Main');
        }

        return propertyObject;
    }

    private static unpackDataModel(dataModelProps: {[key: string]: any}) {
        const models: {[key: string]: any}[] = [];
        const dataModelKeys = Object.keys(dataModelProps);
        dataModelKeys.forEach(key => {
            const value = dataModelProps[key];
            if (key === 'type') {
                return;
            }

            let propertyObject: {[key: string]: any} = {
                [keys.properties]: {},
                [keys.typeChildProperties]: [],
                [keys.position]: 0,
                [keys.defaultValue]: null,
                [keys.categoryName]: null,
                [keys.sectionName]: null,
                [keys.name]: null,
                [keys.title]: null
            };

            // unpack nested object properties
            propertyObject = Object.assign(propertyObject, this.compileProperty(value, false));

            models.push(propertyObject);
        });

        return models;
    }

    private static assignIfEmpty(propMeta: any, key: string, value: any) {
        propMeta[key] = propMeta[key] || value;
    }

    private static modifyValue(value: any) {
        if (typeof(value) === 'boolean') {
            return value ? 'True' : 'False';
        }

        return value;
    }

    private static modifyPropertyMeta(fullPropertyMeta: {[key: string]: any}) {
        const choiceMeta = fullPropertyMeta[keys.choices];

        if (choiceMeta) {
            const type = fullPropertyMeta[keys.type];
            if ((type == null || type === 'string') && (type !== KnownFieldTypes.ChipChoice && type !== KnownFieldTypes.RadioChoice)) {
                fullPropertyMeta[keys.type] = KnownFieldTypes.Choices;
            }

            if ((choiceMeta as ChoiceSettings)?.AllowMultiple) {
                fullPropertyMeta[keys.type] = 'multipleChoices';
            }
        }

        const titleMeta = fullPropertyMeta[keys.title];
        if (titleMeta === undefined) {
            fullPropertyMeta[keys.title] = fullPropertyMeta[keys.name];
        }
    }


    private static compileSpecialProperties(propName: string, propMeta: {[key: string]: any}) {
        const properties: {[key: string]: any} = {};

        const propKeys = Object.keys(propMeta);
        propKeys.forEach(key => {
            let newKey;
            if (this.skipMetaKeyword.includes(propName)) {
                newKey = `${propName}_${key}`;
            } else if (propName === keys.choices && key === 'Choices') {
                newKey = `Meta_${propName}`;
            } else if ((propName === keys.fieldMappings || propName === keys.cssClasses)&& key === 'ViewMetaData' || key === 'ColorPaletteColors') {
                newKey = `Meta_${key}`;
            } else {
                newKey =  `Meta_${propName}_${key}`;
            }

            properties[newKey] = this.modifyValue(propMeta[key]);
        });

        return properties;
    }

    private static generateCategory(name: 'Basic' | 'Advanced' | 'QuickEdit'): CategoryModel {
        return {
            Name: name,
            Sections: []
        };
    }

    private static generateSection(name: string, categoryName: string): SectionModel {
        return {
            Name: name,
            Title: (name !== 'Main' && name !== 'AdvancedMain') ? name : null,
            Properties: [],
            CategoryName: categoryName || 'Basic'
        };
    }

    private static skipMetaKeyword = [
        keys.validations
    ];
}

export interface MetadataModel {
    Name: string,
    Caption: string,
    PropertyMetadata: CategoryModel[]
}

export interface CategoryModel {
    Name: string,
    Sections: SectionModel[]
}

export interface SectionModel {
    Name: string,
    Title: string | null,
    Properties: PropertyModel[],
    CategoryName: string
}

export interface PropertyModel {
    Name: string,
    DefaultValue: any,
    Title: string,
    SectionName: string | null,
    CategoryName: string | null,
    Type: string | null;
    Properties: { [key: string]: any },
    TypeChildProperties: PropertyModel[],
    Position: number,
    [key: string]: any
}
