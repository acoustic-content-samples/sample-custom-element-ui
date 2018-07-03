# Sample of UI extension for an email element

A samples that extends the Authoring interface of Watson Content Hub to provide a email entry field. A custom validation ensures that the entered text is a valid email address. The email address is stored in a text field.

## Screenshots

![screen shot 2018-07-03 at 10 00 15 am](https://media.github.ibm.com/user/152536/files/3093885c-7eb2-11e8-9b4f-c4105b352da3)
![screen shot 2018-07-03 at 10 00 25 am](https://media.github.ibm.com/user/152536/files/30c8fa00-7eb2-11e8-9dfa-1ccb78600c26)

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I```

The "Email" element is now available for use in your content types. This element can then be included in other content types.


Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-email/index.html```


## Run the sample locally

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

