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

var editorPromise = ClassicEditor.create(document.querySelector('#editor'));

editorPromise.then(editor => {
    wchUIExt.getDefinition().then((definition) => {
        // Get previously set text
        wchUIExt.getElement().then((element) => {
            if (definition.elementType === "group") {
                if (element.value["text"].value) {
                    editor.setData(element.value["text"].value);
                }
            } else {
                if (element.value) {
                    editor.setData(element.value);
                }
            }
        });

        // Disable the rich text editor and show the formatted text
        if (definition.disabled) {
            editor.isReadOnly = true;
        } else {
            // Save when the editor loses focus
            editor.ui.focusTracker.on('change:isFocused', () => {
                const data = editor.getData();
                if (definition.elementType === "group") {
                    wchUIExt.setElement({
                        elementType: "group",
                        typeRef: definition.typeRef,
                        value: {
                            "text": {
                                elementType: "formattedtext",
                                value: data
                            }
                        }
                    });
                } else {
                    wchUIExt.setElement({
                        elementType: "formattedtext",
                        value: data
                    });
                }
            });
        }
    });

    // Give RTE enough height
    wchUIExt.requestResizeFrame(250);
});
editorPromise.catch(error => {console.error(error);});