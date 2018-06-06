# Sample UI Extensions

A collection of Samples that extend the Authoring interface of Watson Content Hub. Each of the samples customised the
user interface of an element.

# Installation

## Run the sample locally.

Simply open the index.html file for any of the examples in your browser using your file explorer or IDE. There is no
build required.

## The plugins

### Dropdown

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-dropdown

### Category selection from a custom category

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-dropdown

### Google Maps location selection

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-map

### Custom rich text editor

More information: https://github.ibm.com/DX/sample-ui-extension-core/tree/master/sample-ui-extension-rte

## Creating you own UI Extension

To create you own UI extension, copy the patterns shown in the samples.

Include the Javascript for the SDKs in your index.html using:

```html
<script src="https://unpkg.com/post-robot/dist/post-robot.min.js"></script>
<script src="https://unpkg.com/@ibm-wch/ui-extensions/dist/ibm-wch-sdk-ui-extensions.js"></script>
```

For information on how to use the SDK, see [ibm-wch-sdk-ui-extensions](https://github.ibm.com/DX/ibm-wch-sdk-ui-extensions).

Write your UI extension and push the assets into the hub, as per the above instructions for the samples. Finally,
enable the UI extension in the content type that is using it.

