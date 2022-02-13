export default interface BaseSchema {
    type: string,
    name: string,
    width: string,
    height: string,

    isContainer: boolean,
    children?: BaseSchema[],

    [propName: string]: string | number | boolean | undefined | BaseSchema[];
}
