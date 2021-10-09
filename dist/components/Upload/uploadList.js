import React from 'react';
import Icon from '../Icon/icon';
import { faFileAlt, faSpinner, faCheckCircle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Progress from '../Progress/progress';
var UploadList = function (props) {
    var uploadFileList = props.uploadFileList, onRemove = props.onRemove;
    var mapStatusToTheme = function (status) {
        switch (status) {
            case 'success':
                return 'success';
            case 'error':
                return 'danger';
            default:
                return 'secondary';
        }
    };
    var renderUploadFileStatus = function (file) {
        switch (file.status) {
            case 'uploading':
                return React.createElement("div", { className: 'upload-list-item-status' },
                    React.createElement(Icon, { icon: faSpinner, spin: true, theme: 'primary' }));
            case 'success':
                return React.createElement("div", { className: 'upload-list-item-status' },
                    React.createElement(Icon, { icon: faCheckCircle, theme: 'success' }));
            case 'error':
                return React.createElement("div", { className: 'upload-list-item-status' },
                    React.createElement(Icon, { icon: faTimesCircle, theme: 'danger' }));
            default:
                break;
        }
    };
    return (React.createElement("ul", { className: 'upload-list-wrapper' }, uploadFileList.map(function (uploadFile) {
        return (React.createElement(React.Fragment, { key: uploadFile.uid },
            React.createElement("li", { className: 'upload-list-item' },
                React.createElement("div", { className: 'upload-list-item-file' },
                    React.createElement(Icon, { theme: mapStatusToTheme(uploadFile.status), icon: faFileAlt })),
                React.createElement("span", { className: 'upload-list-item-name' }, uploadFile.name),
                renderUploadFileStatus(uploadFile),
                React.createElement("div", { className: 'upload-list-item-close', onClick: function () { onRemove(uploadFile); } },
                    React.createElement(Icon, { icon: faTimes, theme: 'secondary' }))),
            uploadFile.status === 'uploading' && React.createElement(Progress, { percent: uploadFile.percentage || 0 })));
    })));
};
export default UploadList;
