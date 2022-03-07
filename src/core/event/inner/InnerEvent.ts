interface BaseEventDetail {
    path: string;
}

export const INPUT_VALUE_CHANGE_EVENT = '_INPUT_VALUE_CHANGE_EVENT_';

export type InputValueChangeEvent = CustomEvent<BaseEventDetail & { value: string | number }>;

export function createInputValueChangeEvent(path: string, value: string): InputValueChangeEvent {
    return new CustomEvent<{ path: string; value: string | number }>(INPUT_VALUE_CHANGE_EVENT, {
        detail: {
            path,
            value
        }
    })
}

export const TABS_KEY_CHANGE_EVENT = '_TABS_KEY_CHANGE_EVENT_';

export type TabsKeyChangeEvent = CustomEvent<BaseEventDetail & { tabKey: string }>;

export function createTabsKeyChangeEvent(path: string, tabKey: string): TabsKeyChangeEvent {
    return new CustomEvent<BaseEventDetail & { tabKey: string }>(TABS_KEY_CHANGE_EVENT, {
        detail: {
            path,
            tabKey
        }
    })
}

export const ELEMENT_FOCUS_EVENT = '_ELEMENT_FOCUS_EVENT_';

export type ElementFocusEvent = CustomEvent<BaseEventDetail>;

export function createElementFocusEvent(path: string): ElementFocusEvent {
    return new CustomEvent<BaseEventDetail>(ELEMENT_FOCUS_EVENT, {
        detail: {
            path,
        }
    })
}

export const ELEMENT_BLUR_EVENT = '_ELEMENT_BLUR_EVENT_';

export type ElementBlurEvent = CustomEvent<BaseEventDetail>;

export function createElementBlurEvent(path: string): ElementBlurEvent {
    return new CustomEvent<BaseEventDetail>(ELEMENT_BLUR_EVENT, {
        detail: {
            path,
        }
    })
}
