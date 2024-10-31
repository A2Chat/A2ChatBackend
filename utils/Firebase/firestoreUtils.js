const admin = require('../../configs/firebaseConfig')
const { getFirestore } = require("firebase-admin/firestore");

let db; //global variable to connection to DB 
connectToFireStore() 

//connects to firestore 
async function connectToFireStore() {
    console.log("Attemping to connect to Firestore...")
    try {
        db = getFirestore() 
        console.log("Connection to Firestore succesful")
    } catch(error) {
        console.error("Error connecting to Firestore,", error) 
    } 
}

//Schema for firestore document 
function documentSchema(lobbyCode) {    
    const schema = {
        isActive: true,
        lobbyCode: lobbyCode,
        users: []
    };

    return schema;
}

//creating a document in firestore 
async function createLobby(lobbyCode) {
    if(!db) {
        console.error("Firestore instance is not initialized")
    } 

    try {
        let lobbies =  db.collection('lobbies')
        await lobbies.doc(lobbyCode).set(documentSchema(lobbyCode))
        console.log(`lobby created succesfully with join code ${lobbyCode}`)

    } catch(error) {
        console.error("Error while creating lobby:", error)
    }
}

//deleting a lobby in firestore
async function deleteLobby(lobbyId) {
    console.log(`Attemping to deleteLobby: ${lobbyId}`)
        
    try {
        let lobbies = db.collection('lobbies')
        let document = lobbies.doc(lobbyId)

        let documentExists = await document.get() 

        if(!documentExists.exists) {
            console.error(`document ${LobbyId} does not exist`)
            return { success: false, message: `Lobby: ${LobbyId} does not exist`}
        }

        await document.delete()
        return {success: true, message: `Lobby: ${lobbyId} deleted succesfully`}

    } catch(error) {
        console.error(`error: ${error}`) 
        return {success: false, message: `An error occured while deleting ${lobbyId}:, ${error.message}`}
    }
}

async function addUserToLobby(lobbyId, UID) {
    try {
        let docRef = db.collection('lobbies').doc(lobbyId)
        
        //check if document exists 
        let snapshot = await docRef.get() 
        if(!snapshot.exists) {
            return {success: false, message: `Lobby: ${lobbyId} does not exists`}
        }

        //add user to the users field of lobby 
        await docRef.update({
            users: admin.firestore.FieldValue.arrayUnion(UID)
        })

        return{success: true, message: `user ${UID} added succesffuly to lobby`}
        
    } catch (error) {
        console.error(error)
        return {success: false, message: 'An error has occured when trying to update the lobby'}
    }
}

module.exports = { createLobby, deleteLobby, addUserToLobby}