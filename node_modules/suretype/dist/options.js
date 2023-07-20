let _colors = undefined;
let _location = undefined;
let _bigNumbers = undefined;
export function setSuretypeOptions(suretypeOptions) {
    _colors = suretypeOptions.colors;
    _location = suretypeOptions.location;
    _bigNumbers = suretypeOptions.bigNumbers;
}
export function getSuretypeOptions() {
    return {
        colors: _colors,
        location: _location,
        bigNumbers: _bigNumbers,
    };
}
