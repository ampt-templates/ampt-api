import Ajv from "ajv";
import { ValidationError, makeExplanationGetter, } from "./validation-error.js";
import { extractSingleJsonSchema } from "./extract-json-schema.js";
import { attachSchemaToValidator } from "./validation.js";
import { getRaw } from "./validators/raw/validator.js";
function validateWrapper(value, validator, opts) {
    const ok = validator(value);
    if (ok)
        return { ok: true };
    const ret = {
        ok: false,
        errors: [...validator.errors],
    };
    return makeExplanationGetter(ret, 'explanation', ret.errors, {
        schema: validator.schema,
        data: value,
        colors: opts === null || opts === void 0 ? void 0 : opts.colors,
        noFallback: true,
    });
}
// Compile JSON Schemas and validate data
export function compileSchema(schema, opts = {}) {
    const { ajvOptions = {} } = opts;
    const ajv = new Ajv(ajvOptions);
    const validator = ajv.compile(schema);
    return function validate(value) {
        return validateWrapper(value, validator, opts);
    };
}
export function validateSchema(schema, value) {
    const validator = compileSchema(schema);
    return validator(value);
}
export function compile(schema, opts = {}) {
    const { ajvOptions = {}, colors } = opts;
    const validator = innerCompile(ajvOptions, schema);
    function validate(value) {
        const res = validateWrapper(value, validator, opts);
        if (!opts.ensure && !opts.simple)
            return res;
        else if (opts.simple)
            return res.ok;
        else if (res.ok)
            return value;
        else
            throw new ValidationError(res.errors, { schema, data: value, colors });
    }
    return attachSchemaToValidator(validate, schema);
}
export function validate(schema, value, options) {
    const validator = compile(schema, options);
    return validator(value);
}
export function isValid(schema, value, options) {
    const validator = compile(schema, { ...options, simple: true });
    return validator(value);
}
export function ensure(schema, value, options) {
    const validator = compile(schema, { ...options, ensure: true });
    return validator(value);
}
function innerCompile(options, validator) {
    const ajv = new Ajv(options);
    const raw = getRaw(validator);
    if (raw && raw.fragment) {
        const { fragment } = raw;
        ajv.addSchema(raw.toSchema());
        const validatorFn = ajv.getSchema(`#/definitions/${fragment}`);
        if (!validatorFn)
            throw new ReferenceError(`No such fragment "${fragment}"`);
        return validatorFn;
    }
    else {
        return ajv.compile(extractSingleJsonSchema(validator).schema);
    }
}
// Compile and validate JSON Schemas themselves
let _schemaDraft07 = undefined;
export function setSchemaDraft07(draft) {
    _schemaDraft07 = draft;
}
let _jsonSchemaValidator;
function getJsonSchemaValidator() {
    if (!_jsonSchemaValidator)
        _jsonSchemaValidator = compileSchema(_schemaDraft07);
    return _jsonSchemaValidator;
}
export function validateJsonSchema(schema) {
    const validator = getJsonSchemaValidator();
    return validator(schema);
}
