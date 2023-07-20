import { AnyType } from "../types.js";
import { TreeTraverser } from "../core/validator.js";
import { BaseValidator } from "../base/validator.js";
import { RequiredValidator } from "../required/validator.js";
export declare class RecursiveValidator extends BaseValidator<unknown, RecursiveValidator> {
    protected type: AnyType;
    required(): RequiredValidator<RecursiveValidator, this>;
    protected toSchema(traverser: TreeTraverser): {
        examples?: string[] | undefined;
        description?: string | undefined;
        title?: string | undefined;
        $ref: string;
    };
    protected clone(clean?: boolean): this;
}
