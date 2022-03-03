import {ElementNode} from "../ElementNode";

export interface WrapperProps {
    path: string;
    elementNodeInfo: Omit<ElementNode, 'children'>
}
