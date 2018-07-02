# Sample custom element user interfaces

A collection of Samples that extend the Authoring interface of Watson Content Hub. Each of the samples customises the
user interface of an element.

These are the 'core' samples that are fully working and documented. Additionally, there are 'extra' samples that are more rough here - https://github.ibm.com/DX/sample-ui-extensions-ext.

## The sample custom element UIs

### Dropdown with selections coming from a 3rd party API

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-dropdown

### Category selection from a custom taxonomy

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-category

### Google Maps location selection

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-map

### Custom rich text editor

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-rte

### Emails address showing custom validation

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-email

## Installing all of the custom element UIs

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Run

```chmod 777 ./install.sh```
```./install.sh```

Enter you IBM ID password at the prompts.

## Creating you own Custom UI

To create you own Custom UI, copy the patterns shown in the samples.

Include the Javascript for the SDKs in your index.html using:

```html
<script src="https://www.digitalexperience.ibm.com/auth/ibm-wch-ui-extensions.js"></script>
```

For information on how to use the SDK, see [ibm-wch-sdk-ui-extensions](https://github.ibm.com/DX/ibm-wch-sdk-ui-extensions).

Write your Custom UI and push the assets into the hub, as per the above instructions for the samples. Finally,
enable the Custom UI in the content type that is using it.

## Running, testing and debugging Custom UIs locally

In order to run/testing/debugging your Custom UI it is useful to be able to run the Custom UI locally (ie on localhost) and have them show up in the WCH Authoring UI. To do this, follow these steps:

First create a self-signed certificate and fill in the given details:

```openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem```

Install http-server from npm and serve your files locally

```npm install http-server -g```
```http-server <path> -p 3000 -S -C cert.pem -o```

For example:

```http-server content-artifacts/assets -p 3000 -S -C cert.pem -o```

This will allow you to point to the custom UI using the following url:

```https://localhost:3000/dxauth/ui-extension-<extension_name>/index.html```

For example:

```https://localhost:3000/dxauth/ui-extension-email/index.html```
