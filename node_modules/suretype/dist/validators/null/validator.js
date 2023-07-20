import { ValueValidator } from "../value/validator.js";
export class NullValidator extends ValueValidator {
    constructor() {
        super(...arguments);
        this.type = "null";
    }
    const(value) {
        return super.const(value);
    }
    enum(...values) {
        return super.enum(...values);
    }
    toSchema(traverser) {
        return {
            type: "null",
            ...this.getJsonSchemaObject(traverser),
        };
    }
    clone(clean = false) {
        return this.setupClone(clean, new NullValidator());
    }
}
