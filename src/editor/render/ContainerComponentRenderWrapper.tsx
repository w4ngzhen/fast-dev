import {FC, PropsWithChildren} from "react";
import './index.css';

export const ContainerComponentRenderWrapper: FC<any> = (props: PropsWithChildren<any>) => {
    const {children} = props;
    return (
        <div className='render-wrapper'>
            {children}
        </div>
    )
}
