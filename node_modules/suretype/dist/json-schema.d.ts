import Ajv from "ajv";
import { CoreValidator } from "./validators/core/validator.js";
import { TypeOf } from "./validators/functional.js";
import { ValidationResult } from "./validation-error.js";
export declare function compileSchema(schema: {}, opts?: CompileOptionsCore): (value: any) => ValidationResult;
export declare function validateSchema(schema: {}, value: any): ValidationResult;
export interface CompileOptionsCore {
    /**
     * Ajv options
     */
    ajvOptions?: Ajv.Options;
    /**
     * Use colors or disable colors for this validator (will fallback to the
     * default set using `setSuretypeOptions`)
     */
    colors?: boolean;
}
export interface CompileOptionsBase extends CompileOptionsCore {
    /**
     * If true, the validator function will not return {ok: boolean} but will
     * return the payload if it validates, or throw a ValidationError
     * otherwise.
     */
    ensure?: boolean;
    /**
     * If true, the validator function will return true if the data was valid,
     * and false other.
     * This value can be used in conditionals to provide deduced types.
     */
    simple?: boolean;
}
export interface CompileOptionsDefault extends CompileOptionsBase {
    ensure?: false;
    simple?: false;
}
export interface CompileOptionsEnsure extends CompileOptionsBase {
    ensure: true;
    simple?: never;
}
export interface CompileOptionsSimple extends CompileOptionsBase {
    ensure?: never;
    simple: true;
}
export type ValidateFunction = (value: any) => ValidationResult;
export type SimpleValidateFunction<T> = (value: any) => value is T;
export type EnsureFunction<T> = <U = T>(value: any) => T extends U ? U : never;
export declare function compile<T extends CoreValidator<unknown> = any, U = TypeOf<T>>(schema: T, opts: CompileOptionsEnsure): TypeOf<T> extends U ? EnsureFunction<U> : never;
export declare function compile<T extends CoreValidator<unknown> = any>(schema: T, opts: CompileOptionsSimple): SimpleValidateFunction<TypeOf<T>>;
export declare function compile<T extends CoreValidator<unknown>>(schema: T, opts?: CompileOptionsDefault): ValidateFunction;
export declare function validate<T extends CoreValidator<unknown>>(schema: T, value: any, options?: CompileOptionsCore): ValidationResult;
export declare function isValid<T extends CoreValidator<unknown>>(schema: T, value: any, options?: CompileOptionsCore): value is TypeOf<T, false>;
export declare function ensure<T extends CoreValidator<unknown>>(schema: T, value: any, options?: CompileOptionsCore): TypeOf<T, false> extends infer T_1 ? T_1 extends TypeOf<T, false> ? T_1 extends TypeOf<T, false> ? TypeOf<T, false> : never : never : never;
export declare function setSchemaDraft07(draft: any): void;
export declare function validateJsonSchema(schema: {}): ValidationResult;
