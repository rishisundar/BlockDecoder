require('dotenv').config()
const axios = require('axios');

async function verifyGethNodeCredentials() {
    const url = process.env.GETH_NODE_URL;
    const username = process.env.GETH_NODE_USERNAME;
    const password = process.env.GETH_NODE_PASSWORD;
    const auth = {
        username: username,
        password: password
    }
    const response = await axios({
        method: 'get',
        url: url,
        auth: auth,
        data: {
            "jsonrpc": "2.0",
            "method": "net_listening",
            "params": [],
            "id": 1
        }
    }).catch(error => {
        console.log(error);
    });
    if(response.status !== 200) {
        console.log("Error: " + response.status);
    } else {
        const listeningStatus = response.data.result;
        if(listeningStatus) {
            console.log("Geth node is listening");
        } else {
            console.error("Geth node is not listening");
        }
        process.exit();
    }
}

verifyGethNodeCredentials();