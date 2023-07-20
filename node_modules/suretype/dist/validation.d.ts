import type { AnyType } from "./validators/types.js";
import { CoreValidator, TreeTraverser } from "./validators/core/validator.js";
export declare function validatorToSchema<T extends CoreValidator<unknown>>(validator: T, traverser: TreeTraverser): any;
export declare function validatorType<T extends CoreValidator<unknown>>(validator: T): AnyType;
export declare function cloneValidator<T extends CoreValidator<unknown>>(validator: T, clean: boolean): T;
export declare function attachSchemaToValidator<Fn extends Function>(validator: Fn, schema: CoreValidator<unknown>): typeof validator;
export declare function getValidatorSchema(val: any): CoreValidator<unknown> | undefined;
export declare function uniqValidators(validators: Array<CoreValidator<unknown>>): typeof validators;
