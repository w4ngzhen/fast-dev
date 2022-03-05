import {ElementNodeManager} from "./ElementNodeManager";

export class EventManager {

    // static Instance: EventManager = new EventManager();

    private readonly eventHandlerRecord: Record<string, any>;

    private readonly elementNodeManager: ElementNodeManager;

    constructor(elementNodeManager: ElementNodeManager) {
        this.elementNodeManager = elementNodeManager;
        this.eventHandlerRecord = {};
    }

    register(path: string, eventName: string, eventScript: string) {
        const key = path + '@' + eventName;
        this.eventHandlerRecord[key] = eventScript;
    }

    unRegister(path: string, eventName: string) {
        const key = path + '@' + eventName;
        delete this.eventHandlerRecord[key];
    }

    fire(path: string, eventName: string, ...args: any[]): void {
        const key = path + '@' + eventName;
        const handler = this.eventHandlerRecord[key];
        if (!handler) {
            console.warn(`找不到对应key = '${key}' 的事件记录`);
            return;
        }
        if (typeof handler === 'string') {
            // 方法签名：(path, eventName, managers) => {...}
            const managers = {
                eventManager: this,
                elementNodeManager: this.elementNodeManager
            };
            new Function('path', 'eventName', 'managers', handler).call(window, path, eventName, managers);
        }
    }
}
