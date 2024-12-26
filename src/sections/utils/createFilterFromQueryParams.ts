import { Operator } from "../../modules/shared/domain/criteria/FilterOperators";

export const createFilterFromQueryParams = (params: { [x: string]: string }) => Object.entries(params)
    .filter(([_, value]) => typeof value === 'string' && value !== '')
    .map(([field, value]) => ({ field, operator: Operator.EQUAL, value }))