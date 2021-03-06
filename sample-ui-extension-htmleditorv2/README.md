# Sample UI extension for a HTML Editor using assets for storage

This sample is an HTML, JS and CSS editor element with syntax highlighting. Useful for pasting in snippets of HTML and 'inline' JS and CSS into a page. This sample is based on CodeMirror (https://codemirror.net/).

The sample saves the HTML as a file asset. The content item references the file asset using a file element. The reason for this is that (1) file assets can be any size, where content item are limited in size and (2) the file assets can then be accessed via the Acoustic Content dev tools in a more natural way - as files, rather than as HTML embedded (and JSON escaped) in JSON.

The sample is a good example of a more general pattern - wrapping an asset in a content item in order to provide a custom interface for the asset.

## Screenshot

![screen shot 2018-09-10 at 4 33 16 pm](https://media.github.ibm.com/user/152536/files/4cde23d2-b517-11e8-9a2b-b8d1f051af3a)

## Installing the sample into Acoustic Content

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I --publish-now```

A new "Long HTML" element will now be available in the content type palette. This element can then be included in other content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-htmleditorv2/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

Edit the JavaScript in the file ```content-artifacts/assets/dxauth/ui-extension-htmleditor/js/htmleditor.js``` to customise the sample according to CodeMirror settings that you wish to use.
