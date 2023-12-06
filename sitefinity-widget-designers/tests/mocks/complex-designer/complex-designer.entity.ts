import { ComlexType as ComplexType, Content, DataModel, DataType, DefaultValue, DisplayName, Model, TableView, WidgetEntity } from '../../../src/decorators';

interface MixedContentContext {
    ItemIdsOrdered: string[] | null,
    Content: ContentContext[]
}

interface ContentContext {
    Type: string;
    Variations: ContentVariation[] | null
}

interface ContentVariation {
    Source: string;
    Filter: { Key: string, Value: string };
    DynamicFilterByParent?: boolean;
}

@Model()
class ComplexObject {
    @DataType('string')
    @DisplayName('String prop')
    @DefaultValue('test')
    ChildString: string | null = null;

    @DisplayName('Int prop')
    ChildInt: number = 42;
}

@Model()
class ComplexWithContent {
    @Content({
        Type: 'Telerik.Sitefinity.Events.Model.Event'
    })
    Events: MixedContentContext | null = null;
}

@Model()
class MultilevelComplexObject {
    @DisplayName('String prop')
    ChildString: string = 'testouter';

    @DisplayName('Child complex prop')
    @DataModel(ComplexObject)
    ChildComplexObject: ComplexObject | null = null;
}

@Model()
class BigComplexObject {
    @DisplayName('String prop1')
    @DefaultValue('test1')
    ChildString1: string | null = null;

    @DisplayName('String prop2')
    @DefaultValue('test2')
    ChildString2: string | null = null;

    @DisplayName('String prop3')
    @DefaultValue('test3')
    ChildString3: string | null = null;

    @DisplayName('String prop4')
    @DefaultValue('test4')
    ChildString4: string | null = null;

    @DisplayName('String prop5')
    @DefaultValue('test5')
    ChildString5: string | null = null;

    @DisplayName('String prop6')
    @DefaultValue('test6')
    ChildString6: string | null = null;
}

@WidgetEntity('ComplexWitget', 'Complex witget')
export class ComplexFieldsEntitiy {
    // BaseProp = 'Base prop';

    @DataModel(ComplexObject)
    Complex: ComplexObject | null = null;

    @DataModel(ComplexWithContent)
    ComplexWithContent: ComplexWithContent | null = null;

    @DataModel(ComplexObject)
    @TableView('TableTitle')
    ComplexTable: ComplexObject | null = null;

    @DataModel(MultilevelComplexObject)
    MultiLevelComplexObject: MultilevelComplexObject | null = null;

    @DataModel(BigComplexObject)
    @TableView('BigTableTitle')
    BigComplexTable: BigComplexObject | null = null;

    @DataModel(ComplexObject)
    @DataType(ComplexType.Enumerable)
    ListComplexObject: ComplexObject[] | null = null;

    @DataModel(ComplexObject)
    @DataType(ComplexType.Enumerable)
    @TableView({
        Reorderable: true,
        Selectable: true,
        MultipleSelect: true
    })
    ListTableView: ComplexObject[] | null = null;
}
