import {useEffect, useState} from "react";
import {ElementRenderer} from "../renderer/ElementRenderer";
import {ElementNode} from "../ElementNode";
import _ from "lodash";
import DataUtils from "../../utils/DataUtils";
import {INPUT_CHANGE_EVENT, InputValueChangeEvent} from "../event/InputChangeEvent";

export function useRenderer(initElementNode: ElementNode) {
    const [elementRenderer] = useState(new ElementRenderer());
    const [elementNode, setElementNode] = useState<ElementNode>(initElementNode);
    useEffect(() => {
        const func = function (e: Event) {
            const ce = e as InputValueChangeEvent;
            const path = ce.detail.path || '';
            const value = ce.detail.value || '';
            const [, ...others] = path.split('/').filter((pName: string) => !_.isEmpty(pName));
            const clonedEleNode = _.cloneDeep(elementNode);
            const schemaNodes =
                DataUtils.getDescendantSchemaNodeListByPathNodes(clonedEleNode, others, true);
            // 最后一个元素就是对应元素
            const target = schemaNodes[schemaNodes.length - 1];
            _.set(target, 'ui.value', value);
            setElementNode(clonedEleNode);
        }
        window.addEventListener(INPUT_CHANGE_EVENT, func)
        return () => {
            window.removeEventListener(INPUT_CHANGE_EVENT, func)
        };
    })
    return {elementRenderer, elementNode};
}
