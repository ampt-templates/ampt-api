import { CoreValidator, exposeCoreValidator, } from "./validators/core/validator.js";
import { getRaw } from "./validators/raw/validator.js";
export function validatorToSchema(validator, traverser) {
    return exposeCoreValidator(validator).toSchema(traverser);
}
export function validatorType(validator) {
    return exposeCoreValidator(validator).type;
}
export function cloneValidator(validator, clean) {
    return exposeCoreValidator(validator).clone(clean);
}
const schemaLookup = new WeakMap();
export function attachSchemaToValidator(validator, schema) {
    schemaLookup.set(validator, schema);
    return validator;
}
export function getValidatorSchema(val) {
    if (val && val instanceof CoreValidator)
        return val;
    // Maybe validator function
    if (val && val instanceof Function)
        return schemaLookup.get(val);
    return undefined;
}
export function uniqValidators(validators) {
    validators = [...new Set(validators)];
    return [
        ...new Map(validators.map(validator => {
            const raw = getRaw(validator);
            return raw
                ? [raw.toSchema(), raw]
                : [{}, validator];
        }))
            .values()
    ];
}
