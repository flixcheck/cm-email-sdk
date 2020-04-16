# CM E-Mail SDK

Made by [Flixcheck GmbH](https://www.flixcheck.de)

## Introduction

This is a very simple JavaScipt SDK for CM's e-mail campaign service.

## Installation

`npm install cm-email-sdk`

## Usage

``` javascript
const CmEmailClient = require("cm-email-sdk");

const client = new CmEmailClient(accountId, productToken);

await client.setFrom(
    "my-added-address@my-validated-domain.com",
    "Some Sendername"
);

await client.send(
    "recipient@example.com",
    "Bob Dylan",
    "Welcome, Bob!",
    "This is a test e-mail.\n\nDid it arrive?"
);
```

For more examples check out the `/examples` folder.
