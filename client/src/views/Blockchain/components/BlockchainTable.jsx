import React from  'react'
import { Table, Spin, Alert } from 'antd';
import TransactionsTable from './TransactionsTable'

const BlockchainTable = (props) => {
    const { blockchain, loading, error} = props

    const truncate = (str) => {
        return str.length > 10 ? str.substr(0, 20) + '...' : str;
    };

    const blockchainForTable = blockchain.map(
        (block, index) => (
            {
                ...block,
                key: index,
                blockIndex: index,
                timestampFormatted: new Date(block.timestamp).toLocaleString(),
                hash: truncate(block.hash),
                lastHash: truncate(block.lastHash)
            }
        )
    )

    const columns = [
        { title: 'Bloque', dataIndex: 'blockIndex', key: 'blockIndex' },
        { title: 'Hash del bloque', dataIndex: 'hash', key: 'hash' },
        { title: 'Marca de tiempo', dataIndex: 'timestampFormatted', key: 'timestampFormatted' },
        { title: 'Dificultad de minado', dataIndex: 'difficulty', key: 'difficulty' },
        { title: 'Nonce', dataIndex: 'nonce', key: 'nonce' },
        { title: 'Hash del bloque anterior', dataIndex: 'lastHash', key: 'lastHash' },

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

        if(blockchain.length === 0) {
            return (
                <Alert
                    message="No hay bloques en la cadena de bloques"
                    type="info"
                    showIcon/>
            )
        } else {
            return (
                <Table
                    pagination={true}
                    columns={columns} 
                    dataSource={blockchainForTable}
                    expandable={{
                        expandedRowRender: record => <TransactionsTable transactions={record.data}/>,
                        rowExpandable: record => record.data.length > 0
                    }}/>
            )
        }
    }

    return(
        <>{renderContent()}</>
    )
}

export default BlockchainTable