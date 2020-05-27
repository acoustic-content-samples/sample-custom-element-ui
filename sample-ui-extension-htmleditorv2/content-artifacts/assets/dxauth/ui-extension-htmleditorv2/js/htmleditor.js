/*
Copyright 2020 Acoustic, L.P.
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

    var isPublished = false;

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
            document.getElementById("cancel-btn").style.display = "none";
            editor.setOption("readOnly", true);
            wchUIExt.requestResizeFrame(420);
            isPublished = true;
        }
        wchUIExt.getElement().then((element) => {
            document.getElementById("cancel-btn").disabled = true;
            if (definition.elementType === "group") {
                // If the extension is on a custom element (with key "htmleditor")
                // This extension sample is bundled with a custom element with the above key
                if (element.value) {
                    if (element.value["htmleditor"].asset) {
                        wchGetFile(element.value["htmleditor"].asset.id, editor, isPublished);
                    } else {
                        editor.setValue("");
                    }
                } else {
                    editor.setValue("");
                }
            } else {
                // If the extension is on a File element directly
                if (element.asset) {
                    wchGetFile(element.asset.id, editor, isPublished);
                } else {
                    editor.setValue("");
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
    setButtonText("save-btn", "Saving...");
    // Save content from editor to a Binary for updating asset
    saveTextAsFile();
}

// Action when cancel button clicked
function onCancelClick() {
    let editor = $('.CodeMirror')[0].CodeMirror;
    // Unfocus and disable button
    document.getElementById("cancel-btn").blur();
    document.getElementById("cancel-btn").disabled = true;
    setButtonText("cancel-btn", "Cancelling...");
    // Delete the draft asset
    let elementType;
    let elementDef;
    wchUIExt.getDefinition().then(definition => {
        elementDef = definition;
        elementType = definition.elementType;
        return wchUIExt.getElement();
    }).then(element => {
        if (elementType === "group") {
            // If the extension is on a custom element (with key "htmleditor")
            // This extension sample is bundled with a custom element with the above key
            if (element.value) {
                if (element.value["htmleditor"].asset) {
                    wchDeleteFile(elementDef, element.value["htmleditor"].asset.id, editor);
                    wchGetFile(element.value["htmleditor"].asset.id, editor, elementDef.disabled);
                }
            }
        } else {
            // If the extension is on a File element directly
            if (element.asset) {
                wchDeleteFile(elementDef, element.asset.id, editor);
                wchGetFile(element.asset.id, editor, elementDef.disabled);
            }
        }
    }).catch(error => {
        console.log(error);
    });
}

function saveTextAsFile() {
    // Get text from text area
    let textToSave = document.getElementById("textArea").value;
    let textFileAsBlob = new Blob([textToSave], {type: "text/html"});
    let elementType;
    let elementDef;

    wchUIExt.getDefinition().then(definition => {
        elementDef = definition;
        elementType = definition.elementType;
        return wchUIExt.getElement();
    }).then(element => {
        if (elementType === "group") {
            // If the extension is on a custom element (with key "htmleditor")
            // This extension sample is bundled with a custom element with the above key
            if (element.value) {
                if (element.value["htmleditor"].asset) {
                    wchSaveFile(element.value["htmleditor"].asset.id, textFileAsBlob);
                } else {
                    // Create asset when its a new content
                    wchCreateFile(textFileAsBlob, elementDef);
                }
            }
        } else {
            // If the extension is on a File element directly
            if (element.asset) {
                wchSaveFile(element.asset.id, textFileAsBlob);
            } else {
                // Create asset when its a new content
                wchCreateFile(textFileAsBlob, elementDef);
            }
        }
    }).catch(error => {
        console.log(error);
    });
}

// Get the file contents from WCH using the assetID
function wchGetFile(assetId, editor, isPublished) {
    let tenantId = "";
    wchUIExt.getTenantConfig().then(tenantConfig => {
        tenantId = tenantConfig.tenantId;
        let getAssetPromise = getAsset(tenantId, assetId, isPublished);
        let getPublishedAssetPromise = getAsset(tenantId, assetId, true);
        return Promise.all([getAssetPromise, getPublishedAssetPromise]);
    }).then(results => {
        let resource = "";
        let noPublishedAsset = false;
        results.forEach(assetData => {
            if (assetData.target.status === 404) {
                noPublishedAsset = true
            } else {
                resource = JSON.parse(assetData.target.response).resource;
            }
        });
        if (!noPublishedAsset) {
            document.getElementById("cancel-btn").disabled = false;
        }
        return getResource(tenantId, resource);
    }).then(resourceData => {
        let response = resourceData.target.response;
        editor.setValue(response);
    }).catch(error => {
        console.log(error);
    });
}

// Save the file contents to the given asset using asset path
function wchSaveFile(assetId, file) {
    let tenantId = "";
    let resourceId = "";
    wchUIExt.getTenantConfig().then(tenantConfig => {
        tenantId = tenantConfig.tenantId;
        return createResource(tenantId, file);
    }).then(resourceData => {
        let response = JSON.parse(resourceData.target.response);
        resourceId = response.id;
        return getAsset(tenantId, assetId);
    }).then(assetData => {
        let response = JSON.parse(assetData.target.response);
        if (response.status == "ready") {
            return createDraftAsset(tenantId, assetId).then(draftAsset => {
                let draftAssetResponse = JSON.parse(draftAsset.target.response);
                return updateAsset(tenantId, draftAssetResponse.id, resourceId);
            });
        }
        return updateAsset(tenantId, response.id, resourceId);
    }).then(() => {
        // Toggle save button display
        document.getElementById("save-btn").disabled = false;
        setButtonText("save-btn", "Save file");
    }).catch(error => {
        console.log(error);
        document.getElementById("save-btn").disabled = false;
        setButtonText("save-btn", "Save file");
    });
}

// Create and save new file
function wchCreateFile(file, definition) {
    let tenantId = "";
    wchUIExt.getTenantConfig().then(tenantConfig => {
        tenantId = tenantConfig.tenantId;
        return createAssetAndResource(tenantId, file);
    }).then(assetData => {
        let response = JSON.parse(assetData.target.response);
        let jsonToSet = {};
        if (definition.elementType === "group") {
            jsonToSet = {
                elementType: "group",
                typeRef: definition.typeRef,
                value: {
                    "htmleditor": {
                        elementType: "file",
                        asset: {
                            id: response.id
                        }
                    }
                }
            };
        } else {
            jsonToSet = {
                elementType: "file",
                asset: {
                    id: response.id
                }
            };
        }
        return wchUIExt.setElement(jsonToSet);
    }).then(() => {
        // Toggle save button display
        document.getElementById("save-btn").disabled = false;
        setButtonText("save-btn", "Save file");
    }).catch(error => {
        console.log(error);
        document.getElementById("save-btn").disabled = false;
        setButtonText("save-btn", "Save file");
    });
}

function wchDeleteFile(definition, assetId, editor) {
    let tenantId = "";
    wchUIExt.getTenantConfig().then(tenantConfig => {
        tenantId = tenantConfig.tenantId;
        return cancelDraftAsset(tenantId, assetId, definition.disabled);
    }).then(data => {
        console.log(data);
        document.getElementById("cancel-btn").disabled = false;
        setButtonText("cancel-btn", "Cancel");
    }).catch(error => {
        console.log(error);
        document.getElementById("cancel-btn").disabled = false;
        setButtonText("cancel-btn", "Cancel");
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

// CURRENTLY NOT USED since it does not update draft asset if there is already a published asset
// Updates the asset with the new resource. Creates resource and updates asset with 1 call
function updateAssetWithPath(tenantId, file, assetPath) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/resource?path=" + assetPath + "&projectId=draft";
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

// Update the asset with the new resource
function updateAsset(tenantId, assetId, resourceId) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/" + assetId + "?forceOverride=true";
    let method = "PUT";
    let shouldBeAsync = true;
    let data = JSON.stringify({ resource: resourceId });

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, assetUrl, shouldBeAsync);
        request.setRequestHeader("Cache-Control", "no-store, no-cache");
        request.send(data);
    });
}

// Get asset in order to get the resource that is attached to the asset (content doesn't hold resource information for files)
function getAsset(tenantId, assetId, isPublished) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/" + assetId;
    // If the content is draft, then show the draft asset if it exists
    if (!isPublished) {
        assetUrl += "?projectId=draft";
    }
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

// Create draft asset from existing asset
function createDraftAsset(tenantId, assetId) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/" + assetId + "/create-draft";
    let method = "POST";
    let shouldBeAsync = true;

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, assetUrl, shouldBeAsync);
        request.setRequestHeader("Cache-Control", "no-store, no-cache");
        request.send();
    });
}

// Cancel draft asset
function cancelDraftAsset(tenantId, assetId, isPublished) {
    if (!isPublished) {
        assetId += ":draft";
    }
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets/" + assetId;
    let method = "DELETE";
    let shouldBeAsync = true;

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, assetUrl, shouldBeAsync);
        request.setRequestHeader("Cache-Control", "no-store, no-cache");
        request.send();
    });
}

// Creates an asset and resource given a file
function createAssetAndResource(tenantId, file) {
    let assetUrl = "/api/" + tenantId + "/authoring/v1/assets";
    let method = "POST";
    let shouldBeAsync = true;

    // Create draft file resource using multipart form request
    let data = JSON.stringify({ status: "draft" });
    file.name = new Date().getTime() + ".html";
    let formData = new FormData();
    formData.append("resource", file, file.name);
    formData.append("data", data);

    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onload = resolve;
        request.onerror = reject;

        request.open(method, assetUrl, shouldBeAsync);
        request.setRequestHeader("Cache-Control", "no-store, no-cache");
        request.send(formData);
    });
}

// Set button text
function setButtonText(buttonId, text) {
    var button = document.getElementById(buttonId);
    button.innerText = text;
}

// Creates a resource from a file
function createResource(tenantId, file) {
    file.name = new Date().getTime() + ".html";
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
