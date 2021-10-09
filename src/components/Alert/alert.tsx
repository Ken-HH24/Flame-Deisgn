import React, { useState } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';

export type AlertType = 'default' | 'success' | 'warning' | 'danger';

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
                <Transition
                in={isShow}
                timeout={300}
                animation='zoom-in-right'
            >
                <div
                    className={classes}
                    {...restProps}
                >
                    {title && <h4 className='alert-title'>{title}</h4>}
                    {
                        closeable &&
                        <Icon
                            className='closed-icon'
                            size='sm'
                            icon={ faTimes }
                            onClick={ () => { setIsShow(false) } }
                        ></Icon>
                    }
                    <span className='alert-content'>{content}</span>
                </div>
            </Transition>
            }
        </>
    );
}

Alert.defaultProps = {
    type: 'default',
    closeable: true
}

export default Alert;