const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccount.json')

//Inizializa el Firebase SDK para su uso en la apicación
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

module.exports = {
    admin: admin,
    db: db
}