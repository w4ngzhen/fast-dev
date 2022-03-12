import {ElementNode} from "../core/ElementNode";
import _ from "lodash";

export default class DataUtils {

    /**
     *
     */
    static getElementNodeByPath(rootElementNode: ElementNode, path: string): ElementNode {
        if (!rootElementNode) {
            throw new Error(`根元素节点为空`)
        }
        if (_.isEmpty(path)) {
            throw new Error(`要查询的路径path为空`)
        }
        const [headNode, ...pathNodes] = path.split('/').filter(pathNode => !_.isEmpty(pathNode));
        if (_.isEmpty(headNode) || headNode !== rootElementNode.type) {
            throw new Error(`根元素节点类型和path首元素不匹配`)
        }
        let children = rootElementNode.children;
        let targetPathElementNode;
        for (let i = 0; i < pathNodes.length; i++) {
            const pathNode = pathNodes[i];
            const [pathName, idxStr] = pathNode.split('_');
            const idxInChildren = parseInt(idxStr);
            if (isNaN(idxInChildren)) {
                throw new Error(`pathNode: ${pathNode} 无法解析`)
            }
            if (!children) {
                throw new Error(`当前元素节点不存在子节点`)
            }
            const child = children[idxInChildren];
            if (!child || child.type !== pathName) {
                throw new Error(`无法从元素节点的子节点列表中找到对应索引子节点: ${pathNode}`)
            }
            if (i === pathNodes.length - 1) {
                // 能够匹配上，且当前已经是最后一个元素，则表示匹配成功
                targetPathElementNode = child;
            } else {
                // 能够匹配上，但后续还有路径节点，需要继续匹配
                children = child.children;
            }
        }
        if (!targetPathElementNode) {
            throw new Error('无法找到对应路径元素');
        }
        return targetPathElementNode;
    }

}

