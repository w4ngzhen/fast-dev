import ComponentDefine from "./ComponentDefine";
import {ReactElement} from "react";
import {Button} from "antd";
import {ContainerComponentRenderWrapper} from "../editor/render/ContainerComponentRenderWrapper";

export default class ComponentDefineRenderer {

    static renderDefine(define: ComponentDefine): ReactElement | undefined {
        return ComponentDefineRenderer.renderDefineInner(define, '/' + define.type);
    }

    private static renderDefineInner(define: ComponentDefine, path: string): ReactElement | undefined {
        if (!define) {
            return undefined;
        }

        let currentKey = path;

        let dataPath = path;
        let dataVirtual = define.virtualElement ? 'true' : 'false';

        let commonStyle = {
            border: `1px ${define.virtualElement ? 'dashed' : 'solid'} #000`,
            borderRadius: '3px',
            width: define.width,
            height: define.height
        }

        if (define.type === 'button') {
            return (
                <Button
                    key={currentKey}
                    data-path={dataPath}
                    data-virtual={dataVirtual}
                    type="primary"
                    style={commonStyle}>
                    这是一个button
                </Button>
            )
        }
        if (define.type === 'panel') {

            let childrenEle: ReactElement[] = [];

            if (define.children && define.children.length > 0) {
                define.children.forEach((childDef, idx) => {
                    let nextPath = `${path}/${childDef.type}_${idx}`
                    let childEle = this.renderDefineInner(childDef, nextPath);
                    if (childEle) {
                        childrenEle.push(childEle);
                    }
                })
            }

            let divStyle = {
                ...commonStyle,
                // width: '100%',
                // height: '100%',
                // minWidth: '10px',
                padding: '10px'
            };
            return (
                <div
                    key={currentKey}

                    data-path={dataPath}
                    data-virtual={dataVirtual}

                    style={divStyle}>
                    {childrenEle}
                </div>
            )
        }

        if (define.type === 'page') {

            let childrenEle: ReactElement[] = [];

            if (define.children && define.children.length > 0) {
                define.children.forEach((childDef, idx) => {
                    let nextPath = `${path}/${childDef.type}_${idx}`
                    let childEle = this.renderDefineInner(childDef, nextPath);
                    if (childEle) {
                        childrenEle.push(childEle);
                    }
                })
            }

            let pageStyle = {
                ...commonStyle,
                width: '100%',
                height: '100%',
                padding: '10px',
                borderColor: '#5aa7dc'
            };
            return (
                <div
                    key={currentKey}

                    data-path={dataPath}
                    data-virtual={dataVirtual}

                    style={pageStyle}>
                    {childrenEle}
                </div>
            )
        }
    }
}
