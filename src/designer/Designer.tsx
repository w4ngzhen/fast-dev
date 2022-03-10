import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Layout} from "antd";
import {useState} from "react";
import _ from "lodash";
import ComponentTag from "../component-tag/ComponentTag";
import MockUtils from "../utils/MockUtils";
import ComponentTagListPanel from "./component-tag-list-panel/ComponentTagListPanel";
import {DesignCanvas} from "./design-canvas/DesignCanvas";

export function Designer() {
    const [componentTagList, setComponentTagList] = useState<ComponentTag[]>(MockUtils.componentTags);
    const updateItemList = (keyword: string) => {
        let filterList: ComponentTag[];
        if (_.isEmpty(keyword)) {
            filterList = [...MockUtils.componentTags];
        } else {
            // 根据关键字查询组件
            filterList = [...MockUtils.componentTags].filter(item => {
                let {label, tag} = item;
                return ((label || "").indexOf(keyword) >= 0) || ((tag || "").indexOf(keyword) >= 0);
            });
        }
        setComponentTagList(filterList);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Layout style={{height: '100%'}}>
                <Layout.Header>
                </Layout.Header>
                <Layout.Content>
                    <Layout style={{height: '100%'}}>
                        <Layout.Sider theme='light'>
                            <ComponentTagListPanel
                                componentTags={componentTagList}
                                onKeywordSearchInputChange={keyword => updateItemList(keyword)}
                            />
                        </Layout.Sider>
                        <Layout.Content>
                            <DesignCanvas/>
                        </Layout.Content>
                    </Layout>
                </Layout.Content>
            </Layout>
        </DndProvider>
    )
}
