const firebaseAdmin = require('../utils/firebaseAdmin')

const db = firebaseAdmin.db;

const isValidator = async (id) => {
    console.log('is a validator?', id)

    const node = await db.collection('nodes').doc(id).get() 

    return node.exists
}

const getNodes = async () => {
    console.log('hay alguien aqui?')
    let nodes = []; 

    const querySnapshot = await db.collection('nodes')
                                    .get()

    querySnapshot.forEach((doc) => {
        nodes.push(doc.data())
    });

    return nodes;
}

const addNode = async (id) => {
    await db.collection('nodes')
            .doc(id).set({
                ID: id
            })
}

const deleteNode = async (id) => {
    await db.collection('nodes')
            .doc(id)
            .delete()
}

module.exports = {
    getNodes,
    addNode,
    deleteNode,
    isValidator
}