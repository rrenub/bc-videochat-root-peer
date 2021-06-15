import React, { useEffect } from 'react'
import { Typography, Divider, message } from 'antd';
import useFetch from '../../hooks/use-fetch'
import { deleteNodeDB } from '../../services/nodeService'
import NodesTable from './components/NodesTable'

const { Title } = Typography

const Nodes = () => {
    const [ nodes, 
            isLoading, 
            error,
            fetchNodes ] = useFetch('/admin/nodes')

    useEffect(() => {
        fetchNodes();
    }, [])

    const deleteNode = async (node) => {
        console.log('delete node', node)
        try {
            await deleteNodeDB(node)
            message.success(`Node ${node.ID} has been deleted successfully`)
        } catch (e) {
            console.error(e)
            message.error(`Node ${node.ID} could not be deleted`)
        }
        fetchNodes();
    }

    return (
        <div className="main">
            <Title level={2}>Administrar nodos</Title>
            <Divider />
            
            <NodesTable
                onDelete={deleteNode} 
                error={error}
                loading={isLoading}
                nodes={nodes}/>
        </div>
    )
}

export default Nodes;