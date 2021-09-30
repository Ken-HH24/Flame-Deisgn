interface IClassNameObject {
    [key: string]: any;
}

type classTypes = IClassNameObject | string | undefined | null;

const classNames = (...classNameObjects: classTypes[]): string => {
    const classes: string[] = [];
    for (const classObj of classNameObjects){
        if (typeof classObj === 'string') {
            classes.push(classObj);
        } else if (typeof classObj === 'object') {
            for (const [key, value] of Object.entries(classObj!)) {
                if (value) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}

export default classNames;