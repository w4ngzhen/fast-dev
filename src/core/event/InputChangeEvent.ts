export const INPUT_CHANGE_EVENT = '_INPUT_CHANGE_EVENT_';

export type InputValueChangeEvent = CustomEvent<{ path: string, value: string | number }>;

export function createInputValueChange(path: string, value: string): InputValueChangeEvent {
    return new CustomEvent<{ path: string; value: string | number }>(INPUT_CHANGE_EVENT, {
        detail: {
            path,
            value
        }
    })
}
