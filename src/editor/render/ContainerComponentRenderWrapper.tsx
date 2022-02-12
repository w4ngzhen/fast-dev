import {FC, PropsWithChildren, ReactNode, useState} from "react";
import './index.css';

export const ContainerComponentRenderWrapper: FC<ReactNode> = (props: PropsWithChildren<ReactNode>) => {
    // const [maskVisible, setMaskVisible] = useState(true);
    const {children} = props;
    return (
        <>
            <div className='render-wrapper' onClick={() => console.log('hello')}>
                {children}
            </div>
        </>
    )
}

// export const Wrapper = (WrapperComponent:) => {
//     return () => {
//     }
// }
