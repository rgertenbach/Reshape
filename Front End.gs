/**
 * Melts a wide table into a long Format.
 *
 * @param {A1:F8} Range  The range to be molten into a long format
 * @param {A1:C1} IDs   The range with the column headers
 * @param {"Quarter"} Measure  The name of the column that will contain the molten columns names. (Default is "measure")
 * @param {"Revenue"} Value  The name of the column that will contain the molten values (Default is "value")
 * @return {Molten range}
 * @customfunction
 */
function melt(Range, IDs, Measure, Value) {
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
 * @param {"Year"} MeasureColumn  The Header of the Column that indicates the headers of the pivoted values.
 * @param {"Value"} ValueColumn  The Header of the Column that contains the values to be pivoted.
 * @param {"N/A"} defaultValue  The default value used to fill unused cells with (default = "").
 *
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
