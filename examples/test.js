const CmEmailClient = require("../index");

const accountId = process.env.CM_ACCOUNT_ID;
const productToken = process.env.CM_PRODUCT_TOKEN;
if (!accountId || !productToken) {
    console.error("Env vars CM_ACCOUNT_ID and CM_PRODUCT_TOKEN not set!");
    process.exit(1);
}

const client = new CmEmailClient(accountId, productToken);

async function test() {
    try {
        await client.setFrom("dev@adapter.flixcheck.com", "Flixcheck Development");
        await client.send("recipient@example.com", "Bob Dylan", "Welcome, Bob!", "This is a test e-mail.\n\nDid it arrive?");
    } catch (error) {
        console.error(error);
    }
}

test();
