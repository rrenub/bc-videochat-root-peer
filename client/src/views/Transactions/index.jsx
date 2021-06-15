import React, { useEffect } from 'react'
import { Typography, Divider } from 'antd';
import useFetch from '../../hooks/use-fetch'
import TransactionsTable from './components/TransactionsTable'

const { Title } = Typography

const Transactions = () => {
    const [ transactionPool, 
            isLoading, 
            error,
            fetchTransactionPool ] = useFetch('/api/transaction-pool')

    useEffect(() => {
        fetchTransactionPool()
    }, [])

    return (
        <div className="main">
            <Title level={2}>Pool de transacciones</Title>
            <Divider />
            <p>En este apartado se muestran las transacciones pendientes de ser agregadas a la cadena de bloques</p>
            
            <TransactionsTable
                error={error}
                loading={isLoading}
                transactions={Object.values(transactionPool)}/>
        </div>
    )
}

export default Transactions;