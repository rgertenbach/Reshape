# Reshape
Tables in Spreadsheets can be one or two dimensional.   
Two dimensional tables are easier on the eye but less flexible.  
Reshape for Google Spreadsheets provides functions to easily reshape the data between the two formats.

## One Dimensional (long) Tables
One dimensional tables have a column for each value identifying an entry, and the corresponding value.
This is for example the format that SQL queries typically output aggregated data in.
This format is required for Pivot tables and while a Pivot table can work with multiple value carrying columns it cannot infer if two columns are of the same fundamental type (Such as a quarter of a year).

### Example:
| Region | Country        | Quarter | Revenue   |
| ------ | -------------- | ------- | ---------:|
| EMEA   | Germany        | 2016 Q1 | 3,453,453 |
| EMEA   | United Kingdom | 2016 Q1 | 3,093,249 |
| APAC   | Japan          | 2016 Q1 | 9,483,944 |
| APAC   | South korea    | 2016 Q1 | 4,358930  |
| EMEA   | Germany        | 2016 Q2 | 198,432   |
| EMEA   | United Kingdom | 2016 Q2 | 9,349,203 |
| APAC   | Japan          | 2016 Q2 | 4,587,439 |
| APAC   | South korea    | 2016 Q2 | 8,437,224 |

## Two dimensional (wide) tables
Two dimensional tables have columns that identify an entry but they contain multiple columns that contain values.

### Example:
| Region | Country        | 2016 Q1   | 2016 Q2   |
| ------ | -------------- | ---------:| ---------:|
| EMEA   | Germany        | 3,453,453 | 198,432   |
| EMEA   | United Kingdom | 3,093,249 | 9,349,203 |
| APAC   | Japan          | 9,483,944 | 4,587,439 |
| APAC   | South korea    | 4,358,930 | 8,437,224 |

## The Melt command
Every table can be created from a long table using pivoting and row filters but manually entered data is often entered in a two dimensional format because it allows for esier direct comparison without data manipulation and uses the screen more effectively.  
The melt command takes such a two dimensional table and transforms it into the long format to increase flexibility in how the  data can be transformed.

    =MELT(<Table>, <ID Columns>)
    =MELT(A1:D5, A1:B1)

### Parameters
**Table**

Table is the range of the actual table (such as `A1:D5`)

**ID Columns**

The ID Columns are the range of the headers identifying the the ID columns, i,e. the columns that are not pivoted.
In the example above they would be "Region" and "Country" which can be supplied with either `A1:B1` or `{"Region"; "Country"}`.

The ID columns parameter is **optional**, if a table only consists of columns of values that should be transformed into a table identifying the measure and giving the corresponding value then no ID columns exist and they thus do not need to be provided.

If every column is an ID column and no value columns exist the output will be blank as there are no values for any combination of identifiers.

## The Cast Command
The cast command is almost superfluous given `QUERY` and Pivot Tables exist but it has been included for completeness sake.
What makes this function potentially useful is that it has purposely been designed not to aggregae data where multiple rows with the same identifiers are present. More on that later.

    =CAST(<Table>, <Measure Column>, <Value Column>)
    =CAST(A1:D9, C1, D1)

### Parameters
**Table**

Table is the range of a table in a long format.

**Measure Column**

The Measure Column is the Address or Name of the Column identifying the name of the column that will be pivoted.

**Value Column**

The Value column is the column that contains the actual measurement that will be populated into the two dimensional matrix identified by the ID columns in the separate measureing columns,

### Non aggregation
To make the existence of this function a bit worthwhile it does not aggregate anything, it kind of works like a pivot table that keeps every value intact.

This allows you to preserve multiple observations with identical identifying columns .
If there is a second column that has the same identifying values it will be appended as a new row.

#### Exampe:
| Region | Country        | Quarter | Revenue |
| ------ | -------------- | ------- | -------:|
| EMEA   | Germany        | 2016 Q1 | 1,806,091 |
| EMEA   | United Kingdom | 2016 Q1 | 3,093,249 |
| EMEA   | Germany        | 2016 Q1 | 1,647,362 |

will become

| Region | Country        | 2016 Q1   |
| ------ | -------------- | ---------:|
| EMEA   | Germany        | 1,806,091 |
| EMEA   | United Kingdom | 3,093,249 |
| EMEA   | Germany        | 1,647,362 |
