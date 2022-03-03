import {useEffect, useState} from "react";
import {ElementNode} from "../ElementNode";
import _ from "lodash";
import DataUtils from "../../utils/DataUtils";
import {INPUT_VALUE_CHANGE_EVENT, InputValueChangeEvent} from "../event/InputChangeEvent";
import {WrapperRenderer} from "../wrapper/WrapperRenderer";
import {ElementNodeManager} from "../ElementNodeManager";

export function useRenderer(initElementNode: ElementNode) {
    const [wrapperRenderer] = useState(new WrapperRenderer());
    const [elementNode, setElementNode] = useState<ElementNode>(initElementNode);
    ElementNodeManager.init((node) => {
        setElementNode(node);
    })
    useEffect(() => {
        const onInputValueChange = function (e: Event) {
            const ce = e as InputValueChangeEvent;
            const path = ce.detail.path || '';
            const value = ce.detail.value || '';
            const clonedEleNode = _.cloneDeep(elementNode);
            const targetEleNode = DataUtils.getElementNodeByPath(clonedEleNode, path);
            _.set(targetEleNode, 'ui.value', value);

            setElementNode(clonedEleNode);
        }
        window.addEventListener(INPUT_VALUE_CHANGE_EVENT, onInputValueChange)
        return () => {
            window.removeEventListener(INPUT_VALUE_CHANGE_EVENT, onInputValueChange)
        };
    })
    const rootComp = wrapperRenderer.renderElementNode(elementNode, '/' + elementNode.type);
    return rootComp;
}
