export const INPUT_VALUE_CHANGE_EVENT = '_INPUT_VALUE_CHANGE_EVENT_';

export type InputValueChangeEvent = CustomEvent<{ path: string, value: string | number }>;

export function createInputValueChangeEvent(path: string, value: string): InputValueChangeEvent {
    return new CustomEvent<{ path: string; value: string | number }>(INPUT_VALUE_CHANGE_EVENT, {
        detail: {
            path,
            value
        }
    })
}

export const TABS_KEY_CHANGE_EVENT = '_TABS_KEY_CHANGE_EVENT_';

export type TabsKeyChangeEvent = CustomEvent<{ path: string, tabKey: string }>;

export function createTabsKeyChangeEvent(path: string, tabKey: string): TabsKeyChangeEvent {
    return new CustomEvent<{ path: string; tabKey: string }>(TABS_KEY_CHANGE_EVENT, {
        detail: {
            path,
            tabKey
        }
    })
}
