# Sample custom element user interface extensions

A collection of Samples that extend the Authoring interface of Acoustic Content (formerly Watson Content Hub) with custom elements that have custom user interface extensions.

## Demo video

https://youtu.be/Jxsec98SUBQ

## The sample custom elements

### Dropdown with selections coming from a 3rd party API

More information: [Dropdown Song Selector](sample-ui-extension-dropdown)

### Category selection from a custom taxonomy

More information: [Custom Category Selector](sample-ui-extension-category)

### Color element

More information: [Color element](sample-ui-extension-colorpicker)

### Google Maps location selection

More information: [Google Maps Location Selector](sample-ui-extension-map)

### Custom rich text editor

More information: [Custom CKEditor](sample-ui-extension-rte)

### Email address showing custom validation

More information: [Email Address with Validation](sample-ui-extension-email)

### HTML editor on a file asset

More information: [HTML Editor on file asset](sample-ui-extension-htmleditorv2)

### HTML editor on a text element

More information: [HTML Editor on text element](sample-ui-extension-htmleditorv1)

## Installing all of the custom element user interface extensions

Install the latest version of wchtools-cli:

Windows: ```npm install -g wchtools-cli ```

Linux/Mac: ```sudo npm install -g wchtools-cli```

Make sure that you have initialized wchtools with your user and tenant API URL using:

```wchtools init```

You will be prompted for your user password when deploying to the tenant. For more information, refer to https://github.com/ibm-wch/wchtools-cli.

To install all the custom element user interface extensions, run:

```chmod 777 ./install.sh```

```./install.sh```

Enter you IBM ID password at the prompts.

## Creating you own Custom elements

To create you own Custom elements with custom user interface extensions, copy the patterns shown in the samples.

Include the JavaScript library for the UI extensions in your index.html using:

```html
<script src="https://www.digitalexperience.ibm.com/auth/ibm-wch-ui-extensions.js"></script>
```

**NOTE:** If testing UI extensions on a different environment, the above URL **must** be modified to point to the correct domain:

```html
<script src="https://www.<WCH-DOMAIN>/auth/ibm-wch-ui-extensions.js"></script>
```

For information on how to use the JavaScript library, see https://www.npmjs.com/package/@ibm-wch/ui-extensions.

Write your Custom UI and push the assets into the hub, as per the above instructions for the samples. Finally,
enable the Custom UI in the content type that is using it, again, as shown in the samples.

## Running, testing and debugging custom user interface extensions locally

Whilst developing Customer user interfaces, we do not recommend that you push the user interface to the hub each time that you make an updates. A much faster way to run/testing/debugging your Custom UI is to run the Custom user interface extension locally (ie on localhost), and point the element in the WCH Authoring UI at the UI extension running on your localhost. To do this, follow these steps:

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

Enter this URL in the WCH Authoring UI for the element for which wish to use a custom UI.

When you have completed development, push the custom UI files to the hub for final testing and use. The web files in the hub are cached by Akamai for 10 minutes, so you will not see these updates appear in the WCH Authoring UI for 10 minutes after they are pushed.

### UI Extension development toolkit

We have also developed a toolkit that provides a mock of the Acoustic Content (WCH) Authoring Custom user interface extension environment that runs locally. The use of the toolkit is optional - use it only if you find it helpful. It allows a developer to write their extension, configure the input, inspect the output and test it in a local web page on their computer. In this way, an extension can be developer and tested without the requirement for a localhost server or pushing the files to a WCH hub. This can be accessed via the following link: [UI Extension development toolkit](ui-extensions-dev-toolkit). When development and testing of the custom UI extension is complete, the files can then be run from localhost as described above, and then push the files to the WCH hub for final testing and use.

