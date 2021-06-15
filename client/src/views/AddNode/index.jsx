import React, { useState } from 'react'
import { Typography, Divider, Button, Input, Space, message } from 'antd';
import { addNodeDB } from '../../services/nodeService'

const { Title } = Typography

const AddNode = (props) => {
    const [nodeID, setNodeID] = useState('')

    const addNode = async () => {
        console.log('add node', nodeID)
        try {
            await addNodeDB(nodeID)
            message.success(`Node ${nodeID} has been added successfully`)
            props.history.push('/')
        } catch (e) {
            console.error(e)
            message.error(`Node ${nodeID} could not be added`)
        }
    }

    return (
        <div className="main">
            <Title level={2}>Añadir un nodo</Title>
            <Divider />

            <Space direction="horizontal" align="center" size={20}>
                <Input 
                    size="large" 
                    placeholder="ID del nodo"
                    onChange={(e) => setNodeID(e.target.value)}
                />
                <Button type="primary" onClick={addNode}>Añadir</Button>
            </Space>

        </div>
    )
}

export default AddNode