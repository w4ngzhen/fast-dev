export interface RenderBlock {
    componentType: string; // component 对象的的 key，通过该值找到 visual config 中的对应的 component
    top: number; // block 在容器中的 top 位置
    left: number; // block 在容器中的 left 位置
    width: number; // block 组件自身的宽度
    height: number; // block 组件自身的高度
    adjustPosition: boolean; // 添加组件到容器中时是否需要调整位置
    focus: boolean; // 组件是否是选中状态
}
