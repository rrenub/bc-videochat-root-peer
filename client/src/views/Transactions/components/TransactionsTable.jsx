import React from  'react'
import { Table, Spin, Alert } from 'antd';

const TransactionsTable = (props) => {
    const { transactions, loading, error} = props

    const truncate = (str) => {
        return str.length > 10 ? str.substr(0, 20) + '...' : str;
    };

    const transactionsFormatted = transactions.map(
        (transaction) => (
            {
                id: transaction.id,
                token: truncate(transaction.input.interventionToken),
                date: new Date(transaction.input.timestamp).toLocaleString()
            }
        )
    )

    const columns = [
        { title: 'ID de la transacción', dataIndex: 'id', key: 'id' },
        { title: 'Token', dataIndex: 'token', key: 'token' },
        { title: 'Fecha de realización', dataIndex: 'date', key: 'date' },
    ];

    const renderContent = () => {
        if(error) {
            return (
                <Alert
                    message="Ha ocurrido un error con el servidor"
                    type="error"
                    showIcon/>
            )
        }

        if(loading) {
            return <Spin />
        }

        if(transactions.length === 0) {
            return (
                <Alert
                    message="No hay transacciones pendientes"
                    type="info"
                    showIcon/>
            )
        } else {
            return (
                <Table
                    pagination={true}
                    columns={columns} 
                    dataSource={transactionsFormatted}/>
            )
        }
    }

    return(
        <>{renderContent()}</>
    )
}

export default TransactionsTable