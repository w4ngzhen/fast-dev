export interface ElementNode {
    /**
     * Element 唯一类型type
     */
    type: string;
    /**
     * Element 对应的UI属性
     */
    ui?: {
        [uiProp: string]: string | number
    };
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

    /**
     * 可自由扩展的属性
     */
    [props: string]: string | any
}

/**
 * 定义属于容器的元素
 */
const CONTAINERS = ['page', 'panel', 'tabs', 'tabPane', 'table']
export {CONTAINERS}
