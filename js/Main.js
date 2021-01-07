function getMoney() {
  var money = document.getElementById("moneyInput").value;

  return parseFloat(money);
}

function getDays() {
  var days = document.getElementById("daysInput").value;

  document.getElementById("daysWaiting").innerHTML = days;
  return parseInt(days);
}

function calculatePercentage(userMoneyInvested) {
  if (userMoneyInvested < 1000) {
    percentage = 0.025;
  } else {
    percentage = 0.03;
  }

  return percentage;
}

function moneyCalculations() {
  var currentMoney = getMoney();
  var days = getDays();

  var benefitsPercentagePerDay = calculatePercentage(currentMoney);

  for (i = 0; i < days; i += 6) {
    moneyGeneratedEveryDay = currentMoney * benefitsPercentagePerDay;
    moneyGeneratedPast6Days = moneyGeneratedEveryDay * 6;
    moneySum = currentMoney + moneyGeneratedPast6Days;
    currentMoney = moneySum;
  }

  return currentMoney;
}

function printFinalMoney() {
  var finalMoney = moneyCalculations();

  document.getElementById("result").innerHTML = finalMoney.toFixed(2);
  document.getElementById("resultEuros").innerHTML = (
    finalMoney * 0.82
  ).toFixed(2);
}

function deleteFinalMoney() {
    var finalMoney = moneyCalculations();
  
    document.getElementById("result").innerHTML = "...";
    document.getElementById("resultEuros").innerHTML =  "...";
    document.getElementById("daysWaiting").innerHTML = "...";
  }