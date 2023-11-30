import { keys } from '../symbols/known-keys';

export class EntityMetadataGenerator {
    public static extractMetadata(target: any) {
        if (target == null) {
            return;
        }

        const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
        const metadata = descriptors[keys.metadata].value;

        const meta = this.buildMetadata(metadata);

        console.log(metadata);

        return meta;
    }

    private static buildMetadata(metadata: {[key: string]: any}): MetadataModel {
        const meta: MetadataModel = {
            Name: metadata.Name,
            Caption: metadata.Caption,
            PropertyMetadata: []
        };

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
        properties.forEach(p => {
            const sectionName = p[keys.sectionName];
            const categoryName = p[keys.categoryName];
            if (!uniqueSections.includes(sectionName)) {
                uniqueSections.push(sectionName);
                const section = this.generateSection(sectionName, categoryName);
                if (categoryName === 'Advanced') {
                    advancedCategory.Sections.push(section);
                } else if (categoryName === 'QuickEdit') {
                    quickEditCategory.Sections.push(section);
                } else {
                    basicCategory.Sections.push(section);
                }
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
            propertyMeta.push(category);
        }
    }

    private static compileProperty(propertyMeta: {[key: string]: any}, firstLevel = false) {
        const propertyObject: {[key: string]: any} = {
            [keys.sectionName]: null,
            [keys.categoryName]: null,
            [keys.properties]: [],
            [keys.typeChildProperties]: [],
            [keys.position] : 0
        };

        const metaKeys = Object.keys(propertyMeta);
        metaKeys.forEach(key => {
            const value = propertyMeta[key];
            // handle object decorators

            if (value != null && typeof(value) === 'object' && key !== keys.dataModel) {
                propertyObject[keys.properties] = Object.assign(propertyObject[keys.properties], this.compileSpecialProperties(key, value));
            } else if (value != null && typeof(value) === 'object' && key === keys.dataModel) {
                propertyObject.TypeChildProperties = propertyObject.TypeChildProperties.concat(this.unpackDataModel(value?.value || value));
            } else {
                propertyObject[key] = value;
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
        const propertyObject: {[key: string]: any} = {
            [keys.properties]: [],
            [keys.typeChildProperties]: [],
            [keys.position] : 0
        };

        const dataModelKeys = Object.keys(dataModelProps);
        dataModelKeys.forEach(key => {
            const value = dataModelProps[key];
            if (key === 'type') {
                return;
            }

            if (value[keys.dataModel] != null) {
                propertyObject[keys.typeChildProperties] = this.unpackDataModel(value[keys.dataModel]);
            } //else if (typeof(value) === 'object') {
            //     // TODO: sus
            //     propertyObject[keys.properties] = Object.assign(propertyObject[keys.properties], this.compileSpecialProperties(key, value));
            // }

            const model = Object.assign({}, propertyObject, value);
            delete model[keys.dataModel];
            models.push(model);
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

    private static compileSpecialProperties(propName: string, propMeta: {[key: string]: any}) {
        const properties: {[key: string]: any} = {};
        const keys = Object.keys(propMeta);
        keys.forEach(key => {
            let newKey;
            if (this.skipMetaKeyword.includes(propName)) {
                newKey = `${propName}_${key}`;
            } else if (propName !== 'Choices' && key !== 'Choices') {
                newKey =  `Meta_${propName}_${key}`;
            } else {
                newKey = `Meta_${propName}`;
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

    private static specialFields = [
        keys.choices,
        keys.content,
        keys.description,
        keys.maxLength,
        keys.cssClasses,
        keys.lengthDependsOn,
        keys.conditionalVisibility,
        keys.emptyValues,
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
    SectionName: string,
    CategoryName: string,
    Properties: { [key: string]: any },
    TypeChildProperties: { [key: string]: any }[],
    Position: number,
    [key: string]: any
}
