/**
 * Melts a wide table into a long Format.
 *
 * @param {A1:F8} Range  The range to be molten into a long format.
 * @param {A1:C1} IDs  (Optional) A range with the column headers.
 *   If a column header is blank it gets the Number of the column.
 *   Such Ranges maybe creates like this: {"Country", "Year", "3"}.
 *
 * @param {"Quarter"} Measure  (Optional) Name of the column containing the molten columns'
 *   names (Default is "measure").
 *
 * @param {"Revenue"} Value  (Optional) Name of the column containing the molten values
 *  (Default is "value").
 *
 * @param {0} BlanksBehavior  (Optional) Sets the behavior of how to treat blank 
 *  columns and rows.-1 (Default) Does not Filter. 0 Filters out blank rows and columns.
 *  1 Filters blank rows. 2 Filters blank columns.
 *
 * @return {Molten range}
 * @customfunction
 */
function melt(Range, IDs, Measure, Value, BlanksBehavior) {
  if (BlanksBehavior === undefined) {
    BlanksBehavior = -1;
  }

  if (!(BlanksBehavior >= -1 && BlanksBehavior <= 2)) {
    throw "Blanks Behavior invalid";
  }
  
  if (BlanksBehavior != -1) {
    Range = filterMatrix(Range, BlanksBehavior);
  }
  
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
  
  for (var row in Range) {
    for (var col in Range[row]) {
      if (Range[row][col] instanceof Date) {
        Range[row][col] = sheetDate(Range[row][col]);
      }
    }
  }
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
  Range = castTable(Range, MeasureColumn, ValueColumn, defaultValue);
  Range = untable(Range)
  for (var row = 1; row < Range.length; row++) {
    for (var col in Range[row]) {
      if (Range[row][col] instanceof Date) {
        Range[row][col] = sheetDate(Range[row][col]);
      }
    }
  }
  return Range;
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
