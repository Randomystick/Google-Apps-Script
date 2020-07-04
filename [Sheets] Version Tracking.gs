function onEdit() 
{
  Logger.log("onEdit function start")
  var s = SpreadsheetApp.getActiveSheet();
  Logger.log("edit is on tab: " + s.getName())
  if( s.getName() == "Upcoming Events" ) // checks that we're on the tab where we want the onEdit trigger
  {
    var r = s.getActiveCell();
    var rowToWrite = r.getRow();
    var colToWrite = 13;
    var cellToWrite = s.getRange(rowToWrite, colToWrite,1,1); // this is the place we want to write into
    
    
    var colStart = 2;
    var colEnd = 11;
    // By design: Checks that the entire range of keyable data is already filled
    // 1. Gaurav: "start date (col4) and end date (col5) must exist"
    // 2. Gaurav's google calendar is only interested in events with complete information, anything else is a waste of resources
    var emptyCols = 0;
    for (var i = colStart; i < colEnd+1; i++) 
    {
      emptyCols += s.getRange(rowToWrite, i, 1,1).isBlank(); // if a cell is blank (true -> 1), emptyCols will increment
    }
    
    
    if (!emptyCols) // if all data is present
    {
      if( r.getColumn() >= colStart || r.getColumn() <= colEnd ) // checks that the cell being edited is in range of keyable data, just in case
      {
        Logger.log("ROW: " + rowToWrite);
        Logger.log("current sync version: " + cellToWrite.getValue());
        if (cellToWrite.isBlank())
        {
          cellToWrite.setValue(0);
          Logger.log("setting sync version as 0")
        }
        else
        {
          cellToWrite.setValue(cellToWrite.getValue()+1);
          Logger.log("incrementing sync value by 1. now it is: " + cellToWrite.getValue() + " at row: " + rowToWrite)
        }
      }
    }
    
  }
  Logger.log("end of onEdit")
  //end of onEdit function
}
