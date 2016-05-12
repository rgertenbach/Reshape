/**
 * Createsa  two dimensional array out of an associative array
 */
function untable(table) {
  var output = [[]];
  var keys = Object.keys(table)

  for (var col in keys) {
    output[0].push(keys[col]);
  }
  for (var row = 0; row < table[keys[0]].length; row++) {
    output.push([]);
    for (var col = 0; col < keys.length; col++) {
      output[row + 1].push(table[keys[col]][row]);
    }
  }

  return output;
}


function objectToArray(object) {
  var output = [];
  return Object.keys(object).map(function(key) {return object[key];});
}


function repeat(input, times) {
  var output = [];
  for (var i = 0; i < times; i++) {
    output.push(input);
  }
  return output;
}


function isRectangularArray(data) {
  if (!Array.isArray(data)) {return false;}

  var initialLength = undefined;
  for (var row in data) {
    if (!Array.isArray(data[row])) {return false;}
    if (initialLength === undefined) {initialLength = data[row].length;}
    if (data[row].length !== initialLength) {return false;}
  }
  return true;
}


/*
 * Returns the length of a table.
 * More generally it returns the length of the longest array within an object.
 */
function nRow(o) {
  var keys = Object.keys(o);
  var maxLength = 0
  for (var key in keys) {
    if (o[keys[key]].length > maxLength) {
      maxLength = o[keys[key]].length;
    }
  }
  return maxLength;
}


/**
 * Creates an associative Object out of a two dimensional array
 */
function table(data, headers) {
  if (!isRectangularArray(data)) {throw "Data not unragged array of arrays"}
  if (!(headers < data.length && headers >= -1)) {
    throw "Header is " + headers + " must be between -1 and " + data.length;
  }

  headers = (headers ===  undefined ? 0 : headers);
  var output = {};

  // Create Columns
  for (var col in data[0]) {
    output[(headers === -1 ? "Col " + col : data[headers][col])] = [];
  }

  // Fill columns
  for (var row in data) {
    if(row != headers) {
      for (var col in  data[row]) {
        output[(headers === -1 ?
          "Col " + col :
          data[headers][col])].push(data[row][col]);
      }
    }
  }
  return output;
}


/**
 * Checks if a row of a two dimensional array contains only empty strings
 */
function rowIsEmpty(a, row) {
  for (var col in a[row]) {
    if (a[row][col] !== "" && a[row][col] !== undefined) {
      return false;
    }
  }
  return true;
}


/**
 * Checks if a column is empty
 */
function columnIsEmpty(a, col) {
  for (var row in a[0]) {
    if (a[row][col] !== "" && a[row][col] !== undefined) {
      return false;
    }
  }
  return true;
}


/**
 * Filters a two dimensional array for empty values
 */
function filterMatrix(m, behavior) {
  if (behavior == 0 || behavior == 1) {
    var row = 0;
    while(row < m.length) {
      if (rowIsEmpty(m, row)) {
        m.splice(row,1);
        row--;
      }
      row++;
    }
  }
  if (behavior == 0 || behavior == 2) {
    var col = 0;
    while (col < m[0].length) {
      if (columnIsEmpty(m, col)) {
        for (var row in m) {
          m[row].splice(col, 1);
        }
        col--;
      }
      col++;
    }
  }
  return m;
}


/**
 * Converts a JS date object into a Google Sheets Date Value
 */
function sheetDate(a) {
  var ms_per_day = 1000 * 60 * 60 * 24;
  var b = new Date(1899, 11, 30)

  var utc1 = Date.UTC(a.getFullYear(),
                      a.getMonth(),
                      a.getDate(),
                      a.getHours(),
                      a.getMinutes(),
                      a.getSeconds(),
                      a.getMilliseconds());

  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return (utc1 - utc2) / ms_per_day;
}


/**
 * Casts a string to a number of possible, otherwise returns the string.
 */
function nativeType(x) { 
  if (!isNaN(new Date(x).getTime())) {
    return new Date(x);
  }
  if (!isNaN(Number(x))) {
    return Number(x);
  } 
  return x;
}


/*
 * Converts each coumn of a row of a 2d array to its native type
 */
function convertRowToNative(a, row) {
  row = row || 0;
  for (var col in a[row]) {
    a[row][col] = nativeType(a[row][col]);
  }
}
