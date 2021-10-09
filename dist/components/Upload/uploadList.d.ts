import React from 'react';
import { UploadFile } from './upload';
export interface UploadListProps {
    uploadFileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
declare const UploadList: React.FC<UploadListProps>;
export default UploadList;
