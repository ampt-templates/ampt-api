import "./json-schema-nodejs.js";
import "./ajv-errors-nodejs.js";
export * from "./index-core.js";
// Patch the ValidationError to make Node.js console printing prettier
import { inspect } from "node:util";
import { setErrorHook, ValidationError } from "./validation-error.js";
ValidationError.prototype[inspect.custom] = function () {
    return this.explanation;
};
const debouncedExplanations = new WeakSet();
setErrorHook((err) => {
    const { message, stack } = err;
    Object.defineProperties(err, {
        message: {
            get() {
                if (debouncedExplanations.has(this))
                    return message;
                debouncedExplanations.add(this);
                setImmediate(() => debouncedExplanations.delete(this));
                return message + "\n" + this.explanation;
            }
        },
        stack: {
            get() {
                if (debouncedExplanations.has(this))
                    return stack;
                debouncedExplanations.add(this);
                setImmediate(() => debouncedExplanations.delete(this));
                return this.explanation + "\n" + stack;
            }
        },
    });
});
