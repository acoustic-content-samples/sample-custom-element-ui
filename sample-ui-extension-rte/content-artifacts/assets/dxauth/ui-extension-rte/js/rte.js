/**
 * Copyright IBM Corp. 2018
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