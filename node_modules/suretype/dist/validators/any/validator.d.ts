import { AnyType } from "../types.js";
import { TreeTraverser } from "../core/validator.js";
import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export declare class AnyValidator<T extends any | unknown = any> extends BaseValidator<T, AnyValidator<T>> {
    protected type: AnyType;
    required(): RequiredValidator<T, this>;
    protected toSchema(traverser: TreeTraverser): {
        examples?: string[] | undefined;
        description?: string | undefined;
        title?: string | undefined;
    };
    protected clone(clean?: boolean): this;
}
