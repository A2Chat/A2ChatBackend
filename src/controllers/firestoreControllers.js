
const {generateCode} = require('../services/codeGenerationService')
const firestoreServices = require('../services/firestoreService') 

//TODO: add more specific error codes for all functions
const createLobby = async (req, res) => {
    try {
        const generated_code = await generateCode()
        const lobbyCode = await firestoreServices.createLobby(generated_code)

        res.status(200).json({"code" : lobbyCode})
        console.log(`Request from IP from create lobby: ${req.ip}`);
                
    } catch (error) {
        console.error(`Error during api call: /firestore/createLobby: ${error.message}`)
        res.status(500).json( {"error" : "Failed to create Lobby"})
    }
}

const deleteLobby = async (req, res) => {
    const { lobbyId } = req.body; // Getting lobbyId from route parameters

    try {
        await firestoreServices.deleteLobby(lobbyId);
        
        res.status(200).json({
            "message": `Lobby ${lobbyId} deleted successfully`
        })
        
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while deleting the lobby' });
    }
}

const addUserToLobby = async(req, res) => {
    const { lobbyId, uid } = req.body

    try{
        await firestoreServices.addUserToLobby(lobbyId, uid)
        
        res.status(200).json({
            "message": `user ${uid} added succesffuly to lobby ${lobbyId}`
        }
        )
        
    } catch(error) {
        console.error(`Failed to add user ${uid} from lobby ${lobbyId}: ${error.message}`)
        res.status(500).json( {"error" : `Failed to add user ${uid} from lobby ${lobbyId}`})
    }
}

const removeUsersFromLobby = async(req, res) => {
    const {lobbyId, uid} = req.params 

    try {
        const result = await firestoreServices.removeUserFromLobby(lobbyId, uid)
        if(result.success) {
            res.status(200).json({"message" : result.message })
        } 

    } catch(error) {
        console.error(`Error while trying to remove user ${uid} from lobby ${lobbyId}`)
        res.status(500).json({"error" : `Failed to remove user ${uid} from lobby ${lobbyId}`})
    }
}

module.exports = {createLobby, deleteLobby, addUserToLobby, removeUsersFromLobby}