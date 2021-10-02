import React, { useState } from 'react';
import classNames from '../../utils/classNames';

export enum AlertType {
    Default = 'default',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger'
}

export interface BaseAlertProps{
    className?: string;
    type?: AlertType;
    title?: string;
    content?: string;
    closeable?: boolean;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
    const {
        className,
        type,
        title,
        content,
        closeable,
        ...restProps
    } = props;

    const classes = classNames(
        'alert',
        className,
        {
            [`alert-${type}`]: type
        }
    );
    const [isShow, setIsShow] = useState(true);

    return (
        <>
            {
                isShow &&
                (
                    <div
                        className={classes}
                        {...restProps}
                    >
                        {title && <h4 className='alert-title'>{title}</h4>}
                        {closeable && <i className='closed-icon' onClick={()=>{setIsShow(false)}}></i>}
                        <span className='alert-content'>{content}</span>
                    </div>
                )
            }
        </>
    );
}

Alert.defaultProps = {
    type: AlertType.Default,
    closeable: true
}

export default Alert;