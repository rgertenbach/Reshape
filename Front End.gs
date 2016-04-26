/**
 * Melts a wide table into a long Format.
 *
 * @param {A1:F8} Range  The range to be molten into a long format.
 * @param {A1:C1} IDs  A range with the column headers.
 *   If a column header is blank it gets the Number of the column.
 *   Such Ranges maybe creates like this: {"Country", "Year", "3"}.
 *
 * @param {"Quarter"} Measure  Name of the column containing the molten columns'
 *   names (Default is "measure").
 *
 * @param {"Revenue"} Value  Name of the column containing the molten values
 *  (Default is "value").
 *
 * @return {Molten range}
 * @customfunction
 */
function melt(Range, IDs, Measure, Value) {
  for (col in Range[0]) {
    if (Range[0][col] === "") {
      Range[0][col] = String(Number(col) + 1);
    }
  }
  Range = table(Range, 0);
  Measure = Measure || "measure";
  Value = Value || "value";
  if (typeof(IDs) !== "object" && IDs !== undefined) {IDs = [IDs];}
  if (IDs !== undefined) {arguments = [Range].concat(IDs[0]);}
  Range = meltTable.apply(this, arguments);
  Range = untable(Range);
  Range[0][Range[0].indexOf("measure")] = Measure;
  Range[0][Range[0].indexOf("value")] = Value;
  return Range;
}

/**
 * Casts a long table into a wide format.
 *
 * @param {A1:D30} Range  The range to be cast into a wide format
 * @param {"Year"} MeasureColumn  The Header of the Column containing the
 *  headers of the pivoted values.
 *
 * @param {"Value"} ValueColumn  The Header of the Column contaiing the values
 *  to be pivoted.
 * @param {"N/A"} defaultValue  The default value used to fill empty cells
 *  (default = "").
 * @return {"Cast Range"}
 * @customfunction
 */
function cast(Range, MeasureColumn, ValueColumn, defaultValue) {
  defaultValue = defaultValue || "";
  Range = table(Range, 0);
  Range = castTable(Range, MeasureColumn, ValueColumn, defaultValue)
  return untable(Range);
}


function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Activate', 'launch')
      .addToUi();
}


function onInstall(e) {
  onOpen(e);
}


function launch() {
  SpreadsheetApp.getActiveSpreadsheet().toast(
    "You can now start using Reshape by using the MELT and CAST functions",
    "Reshape enabled");
}
