import React from 'react'
import Upload from './upload'

function UploadDemo() {
    return (
        <Upload
            action='https://jsonplaceholder.typicode.com/posts'
            // action='http://localhost:8000/upload'
            multiple
            drag
        >upload file</Upload>
    )
}

export default UploadDemo;