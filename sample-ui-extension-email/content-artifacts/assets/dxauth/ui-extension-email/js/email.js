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

'use strict';
var textInput = document.querySelector('#mail');
var cachedValue = '';
var cachedConfig = {};
const rg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.]{3,9})+\.([A-Za-z]{2,4})$/;
let emailInput = document.getElementById('mail');

/**
 * submit value when the value is changed
 * @param newValue
 */
function submitValue(newValue) {
    if (newValue !== cachedValue) {
        cachedValue = newValue;
    }
    wchUIExt.getDefinition().then((definition) => {
        if (definition.elementType === "group") {
            wchUIExt.setElement({
                elementType: 'group',
                value: {
                    "emailAddress": {
                        elementType: "text",
                        value: cachedValue
                    }
                }
            });
        } else {
            wchUIExt.setElement({
                elementType: "text",
                value: cachedValue
            });
        }
    });
    validate();
}

/**
 * Validate the email value, invalid when
 *   - field is required and value is empty
 *   - not a valid email address
 * @param displayValidateMessage whether it wants to display validate message in WCH container
 */
function validate(displayValidateMessage) {
    console.log("receive validate request");
    if (cachedConfig.required && cachedValue === "") {
        wchUIExt.setValid(false, displayValidateMessage, 'the field cannot be empty');
    } else if (!rg.test(cachedValue) && cachedValue !== "") {
        wchUIExt.setValid(false, true, 'The input value is an invalid email address');
    } else {
        wchUIExt.setValid(true);
    }
}

(function(){
    textInput.addEventListener('focus', function(){
        this.classList.add('active');
        // textRun();
        this.addEventListener('blur', function(){
            console.log(this.value);
            this.value.trim() === '' ? (this.classList.remove('active')) : null;
            !rg.test(this.value) && this.value.trim() != '' ?
                (this.classList.remove('valid'), this.classList.add('invalid'))
                : rg.test(this.value) && this.value.trim() != '' ?
                (this.classList.add('valid'), this.classList.remove('invalid')) :null;
            submitValue(this.value.trim())
        });
        this.classList.remove('valid', 'invalid');
    });

    // get value and definition from WCH
    wchUIExt.getDefinition().then((definition) => {
        if (definition) {
            cachedConfig = definition;
            if (definition.disabled) {
               emailInput.disabled = true;
            }
        }
        wchUIExt.getElement().then((element) => {
            if (definition.elementType === "group") {
                if (element.value["emailAddress"].value) {
                    cachedValue = element.value["emailAddress"].value ? element.value["emailAddress"].value : '';
                    if (cachedValue !== '') {
                        emailInput.value = cachedValue;
                        emailInput.classList.add('active');
                        emailInput.classList.add('valid');
                    }
                }
            } else {
                if (element.value) {
                    cachedValue = element.value ? element.value : '';
                    if (cachedValue !== '') {
                        emailInput.value = cachedValue;
                        emailInput.classList.add('active');
                        emailInput.classList.add('valid');
                    }
                }
            }
            // Call validate to update the status of current element
            validate(false);
        });
    });
    wchUIExt.requestResizeFrame(30);
    // register own callback to handle the validate request from WCH
    wchUIExt.on('validate', validate);
})();