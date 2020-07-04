function checkTimer() 
{
    // FETCH THE DASHBOARD'S COUNTDOWN
    var minuteStr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard").getRange("K5"); 
    var minuteInt = minuteStr.getValue();
  
    var hourStr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard").getRange("G5"); 
    var hourInt = hourStr.getValue();
  
    Logger.log('minuteInt is ' + minuteInt);
    Logger.log('hourInt is ' + hourInt);


    // CHECK THE HOUR AND MINUTE
    if (hourInt == 0 && minuteInt <= 15 && minuteInt >= 0)
    {
      // FETCH THE EMAIL ADDRESSES IN THE FIRST 100 CELLS    
      var emails = [(SpreadsheetApp.getActiveSpreadsheet().getSheetByName("mailing list").getRange("B2").getValue())];
      var range = (SpreadsheetApp.getActiveSpreadsheet().getSheetByName("mailing list").getRange("B3:B100"));
      var data = range.getValues();
      // ...AND ADD TO EMAILS ARRAY IF CELL IS NOT BLANK
      for (var x = 0; x < data.length; x++)
      {
        if (data[x][0])
        {
          emails.push(data[x][0]);
        }
      }               
      Logger.log(emails)
    

    // GET EVENT METADATA
    var eventType = (SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard").getRange("G3")).getValue();
    var organiser = (SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard").getRange("J3")).getValue();
    var eventLink = (SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard").getRange("H13")).getValue();
    
      
    // SET EMAIL CONTENTS
    var subject = 'GE2020 Event: ' + eventType + ' by ' + organiser;
    
    var msgHtml = '<b>The event, "' + eventType + '", starts in ' + hourInt + ' hours and ' +  minuteInt + ' minutes!</b><br/>'
    + 'Access the event tracker <a href="https://docs.google.com/spreadsheets/d/1NwkAd-479_pNrHJxSDlkFaX5Ybkj-CMHeBayOibA5OY/edit?ts=5efc7475#gid=619109696">here!</a><br/>'
    + '<br/>'
    + '<i>For inputs, questions or suggestions, DM us on instagram: @fabarchy @hemaa.sekar @hemavathy06 @anusereh @t.ecarg or @rupa_shree</i> <br/>'
    + '<i>For dashboard feature requests or bug reports, DM @b.leoww or reply to this email!</i><br/>';
    var msgPlain = msgHtml.replace(/\<br\/\>/gi, '\n').replace(/(<([^>]+)>)/ig, ""); // clear html tags and convert br to new lines for plain mail
    
    
    // SEND THE EMAIL (COMMENT TO DISABLE)
    for (var i = 0; i < emails.length; i++) 
    {
      GmailApp.sendEmail(emails[i], subject, msgPlain, { htmlBody: msgHtml });
      Logger.log('Sent to ' + emails[i]);
    }
    
    }
    Logger.log('done');
}


