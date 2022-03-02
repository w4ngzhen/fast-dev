import {SchemaDesignBlock} from "../define/SchemaDesignBlock";
import {PageMapper} from "./impl/PageMapper";
import {PanelMapper} from "./impl/PanelMapper";
import {ButtonMapper} from "./impl/ButtonMapper";
import {InputMapper} from "./impl/InputMapper";

export interface BaseMapper {
    type: string;
    mapComponent: (blockInfo: SchemaDesignBlock) => JSX.Element
}

const list = [
    new PageMapper(),
    new PanelMapper(),
    new ButtonMapper(),
    new InputMapper()
];

const MAPPER_RECORDS: Record<string, BaseMapper> = {};
list.forEach(item => {
    MAPPER_RECORDS[item.type] = item;
})

export {MAPPER_RECORDS};

