import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export class RecursiveValidator extends BaseValidator {
    constructor() {
        super(...arguments);
        this.type = 'recursive';
    }
    required() {
        return new RequiredValidator(this);
    }
    toSchema(traverser) {
        return {
            $ref: `#/definitions/${traverser.currentSchemaName}`,
            ...this.getJsonSchemaObject(traverser),
        };
    }
    clone(clean = false) {
        return super.setupClone(clean, new RecursiveValidator());
    }
}
