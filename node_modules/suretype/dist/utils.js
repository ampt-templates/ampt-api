const empty = {};
export function objectOf(value, key) {
    if (value === undefined)
        return empty;
    return { [key]: value };
}
