//FCC CALCULATOR

var numDisplay = document.getElementById('num-display');
var userInp = '';
var nums = [];
var ops = [];
var hasBeenEqualed = false;

//Object for calculations
var calculate = {
  '+' : function(a, b) {
    return parseFloat((a + b).toPrecision(8));
  },
  '-' : function(a, b) {
    return parseFloat((a - b).toPrecision(8));
  },
  'x' : function(a, b) {
    return parseFloat((a * b).toPrecision(8));
  },
  '/' : function(a, b) {
    return parseFloat((a / b).toPrecision(8));
  }
}

// ###### HELPER FUNCTION ######

//perform proper arithmetic on reduce list items;
function computeAlg(a, b) {
  var operator = ops.shift();
  return calculate[operator](a,b);
}

//push userInp if its not NaN;
function pushUserInp(uInp) {
  if (parseInt(uInp) || parseFloat(uInp)) {
    if (uInp.indexOf('.') === -1) {
      nums.push(parseInt(uInp));
    } else {
      nums.push(parseFloat(uInp));
    }
  }
  userInp = '';
}

//check if item has a class
function hasClass(e, cssClass) {
  return e.target.classList.contains(cssClass);
}

//write items to the display
function writeToDisplay(dispItem) {
  numDisplay.firstChild.nodeValue = dispItem;
}

// ###### EVENT HANDLER ######

//add user selected num to userInp and display
function numClick(e) {
  var pressedNum = e.target.firstChild.nodeValue;
  if (hasBeenEqualed) {
    nums = [];
    ops = []
    hasBeenEqualed = false;
  }
  if (pressedNum === '.') {
    if (userInp.indexOf(pressedNum) > -1) {
      return;
    }
  }
  userInp += pressedNum;
  writeToDisplay(userInp);
}

//when operator is clicked
function operClick(e) {
  //check to see if its appropriate to add a operator to function
  if (nums.length > ops.length ||
      (nums.length === ops.length &&
      userInp)) {
    var pressedOper = e.target.firstChild.nodeValue;
    //userInp added to nums and the operator to ops;
    if (hasBeenEqualed) {
      hasBeenEqualed = false;
    }
    pushUserInp(userInp);
    ops.push(pressedOper);
    //update display
    writeToDisplay(pressedOper);
  }
}

//when equal sign clicked
function equalClick() {
  pushUserInp(userInp);
  var myNum = nums.reduce(computeAlg);
  writeToDisplay(myNum);
  nums = [myNum];
  hasBeenEqualed = true;
}

//clear all calculations
function allClearClick(){
  nums = [];
  ops = [];
  writeToDisplay('0');
  userInp = '';
}

//clear current entry
function clearEntryClick() {
  if (userInp) {
    userInp = '';
  } else if(hasBeenEqualed){
    allClearClick();
  } else if (ops.length === nums.length) {
    ops.pop();
  }
  writeToDisplay();
}

//make a negative, or positive number
function toNegative(){
  if (userInp) {
    if (userInp.includes('-')) {
      userInp = (parseInt(userInp) * -1).toString();
    } else {
      userInp = (userInp * -1).toString();
    }
  } else {
    userInp = "-";
  }
  writeToDisplay(userInp);
}

//EVENT LISTENERS
var buttons = document.querySelector('.button-cont');
buttons.addEventListener('click', function(e){
  if (hasClass(e, 'num-val')) {
    numClick(e);
  } else if (hasClass(e, 'operator')){
    operClick(e);
  } else if (hasClass(e, 'tall')) {
    equalClick(e);
  } else if (hasClass(e, 'all-clear')) {
    allClearClick();
  } else if (hasClass(e, 'entry-clear')) {
    clearEntryClick();
  } else if (hasClass(e, 'neg')) {
    toNegative();
  }
});
