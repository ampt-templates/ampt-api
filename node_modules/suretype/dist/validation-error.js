import { getPrettify } from "./ajv-errors.js";
import { getSuretypeOptions } from "./options.js";
let errorHook = undefined;
export function setErrorHook(fn) {
    errorHook = fn;
}
export class ValidationError extends Error {
    constructor(errors, options) {
        super('Validation failed');
        this.errors = errors;
        makeExplanationGetter(this, 'explanation', errors, options);
        errorHook === null || errorHook === void 0 ? void 0 : errorHook(this);
    }
}
function makeExplanation(errors, { schema, data, colors = getSuretypeOptions().colors, location = getSuretypeOptions().location, bigNumbers = getSuretypeOptions().bigNumbers, noFallback = false }) {
    var _a;
    if (schema && typeof schema === 'object') {
        try {
            return getPrettify()({
                errors,
                schema,
                data,
                colors,
                location,
                bigNumbers,
            });
        }
        catch (err) {
            console.error(err === null || err === void 0 ? void 0 : err.stack);
            return (_a = err.message) !== null && _a !== void 0 ? _a : 'Unknown error';
        }
    }
    else if (!noFallback)
        return JSON.stringify(errors, null, 2);
    else
        return undefined;
}
export function makeExplanationGetter(target, property, errors, options) {
    let cache = undefined;
    Object.defineProperty(target, property, {
        get() {
            if (cache !== undefined)
                return cache;
            cache = makeExplanation(errors, options);
            return cache;
        }
    });
    return target;
}
