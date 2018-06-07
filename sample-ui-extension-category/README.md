# Sample UI extension for a category selection from a custom taxonomy

A samples that extends the Authoring interface of Watson Content Hub to provide a category selector. The selections are hardcoded as a JSON file in the sample, but can easily be customised to come from a 3rd party Rest API. The multi-level category selection widget is styled to look like the other dropdowns in the WCH UI, such as for the category element. 

To customise the source of the selections, edit the file ```content-artifacts/assets/dxauth/ui-extension-category/js/category.js``` to use your Rest API, rather than using the fixed JSON that is supplied there for demonstration purposes.

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -f```

The "Custom Category" element is now available for use in your content types. This element can then be included in other content types.

The UI extension is now available at the URL: 

```<Hub Delivery URL>/dxauth/ui-extension-category/index.html```

where your Hub Delivery URL is available from the Hub Information UI. 

To use the "Custom Category" element, update the "Custom display for the canvas" to this URL. Alternatively, you can customise the display
of an existing text element in one of your content types to display the UI extension by setting the "custom display" to be this URL. The
text element must be have the option "Allow multiple text fields" set on, to allow for the multiple category selections.

## Run the sample locally.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

Edit the HTML and directives in `content-artifacts/assets/dxauth/ui-extension-category/index.html` and the JavaScript in `content-artifacts/assets/dxauth/ui-extension-category/js/category.js` to customise the sample according to the URL, authentication mechanism and JSON response of the Rest API that you intend to use.

## The UI extensions SDK

The sample uses the UI extensions SDK documented here - https://github.ibm.com/DX/ibm-wch-sdk-ui-extensions
