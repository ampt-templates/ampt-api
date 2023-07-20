import { CoreValidator, } from "../core/validator.js";
export class BaseValidator extends CoreValidator {
    constructor() {
        super(...arguments);
        this._parent = undefined;
    }
    setupClone(clean, clone) {
        const ret = clone;
        if (!clean)
            ret._parent = this;
        return ret;
    }
}
export class InternalBaseValidator extends BaseValidator {
    constructor() {
        super(...arguments);
        // CoreValidator
        this._annotations = undefined;
        // BaseValidator
        this._parent = undefined;
    }
}
export function exposeBaseValidator(validator) {
    return validator;
}
