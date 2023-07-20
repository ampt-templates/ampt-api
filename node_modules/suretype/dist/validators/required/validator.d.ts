import { AnyType } from "../types.js";
import { CoreValidator, TreeTraverser } from "../core/validator.js";
import { BaseValidator } from "../base/validator.js";
export declare class RequiredValidator<T, U extends CoreValidator<T>> extends BaseValidator<T, RequiredValidator<T, U>> {
    protected validator: U;
    constructor(validator: U);
    protected get type(): AnyType;
    protected toSchema(traverser: TreeTraverser): any;
    protected clone(clean?: boolean): this;
}
export declare abstract class InternalRequiredValidator extends RequiredValidator<unknown, CoreValidator<unknown>> {
    abstract validator: CoreValidator<unknown>;
}
export declare function isRequired(validator: CoreValidator<unknown>): boolean;
export declare function extractRequiredValidator(validator: CoreValidator<unknown>): CoreValidator<unknown>;
