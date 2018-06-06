/**
 * Copyright IBM Corp. 2018
 */

function myMap() {
    var currentLatLng = {lat: -32.7681293, lng: 145.356028};

    var mapProps = {
        center: currentLatLng,
        zoom: 5
    };

    var map = new google.maps.Map(document.getElementById('map'), mapProps);

    // Add marker for the currently selected location
    var marker = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        title: 'Hello World!'
    });

    wchUIExt.getDefinition().then((definition) => {
        // Get selected latitude and longitude and set as default on map
        wchUIExt.getElement().then((element) => {
            if (definition.elementType === "group") {
                if (element.value["location"].longitude && element.value["location"].latitude) {
                    currentLatLng.lat = element.value["location"].latitude;
                    currentLatLng.lng = element.value["location"].longitude;
                    map.setCenter(currentLatLng);
                    marker.setPosition(currentLatLng);
                }
            } else {
                if (element.longitude && element.latitude) {
                    currentLatLng.lat = element.latitude;
                    currentLatLng.lng = element.longitude;
                    map.setCenter(currentLatLng);
                    marker.setPosition(currentLatLng);
                }
            }
        });
        // Disable map dragging and click to select location when content is published
        if (definition.disabled) {
            google.maps.event.removeListener(clickEvent);
            map.setOptions({draggable: false});
        }
    });

    // Give map 400px of height
    wchUIExt.requestResizeFrame(400);

    // Add listener to select a new location
    var clickEvent = google.maps.event.addListener(map, 'click', function (event) {

        marker.setPosition(event.latLng);
        console.log(event.latLng.lng() + "," + event.latLng.lat());

        // Set wch element values for location
        wchUIExt.getDefinition().then((definition) => {
            if (definition.elementType === "group") {
                wchUIExt.setElement({
                    elementType: "group",
                    value: {
                        "location": {
                            elementType: "location",
                            longitude: event.latLng.lng(),
                            latitude: event.latLng.lat()
                        }
                    }
                });
            } else {
                wchUIExt.setElement({
                    elementType: "location",
                    longitude: event.latLng.lng(),
                    latitude: event.latLng.lat()
                });
            }
        });

        wchUIExt.setValid(true);
    });
}