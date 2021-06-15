import React from  'react'
import { Table, Spin, Button, Alert } from 'antd';

const NodesTable = (props) => {
    const { nodes, loading, error, onDelete } = props

    const columns = [
        { title: 'ID del nodo', dataIndex: 'ID', key: 'ID' },
        {
            title: 'Eliminar',
            dataIndex: 'eliminar',
            key: 'eliminar',
            render: (id, index) => (
                <Button 
                    type="danger"
                    key={index} 
                    onClick={() => onDelete(index)}
                >
                    Eliminar
                </Button>
            )
        },
    ];

    const renderContent = () => {
        if(error) {
            return (
                <Alert
                    message="Ha ocurrido un error"
                    description="No se han podido consultar los nodos que participan en la blockchain"
                    type="error"
                    showIcon/>
            )
        }

        if(loading) {
            return <Spin />
        }

        return (
            <Table 
                pagination={true}
                columns={columns} 
                dataSource={nodes}/>
        )
    }

    return <>{renderContent()}</>
}

export default NodesTable
