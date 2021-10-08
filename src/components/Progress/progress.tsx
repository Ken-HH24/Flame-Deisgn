import React from 'react';
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps
}

const Progress: React.FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme
    } = props;
    
    return (
        <div className='progress-wrapper' style={styles}>
            <div className='progress-bar-outer' style={{height: `${strokeHeight}px`}}>
                <div
                    className={`progress-bar-inner color-${theme}`}
                    style={{ width: `${Math.max(percent, 5)}%` }}
                >
                    {showText && <span className='progress-bar-text'>{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
}

export default Progress;