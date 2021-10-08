import React from 'react';
import { UploadFile } from './upload';
import Icon, { ThemeProps } from '../Icon/icon';
import { faFileAlt, faSpinner, faCheckCircle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Progress from '../Progress/progress';

export interface UploadListProps {
    uploadFileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
    const {
        uploadFileList,
        onRemove
    } = props;

    const mapStatusToTheme = (status: string | undefined): ThemeProps => {
        switch (status) {
            case 'success':
                return 'success'
            case 'error':
                return 'danger'
            default:
                return 'secondary'
        }
    }

    const renderUploadFileStatus = (file: UploadFile) => {
        switch (file.status) {
            case 'uploading':
                return <div className='upload-list-item-status'><Icon icon={faSpinner} spin theme='primary' /></div>;
            case 'success':
                return <div className='upload-list-item-status'><Icon icon={faCheckCircle} theme='success' /></div>
            case 'error':
                return <div className='upload-list-item-status'><Icon icon={faTimesCircle} theme='danger' /></div>
            default:
                break;
        }
    }

    return (
        <ul className='upload-list-wrapper'>
            {
                uploadFileList.map(uploadFile => {
                    return (
                        <React.Fragment key={uploadFile.uid}>
                            <li className='upload-list-item'>
                                <div className='upload-list-item-file'>
                                    <Icon theme={mapStatusToTheme(uploadFile.status)} icon={faFileAlt} />
                                </div>
                                <span className='upload-list-item-name'>{uploadFile.name}</span>
                                {renderUploadFileStatus(uploadFile)}
                                <div
                                    className='upload-list-item-close'
                                    onClick={() => { onRemove(uploadFile) }}
                                >
                                    <Icon icon={faTimes} theme='secondary' />
                                </div>
                            </li>
                            {uploadFile.status === 'uploading' && <Progress percent={uploadFile.percentage || 0} />}
                        </React.Fragment>
                    )
                })
            }
        </ul>
    )
}

export default UploadList;