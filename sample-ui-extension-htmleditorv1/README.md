# Sample UI extension for a HTML Editor using assets for storage

This sample is an HTML, JS and CSS editor element with syntax highlighting. Useful for pasting in snippets of HTML and 'inline' JS and CSS into a page. This sample is based on CodeMirror (https://codemirror.net/).

The sample saves the HTML as a simple text element. If you would like to save the HTML content as a file element asset instead, please refer to `HTML Editor v1`.

## Screenshot

![screen shot 2018-09-20 at 1 57 06 pm](https://media.github.ibm.com/user/152536/files/172475fc-bcdd-11e8-96ee-d04eef326521)

## Installing the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I```

A new "HTML editor v1" element will now be available in the content type palette. This element can then be included in other content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-htmleditorv1/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

Edit the JavaScript in the file ```content-artifacts/assets/dxauth/ui-extension-htmleditorv1/index.html``` to customise the sample according to CodeMirror settings that you wish to use.
