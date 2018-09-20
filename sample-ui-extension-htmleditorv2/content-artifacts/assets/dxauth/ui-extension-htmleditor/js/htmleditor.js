/*
Copyright IBM Corporation 2018
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// On Editor load
function onLoad() {
    var textArea = document.getElementById("textArea");

    var editor = CodeMirror.fromTextArea(textArea, {
        mode: "text/html",
        lineWrapping: true
    });

    // Set editor settings
    editor.setSize(500, 400);
    editor.on("change", onEditorChange);
    editor.setValue("Loading...");

    // Set Editor height
    wchUIExt.requestResizeFrame(500);

    // Set editor content
    wchUIExt.getDefinition().then((definition) => {
        // Check if content is published
        if (definition.disabled) {
            document.getElementById("save-btn").style.display = "none";
            editor.setOption("readOnly", true);
            wchUIExt.requestResizeFrame(420);
        }
        wchUIExt.getElement().then((element) => {
            if (definition.elementType === "group") {
                // If the extension is on a custom element (with key "htmleditor")
                // This extension sample is bundled with a custom element with the above key
                if (element.value) {
                    if (element.value["htmleditor"].asset) {
                        wchGetFile(element.value["htmleditor"].asset.id, editor);
                    }
                } else {
                    // TODO: Create asset when its a new content
                }
            } else {
                // If the extension is on a File element directly
                if (element.asset) {
                    wchGetFile(element.asset.id, editor);
                }
            }
        });
    });
}

// On editor change
function onEditorChange(cm, change) {
    // Saves text in editor to textArea element which we use to save the file
    // This gets triggered as soon as the file contents are loaded and every time any change is made
    // Makes sure the textArea always has the up to date text
    cm.save();
}

// Action when save file button clicked
function onSaveClick() {
    // Unfocus and disable button
    document.getElementById("save-btn").blur();
    document.getElementById("save-btn").disabled = true;
    setButtonText("Saving...");
    // Save content from editor to a Binary for updating asset
    saveTextAsFile();
}

function saveTextAsFile() {
    // Get text from text area
    let textToSave = document.getElementById("textArea").value;
    let textFileAsBlob = new Blob([textToSave], {type: "text/html"});

    wchUIExt.getDefinition().then((definition) => {
        wchUIExt.getElement().then((element) => {
            if (definition.elementType === "group") {
                // If the extension is on a custom element (with key "htmleditor")
                // This extension sample is bundled with a custom element with the above key
                if (element.value) {
                    if (element.value["htmleditor"].asset) {
                        wchSaveFile(element.value["htmleditor"].asset.id, textFileAsBlob);
                    }
                } else {
                    // TODO: Create asset when its a new content
                }
            } else {
                // If the extension is on a File element directly
                if (element.asset) {
                    wchSaveFile(element.asset.id, textFileAsBlob);
                }
            }
        });
    });
}

// Get the file contents from WCH using the assetID
function wchGetFile(assetId, editor) {
    wchUIExt.getTenantConfig().then(tenantConfig => {
        getAsset(tenantConfig.tenantId, assetId)
            .then(data => {
                let response = JSON.parse(data.target.response);
                getResource(tenantConfig.tenantId, response.resource)
                    .then(data => {
                        let response = data.target.response;
                        editor.setValue(response);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error);
            });
    });
}

// Save the file contents to the given asset using asset path
function wchSaveFile(assetId, file) {
    wchUIExt.getTenantConfig().then(tenantConfig => {
        getAsset(tenantConfig.tenantId, assetId)
            .then(data => {
                let response = JSON.parse(data.target.response);
                updateAsset(tenantConfig.tenantId, file, response.path)
                    .then(data => {
                        let response = JSON.parse(data.target.response);
                        // Toggle save button display
                        document.getElementById("save-btn").disabled = false;
                        setButtonText("Save file");
                    })
                    .catch(error => {
                        document.getElementById("save-btn").disabled = false;
                        console.log(error);
                    });
            })
            .catch(error => {
                document.getElementById("save-btn").disabled = false;
                console.log(error);
            });
    });
}

// Get the resource data for loading file into editor
function getResource(tenantId, resourceId) {
    let resourceUrl = "/api/" + tenantId + "/authoring/v1/resources/" + resourceId;
    let method = "GET";
    let shouldBeAsync = true;

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, resourceUrl, shouldBeAsync);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
    });
}

// Update the asset with the new resource. Creates resource and updates asset with 1 call
function updateAsset(tenantId, file, assetPath) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/resource?path=" + assetPath;
    let method = "PUT";
    let shouldBeAsync = true;

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, assetUrl, shouldBeAsync);
        request.setRequestHeader("Cache-Control", "no-store, no-cache");
        request.setRequestHeader("Content-Type", "text/html");
        request.send(file);
    });
}

// Get asset in order to get the resource that is attached to the asset (content doesn't hold resource information for files)
function getAsset(tenantId, assetId) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/" + assetId;
    let method = "GET";
    let shouldBeAsync = true;

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, assetUrl, shouldBeAsync);
        request.setRequestHeader("Cache-Control", "no-store, no-cache");
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
    });
}

// Set button text
function setButtonText(text) {
    var button = document.getElementById("save-btn");
    button.innerText = text;
}

////////////////////
// FOR FUTURE USE //
////////////////////

// NOTE: Currently not used. For future use when creating asset/resource for first time
function createResource(tenantId, file) {
    let resourceUrl = "/api/" + tenantId + "/authoring/v1/resources?name=" + encodeURIComponent(file.name);
    let method = "POST";
    let shouldBeAsync = true;

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, resourceUrl, shouldBeAsync);
        request.setRequestHeader("Content-Type", "text/html");
        request.send(file);
    });
}


// TODO for when creating new assets
function createAsset() {
    // let assetURL = "/api/authoring/v1/assets";
}
