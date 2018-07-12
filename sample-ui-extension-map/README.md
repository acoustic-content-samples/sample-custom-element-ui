# Sample of UI extension to provide a Google map location selector

A samples that extends the Authoring interface of Watson Content Hub to provide a Google map location selector. The location is stored in a location element. The sample is written in 'vanilla JS' (http://vanilla-js.com/) with no framework dependencies.

Based on the example at: https://developers.google.com/maps/documentation/javascript/examples/marker-simple

This is a very simple map that just allows selection of a location. To produce a better user experience, this example could be extended to use the Google Map APIs to allow for searching for locations by address etc. The address would then probably be stored as a text element, in addition to storing the long/lat of the selected location. It would also be possible to use an alternative mapping API such as OpenMaps.

As for any location element, the selected location can then be searched on. For example, the WCH Search APIs can be used to find all content items that are close to the user's current location. To enable this, the location element's 'search key' should be set.

The Google Maps API requires an API key. See here for more information: https://developers.google.com/maps/documentation/javascript/get-api-key. The sample contains an API key that is for demo use only. The API key in index.html can be replaced with your own Google API key. However, be aware that assets uploaded to WCH will always be published to the public internet. This is a limitation that WCH hopes to address in the future. For now, do not enter an API key here that you do not wish to be made public to all.

## Screenshot

![image](https://user-images.githubusercontent.com/7553535/42616061-3109358a-85f0-11e8-84ff-d19fb2ee595b.png)

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.

Download this repository. From the content-artifacts directory under this folder run

```wchtools push -A -v -I```

The "Map location" element is now available for use in your content types.

Alternatively, you can customise the display of an existing text element in one of your content types to display the UI extension by setting the "custom design" to be:

```/dxauth/ui-extension-map/index.html```

## Customising the sample.

Fork and then download the sample. To run the sample locally, simply open the ```index.html``` file in your browser using your file explorer or IDE. There is no build required. Edit the files and refresh the browser to test the extension. When the changes are complete, push the updated extension back to the hub.

