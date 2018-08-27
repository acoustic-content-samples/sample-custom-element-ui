# Sample custom elements

A collection of Samples that extend the Authoring interface of Watson Content Hub with custom elements that have custom user interface extensions.

## Demo video

https://youtu.be/Jxsec98SUBQ

## The sample custom elements

### Dropdown with selections coming from a 3rd party API

More information: [Dropdown Song Selector](sample-ui-extension-dropdown)

### Category selection from a custom taxonomy

More information: [Custom Category Selector](sample-ui-extension-category)

### Google Maps location selection

More information: [Google Maps Location Selector](sample-ui-extension-map)

### Custom rich text editor

More information: [Custom CKEditor](sample-ui-extension-rte)

### Emails address showing custom validation

More information: [Email Address with Validation](sample-ui-extension-email)

## Installing all of the custom element UIs

Install the latest version of wchtools-cli:

Windows: ```npm install -g wchtools-cli ```

Linux/Mac: ```sudo npm install -g wchtools-cli```

Make sure that you have initialized wchtools with your user and tenant API URL using:

```wchtools init```

You will be prompted for your user password when deploying to the tenant. For more information, refer to https://github.com/ibm-wch/wchtools-cli.

To install all the custom element UIs, run:

```chmod 777 ./install.sh```

```./install.sh```

Enter you IBM ID password at the prompts.

## Creating you own Custom elements

To create you own Custom elements with custom user interface extensions, copy the patterns shown in the samples.

Include the JavaScript library for the UI extensions in your index.html using:

```html
<script src="https://www.digitalexperience.ibm.com/auth/ibm-wch-ui-extensions.js"></script>
```

For information on how to use the JavaScript library, see https://www.npmjs.com/package/@ibm-wch/ui-extensions.

Write your Custom UI and push the assets into the hub, as per the above instructions for the samples. Finally,
enable the Custom UI in the content type that is using it, again, as shown in the samples.

## Running, testing and debugging Custom UIs locally

In order to run/testing/debugging your Custom UI it is useful to be able to run the Custom UI locally (ie on localhost) and have them show up in the WCH Authoring UI. To do this, follow these steps:

First create a self-signed certificate and fill in the given details:

```openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem```

Install http-server from npm and serve your files locally

```npm install http-server -g```
```http-server <path> -p 3000 -S -C cert.pem -o```

For example:

```http-server content-artifacts/assets -p 3000 -S -C cert.pem -o```

This will allow you to point to the custom user interface extension using the following url:

```https://localhost:3000/dxauth/ui-extension-<extension_name>/index.html```

For example:

```https://localhost:3000/dxauth/ui-extension-email/index.html```
