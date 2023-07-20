export class DuplicateError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, DuplicateError.prototype);
        this.name = this.constructor.name;
    }
}
export class DuplicateConstraintError extends DuplicateError {
    constructor(field) {
        super(`Constraint ${field} already set.`);
        Object.setPrototypeOf(this, DuplicateConstraintError.prototype);
        this.name = this.constructor.name;
    }
}
