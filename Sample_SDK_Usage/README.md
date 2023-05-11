# Rett Behrens LOTR SDK Sample Usage
This project demonstrates how to use [rett-behrens-lotr-sdk](https://www.npmjs.com/package/rett-behrens-lotr-sdk).

## Setup
```
git clone git@github.com:RettBehrens/rett_behrens_lotr_sdk.git
cd rett_behrens_lotr_sdk/Sample_SDK_Usage
```

### Configure with your access token
The LOTR API rquires a valid access token in order to make API requests to the server. To obtain an access token sign up for a [LOTR API user account](https://the-one-api.dev/sign-up). Upon sign up you will be presented with an access token. You can also revisit your [account page](https://the-one-api.dev/account) to retrieve your access token at any time. Create a `.env` file in the root of your project or rename & replace the variable in the provided `example.env` file with your unique access token
```
LOTR_TOKEN = "xxxxxxxuxxxxxxxxxx-x"
```

### Running the script

```sh
npm install
node index.js
```