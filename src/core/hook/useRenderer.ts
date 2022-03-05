import {useEffect, useState, createContext} from "react";
import {ElementNode} from "../ElementNode";
import {
    INPUT_VALUE_CHANGE_EVENT,
    InputValueChangeEvent,
    TABS_KEY_CHANGE_EVENT,
    TabsKeyChangeEvent
} from "../event/InputChangeEvent";
import {WrapperRenderer} from "../wrapper/WrapperRenderer";
import {ElementNodeManager} from "../manager/ElementNodeManager";
import {EventManager} from "../manager/EventManager";

export function useRenderer(initElementNode: ElementNode) {
    const [elementNodeManager] = useState(new ElementNodeManager());
    const [eventManager] = useState(new EventManager());

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
            elementNodeManager.update(path, {ui: {value: value}});
        }

        const onTabsKeyChange = (e: Event) => {
            const ce = e as TabsKeyChangeEvent;
            const {detail: {path = '', tabKey = ''}} = ce;
            elementNodeManager.update(path, {ui: {activeTabKey: tabKey}});
        }

        window.addEventListener(INPUT_VALUE_CHANGE_EVENT, onInputValueChange)
        window.addEventListener(TABS_KEY_CHANGE_EVENT, onTabsKeyChange)
        return () => {
            window.removeEventListener(TABS_KEY_CHANGE_EVENT, onTabsKeyChange)
            window.removeEventListener(INPUT_VALUE_CHANGE_EVENT, onInputValueChange)
        };
    })
    return wrapperRenderer.renderRootElementNode(
        elementNodeManager.currentElementNode,
        {eventManager, elementNodeManager}
    );
}
