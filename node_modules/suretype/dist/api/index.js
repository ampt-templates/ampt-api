import { CoreValidator } from "../validators/core/validator.js";
import { BaseValidator } from "../validators/base/validator.js";
import { BooleanValidator } from "../validators/boolean/validator.js";
import { NumberValidator } from "../validators/number/validator.js";
import { StringValidator } from "../validators/string/validator.js";
import { NullValidator } from "../validators/null/validator.js";
import { AnyValidator } from "../validators/any/validator.js";
import { ObjectValidator } from "../validators/object/validator.js";
import { ArrayValidator } from "../validators/array/validator.js";
import { TupleValidator } from "../validators/tuple/validator.js";
import { AnyOfValidator } from "../validators/or/validator.js";
import { AllOfValidator } from "../validators/all-of/validator.js";
import { IfValidator } from "../validators/if/validator.js";
import { RawValidator } from "../validators/raw/validator.js";
import { RecursiveValidator } from "../validators/recursive/validator.js";
import { cloneValidator } from "../validation.js";
import { AnnotationsHolder, annotateValidator, getAnnotations, } from "../annotations.js";
export { CoreValidator, BaseValidator, BooleanValidator, NumberValidator, StringValidator, NullValidator, AnyValidator, ObjectValidator, ArrayValidator, TupleValidator, AnyOfValidator, AllOfValidator, IfValidator, RawValidator, RecursiveValidator, };
const string = () => new StringValidator();
const number = () => new NumberValidator();
const object = (obj) => new ObjectValidator(obj);
const tuple = (types) => new TupleValidator(types);
const array = (itemType) => new ArrayValidator(itemType !== null && itemType !== void 0 ? itemType : any());
const arrayOrTuple = ((itemType) => typeof itemType === 'object' && itemType && Array.isArray(itemType)
    ? tuple(itemType)
    : array(itemType));
const boolean = () => new BooleanValidator();
const _null = () => new NullValidator();
const anyOf = (validators) => new AnyOfValidator(validators);
const allOf = (validators) => new AllOfValidator(validators);
const any = () => new AnyValidator();
const unknown = () => new AnyValidator();
const _if = (validator) => new IfValidator(validator);
const recursive = () => new RecursiveValidator();
export const v = {
    string,
    number,
    object,
    array: arrayOrTuple,
    boolean,
    null: _null,
    anyOf,
    allOf,
    if: _if,
    any,
    unknown,
    recursive,
};
/**
 * Cast a recursive value (a value in a recursive type)
 */
export const recursiveCast = (value) => value;
/**
 * Cast a value into a recursive value (inversion of recursiveCast)
 */
export const recursiveUnCast = (value) => value;
export const raw = (jsonSchema, fragment) => new RawValidator(jsonSchema, fragment);
export function retype(validator) {
    return {
        as() {
            return validator;
        }
    };
}
/**
 * Annotate a validator with a name and other decorations
 *
 * @param annotations Annotations
 * @param validator Target validator to annotate
 * @returns Annotated validator
 */
export function suretype(annotations, validator) {
    return annotateValidator(cloneValidator(validator, false), new AnnotationsHolder(annotations));
}
export function annotate(annotations, validator) {
    return annotateValidator(cloneValidator(validator, false), new AnnotationsHolder(annotations));
}
/**
 * Ensures a validator is annotated with a name. This will not overwrite the
 * name of a validator, only ensure it has one.
 *
 * @param name The name to annotate with, unless already annotated
 * @param validator The target validator
 * @returns Annotated validator
 */
export function ensureNamed(name, validator) {
    const annotations = getAnnotations(validator);
    if (annotations === null || annotations === void 0 ? void 0 : annotations.name)
        return validator;
    return annotateValidator(cloneValidator(validator, false), new AnnotationsHolder({ ...annotations, name }));
}
