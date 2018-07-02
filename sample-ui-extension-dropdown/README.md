# Sample UI extension for a dropdown selection with values from a 3rd party API

A samples that extends the Authoring interface of IBM Watson Content Hub to provide a dropdown selector for a content field. The available selections come from a Rest API. The dropdown can be used within a content item to select a value for the content element. The dropdown is styled to look like the other dropdowns in the WCH UI, such as for the options selection element. The sample is written in 'vanilla JS' (http://vanilla-js.com/) with no framework dependencies. The selection is stored in a text element.

For the sake of a simple example, the selections are Beatles songs that come from the Apple iTunes API, which does not require an API Key. The content author can select a Beatles song.

Typically, this sample will be customised to point to a different Rest API that may require an API key or other authentication, and that will return a different JSON representation. Such customisation should be relatilvey straightforward and localised to a small part of the sample.

## Installing the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I```

A new "Song selection" element will now be available in the content type palette. This element can then be included in other content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-dropdown/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

Edit the JavaScript in the file ```content-artifacts/assets/dxauth/ui-extension-dropdown/js/dropdown.js``` to customise the sample according to the URL, authentication mechanism and JSON response of the Rest API that you intend to use.

