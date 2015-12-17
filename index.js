var rows = 25;
var cols = 4;
var html = "";
var count = 0;
var delta = 0;
var results = [];

var round = 1;
var maxNum = 10;

$(function() {

  $('#create').on('click', function() {
    count = 0;
    $("#container").html('');
    $("#watch").html(count);
    maxNum = parseInt($('#number :selected').val());
    round = parseInt($('#step :selected').val());
    getCorrectEquation();
  });
})

function getRandom(from, to) {
  return Math.round(Math.random() * (to-from) + from);
}

function subtraction(a, b) {
  return {
    valueOf: function() {
      a.valueOf() - b.valueOf()
    },
    toString: function() {
      return `${a}+${b}`
    }
  };
}

function addition(a, b) {
  return {
    valueOf: function() {
      a.valueOf() + b.valueOf()
    },

    toString: function() {
      return `${a}-${b}`
    }
  };
}

function getRandomOp() {
  return Math.random() > 0.5 ? subtraction : addition;
}

function createEquation(num) {
  var a = getRandom(1, maxNum);
  var b, op;

  for(var i=0; i<num; i++) {
    b = getRandom(1, maxNum);
    op = getRandomOp();
    a = op(a, b);
    // console.log(a.toString());
    if(eval(a.toString()) > maxNum || eval(a.toString()) < 0) {
      return false
    }
  }

  return a.toString() + '=' + eval(a.toString());
}

function getCorrectEquation() {
  if(rows * cols === count) {
    createPaper();
    return;
  }

  var result = createEquation(round);

  if(result) {
    count++;
    $('#watch').html(count);
    console.log(count + ":" + result);
    results.push(result);
    delta = 0;
  }
  window.setTimeout(getCorrectEquation, 0);
}

function createPaper() {
  var htmlString = "";

  for(var i=0; i<rows; i++) {
    htmlString += "<ul>";
    for(var j=0; j<cols; j++) {
      var item = results.pop();
      item = item.replace(/\d+$/, "");
      htmlString += `<li>${item}</li>`;
    }
    htmlString += "</ul>";
  }

  $("#container").html(htmlString);

};

getCorrectEquation()
