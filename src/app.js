/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
// var Base64 = require('encoder');

var TWILIO_URL = 'https://api.twilio.com/2010-04-01/Accounts/AC03e448fcd4b653801fb98dd24fc666e06/Messages.json';
// var test_url = 'http://api.theysaidso.com/qod.json';

var main = new UI.Card({
  title: 'OMW!',
  icon: 'images/menu_icon.png',
  subtitle: 'On my way...',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'OMW',
        icon: 'images/menu_icon.png',
        subtitle: 'Let people know...'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Press Select to send your OMW!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
  wind.on('click', 'select', function(e){
    console.log('OMW sent');

    var credentials = "";
    console.log(credentials);
    
    var twilioBody = { 
        'to': "+4474293460", 
        'from': "+4479035460", 
        'body': "Pebble - Twilio OMW Test",   
    };
    
    ajax(
      {
        url: TWILIO_URL,
        method : 'post',
        type: 'json',
        data: twilioBody,
        headers: {'Authorization': 'Basic ' + credentials} 
      },
      function(data) {
        // Success!
        console.log('Successfully fetched data!');
        console.log(data);
      },
      function(error) {
        // Failure!
        console.log('Failed fetching data: ');
        console.log(error);

      }
);
  });
});
