var player1 = prompt("Player One: Enter your name, ou will be blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter your name, ou will be red");
var player2Color = 'rgb(237, 45, 73)';

var game_on= true;
var table= $('table tr');

function reportWin(rowNum,colNum) {
  console.log("You won starting at this row,col");
  console.log(rowNum);
  console.log(colNum);
}


function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}


function reportColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkBottom(colIndex) {
  var colorReport = reportColor(5,colIndex);
  for (var row = 5; row > -1; row--) {
    colorReport = reportColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row
    }
  }
}

function colorMatchCheck(one, two, three, four){
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

//horizontal win check
function horizontalWinCheck(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(reportColor(row, col), reportColor(row, col+1), reportColor(row, col+2), reportColor(row, col+3))) {
        console.log('horiz');
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

// Check for Vertical Wins
function verticalWinCheck() {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col) ,reportColor(row+2,col), reportColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// Check for Diagonal Wins
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(reportColor(row,col), reportColor(row+1,col+1) ,reportColor(row+2,col+2), reportColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(reportColor(row,col), reportColor(row-1,col+1) ,reportColor(row-2,col+2), reportColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

//start w player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + ", it is your turn, pick a column!")

$('.board button').on('click',function() {
  var col = $(this).closest("td").index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail,col,currentColor);
  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    $('h1').text(currentName+ ", you have won!!!!")
    $('h2').fadeOut(300);
    $('h3').fadeOut(300);
  }

  currentPlayer = currentPlayer * -1;
  if (currentPlayer===1) {
    $('h3').text(player1+", it is your turn, pick a column!");
    currentName = player1;
    currentColor = player1Color;
  } else {
    $('h3').text(player2+", it is your turn, pick a column!");
    currentName = player2;
    currentColor = player2Color;
  }
})
