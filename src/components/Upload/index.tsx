import React from 'react';
import Upload, { UploadProps } from './upload';
import UploadList, { UploadListProps } from './uploadList';
import Dragger, { DraggerProps } from './dragger';

export type IUploadComponent = React.FC<UploadProps> & {
    UploadList: React.FC<UploadListProps>,
    Dragger: React.FC<DraggerProps>
}

const TransUpload = Upload as IUploadComponent;
TransUpload.UploadList = UploadList;
TransUpload.Dragger = Dragger;

export default TransUpload;