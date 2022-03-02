import {BaseMapper} from "../BaseMapper";
import {SchemaDesignBlock} from "../../define/SchemaDesignBlock";
import {CSSProperties} from "react";
import {Button} from "antd";

export class ButtonMapper implements BaseMapper{
    type: string = 'button';

    mapComponent(blockInfo: SchemaDesignBlock): JSX.Element {
        const style: CSSProperties = {
            width: blockInfo.width,
            height: blockInfo.height,
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <Button style={style} type='primary'>Button</Button>
    }


}
