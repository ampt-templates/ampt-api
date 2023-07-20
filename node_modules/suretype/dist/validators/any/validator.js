import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export class AnyValidator extends BaseValidator {
    constructor() {
        super(...arguments);
        this.type = "any";
    }
    required() {
        return new RequiredValidator(this);
    }
    toSchema(traverser) {
        return {
            ...super.getJsonSchemaObject(traverser),
        };
    }
    clone(clean = false) {
        return this.setupClone(clean, new AnyValidator());
    }
}
