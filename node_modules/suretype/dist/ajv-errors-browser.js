import { prettify } from "awesome-ajv-errors/plain";
import { styledPrettify } from "awesome-ajv-errors/try-styled";
import { setPrettify } from "./ajv-errors.js";
import { getSuretypeOptions, setSuretypeOptions } from "./options.js";
setPrettify(prettify);
styledPrettify.then(prettify => {
    var _a, _b, _c;
    // Coerce stylings to true (unless already configured by the user)
    const opts = getSuretypeOptions();
    opts.colors = (_a = opts.colors) !== null && _a !== void 0 ? _a : true;
    opts.location = (_b = opts.location) !== null && _b !== void 0 ? _b : true;
    opts.bigNumbers = (_c = opts.bigNumbers) !== null && _c !== void 0 ? _c : true;
    setSuretypeOptions(opts);
    setPrettify(prettify);
});
