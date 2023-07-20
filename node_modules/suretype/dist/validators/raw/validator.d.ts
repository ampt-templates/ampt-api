import { CoreValidator } from "../core/validator.js";
import { RequiredValidator } from "../required/validator.js";
import { AnyType } from "../types.js";
export declare class RawValidator extends CoreValidator<unknown> {
    private jsonSchema;
    readonly fragment?: string | undefined;
    protected type: AnyType;
    constructor(jsonSchema: any, fragment?: string | undefined);
    toSchema(): any;
    required(): RequiredValidator<unknown, this>;
    protected clone(_clean?: boolean): this;
}
export declare function isRaw(validator: CoreValidator<unknown>): boolean;
export declare function getRaw(validator: CoreValidator<unknown>): RawValidator | undefined;
