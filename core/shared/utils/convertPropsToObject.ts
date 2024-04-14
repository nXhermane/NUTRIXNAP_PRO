import { Entity, ValueObject } from "./../domain";
function isEntity(obj: unknown): obj is Entity<unknown> {
    /**
     * 'instanceof Entity' causes error here for some reason.
     * Probably creates some circular dependency. This is a workaround
     * until I find a solution :)
     */
    return (
        Object.prototype.hasOwnProperty.call(obj, "toObject") &&
        Object.prototype.hasOwnProperty.call(obj, "id") &&
        ValueObject.isValueObject((obj as Entity<unknown>).id)
    );
}

function convertToPlainObject(item: any): any {
    if (ValueObject.isValueObject(item)) {
        return item.unpack();
    }
    if (isEntity(item)) {
        return item.toObject();
    }
    return item;
}

export function convertPropsToObject(props: any): any {
    const propsCopy = structuredClone(props);

    // eslint-disable-next-line guard-for-in
    for (const prop in propsCopy) {
        if (Array.isArray(propsCopy[prop])) {
            propsCopy[prop] = (propsCopy[prop] as Array<unknown>).map(item => {
                return convertToPlainObject(item);
            });
        }
        propsCopy[prop] = convertToPlainObject(propsCopy[prop]);
    }

    return propsCopy;
}
