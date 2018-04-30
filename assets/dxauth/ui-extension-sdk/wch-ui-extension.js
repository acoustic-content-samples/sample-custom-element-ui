/**
 * @file WCH UI Extension SDK
 * @author Erik BI <erikzbi@au1.ibm.com>
 * @version 0.1
 */
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.wch = factory()
}(this, (function () {
    'use strict';

    var wch = {
        eventMap: {
        }
    }

    // Support event map
    const WCH_EXTENSION_EVENTNAMES = ['validate'];

    // internal data model
    var elementModel = {
        value: null,
        definition: null
    };

    /**
     * Get the value of the element,
     * @returns {Promise} it returns the whole json object for this element
     */
    function getValue() {
        return new Promise((resolve, reject) => {
            if (elementModel.value) {
                resolve(elementModel.value)
            } else {
                postRobot.send(window.parent, "getValue", {}).then(function (event) {
                    console.log("getValue come back", event)
                    if (event.data) {
                        elementModel.value = event.data;
                    }
                    resolve(elementModel.value)
                }).catch(function(err) {
                    console.error(err);
                    reject(err)
                });
            }
        })
    }

    /**
     * Get the definition of this element
     * For example, a sample definition for a text element looks like
     * <code>
     *     {
     *         "elementType":"text",
     *         "label":"text",
     *         "key":"text",
     *         "required":true,
     *         "minLength":1,
     *         "disabled":false
     *     }
     * </code>
     * @returns {Promise}
     */
    function getDefinition() {
        return new Promise((resolve, reject) => {
            if (elementModel.value) {
                resolve(elementModel.value)
            } else {
                 postRobot.send(window.parent, "getDefinition", {}).then(function (event) {
                    console.log("get definition come back", event)
                    if (event.data) {
                        elementModel.definition = event.data;
                    }
                     resolve(elementModel.definition)
                }).catch(function(err) {
                    console.error(err);
                    reject(err)
                });
            }
        })
    }

    /**
     * Set the value of the element
     * @param value it expects the full json object for the element
     */
    function setValue(value) {
        elementModel.value = value;
        postRobot.send(window.parent, "updateValue", {
            value: value
        });
    }

    /**
     * Set the container height
     * @param height
     */
    function setHeight(height) {
        postRobot.send(window.parent, "updateHeight", {
            height: height
        });
    }

    /**
     * @param valid
     * @param showValidateMessage (optional), whether we want the container to show validation failed message when the field become invalid, default is true
     * @param message (optional): overwrite the "validation failed" message, valid only when the <code>valid</code> is <code>false</code>
     */
    function setStatus(valid, showValidateMessage, customMessage) {
        postRobot.send(window.parent, "updateValidStatus", {
            valid: valid,
            showValidateMessage: showValidateMessage != null ? showValidateMessage : true,
            customMessage: customMessage
        });
    }

    // Listen to WCH value validate event
    postRobot.on("valueValidate", event => {
        return wch.eventMap["validate"] && wch.eventMap["validate"].apply(null);
    });

    /**
     * Register for callback for event comes from WCH
     * Currently, supported event list
     *  - validate
     * @param eventName
     * @param callback
     */
    function on(eventName, callback) {
        if (eventName != null && WCH_EXTENSION_EVENTNAMES.includes(eventName) && callback != null && typeof callback == 'function') {
            wch.eventMap[eventName] = callback;
        }
    }

    /**
     * mock promise when extension is not running inside WCH environment
     * @returns {Promise}
     */
    function mockPromise() {
        return new Promise((resolve, reject) => {
            resolve({})
        });
    }

    if (window.parent == window) {
        console.error("WCH extension only works inside an iframe.")
        wch.getValue = mockPromise;
        wch.getDefinition = mockPromise;
        wch.setValue = function() {};
        wch.setHeight = function() {};
        wch.setStatus = function() {};
        wch.on = function() {};
    } else {
        wch.getValue = getValue;
        wch.setValue = setValue;
        wch.setHeight = setHeight;
        wch.getDefinition = getDefinition;
        wch.setStatus = setStatus;
        wch.on = on;
    }
    return wch;
})))