import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, cleanup, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import Upload,{ UploadProps } from './upload';
import { IconProps } from '../Icon/icon';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
    action: 'fakeurl.com',
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    drag: true
}

let wrapper: RenderResult;
let fileInput: HTMLInputElement;
let uploadArea: HTMLElement;

const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });

describe('test upload component', () => {
    beforeEach(() => {
        wrapper = render(<Upload {...testProps}>Click to Upload</Upload>);
        fileInput = wrapper.container.querySelector('.upload-input') as HTMLInputElement;
        uploadArea = wrapper.getByText('Click to Upload');
    })

    it('upload process should work fine', async () => {
        // mockedAxios.post.mockImplementation(() => {
        //     return Promise.resolve({ 'data': 'success' });
        // })
        mockedAxios.post.mockResolvedValue({ 'data': 'success' });
        const { queryByText } = wrapper;
        expect(fileInput).not.toBeVisible();
        expect(uploadArea).toBeVisible();
        fireEvent.change(fileInput, { target: { files: [testFile] } });
        // expect(queryByText('spinner')).toBeInTheDocument();
        await waitFor(() => {
            expect(queryByText('test.png')).toBeInTheDocument();
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith('success', expect.objectContaining({
            raw: testFile,
            status: "success",
            name: "test.png"
        }))
    })
})