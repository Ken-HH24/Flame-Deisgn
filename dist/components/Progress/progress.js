import React from 'react';
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: 'progress-wrapper', style: styles },
        React.createElement("div", { className: 'progress-bar-outer', style: { height: strokeHeight + "px" } },
            React.createElement("div", { className: "progress-bar-inner color-" + theme, style: { width: Math.max(percent, 5) + "%" } }, showText && React.createElement("span", { className: 'progress-bar-text' }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};
export default Progress;
