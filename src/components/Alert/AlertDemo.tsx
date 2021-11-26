import React from 'react';
import Alert from '.';

const AlertDemo = () => {
    return (
        <div id='alert-wrapper'>
            <Alert
                title='aaa'
                content='bbbbb'
                closeable={false}
            />
            <Alert
                content='bbbbb'
                type='danger'
            />

            <Alert
                title='aaa'
                content='bbbbb'
                type='warning'
            />
            <Alert
                content='bbbbb'
                type='success'
            />
        </div>
    )
}

export default AlertDemo;