// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
    var q = $('#query').val();
    fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+q+"&key=AIzaSyA84l16rsmPqO4EOfq8qRTQ2zSUe-QDKe8" + new Date().getTime())
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonResponse) {
            // Process response
            var str = JSON.stringify(jsonResponse.result);
            $('#search-container').html('<pre>' + str + '</pre>');
        });
}