import {BaseMapper} from "../BaseMapper";
import {SchemaDesignBlock} from "../../define/SchemaDesignBlock";
import {CSSProperties} from "react";

export class PageMapper implements BaseMapper {

    type: string = 'page';

    mapComponent(blockInfo: SchemaDesignBlock): JSX.Element {
        let style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }

        if (blockInfo.isSelected) {
            style.outline = '1px solid #5aa7dc'
        }

        return <div style={style}/>
    }

}
