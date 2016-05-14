function meltTable(data) {
  var output = {};
  var columns = Object.keys(data);
  var varArgs = objectToArray(arguments);

  varArgs.splice(0,1);
  if (varArgs[0] == [""]) {varArgs.splice(0,1)}

  var idCols = varArgs;
  var valCols = columns.filter(function(x) {return varArgs.indexOf(x) === -1})

  // Create ID columns
  varArgs.map(function(col) {output[col] = [];});

  output.measure = [];
  output.value = [];

  // Append data
  for (var measure in valCols) {
    idCols.map(function(id) {output[id] = output[id].concat(data[id]);});
    valCols.map(function(col) {
      if(valCols[measure] === col) {
        output.measure = output.measure.concat(repeat(nativeType(col), data[col].length));
        output.value   = output.value.concat(data[col]);
      }})
  }

  return output;
}
