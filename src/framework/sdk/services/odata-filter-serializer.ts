import { CombinedFilter } from "../filters/combined-filter";
import { FilterClause, FilterOperators, StringOperators } from "../filters/filter-clause";
import { RelationFilter } from "../filters/relation-filter";
import { ServiceMetadata } from "../service-metadata";

export class ODataFilterSerializer {
    propertyPrefix: string;
    lambdaVariableName: string;
    constructor(propertyPrefix: string = "", lambdaVariableName: string = "x") {
        this.propertyPrefix = propertyPrefix;
        this.lambdaVariableName = lambdaVariableName;
    }

    serialize(filterContext: FilterContext): string | null {
        if (filterContext.Filter.hasOwnProperty("ChildFilters")) {
            return this.serializeCombinedFilter(<any>filterContext.Filter, filterContext);
        } else if (filterContext.Filter.hasOwnProperty("FieldName")) {
            return this.serializeFilterClause(<any>filterContext.Filter, filterContext)
        } else if (filterContext.Filter.hasOwnProperty("Name")) {
            return this.serializeRelationFilter(<any>filterContext.Filter, filterContext);
        }

        return null;
    }

    private serializeCombinedFilter(filter: CombinedFilter, filterContext: FilterContext): string | null {
        if (filter.ChildFilters.length === 0)
            return null;

        let serializedChildFilters = filter.ChildFilters.map((x => {
            if (x.hasOwnProperty("FieldName")) {
                return this.serializeFilterClause(<any>x, filterContext);
            } else if (x.hasOwnProperty("ChildFilters")) {
                let serializedFilter = this.serializeCombinedFilter(<any>x, filterContext);
                if (serializedFilter)
                    serializedFilter = `(${serializedFilter})`;

                return serializedFilter;
            } else if (x.hasOwnProperty("Name")) {
                return this.serializeRelationFilter(<any>x, filterContext);
            }

            return null;
        })).filter(x => x);

        if (serializedChildFilters.length === 1 && filter.Operator != "NOT") {
            return serializedChildFilters[0];
        }

        if (filter.Operator == "NOT") {
            return `(not ${serializedChildFilters[0]})`;
        }

        serializedChildFilters = serializedChildFilters.map(x => {
            if (!x) return null;

            if (x.startsWith("(") && x.endsWith(")"))
                return x;

            return `(${x})`;
        }).filter(x => x);

        return serializedChildFilters.join(` ${filter.Operator.toLowerCase()}`);
    }

    private serializeFilterClause(filter: FilterClause, filterContext: FilterContext): string | null {
        var fieldNameWithPrefix = `${this.propertyPrefix}${filter.FieldName}`;
        switch (filter.Operator)
        {
            case FilterOperators.Equal:
            case FilterOperators.NotEqual:
            case FilterOperators.GreaterThan:
            case FilterOperators.LessThan:
            case FilterOperators.GreaterThanOrEqual:
            case FilterOperators.LessThanOrEqual:
                const serializedValue = this.serializeFilterValue(filter.FieldValue, filter.FieldName, filterContext);
                return `(${filter.FieldName} ${filter.Operator} ${serializedValue})`;
            case FilterOperators.ContainsOr:
            case FilterOperators.DoesNotContain:
                var serializedValues = this.serializeFilterValuesArray(filter.FieldValue, filter.FieldName, filterContext);
                if (serializedValues.length > 0) {
                    var serialziedValuesAsString = "";
                    if (ServiceMetadata.isPropertyACollection(filterContext.Type, filter.FieldName)) {
                        serialziedValuesAsString = serializedValues.map(x => `${this.lambdaVariableName} eq ${x}`).join(" or ");
                        serialziedValuesAsString = `${fieldNameWithPrefix}/any(x: ${serialziedValuesAsString})`;
                    }
                    else {
                        serialziedValuesAsString = serializedValues.map(x => `${fieldNameWithPrefix} eq ${x}`).join(" or ");
                    }

                    if (filter.Operator == FilterOperators.DoesNotContain)
                        serialziedValuesAsString = "not " + serialziedValuesAsString;

                    return serialziedValuesAsString;
                }

                return null;
            case FilterOperators.ContainsAnd:
                var serializedValues2 = this.serializeFilterValuesArray(filter.FieldValue, filter.FieldName, filterContext)
                    .map(x => `${fieldNameWithPrefix}/any(${this.lambdaVariableName}: ${this.lambdaVariableName} eq ${x})`);

                if (serializedValues2.length > 0) {
                    var serialziedValuesAsString = serializedValues2.join(" and ");
                    return serialziedValuesAsString;
                }

                return null;
            case StringOperators.StartsWith:
            case StringOperators.EndsWith:
            case StringOperators.Contains:
                var serializedValueForString = this.serializeFilterValue(filter.FieldValue, filter.FieldName, filterContext);
                return `${filter.Operator}(${fieldNameWithPrefix}, ${serializedValueForString})`;
            default:
                throw new Error(`The value provided for the operator filter clause: ${filter.Operator} is not supported`);
        }
    }

    private serializeRelationFilter(filter: RelationFilter, filterContext: FilterContext): string | null {
        var relatedType = ServiceMetadata.getRelatedType(filterContext.Type, filter.Name);
        if (!relatedType)
            return null;

        var newFilterContext: FilterContext = {
            Type: relatedType,
            Filter: filter.ChildFilter
        };

        var serializedChildFilter = new ODataFilterSerializer("y/", "y").serialize(newFilterContext);
        switch (filter.Operator) {
            case "Any":
                return `${filter.Name}/any(y:${serializedChildFilter})`;
            case "All":
                return `${filter.Name}/all(y:${serializedChildFilter})`;
        }

        return null;
    }

    private serializeFilterValue(value: any, propName: string, filterContext: FilterContext) {
        return ServiceMetadata.serializeFilterValue(filterContext.Type, propName, value);
    }

    private serializeFilterValuesArray(value: any, propName: string, filterContext: FilterContext): string[] {
        if (typeof value === 'string')
            return [value];

        if (Array.isArray(value)) {
            return value.map(x => this.serializeFilterValue(x, propName, filterContext))
        }

        return this.serializeFilterValue(value, propName, filterContext);
    }
}


interface FilterContext {
    Filter: FilterClause | CombinedFilter | RelationFilter;
    Type: string;
}
