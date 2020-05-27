# Sample of UI extension for a custom Rich Text Editor

A sample that extends the Authoring interface of Acoustic Content to provide a custom Rich Text Editor. The rich text (html) is stored in a formatted text element.

The sample is based on the CKEditor5 'Classic editor' at: https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/basic-api.html

The Rich text editor that is in the sample is similar to the default editor that is provided in Acoustic Content for formatted text elements (which is CKEditor 4). It contains a single extra button for insert blockquotes. This is a simple example of how the features that are provided by the rich text editor can be customised. In the same way, other rich text editor features could be added as required, such as a dropdown menu could be provided to apply custom styles, and so forth.

Equally, it would be possible to use any other Rich Text Editor, such as TextboxIO, TinyMCE, CKEditor4 etc. The websites for each of the rich text editors provide a UI to customise the editor, such as by adding and removing toolbar buttons. A customised version of the editor can then be downloaded, and then uploaded as an asset in WCH, in the same way that is done for this sample.

The sample is written in Javascript with no framework dependencies.

A note on security and active content: The html that is created by the rich text element is stored in a formatted text element. This is important, since the SPA will mostly likely render the HTML in this element without HTML escaping, for instance using Angular's ```ng-bind-html-unsafe```. The HTML in the formatted text element must therefore be protected against malicious active content. The WCH APIs for the formatted text element provide such protection by preventing the use of active content such as ```<script>``` tags. HTML should always be escaped (which is the default for all common SPA frameworks), unless the HTML is stored via a formatted text element.

## Screenshot

![image](https://user-images.githubusercontent.com/7553535/42615931-a3c1374a-85ef-11e8-85af-dcd10a91aa96.png)

## Install the sample into Acoustic Content

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I --publish-now```

The "Rich Text" custom element group is now available for use in your content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-rte/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

