import {ElementNode} from "../ElementNode";

export interface WrapperProps {
    key: string;
    path: string;
    elementNodeInfo: Omit<ElementNode, 'children'>
}
