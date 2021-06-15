import React, { useEffect } from 'react'
import { Typography, Divider } from 'antd';
import useFetch from '../../hooks/use-fetch'
import BlockchainTable from './components/BlockchainTable'

const { Title } = Typography

const Nodes = () => {
    const [ blockchain, 
            isLoading, 
            error,
            fetchBlockchain ] = useFetch('/api/blocks')

    useEffect(() => {
        fetchBlockchain();
    }, [])

    return (
        <div className="main">
            <Title level={2}>Cadena de bloques</Title>
            <Divider />
            
            <BlockchainTable
                error={error}
                loading={isLoading}
                blockchain={blockchain}/>
        </div>
    )
}

export default Nodes;