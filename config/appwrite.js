const sdk = require('node-appwrite');

let client = new sdk.Client();

client
    .setEndpoint('https://aploscreative.dev/v1') // Your API Endpoint
    .setProject('60aeec8c93f11') // Your project ID
    .setKey('8655784ce5438305a44eb2a41ef169663c252911a0022254aaf6098c232a7b9ef9f40cf60b381d9f799a544e4275be5138838eab4f699b61c19a0457fd5d51fbdfc1d6641df095cd28ac911c8e6ffe362dd0fb1323ba95c87e9408583176940275b6ec0aa6e8c22e5bd748b20df23e69d0359b7ee2a57f393f7f3753368259f9') // Your secret API key
    ;

export default client