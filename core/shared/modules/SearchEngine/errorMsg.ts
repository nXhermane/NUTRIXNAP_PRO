export const EXTENDED_SEARCH_UNAVAILABLE = "Extended search is not available";

export const LOGICAL_SEARCH_UNAVAILABLE = "Logical search is not available";

export const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";

export const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key: any) => `Invalid value for key ${key}`;

export const PATTERN_LENGTH_TOO_LARGE = (max: number) => `Pattern length exceeds max of ${max}.`;

export const MISSING_KEY_PROPERTY = (name: string) => `Missing ${name} property in key`;

export const INVALID_KEY_WEIGHT_VALUE = (key: any) => `Property 'weight' in key '${key}' must be a positive integer`;
