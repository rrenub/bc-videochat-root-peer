import { Table, Badge } from 'antd';
import React from  'react'

const TransactionsTable = (props) => {   
    const { transactions } = props;

    const transactionsForTable = transactions.map(
        (transaction) => (
            {
                id: transaction.id,
                token: transaction.input.interventionToken
            }
        )
    )

    const columns = [
        { title: 'ID de la transacción', dataIndex: 'id', key: 'id' },
        { title: 'Token de la intervención', dataIndex: 'token', key: 'token'}
    ]

    return (
        <Table size="small" columns={columns} dataSource={transactionsForTable} pagination={false} />    
    )
}

export default TransactionsTable;