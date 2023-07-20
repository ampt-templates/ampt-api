import type * as Ajv from "ajv";
import { SuretypeOptions } from "./options.js";
export type ErrorHook = (err: ValidationError) => void;
export declare function setErrorHook(fn?: ErrorHook | undefined): void;
export interface ValidationErrorData {
    errors: Array<Ajv.ErrorObject>;
    explanation?: string;
}
export interface ValidationResultInvalid extends ValidationErrorData {
    ok: false;
}
export interface ValidationResultValid {
    ok: true;
    errors?: Array<Ajv.ErrorObject>;
    explanation?: string;
}
export type ValidationResult = ValidationResultInvalid | ValidationResultValid;
export interface ExplanationOptions extends SuretypeOptions {
    schema: unknown;
    data: unknown;
    noFallback?: boolean;
}
export declare class ValidationError extends Error implements ValidationErrorData {
    errors: Array<Ajv.ErrorObject>;
    explanation: string;
    constructor(errors: Array<Ajv.ErrorObject>, options: ExplanationOptions);
}
export declare function makeExplanationGetter<T extends {}, P extends string>(target: T, property: P, errors: Array<Ajv.ErrorObject>, options: ExplanationOptions): T & {
    [p in P]: string;
};
