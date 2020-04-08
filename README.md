# CM E-Mail SDK

Made by [Flixcheck GmbH](https://www.flixcheck.de)

## Introduction

This is a very simple JavaScipt SDK for CM's e-mail campaign service.

## Installation

TODO

## Usage

``` javascript
const CmEmailClient = require("TODO");

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
