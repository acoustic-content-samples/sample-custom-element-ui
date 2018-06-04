# Sample of UI extension for a custom Rich Text Editor

A sample that extends the Authoring interface of Watson Content Hub to provide a custom Rich Text Editor. The rich text (html) is stored in a formatted text element.

The sample is based on the CKEditor5 'Classic editor' at: https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/basic-api.html

Equally, it would be possible to use any other Rich Text Editor, such as TextboxIO, TinyMCE, CKEditor4 etc. The websites for each of the rich text editors provide a UI to customise the editor, such as by adding and removing toolbar buttons. A customised version of the editor can then be downloaded, and then uploaded as an asset in WCH, in the same way that is done for this sample.

The sample is written in 'vanilla JS' (http://vanilla-js.com/) with no framework dependencies.

A note on security and active content: The html that is created by the rich text element is stored in a formatted text element. This is important, since the SPA will mostly likely render the HTML in this element without HTML escaping, for instance using Angular's ```ng-bind-html-unsafe```. The HTML in the formatted text element must therefore be protected again malicious active content. The WCH APIs for the formatted text element provide such protection by preventing the use of active content such as ```<script>``` tags. HTML should always be escaped (which is the default for all common SPA frameworks), unless the HTML is stored via a formatted text element.

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Note: make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.
From the root directory, run npm run build and npm run deploy.

Download this repository. From the ```content-artifacts``` directory of this repository run

```wchtools push -A -v -f -I```

The "Rich Text" custom element group is now available for use in your content types.

The UI extension is now available at the URL:

```<Hub Delivery URL>/dxauth/ui-extension-rte/index.html```

where your API URL is available from the Hub Information UI.

To use the "Rich Text" element, update the "Custom display for the canvas" to this URL. Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom display" to be this URL.

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

## The UI extensions SDK

The sample uses the UI extensions SDK documented here - https://github.ibm.com/DX/ibm-wch-sdk-ui-extensions
