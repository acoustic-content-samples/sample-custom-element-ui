# Developer toolkit for building Custom user interface extensions

The toolkit provides a mock of the Acoustic Content Authoring Custom user interface extension environment that runs locally. It allows a developer to write their extension, configure the input, inspect the output and test it in a local web page on their computer. No server or Acoustic Content environment is needed. Once complete, the custom user interface extension can then be pushed to Acoustic Content for final testing and use.

Getting started:

Option 1. If you also host your custom UI extension in github, the easiest way to use the toolkit is to load this page in a browser:
https://pages.github.ibm.com/ibm-wch/sample-custom-element-ui/ui-extensions-dev-toolkit/extension-dev-toolkit.html

Enter the github page URL of your custom UI extension in the input box and click 'Init Custom Extension'.

Option 2. If your page is not on github, it can be either served on a different domain or locally on `http://localhost:port`. In this case, download or clone this repository to get the toolkit and open the extension-dev-toolkit.html in your browser. There is no need to serve it from a web server.  Enter the URL of your ui extension  in the input box and click 'Init Custom Extension'.

### Tip to the Web Storm user:
If you are using WebStorm built-in web server to serve your ui extension html page, make sure you tick the "Allow unsigned request" option in the WebStorm preferences so it can be embeded into the toolkit.

Otherwise you will see a "Page requested without authorization" error when attempting to access the UI extension.

## Toolkit features:
Your UI extension will be rendered on the right side of the screen. In your extension, when you call wch.setElement(), you will see the value that you sent shown on the left side of the screen. When you call `wch.getElement()`, the value that is sent will be displayed on the left side as well. The same applies for the `getDefinition()` and `setValid()` API as well.

Using this, you can develop your UI extension without needing to push it into the Acoustic Content environment.


