import { exposeCoreValidator, } from "./validators/core/validator.js";
import { getRaw } from "./validators/raw/validator.js";
export class AnnotationsHolder {
    constructor(options) {
        this.options = options;
    }
}
export function annotateValidator(validator, annotations) {
    exposeCoreValidator(validator)._annotations = annotations;
    return validator;
}
export function getAnnotations(validator) {
    var _a;
    const annotations = (_a = exposeCoreValidator(validator)._annotations) === null || _a === void 0 ? void 0 : _a.options;
    const raw = getRaw(validator);
    if (raw && raw.fragment) {
        if (!(annotations === null || annotations === void 0 ? void 0 : annotations.name))
            return { ...annotations, name: raw.fragment };
    }
    return annotations;
}
export function getName(validator) {
    var _a, _b;
    const name = (_b = (_a = exposeCoreValidator(validator)._annotations) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.name;
    const raw = getRaw(validator);
    if (!name && raw && raw.fragment) {
        return raw.fragment;
    }
    return name;
}
export function getNames(validator) {
    var _a, _b;
    const name = (_b = (_a = exposeCoreValidator(validator)._annotations) === null || _a === void 0 ? void 0 : _a.options) === null || _b === void 0 ? void 0 : _b.name;
    const raw = getRaw(validator);
    const otherNames = raw && raw.fragment
        ? Object.keys(raw.toSchema().definitions)
        : [];
    return name ? [...new Set([name, ...otherNames])] : otherNames;
}
