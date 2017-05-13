var Canon = (function () {

    var CANON_URL = 'http://127.0.0.1:55555';
    var SETTINGS_PAGE = CANON_URL + '/wpd/VLAX01/rc/advanced.htm';

    var API = CANON_URL + '/api/cam/';
    var START_RECORDING = API + 'rec?cmd=trig';
    var START_STREAMING = API + 'lv?cmd=start&sz=l';
    var STATUS_REQUEST = API + 'getcurprop?seq=0';
    var CURRENT_IMAGE = API + 'lvgetimg?time=';

    var j = jQuery.noConflict();
    var imageHolder = j('#liveview');
    var imageUpdateInterval;

    return {
        createConnection: function () {
            var connection = Connection.create("canon", CANON_URL, SETTINGS_PAGE);
            connection.reconnect = reconnect.bind(null, connection);
            connection.updateStatus = updateStatus.bind(null, connection);
            connection.setRecording = function (isRecording) {
                setRecording(connection, isRecording);
            };
            connection.reconnect();
            return connection;
        }
    };

    function updateStatus(connection) {
        if (!connection.enabled)
            return;

        post(STATUS_REQUEST, function(e) {
            console.log(e);
        });
    }

    function setRecording(connection, isRecording) {
        if (!connection.enabled) {
            return;
        }

        console.log("canon recording: " + isRecording);

        post(START_RECORDING, function (msg) {
            console.log('canon: ' + msg);
        });
                                       	
    }

    function reconnect(connection) {
        if (!connection.enabled) {
            return;
        }

        post(CANON_URL, loginCallback);
    }

    function loginCallback(result) {
        console.log(result);
        post(START_STREAMING, startedCallback)
    }

    function startedCallback(result) {
        console.log(result);

        imageUpdateInterval = setInterval(function() {
            imageHolder.attr('src', CURRENT_IMAGE + new Date().getTime());
        }, 1000);
    }

    function post(url, callback) {
        j.ajax({url: url, type: 'POST', dataType: 'json', success: callback});
    }
})();