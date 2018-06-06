# Sample UI Extensions

A collection of Samples that extend the Authoring interface of Watson Content Hub. Each of the samples customised the
user interface of an element.

These are the 'core' samples that are fully working and documented. Additionally, there are 'extension' samples that are more rough here - https://github.ibm.com/DX/sample-ui-extensions-ext.

## The sample extensions

### Dropdown

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-dropdown

### Category selection from a custom category

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-category

### Google Maps location selection

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-map

### Custom rich text editor

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-rte

### Emails address showing custom validation

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-email

## Creating you own UI Extension

To create you own UI extension, copy the patterns shown in the samples.

Include the Javascript for the SDKs in your index.html using:

```html
<script src="https://unpkg.com/post-robot/dist/post-robot.min.js"></script>
<script src="https://unpkg.com/@ibm-wch/ui-extensions/dist/ibm-wch-sdk-ui-extensions.js"></script>
```

For information on how to use the SDK, see [ibm-wch-sdk-ui-extensions](https://github.ibm.com/DX/ibm-wch-sdk-ui-extensions).

Write your UI extension and push the assets into the hub, as per the above instructions for the samples. Finally,
enable the UI extension in the content type that is using it.

## Running, testing and debugging UI extensions locally

In order to run/testing/debugging your UI extensions it is useful to be able to run the UI extension locally (ie on localhost) and have them show up in the WCH Authoring UI. To do this, follow these steps: 

First create a self-signed certificate and fill in the given details:

```openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem```

Install http-server from npm and serve your files locally

```npm install http-server -g```
```http-server <path> -p 3000 -S -C cert.pem -o```

For example:

```http-server content-artifacts/assets -p 3000 -S -C cert.pem -o```

This will allow you to point to the extension using the following url:

```https://localhost:3000/dxauth/ui-extension-<extension_name>/index.html```

For example:

```https://localhost:3000/dxauth/ui-extension-email/index.html```
