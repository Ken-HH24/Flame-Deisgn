interface IClassNameObject {
    [key: string]: any;
}
declare type classTypes = IClassNameObject | string | undefined | null;
declare const classNames: (...classNameObjects: classTypes[]) => string;
export default classNames;
