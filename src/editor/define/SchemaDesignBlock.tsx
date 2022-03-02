import BaseSchema from "../../schema/BaseSchema";
import {MAPPER_RECORDS} from "../mapper/BaseMapper";

export interface SchemaDesignBlock {
    type: string;
    name: string;
    width?: string;
    height?: string;
    isSelected?: boolean;
    isCanvasPreview?: boolean;
    isContainer?: boolean;
    children?: SchemaDesignBlock[] | undefined;
    component: (blockInfo: SchemaDesignBlock) => JSX.Element;
}

export function convert(schema?: BaseSchema)
    : SchemaDesignBlock | undefined {

    if (!schema) {
        return undefined;
    }

    const mapper = MAPPER_RECORDS[schema.type];
    if (!mapper) {
        console.warn(`type '${schema.type}' not found`);
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
        isContainer: schema.isContainer,
        children: convertedChildren,
        component: (blockInfo) => mapper.mapComponent(blockInfo),
    };

}
