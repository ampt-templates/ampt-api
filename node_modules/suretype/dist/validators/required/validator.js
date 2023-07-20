import { BaseValidator } from "../base/validator.js";
import { validatorType, cloneValidator } from "../../validation.js";
export class RequiredValidator extends BaseValidator {
    constructor(validator) {
        super();
        this.validator = validator;
    }
    get type() {
        return validatorType(this.validator);
    }
    toSchema(traverser) {
        return {
            ...super.getJsonSchemaObject(traverser),
            ...traverser.visit(this.validator)
        };
    }
    clone(clean = false) {
        const clonedInner = cloneValidator(this.validator, clean);
        return new RequiredValidator(clonedInner);
    }
}
export class InternalRequiredValidator extends RequiredValidator {
}
export function isRequired(validator) {
    return validator instanceof RequiredValidator;
}
export function extractRequiredValidator(validator) {
    return validator instanceof RequiredValidator
        ? validator.validator
        : validator;
}
