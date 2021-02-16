inlets = 5;
outlets = 4;

var d1 = new Dict("state1");
var d2 = new Dict("state2");
var d1keys = d1.getkeys();
var d2keys = d2.getkeys();
var sliderVal;
var excludedIDs = [];

function getStates() {
  //post(d1.name);

  //post("d1 contents", "\n");

  for (var i = 0; i < d1keys.length; i++) {
    post(d1keys[i], "\n"); // This will post the key name
    post(d1.get(d1keys[i]), "\n"); // This will post the value
  }

  post("d2 contents", "\n");

  for (var i = 0; i < d2keys.length; i++) {
    post(d2keys[i], "\n");
    post(d2.get(d2keys[i]), "\n");
    //outlet(1, lerp(d1keys[i], d2keys[i], 0.5));
  }
}

function interpolateStates(x, y, z) {
  var result;
  result = x + z * (y - x);
  return result;
}

function removeDuplicates() {
  var excludeIDs = [];

  for (var i = 0; i < d1keys.length; i++) {
    if (d1.get(d1keys[i]) == d2.get(d2keys[i])) {
      excludeIDs.push(d1keys[i]);
    } else {
      excludeIDs.push(0);
    }
  }
  return excludeIDs;
}

function bang() {
  if (inlet == 0) {
    //getStates();
    updateDict();
    excludedIDs = removeDuplicates();
    outlet(2, excludedIDs);
  }

  if (inlet == 1) {
    for (var i = 0; i < d1keys.length; i++) {
      if (d1keys[i] != excludedIDs[i]) {
        outlet(0, d1keys[i]);
        outlet(
          1,
          interpolateStates(d1.get(d1keys[i]), d2.get(d2keys[i]), sliderVal),
          "\n"
        );
      }
      //outlet(3, interpolateStates(0.0,1.0,0.2));
      //outlet(3,interpolateStates(d1.get(d1keys[3]), d2.get(d2keys[3]),sliderVal));
    }
  }

  if (inlet == 2) {
  }
  if (inlet == 3) {
    updateDict();
  }
  if (inlet == 4) {
    updateDict();
	outlet(3, bang);

  }
}
function msg_float(f) {
  if (inlet == 2) {
    sliderVal = f;
  }
}

function updateDict() {
  d1 = new Dict("state1");
  d2 = new Dict("state2");
  d1keys = d1.getkeys();
  d2keys = d2.getkeys();
}
