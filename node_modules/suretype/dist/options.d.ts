export interface SuretypeOptions {
    /**
     * Use colors (if available) if true, or disable colors if false
     */
    colors?: boolean;
    /**
     * Include (if possible) the location of the error using a pretty-printed
     * code-frame.
     *
     * Defaults to `true`
     */
    location?: boolean;
    /**
     * When pretty-printing (if `location` is enabled), print big numbers
     * before each error if there are multiple errors.
     *
     * Defaults to `true` in Node.js (if location is enabled) and `false`
     * otherwise.
     */
    bigNumbers?: boolean;
}
export declare function setSuretypeOptions(suretypeOptions: SuretypeOptions): void;
export declare function getSuretypeOptions(): SuretypeOptions;
