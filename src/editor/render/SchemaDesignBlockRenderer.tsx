import BaseSchema from "../../schema/BaseSchema";
import {convert, SchemaDesignBlock} from "../define/SchemaDesignBlock";
import React, {ReactElement, ReactNode} from "react";
import {Button} from "antd";
import {ContainerComponentRenderWrapper} from "./ContainerComponentRenderWrapper";

export class SchemaDesignBlockRenderer {

    get schema(): BaseSchema | undefined {
        return this._schema;
    }

    set schema(value: BaseSchema | undefined) {
        this._schema = value;
        this.update();
    }

    private _schema?: BaseSchema;

    private schemaDesignBlock?: SchemaDesignBlock;

    constructor(initSchema?: BaseSchema) {
        this.schema = initSchema;
    }

    update() {
        this.schemaDesignBlock = convert(this.schema);
    }

    renderDesignBlock() {
        if (!this.schemaDesignBlock) {
            return undefined;
        }
        return SchemaDesignBlockRenderer.renderBlockInner(
            this.schemaDesignBlock, '/' + this.schemaDesignBlock.type);
    }

    private static renderBlockInner(block: SchemaDesignBlock, path: string): ReactNode {
        if (!block) {
            return undefined;
        }

        const children = block.children;
        let blockComp;
        if (!block.isContainer || !children || children.length === 0) {
            blockComp = block.component(block);
        } else {
            const wrapperChildren = children.map((child, idx) => {
                const childPath = path + '/' + child.type + '_' + idx;
                return SchemaDesignBlockRenderer.renderBlockInner(child, childPath);
            });
            blockComp = React.cloneElement(block.component(block), {}, wrapperChildren);
        }

        return (
            <div className={'wrapper-block'}
                 key={path}
                 data-path={path}
                 data-for={block.type}
                 style={{
                     width: block.width,
                     height: block.height
                 }}
            >
                {blockComp}
            </div>
        );
    }

}
