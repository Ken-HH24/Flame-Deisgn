import React from 'react';
export declare type AlertType = 'default' | 'success' | 'warning' | 'danger';
export interface BaseAlertProps {
    className?: string;
    type?: AlertType;
    title?: string;
    content?: string;
    closeable?: boolean;
}
declare const Alert: React.FC<BaseAlertProps>;
export default Alert;
