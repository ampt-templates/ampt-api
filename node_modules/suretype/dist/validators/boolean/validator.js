import { ValueValidator } from "../value/validator.js";
export class BooleanValidator extends ValueValidator {
    constructor() {
        super(...arguments);
        this.type = "boolean";
    }
    const(value) {
        return super.const(value);
    }
    enum(...values) {
        return super.enum(...values);
    }
    toSchema(traverser) {
        return {
            type: "boolean",
            ...this.getJsonSchemaObject(traverser),
        };
    }
    clone(clean = false) {
        return this.setupClone(clean, new BooleanValidator());
    }
}
