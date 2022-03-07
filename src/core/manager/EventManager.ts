import {ElementNodeManager} from "./ElementNodeManager";
import {ElementNode} from "../ElementNode";
import _ from "lodash";

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
            const handlerScripts = handler;

            const that = this;
            const eventManagerWrapper = {
                fire: (path: string, eventName: string, ...args: any[]) => {
                    that.fire(path, eventName, args);
                }
            };
            const elementNodeManagerWrapper = {
                update: (path: string, patch: any): void => {
                    that.elementNodeManager.update(path, patch);
                },
                getCurrentElementNode: (): ElementNode | undefined => {
                    return _.cloneDeep(that.elementNodeManager.currentElementNode);
                }
            }
            // 方法签名：(path, eventName, managers) => {...}
            const context = {
                eventManagerWrapper,
                elementNodeManagerWrapper
            };
            new Function('path', 'eventName', 'context', handlerScripts).call(window, path, eventName, context);
        }
    }
}
