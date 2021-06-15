import axios from 'axios'
import { createToken } from '../utils/fire'
import { BACKEND_URL } from '../utils/config'

export const addNodeDB = async (ID) => {
    const header = await createToken();
    const url = `${BACKEND_URL}/admin/add-node`

    const payload = {
        ID
    }
    
    await axios.post(url, payload, header);    
}

export const deleteNodeDB = async (node) => {
    const header = await createToken();
    const url = `${BACKEND_URL}/admin/delete-node`

    const payload = {
        ID: node.ID
    }

    await axios.post(url, payload, header); 
}