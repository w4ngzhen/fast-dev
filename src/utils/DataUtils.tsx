import ComponentDefine from "../core/ComponentDefine";
import {ElementNode} from "../core/ElementNode";
import _ from "lodash";

export default class DataUtils {

    /**
     * 获取 rootSchema 中的符合pathNodes路径的所有后代元素
     * 举例：
     * root有子元素：aa和bb；aa有子元素aaa
     * => {type:'root', children: [{type: 'aa', children: [{type: 'aaa'}]}, {type: 'bb'}] }
     * 若 pathNodes = ['aa_0', 'aaa_0']，则能得到aa和aaa元素组成的列表
     * 若 pathNodes = ['aa_0', 'aaa_1']，则在严格模式下，返回 []，在非严格模式下返回 只有aa元素的列表
     *
     * @param rootSchema
     * @param pathNodes
     * @param strict
     */
    static getDescendantSchemaNodeListByPathNodes(
        rootSchema: ElementNode,
        pathNodes: string[],
        strict: boolean) {
        let foundList: ElementNode[] = [];
        if (!rootSchema) {
            return foundList;
        }
        if (!pathNodes || pathNodes.length === 0) {
            return [];
        }

        let schemaNode = rootSchema;

        for (let idx = 0; idx < pathNodes.length; idx++) {
            let pathNodeName = pathNodes[idx];
            let [type, childIdxStr] = pathNodeName.split('_');

            if (!type || !childIdxStr) {
                console.warn('无法从pathNodeName中解析到type或childIdx，pathNodeName：' + pathNodeName);
                break;
            }

            let childIdx = parseInt(childIdxStr);
            if (isNaN(childIdx)) {
                console.warn('对应路径节点索引字符串无法转换为数字，childIdxStr：' + childIdxStr);
                break;
            }

            let {children} = schemaNode || {};
            if (!children || children.length === 0) {
                // 当前节点ComponentDefine已经不存在子元素
                break;
            }

            let childNode = children[childIdx];
            if (!childNode || childNode.type !== type) {
                // 对应位置不存在或类型不匹配
                break;
            }

            // 匹配的情况下，保存
            foundList.push(childNode);
            // 将该子元素替换现在的componentDef，并进入下一次循环
            // 以处理该子元素的子元素
            schemaNode = childNode;

        }

        // 跳出循环后，在严格模式下，将检查pathNode列表和实际得到的后代元素数量是否一致
        // 不一致则返回空
        // 在非严格模式下，则返回尽可能最大匹配的结果
        if (strict && foundList.length !== pathNodes.length) {
            return [];
        }
        return foundList;
    }

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

    /**
     * 判断处在 children列表 中的对应位置（childIdx）的ComponentDefine是否和pathNodeName一致
     * 例如现在有type = 'panel' 的ComponentDefine，他是某个父级ComponentDefine的子元素，且位置为第2个，
     * 那么这个panel对应的pathNodeName应该为：'panel_1'（基于0作为起点），否则函数返回false。
     * 特殊情况：
     * 当defIdx传入是-1的时候，表明ComponentDefine是一个根元素，他不是某个元素的子元素，
     * 那么只需要检查type和pathNodeName是否一致。
     * 例如，type = 'page'（通常page是一个根元素），那么 childIdx 应该传入 -1，对应的 pathNodeName 为 'page'，
     * 否则函数返回false
     *
     * @param componentDef
     * @param childIdx
     * @param pathNodeName
     */
    static checkComponentDefineValid(
        componentDef: ComponentDefine,
        childIdx: number,
        pathNodeName: string): boolean {
        if (!componentDef) {
            return false;
        }
        if (childIdx === -1) {
            // 顶层根节点需要特殊处理
            return componentDef.type === pathNodeName;
        }

        // 非顶层节点
        return (componentDef.type + '_' + childIdx) === pathNodeName;
    }

    /**
     * 获取指定ComponentDefine中满足 predicate 的ComponentDefine元素的及其路径上的元素
     * @param root
     * @param predicate
     */
    static getTargetDescendantComponentDefinePathNodes(
        root: ComponentDefine,
        predicate: (def: ComponentDefine) => boolean):
        { pathNodes: string[], pathComponentDefines: ComponentDefine[] } {

        function inner(targetChild: ComponentDefine,
                       childIdx: number,
                       pathNodes: string[],
                       pathComponentDefines: ComponentDefine[]) {


            if (predicate(targetChild)) {
                // 符合目标，则添加到list中
                pathNodes.push(targetChild.type + "_" + childIdx);
                pathComponentDefines.push(targetChild);
                console.log('符合目标：', JSON.stringify(targetChild));
                return true;
            }

            // 否则，检查子元素是否满足，若子元素存在满足目标的元素，
            // 则也将该元素加入list
            let children = targetChild.children || [];
            for (let idx = 0; idx < children.length; idx++) {
                let child = children[idx];
                if (inner(child, idx, pathNodes, pathComponentDefines)) {
                    pathNodes.push(targetChild.type + "_" + childIdx);
                    pathComponentDefines.push(targetChild);
                    console.log('符合目标，添加父级：', JSON.stringify(targetChild));
                    return true;
                }
            }
            // 当前元素的所有子元素都不符合目标，则返回false
            return false;
        }

        let children = root.children || [];
        for (let idx = 0; idx < children.length; idx++) {
            let pathNodes: string[] = [];
            let pathComponentDefines: ComponentDefine[] = [];
            if (inner(children[idx], idx, pathNodes, pathComponentDefines)) {
                // 满足条件，path根据递归添加，需要reverse
                pathNodes = pathNodes.reverse();
                pathComponentDefines = pathComponentDefines.reverse();
                return {pathNodes: pathNodes, pathComponentDefines: pathComponentDefines};
            }
        }
        return {pathNodes: [], pathComponentDefines: []};
    }

}

