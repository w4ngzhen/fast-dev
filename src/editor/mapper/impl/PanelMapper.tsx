import {BaseMapper} from "../BaseMapper";
import {SchemaDesignBlock} from "../../define/SchemaDesignBlock";
import {CSSProperties} from "react";

export class PanelMapper implements BaseMapper {
    type: string = 'panel';

    mapComponent(blockInfo: SchemaDesignBlock): JSX.Element {

        const style: CSSProperties = {
            width: blockInfo.width,
            height: blockInfo.height,
            minWidth: '100px',
            minHeight: '100px',
            padding: '5px',
            border: '1px black solid'
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <div style={style}/>
    }


}
