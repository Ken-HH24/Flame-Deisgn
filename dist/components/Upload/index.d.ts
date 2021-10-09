import React from 'react';
import { UploadProps } from './upload';
import { UploadListProps } from './uploadList';
import { DraggerProps } from './dragger';
export declare type IUploadComponent = React.FC<UploadProps> & {
    UploadList: React.FC<UploadListProps>;
    Dragger: React.FC<DraggerProps>;
};
declare const TransUpload: IUploadComponent;
export default TransUpload;
