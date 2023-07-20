import { AnyType } from "../types.js";
import { CoreValidator, TreeTraverser } from "../core/validator.js";
import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export declare class AnyOfValidator<T> extends BaseValidator<T, AnyOfValidator<T>> {
    private validators;
    protected type: AnyType;
    constructor(validators: ReadonlyArray<CoreValidator<T>>);
    required(): RequiredValidator<T, this>;
    protected toSchema(traverser: TreeTraverser): {
        anyOf: any[];
        examples?: string[] | undefined;
        description?: string | undefined;
        title?: string | undefined;
    };
    protected clone(clean?: boolean): this;
}
