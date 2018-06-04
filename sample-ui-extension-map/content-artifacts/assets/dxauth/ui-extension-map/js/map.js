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

    // Get selected latitude and longitude and set as default on map
    wchUIExt.getElement().then((element) => {
        console.log(element);
        if (element.value["location"].longitude && element.value["location"].latitude) {
            currentLatLng.lat = element.value["location"].latitude;
            currentLatLng.lng = element.value["location"].longitude;
            map.setCenter(currentLatLng);
            marker.setPosition(currentLatLng);
        }
    });

    // Disable map dragging and click to select location when content is published
    wchUIExt.getDefinition().then((item) => {
        console.log(item);
        if (item.disabled) {
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
        wchUIExt.setValid(true);
    });
}