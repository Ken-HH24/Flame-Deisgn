var classNames = function () {
    var classNameObjects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classNameObjects[_i] = arguments[_i];
    }
    var classes = [];
    for (var _a = 0, classNameObjects_1 = classNameObjects; _a < classNameObjects_1.length; _a++) {
        var classObj = classNameObjects_1[_a];
        if (typeof classObj === 'string') {
            classes.push(classObj);
        }
        else if (typeof classObj === 'object') {
            for (var _b = 0, _c = Object.entries(classObj); _b < _c.length; _b++) {
                var _d = _c[_b], key = _d[0], value = _d[1];
                if (value) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
};
export default classNames;
