# Sample UI Extension

A sample that extends the WCH user interface with a custom dropdown. The available
selections in the dropdown come from a 3rd party Rest API. The dropdown is styled to look
like the other dropdowns in the WCH UI, and is written in 'vanilla JS' with no framework
dependencies.

# Installation

## Run the sample locally.

Simply open the index.html file in your browser using your file explorer or IDE. There is not
build required.

## Install the sample into Watson Content Hub

Install the latest version of wchtools-cli. Windows: npm install -g wchtools-cli Linux/Mac: sudo npm install -g wchtools-cli

Note: make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to wchtools-cli.
From the root directory, run npm run build and npm run deploy.

