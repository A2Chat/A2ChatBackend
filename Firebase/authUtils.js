const admin = require('firebase-admin');
const serviceAccount = require('../google-services.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//returns the first 10 users if firebase is working 
//if no users show up then firebase is not working 
const checkAuthConnection = async () => {
    try {
        const auth = admin.auth();
        const listUsersResult = await auth.listUsers(10);
        return {
            success: true,
            userCount: listUsersResult.users.length,
            users: listUsersResult.users.map(user => ({ uid: user.uid }))
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};

module.exports = {
    checkAuthConnection
};