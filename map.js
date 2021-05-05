var coordinate;
var zoom = 12;

function initMap() {
  coordinate = {
    lat: parseFloat(finalArr[currentIdx][1]),
    lng: parseFloat(finalArr[currentIdx][2]),
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: zoom,
    center: coordinate,
  });
  const marker = new google.maps.Marker({
    position: coordinate,
    map: map,
    title: removeUnderscore(finalArr[currentIdx][3]),
  });
  document.getElementById("locationName").innerHTML = removeUnderscore(
    finalArr[currentIdx][3]
  );
}

var currentIdx = 0;

function changeMap(direction) {
  var doRender = true;
  {
    if (direction === "previous" && currentIdx > 0) currentIdx--;
    else if (direction === "next" && currentIdx < finalArr.length - 1)
      currentIdx++;
    else doRender = false;
  }

  if (doRender) {
    coordinate = {
      lat: parseFloat(finalArr[currentIdx][1]),
      lng: parseFloat(finalArr[currentIdx][2]),
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: coordinate,
    });
    const marker = new google.maps.Marker({
      position: coordinate,
      map: map,
      title: removeUnderscore(finalArr[currentIdx][3]),
    });

    document.getElementById("locationName").innerHTML = removeUnderscore(
      finalArr[currentIdx][3]
    );
    document.getElementById("locations").value = "";
  }
}

var xhttp = new XMLHttpRequest();
var strArr = [];
var finalArr = [];

function readCSV() {
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      strArr = this.responseText.split("\n");
      for (let i = 0; i < strArr.length; i++) {
        finalArr.push(strArr[i].split(";"));
      }
    }
  };

  xhttp.open("GET", "sg500.csv", true);
  xhttp.send();
}

readCSV();

setTimeout(loadLocationDropdown, 100);

function loadLocationDropdown() {
  var str = "";

  for (let i = 0; i < finalArr.length; i++) {
    str +=
      "<option value=" +
      i +
      ">" +
      removeUnderscore(finalArr[i][3]) +
      "</option>\n";
  }
  console.log(str);
  document.getElementById("locations").innerHTML = str;
}

function changeMapDropdown() {
  var idValue = document.getElementById("locations").value;
  if (currentIdx !== idValue && idValue !== "") {
    currentIdx = idValue;
    coordinate = {
      lat: parseFloat(finalArr[currentIdx][1]),
      lng: parseFloat(finalArr[currentIdx][2]),
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: coordinate,
    });
    const marker = new google.maps.Marker({
      position: coordinate,
      map: map,
      title: removeUnderscore(finalArr[currentIdx][3]),
    });

    document.getElementById("locationName").innerHTML = removeUnderscore(
      finalArr[currentIdx][3]
    );
  }
}

function removeUnderscore(text) {
  var tempArr = text.split("_");
  var strReturn = "";
  for (let i = 0; i < tempArr.length; i++) {
    strReturn += tempArr[i];
    if (i < tempArr.length - 1) strReturn += " ";
  }
  return strReturn;
}
