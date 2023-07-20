import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export class AnyOfValidator extends BaseValidator {
    constructor(validators) {
        super();
        this.validators = validators;
        this.type = "any-of";
        if (validators.length === 0)
            throw new RangeError("any-of validators must have at least 1 item");
    }
    required() {
        return new RequiredValidator(this);
    }
    toSchema(traverser) {
        return {
            ...super.getJsonSchemaObject(traverser),
            anyOf: this.validators.map(validator => traverser.visit(validator))
        };
    }
    clone(clean = false) {
        return this.setupClone(clean, new AnyOfValidator(this.validators));
    }
}
