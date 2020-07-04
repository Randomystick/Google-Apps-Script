function checkTimer() 
{
  // OPEN BOTH SPREADSHEETS
  // Form URL for sharing: https://forms.gle/2Sg719LYq3Lox13u7
  var formSheet = SpreadsheetApp.openByUrl(
    'https://docs.google.com/spreadsheets/d/16U2EPLtb2dWvJfZg8embWAlAJ6_rxHNZeJtGKdj41ps/edit?usp=sharing');
  Logger.log(formSheet.getName()); 
  var eventsSheet = SpreadsheetApp.openByUrl(
    'https://docs.google.com/spreadsheets/d/1NwkAd-479_pNrHJxSDlkFaX5Ybkj-CMHeBayOibA5OY/edit#gid=619109696');
        
  
  // FETCH THE EMAIL ADDRESSES AND NAMES IN THE FIRST 100 CELLS
  var emails = [formSheet.getRange("B2").getValue()]; // create array for emails, populate with the first email in cell B2
  var names = [formSheet.getRange("C2").getValue()];
  var range = formSheet.getRange("B3:B60"); // read cells B3 to B60 || MUST CHANGE IF NUMBER OF EMAILS EXCEED 60
  var range2 = formSheet.getRange("C3:C60");
  var data = range.getValues();
  var data2 = range2.getValues();
  // ...AND ADD TO EMAILS / NAMES ARRAY IF CELL IS NOT BLANK
  for (var x = 0; x < data.length; x++)
  {
    if (data[x][0])
    {
      emails.push(data[x][0]);
    }
    if (data2[x][0])
    {
      names.push(data2[x][0]);
    }
  }               
  Logger.log(emails)
  Logger.log(names)
  
  
  // GET EVENT METADATA
  var eventType = (eventsSheet.getSheetByName("Dashboard").getRange("G3")).getValue();
  //var organiser = (eventsSheet.getSheetByName("Dashboard").getRange("J3")).getValue();
  //var eventLink = (eventsSheet.getSheetByName("Dashboard").getRange("H13")).getValue();
    
      
  // SET EMAIL CONTENTS
  var subject = 'GE2020 Event: ' + eventType;
    
  var msgHtml = 
      '<b>The event, "' + eventType + '", starts in about ' + hourInt + ' hours and ' +  minuteInt + ' minutes!</b><br/>'
    + 'Access the event tracker <a href="https://docs.google.com/spreadsheets/d/1NwkAd-479_pNrHJxSDlkFaX5Ybkj-CMHeBayOibA5OY/edit?ts=5efc7475#gid=619109696">here!</a><br/>'
    + '<br/>'
    + '<i>For inputs, questions or suggestions, DM us on instagram: @fabarchy @hemaa.sekar @hemavathy06 @anusereh @t.ecarg or @rupa_shree</i> <br/>'
    + '<i>For dashboard feature requests or bug reports, DM @b.leoww or reply to this email!</i><br/>';
        
  
  // FETCH THE DASHBOARD'S COUNTDOWN
  var minuteStr = eventsSheet.getSheetByName("Dashboard").getRange("K5"); 
  var minuteInt = minuteStr.getValue();
  
  var hourStr = eventsSheet.getSheetByName("Dashboard").getRange("G5"); 
  var hourInt = hourStr.getValue();
  
  Logger.log('minuteInt is ' + minuteInt);
  Logger.log('hourInt is ' + hourInt);
  
  
  // FETCH THE HASSENT ROW
  // =vlookup(data!$M$2,data!$A:$O,15, false)
  var hasSentCell = (eventsSheet.getSheetByName("Dashboard").getRange("K1"))
  var hasSent = hasSentCell.getValue();
  Logger.log(hasSent)
  
  
  // CHECK THE HOUR AND MINUTE
  if (hourInt == 0 && minuteInt <= 15 && minuteInt >= 0)
  {
    // SEND EMAILS IF IT HASNT BEEN SENT BEFORE
    if (hasSent == false)
    {
      for (var i = 0; i < emails.length; i++) 
      {
        var msgHtmlName = 'Hey ' + names[i] + ',' +  '<br/>' + msgHtml
        var msgPlain = msgHtmlName.replace(/\<br\/\>/gi, '\n').replace(/(<([^>]+)>)/ig, ""); // clear html tags and convert br to new lines for plain mail
        
        
        // COMMENT TO DISABLE //
        
       GmailApp.sendEmail(emails[i], subject, msgPlain, { htmlBody: msgHtmlName });
        
        // COMMENT TO DISABLE //
        
        
        Logger.log('Sent to ' + emails[i]);
        Logger.log('With message: ' + msgHtmlName + '\n')
      }
      // WRITE 1 TO HASSENT IN DATA SHEET
      var x = eventsSheet.getSheetByName("data").getRange("M2").getValue();
      var xValues = eventsSheet.getSheetByName("data").getRange("A1:A200").getValues();
      for(rowNum=1; rowNum < xValues.length; ++rowNum)
      {
        if (xValues[rowNum][0] == x){break} ;// if a match in column B is found, break the loop
      }
      rowNum += 1;
      // Logger.log(x)
      // Logger.log(xValues)
      Logger.log(rowNum)
      eventsSheet.getSheetByName("data").getRange(rowNum, 15, 1, 1).setValue(1);
    }
    else
    {
      Logger.log("email for " + eventType + " already sent")
    }
  }

    
    Logger.log('end of program');
}


