# Sample UI Extensions

A collection of Samples that extend the Authoring interface of Watson Content Hub. Each of the samples customised the
user interface of an element.

# Installation

## Run the sample locally.

Simply open the index.html file for any of the examples in your browser using your file explorer or IDE. There is no
build required.

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Note: make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.
From the root directory, run npm run build and npm run deploy.

From the root directory of this repository run

```wchtools push -A -v -f```

Next enable one of your content types to display the UI extension by setting

```"ui-extensions": {"element":"/dxauth/ui-extension-dropdown/index.html"}```

or by using the user interface.

## The plugins

### Dropdown

A sample that provides a custom dropdown where the seletions come from a 3rd party Rest API. The dropdown can be used
within a content item to select a value for the content element. The dropdown is styled to look
like the other dropdowns in the WCH UI, such as for the options selection element. It is written in 'vanilla JS' with no framework
dependencies. The selection is stored in a text element.

The selections come from the Apple iTunes API, which does not require an API Key.

Based on https://github.com/zoltantothcom/vanilla-js-dropdown

### Multilevel dropdown

A sample that provides a multilevel dropdown. The selections are hardcoded in the sample, but could easily come from
a 3rd party Rest API. The mulit-select dropdown is styled to look like the other dropdowns in the WCH UI, such as for the category
element. It uses JQuery.

Based on https://www.jqueryscript.net/menu/Animated-Multi-level-jQuery-Dropdown-Plugin.html

### Map

A sample that allows the selection of a location using a map. The selected location is stored in a location element. The map
can be customised to start at any position, or to add an address search box etc.

Based on example at https://developers.google.com/maps/documentation/javascript/examples/marker-simple

Replace the API key index.html with your Google API key by following the instructions here:
https://developers.google.com/maps/documentation/javascript/get-api-key

It would also be possible to use an alternative mapping API such as OpenMaps.

### Rich text editor

A sample that shows how a rich text editor can be customised and then used to store rich text in a formatted text element.

Based on the CKEditor5 'Classic editor' at: https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/basic-api.html

Equally, it would be possible to use any other Rich Text Editor, such as TextboxIO, TinyMCE, CKEditor4 etc. The websites for
each of the rich text editors provide a UI to customise the editor and then download a customised version of the editor which
can then be used by uploading it as an asset in WCH, in the same way that this sample does.


