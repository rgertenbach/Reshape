function castTable(data, measure, value, def) {
  var output = {};
  var keys = Object.keys(data);
  var valCols = [];
  var idCols = keys.slice();

  idCols.splice(idCols.indexOf(measure), 1);
  idCols.splice(idCols.indexOf(value), 1);

  function findFreeRow(row) {
    if (idCols.length === 0) {return output[currentMeasure].length;}
    for (var oRow = 0; oRow < nRow(output); oRow++) {
      for (var idCol in idCols) {
        var currentId = idCols[idCol];
        if (output[currentId][oRow] !== data[currentId][row]) {
          break;
        }
      }

      if (idCol == idCols.length -1 &&
          (output[currentMeasure][oRow] === def ||
           output[currentMeasure][oRow] === undefined)) {
        return oRow;
      }
    }
    return -1;
  }

  // Create ID Columns
  idCols.map(function(col) {output[col] = [];});

  for (var row in data[measure]) {
    var currentMeasure = data[measure][row];
    var currentValue = data[value][row]
    var outputKeys = Object.keys(output);

    // Add new column if need be
    if (outputKeys.indexOf(String(currentMeasure)) === -1) {
      output[currentMeasure] = [];
      outputKeys = Object.keys(output);
      valCols.push(currentMeasure)
    }

    // Try to add data to an existing row or append a new row.
    var freeRow = findFreeRow(row)

    if (freeRow == -1) {
      idCols.map(function(idCol) {output[idCol].push(data[idCol][row]);})
      freeRow = nRow(output) - 1;
    }
    while (output[currentMeasure].length < freeRow) {
      output[currentMeasure].push(def);
    }
    output[currentMeasure][freeRow] = currentValue;
  }

  // Fill columns up with default values
  valCols.map(function(col) {
    while (output[col].length < nRow(output)) {output[col].push(def);}
  });

  return output;
}
