import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export class AllOfValidator extends BaseValidator {
    constructor(validators) {
        super();
        this.validators = validators;
        this.type = "all-of";
        if (validators.length === 0)
            throw new RangeError("all-of validators must have at least 1 item");
    }
    required() {
        return new RequiredValidator(this);
    }
    toSchema(traverser) {
        return {
            ...super.getJsonSchemaObject(traverser),
            allOf: this.validators.map(validator => traverser.visit(validator))
        };
    }
    clone(clean = false) {
        return this.setupClone(clean, new AllOfValidator(this.validators));
    }
}
