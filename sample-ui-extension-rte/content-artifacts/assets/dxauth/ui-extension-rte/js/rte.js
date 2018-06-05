/**
 * Copyright IBM Corp. 2018
 */

var editorPromise = ClassicEditor.create(document.querySelector('#editor'));

editorPromise.then(editor => {
    // Disable the rich text editor and show the formatted text
    wchUIExt.getDefinition().then((item) => {
        console.log(item);
        if (item.disabled) {
            // Don't show text editor if content has been published
            wchUIExt.getElement().then((element) => {
                console.log(element);
                if (element.value) {
                    editor.setData(element.value["text"].value);
                    editor.isReadOnly = true;
                }
            });
        } else {
            // Get previously set text
            wchUIExt.getElement().then((element) => {
                console.log(element);
                if (element.value) {
                    editor.setData(element.value["text"].value);
                }
            });

            // Save when the editor loses focus
            editor.ui.focusTracker.on('change:isFocused', () => {
                const data = editor.getData();
                console.log(data);
                wchUIExt.setElement({
                    elementType: "group",
                    value: {
                        "text": {
                            elementType: "formattedtext",
                            value: data
                        }
                    }
                });
            });
        }
    });

    // Give RTE enough height
    wchUIExt.requestResizeFrame(250);
});
editorPromise.catch(error => {console.error(error);});