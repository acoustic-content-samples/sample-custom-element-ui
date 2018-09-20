# Sample UI extension for a dropdown selection with values from a 3rd party API

A sample which provides a color picker that displays the inbuilt browser color picker, letting the content creator specify a color visually.  The value for the selected color is stored in the underlying text element.

The picker is generated in the sample by including an HTML5 input element tag <`input id="colorPicker" type="color" onInput="onInput()">` in the UI extension HTML.

## Screenshot

![screen shot 2018-09-20 at 2 03 12 pm](https://media.github.ibm.com/user/152536/files/f6f91278-bcdd-11e8-9986-02d2c4ee0be0)


## Installing the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I```

A new "Color picker" element will now be available in the content type palette. This element can then be included in other content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-colorpicker/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

Edit the JavaScript in the file ```content-artifacts/assets/dxauth/ui-extension-colorpicker/index.html``` to customise the sample according to your preferences.
