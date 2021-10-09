var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import axios from 'axios';
import React, { useRef, useState } from 'react';
import UploadList from './uploadList';
import Dragger from './dragger';
export var Upload = function (props) {
    var action = props.action, defaultUploadFileList = props.defaultUploadFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var fileInput = useRef(null);
    var _a = useState(defaultUploadFileList || []), uploadFileList = _a[0], setUploadFileList = _a[1];
    var updateUploadFileList = function (file, updateOption) {
        setUploadFileList(function (prevUploadFileList) {
            return prevUploadFileList.map(function (prevUploadFile) {
                if (prevUploadFile.uid === file.uid) {
                    return __assign(__assign({}, prevUploadFile), updateOption);
                }
                else {
                    return prevUploadFile;
                }
            });
        });
    };
    var postFile = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            name: file.name,
            size: file.size,
            status: 'ready',
            percentage: 0,
            raw: file
        };
        setUploadFileList(function (prevUploadFileList) {
            return __spreadArray([_file], prevUploadFileList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    _file.status = 'uploading';
                    _file.percentage = percentage;
                    updateUploadFileList(_file, { status: 'uploading', percentage: percentage });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(function (resp) {
            console.log(resp);
            _file.status = 'success';
            _file.response = resp.data;
            updateUploadFileList(_file, { status: 'success', percentage: 100 });
            onSuccess && onSuccess(resp.data, _file);
            onChange && onChange(_file);
        }).catch(function (err) {
            console.error(err);
            _file.status = 'error';
            _file.error = err;
            updateUploadFileList(_file, { status: 'error' });
            onError && onError(err, _file);
            onChange && onChange(_file);
        });
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                postFile(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        postFile(processedFile);
                    });
                }
                else if (result !== false) {
                    postFile(file);
                }
            }
        });
    };
    var handleButtonClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setUploadFileList(function (prevUploadFileList) {
            return prevUploadFileList.filter(function (uploadFile) {
                return uploadFile.uid !== file.uid;
            });
        });
        onRemove && onRemove(file);
    };
    return (React.createElement("div", { className: 'upload-wrapper' },
        React.createElement("div", { onClick: handleButtonClick }, drag ? React.createElement(Dragger, { onFile: uploadFiles }, children) : children),
        React.createElement("input", { className: 'upload-input', type: 'file', style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { uploadFileList: uploadFileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
