inlets = 2;
outlets = 2;

var userDialDict = new Dict("userDialID");
var userDialDictKeys = userDialDict.getkeys();
var userMappedIDs = [];

function getStates() {
    var userDialDict = new Dict("userDialID");
    var userDialDictKeys = userDialDict.getkeys();
    userMappedIDs = [];

    for (var i = 0; i < userDialDictKeys.length; i++) {
        userMappedIDs.push(userDialDict.get(userDialDictKeys[i]));
    }
    outlet(0, userMappedIDs);

}

function bang() {
    if (inlet == 0) {
        getStates();
    }
}

function msg_int(z) {
    if (inlet == 1) {
        if (userMappedIDs.indexOf(z) == -1) {
            outlet(1, z);
        }
    }
}