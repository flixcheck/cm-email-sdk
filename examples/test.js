const fs = require("fs");
const CmEmailClient = require("../index");

const accountId = process.env.CM_ACCOUNT_ID;
const productToken = process.env.CM_PRODUCT_TOKEN;
if (!accountId || !productToken) {
    console.error("Env vars CM_ACCOUNT_ID and CM_PRODUCT_TOKEN not set!");
    process.exit(1);
}

const client = new CmEmailClient(accountId, productToken);

async function testSimple() {
    try {
        await client.setFrom("my-validated-sender@somedomain.com", "My Sender Name");
        await client.send("recipient@example.com", "Bob Smith", "Welcome, Bob!", "This is a test e-mail.\n\nDid it arrive?");
    } catch (error) {
        console.error(error);
    }
}

async function testAttachment() {
    try {
        const attachments = [{
            buffer: fs.readFileSync(__dirname + "/logo.png"),
            filename: "Logo.png"
        }];
        await client.setFrom("my-validated-sender@somedomain.com", "My Sender Name");
        await client.send("recipient@example.com", "Bob Smith", "Logo", "This is our logo.", attachments);
    } catch (error) {
        console.error(error);
    }
}

testSimple();
testAttachment();
