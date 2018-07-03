# Sample of UI extension for a custom Rich Text Editor

A sample that extends the Authoring interface of Watson Content Hub to provide a custom Rich Text Editor. The rich text (html) is stored in a formatted text element.

The sample is based on the CKEditor5 'Classic editor' at: https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/basic-api.html

Equally, it would be possible to use any other Rich Text Editor, such as TextboxIO, TinyMCE, CKEditor4 etc. The websites for each of the rich text editors provide a UI to customise the editor, such as by adding and removing toolbar buttons. A customised version of the editor can then be downloaded, and then uploaded as an asset in WCH, in the same way that is done for this sample.

The sample is written in Javascript with no framework dependencies.

A note on security and active content: The html that is created by the rich text element is stored in a formatted text element. This is important, since the SPA will mostly likely render the HTML in this element without HTML escaping, for instance using Angular's ```ng-bind-html-unsafe```. The HTML in the formatted text element must therefore be protected against malicious active content. The WCH APIs for the formatted text element provide such protection by preventing the use of active content such as ```<script>``` tags. HTML should always be escaped (which is the default for all common SPA frameworks), unless the HTML is stored via a formatted text element.

## Screenshot

![screen shot 2018-07-03 at 9 51 48 am](https://media.github.ibm.com/user/152536/files/23b8d376-7eb2-11e8-8a71-009433bb0b6d)

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I```

The "Rich Text" custom element group is now available for use in your content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-rte/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

