export default interface ComponentDefine {
    type: string,
    name: string,
    virtualElement?: boolean,
    container?: boolean,
    width: string,
    height: string,
    children?: ComponentDefine[]
}
