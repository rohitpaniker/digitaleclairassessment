var flag = 0;
function addRow() {
  try {
    var alphabet = prompt('Add an alphabet').toUpperCase();
    if(alphabet === 'E')
      flag += 1;
    if(alphabet.split('').length > 1 || alphabet.split('').length < 1 || (alphabet.charCodeAt(0) < 65 && alphabet.charCodeAt(0) > 90))
      return null
    var arrValue = $('table.mainTable').find('tr')
    arrValue.each(function(e) {
      try {
        var prev = $('table.mainTable').find('tr')[e]
        var nxt = $('table.mainTable').find('tr')[e+1]
        if(((alphabet.charCodeAt(0) === $(prev).children(":first")[0].innerHTML.charCodeAt(0)+1) && (alphabet.charCodeAt(0) === $(nxt).children(":first")[0].innerHTML.charCodeAt(0)-1))) {
          appendRow(prev, alphabet)
          arrValue = $('table.mainTable').find('tr')
        } else if(e === arrValue.length-1 && (alphabet.charCodeAt(0) > $($('table.mainTable').find('tr')[arrValue.length-1]).children(":first")[0].innerHTML.charCodeAt(0))) {
          appendRow($('table.mainTable').find('tr')[arrValue.length-1], alphabet)
          arrValue = $('table.mainTable').find('tr')
        } else if((alphabet.charCodeAt(0) > $(prev).children(":first")[0].innerHTML.charCodeAt(0)) && (alphabet.charCodeAt(0) < $(nxt).children(":first")[0].innerHTML.charCodeAt(0))) {
          appendRow($('table.mainTable').find('tr')[e], alphabet)
          arrValue = $('table.mainTable').find('tr')
        }
      } catch(exB) {
        appendRow(prev, alphabet)
        console.log('w00t w00t', exB);
      }
    });
  } catch(exA) {
    console.log('w00t w00t', exA);
  }
}

function appendRowForE() {
  // Vanila JS
  if(flag > 0)
    return false;
  var cx = document.getElementsByTagName("tr").length
  for(var i = 0; i < cx; i++){
    if(document.getElementsByTagName("tr")[i].children[0].innerHTML === "D") {
      var table = document.getElementById('mainTable');
      var row = table.insertRow(i+1)
      var cell = row.insertCell(-1);
      cell.innerHTML= "E"
      var cell = row.insertCell(-1);
      cell.innerHTML= "EE"
      var cell = row.insertCell(-1);
      cell.innerHTML= "EEE"
      flag += 1;
    }
  }
}

function appendRow(referenceElement, alphabet) {
  // Uses JQuery

  if(!alphabet)
    return null;

  // For inserting in to the 4th column as well but as this isn't mentioned, below code is disabled but is functional.
  // $('<tr><td>'+alphabet.repeat(1)+'</td><td>'+alphabet.repeat(2)+'</td><td>'+alphabet.repeat(3)+'</td><td>'+alphabet.repeat(4)+'</td></tr>').insertAfter(referenceElement);

  $('<tr><td>'+alphabet.repeat(1)+'</td><td>'+alphabet.repeat(2)+'</td><td>'+alphabet.repeat(3)+'</td></tr>').insertAfter(referenceElement);
}

function addNewCol4ToRight() {
  // Uses JQuery
  $('.tableHeader').append('<th> Col4 </th>')
}


Object.equals = function( x, y ) {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== "object" ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}
