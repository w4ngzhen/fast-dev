import {BaseMapper} from "../BaseMapper";
import {SchemaDesignBlock} from "../../define/SchemaDesignBlock";
import {CSSProperties} from "react";
import {Input} from "antd";

export class InputMapper implements BaseMapper {
    type: string = 'input';

    mapComponent(blockInfo: SchemaDesignBlock): JSX.Element {
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
