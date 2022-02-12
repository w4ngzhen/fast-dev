export default interface BaseSchema {
    type: string,
    name: string,
    container?: boolean,
    width: string,
    height: string,
    children?: BaseSchema[],

    [propName: string]: string | number | boolean | undefined | BaseSchema[];
}
