var xhttp = new XMLHttpRequest();
var strArr = [];
var finalArr = [];

function readCSV(filename) {
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      strArr = this.responseText.split("\n");
      for (let i = 0; i < strArr.length; i++) {
        finalArr.push(strArr[i].split(";"));
      }
      
    }
  };

  xhttp.open("GET", filename, true);
  xhttp.send();
}

readCSV("./sg500.csv");
console.log(finalArr);
readCSV("./sg500/pcaResult.csv");
console.log(finalArr);
readCSV("./sg500/svmResult.csv");
console.log(finalArr);
readCSV("./sg500/out.csv");
console.log(finalArr);
