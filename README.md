# Sample UI Extensions

A collection of Samples that extend the Authoring interface of Watson Content Hub. Each of the samples customised the
user interface of an element.

# Installation

## Run the sample locally.

Simply open the index.html file for any of the examples in your browser using your file explorer or IDE. There is no
build required.

## The plugins

### Dropdown

A sample that provides a custom dropdown where the seletions come from a 3rd party Rest API. The dropdown can be used
within a content item to select a value for the content element. The dropdown is styled to look
like the other dropdowns in the WCH UI, such as for the options selection element. The sample is written in 'vanilla JS'
(http://vanilla-js.com/) with no framework dependencies. The selection is stored in a text element.

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

It would also be possible to use an alternative mapping API such as OpenMaps. The sample is written in 'vanilla JS'
(http://vanilla-js.com/) with no framework dependencies.

### Rich text editor

A sample that shows how a rich text editor can be customised and then used to store rich text in a formatted text element.

Based on the CKEditor5 'Classic editor' at: https://docs.ckeditor.com/ckeditor5/latest/builds/guides/integration/basic-api.html

Equally, it would be possible to use any other Rich Text Editor, such as TextboxIO, TinyMCE, CKEditor4 etc. The websites for
each of the rich text editors provide a UI to customise the editor and then download a customised version of the editor which
can then be used by uploading it as an asset in WCH, in the same way that this sample does. The sample is written in 'vanilla JS'
(http://vanilla-js.com/) with no framework dependencies.

### Category selector

A samples that extends the Authoring interface of Watson Content Hub to provide a category selector. The selections are hardcoded as a JSON file in the sample, but can easily be customised to come from a 3rd party Rest API. The multi-level category selection widget is styled to look like the other dropdowns in the WCH UI, such as for the category element. 

## Creating you own UI Extension

To create you own UI extension, copy the pattern from the samples.

Include the Javascript for the SDKs in your index.html using:

```html
<script src="https://unpkg.com/post-robot/dist/post-robot.min.js"></script>
<script src="https://unpkg.com/@ibm-wch/ui-extensions/dist/ibm-wch-sdk-ui-extensions.js"></script>
```

For information on how to use the SDK, see [ibm-wch-sdk-ui-extensions](https://github.ibm.com/DX/ibm-wch-sdk-ui-extensions).

Write your UI extension and push the assets into the hub, as per the above instructions for the samples. Finally,
enable the UI extension in the content type that is using it.

