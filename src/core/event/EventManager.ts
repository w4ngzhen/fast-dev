export class EventManager {

    static Instance: EventManager;
    static {
        // 挂到全局是因为想要方便测试
        (window as any)['$EventManager$'] = EventManager.Instance = new EventManager();
    }

    private readonly eventRecord: Record<string, any>;

    constructor() {
        this.eventRecord = {};
    }

    register(path: string, eventName: string, eventScript: string) {
        const key = path + '@' + eventName;
        this.eventRecord[key] = eventScript;
    }

    unRegister(path: string, eventName: string ) {
        const key = path + '@' + eventName;
        delete this.eventRecord[key];
    }

    fire(path: string, eventName: string, ...args: any[]): void {
        const key = path + '@' + eventName;
        const trigger = this.eventRecord[key];
        if (!trigger) {
            console.warn(`找不到对应key = '${key}' 的事件记录`);
        }
        if (typeof trigger === 'string') {
            new Function('path', 'eventName', trigger).call(window, path, eventName);
        }
    }
}
