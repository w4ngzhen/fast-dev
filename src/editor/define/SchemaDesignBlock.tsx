import {Button, Input} from "antd";
import BaseSchema from "../../schema/BaseSchema";
import {CSSProperties} from "react";

export interface SchemaDesignBlock {
    type: string;
    name: string;
    width?: string;
    height?: string;
    isSelected?: boolean;
    isCanvasPreview?: boolean;
    children?: SchemaDesignBlock[] | undefined;
    component: (blockInfo: SchemaDesignBlock) => JSX.Element;
}


const COMPONENTS: Record<string, (blockInfo: SchemaDesignBlock) => JSX.Element> = {

    'page': blockInfo => {

        let style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <div style={style}/>
    },
    'button': blockInfo => {
        const style: CSSProperties = {
            width: blockInfo.width,
            height: blockInfo.height,
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <Button style={style}>Button</Button>
    },
    'panel': blockInfo => {

        const style: CSSProperties = {
            width: blockInfo.width,
            height: blockInfo.height,
            minWidth: '100px',
            minHeight: '100px'
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <div style={style}/>
    },
    'input': blockInfo => {

        const style: CSSProperties = {
            width: blockInfo.width,
            height: blockInfo.height,
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <Input style={style}/>
    }
}

export function convert(schema?: BaseSchema)
    : SchemaDesignBlock | undefined {

    if (!schema) {
        return undefined;
    }

    const componentFunc = COMPONENTS[schema.type];
    if (!componentFunc) {
        return undefined;
    }

    const defChildren = schema.children;
    let convertedChildren: SchemaDesignBlock[] | undefined;
    if (defChildren && defChildren.length > 0) {
        convertedChildren = defChildren
            .map(child => convert(child))
            .filter(child => !!child) as SchemaDesignBlock[];
        // 移除没有经过convert的元素（undefined），但是编译器无法推导，所以需要类型转换
    }

    return {
        type: schema.type,
        name: schema.name,
        width: schema.width,
        height: schema.height,
        children: convertedChildren,

        component: (blockInfo) => componentFunc(blockInfo),
    };

}
