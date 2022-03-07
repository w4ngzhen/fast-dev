export interface ElementNode {
    /**
     * Element 唯一类型type
     */
    type: string;
    /**
     * 组件的各种属性：
     * 扩展的、UI的
     */
    [props: string]: string | number | any
    /**
     * Element 对应的事件属性
     */
    event?: {
        [eventName: string]: string
    };
    /**
     * Element 的所有子元素
     */
    children?: ElementNode[]
}
