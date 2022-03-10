import {useEffect, useState} from "react";
import {ElementNode} from "../ElementNode";
import {
    ELEMENT_FOCUS_EVENT,
    INPUT_VALUE_CHANGE_EVENT, ElementFocusEvent,
    InputValueChangeEvent,
    TABS_KEY_CHANGE_EVENT,
    TabsKeyChangeEvent, ElementBlurEvent, ELEMENT_BLUR_EVENT
} from "../event/inner/InnerEvent";
import {WrapperRenderer} from "../wrapper/WrapperRenderer";
import {ElementNodeManager} from "../manager/ElementNodeManager";
import {EventManager} from "../manager/EventManager";

export interface RendererProps {
    initElementNode: ElementNode;
    onElementNodeChange?: (eleNodeJson: string) => void;
}

export function useRenderer(props: RendererProps) {

    const {initElementNode} = props;

    const [elementNodeManager] = useState(new ElementNodeManager());
    const [eventManager] = useState(new EventManager(elementNodeManager));

    const [wrapperRenderer] = useState(new WrapperRenderer());

    // manager init and mount to window
    useEffect(() => {
        // init
        elementNodeManager.init(initElementNode);

        // mount to window
        (window as any)['$elementNodeManager$'] = elementNodeManager;
        (window as any)['$eventManager$'] = eventManager;
    }, []);

    // inner event listener
    useEffect(() => {

        const onInputValueChange = function (e: Event) {
            const ce = e as InputValueChangeEvent;
            const {detail: {path = '', value = ''}} = ce;
            elementNodeManager.update(path, {value: value});
        }

        const onTabsKeyChange = (e: Event) => {
            const ce = e as TabsKeyChangeEvent;
            const {detail: {path = '', tabKey = ''}} = ce;
            elementNodeManager.update(path, {activeTabKey: tabKey});
        }

        const onElementFocus = function (e: Event) {
            const ce = e as ElementFocusEvent;
            const {detail: {path}} = ce;
            elementNodeManager.update(path, {focused: true});
        }

        const onElementBlur = function (e: Event) {
            const ce = e as ElementBlurEvent;
            const {detail: {path}} = ce;
            elementNodeManager.update(path, {focused: false});
        }

        window.addEventListener(INPUT_VALUE_CHANGE_EVENT, onInputValueChange)
        window.addEventListener(TABS_KEY_CHANGE_EVENT, onTabsKeyChange)
        window.addEventListener(ELEMENT_FOCUS_EVENT, onElementFocus)
        window.addEventListener(ELEMENT_BLUR_EVENT, onElementBlur)
        return () => {
            window.removeEventListener(ELEMENT_BLUR_EVENT, onElementBlur)
            window.removeEventListener(ELEMENT_FOCUS_EVENT, onElementFocus)
            window.removeEventListener(TABS_KEY_CHANGE_EVENT, onTabsKeyChange)
            window.removeEventListener(INPUT_VALUE_CHANGE_EVENT, onInputValueChange)
        };
    })
    return wrapperRenderer.renderRootElementNode(
        elementNodeManager.currentElementNode,
        {eventManager, elementNodeManager},
        true
    );
}
