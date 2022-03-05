import {ElementNode} from "../ElementNode";
import {Managers} from "../manager/Managers";

export interface WrapperProps {
    path: string;
    elementNodeInfo: Omit<ElementNode, 'children'>;
    managers: Managers
}
