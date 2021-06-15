import React from 'react';
import { Result, Button } from 'antd';

const NotAuthorized = (props) => {
    const { onSignOut } = props

    return (
        <Result
            status="error"
            title="Solo pueden acceder usuarios con el rol de administrador"
            extra={
                <Button onClick={onSignOut} type="primary" key="console">
                    Salir
                </Button>
            }
        />
    );
};

export default NotAuthorized;