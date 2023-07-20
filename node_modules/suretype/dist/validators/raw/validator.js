import { CoreValidator } from "../core/validator.js";
import { extractRequiredValidator, RequiredValidator, } from "../required/validator.js";
export class RawValidator extends CoreValidator {
    constructor(jsonSchema, fragment) {
        super();
        this.jsonSchema = jsonSchema;
        this.fragment = fragment;
        this.type = 'raw';
    }
    toSchema() {
        return this.jsonSchema;
    }
    required() {
        return new RequiredValidator(this);
    }
    clone(_clean = false) {
        return new RawValidator(JSON.parse(JSON.stringify(this.jsonSchema)));
    }
}
export function isRaw(validator) {
    return validator instanceof RawValidator;
}
export function getRaw(validator) {
    validator = extractRequiredValidator(validator);
    return isRaw(validator) ? validator : undefined;
}
