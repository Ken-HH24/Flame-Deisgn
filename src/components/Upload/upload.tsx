import axios from 'axios';
import React, { ChangeEvent, useRef, useState } from 'react';
import UploadList from './uploadList';
import Dragger from './dragger';

export interface UploadFile {
    uid: string;
    name: string;
    size?: number;
    status?: 'ready' | 'uploading' | 'success' | 'error';
    percentage?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export interface UploadProps {
    action: string;
    defaultUploadFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: UploadFile) => void;
    onSuccess?: (data: any, file: UploadFile)=> void;
    onError?: (err: any, file: UploadFile) => void;
    onChange?: (file: UploadFile) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean,
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}

export const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        defaultUploadFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(defaultUploadFileList || []);

    const updateUploadFileList = (file: UploadFile, updateOption: Partial<UploadFile>) => {
        setUploadFileList(prevUploadFileList => {
            return prevUploadFileList.map(prevUploadFile => {
                if (prevUploadFile.uid === file.uid) {
                    return { ...prevUploadFile, ...updateOption };
                } else {
                    return prevUploadFile;
                }
            })
        })
    }

    const postFile = (file: File) => {
        const _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            name: file.name,
            size: file.size,
            status: 'ready',
            percentage: 0,
            raw: file
        }
        setUploadFileList(prevUploadFileList => {
            return [_file, ...prevUploadFileList];
        })

        const formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateUploadFileList(_file, { status: 'uploading', percentage: percentage });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(resp => {
            console.log(resp);
            updateUploadFileList(_file, { status: 'success', percentage: 100 });
            onSuccess && onSuccess(resp.data, _file)
            onChange && onChange(_file);
        }).catch(err => {
            console.error(err);
            updateUploadFileList(_file, { status: 'error' });
            onError && onError(err, _file);
            onChange && onChange(_file);
        })
    }

    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files);
        postFiles.forEach(file => {
            if (!beforeUpload) {
                postFile(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        postFile(processedFile);
                    })
                } else if (result !== false) {
                    postFile(file);
                }
            }
        })
    }

    const handleButtonClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    }

    const handleRemove = (file: UploadFile) => {
        setUploadFileList(prevUploadFileList => {
            return prevUploadFileList.filter(uploadFile => {
                return uploadFile.uid !== file.uid;
            });
        });
        onRemove && onRemove(file);
    }

    return (
        <div className='upload-wrapper'>
            <div onClick={handleButtonClick}>
                {
                    drag ? <Dragger onFile={uploadFiles}>{children}</Dragger> : children
                }
            </div>
            <input
                className='upload-input'
                type='file'
                style={{display: 'none'}}
                ref={fileInput}
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
            />
            <UploadList uploadFileList={uploadFileList} onRemove={handleRemove} />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload;