class UserData {

  constructor() {
    this.money = this.getMoney();
    this.days = this.getDays();
    this.percentage = this.getPercentage();
  }

  getMoney() {
    var money = document.getElementById("moneyInput").value;
    return parseFloat(money);
  }

  getDays() {
    var days = document.getElementById("daysInput").value;
    return parseInt(days);
  }

  getPercentage() {

    if (this.money < 1000) {
      this.percentage = 0.025;
    } else {
      this.percentage = 0.03;
    }

    return this.percentage;
  }

}

function moneyCalculations() {
  let myUser = new UserData();
  
  var currentMoney = myUser.getMoney();
  var days = myUser.getDays();
  var benefitsPercentagePerDay = myUser.getPercentage();

  for (i = 0; i < days; i += 6) {
    moneyGeneratedEveryDay = currentMoney * benefitsPercentagePerDay;
    moneyGeneratedPast6Days = moneyGeneratedEveryDay * 6;
    moneySum = currentMoney + moneyGeneratedPast6Days;
    currentMoney = moneySum;
  }
  
  return currentMoney;
}

const api_url =
  "https://api.exchangeratesapi.io/latest?base=USD";

  const userAction = async () => {
  const response = await fetch(api_url);
  const data = await response.json();
  return data['rates']['EUR'];
};

async function printFinalMoney() { 
  
  var finalMoney = moneyCalculations();
  var data = await userAction();

  document.getElementById("result").innerHTML = finalMoney.toFixed(2);
  document.getElementById("resultEuros").innerHTML = (finalMoney * data).toFixed(2);
}

function printDaysWaiting(){
  let myUser = new UserData();
  var days = myUser.getDays();
  document.getElementById("daysWaiting").innerHTML = days;
}

function printData(){
  printFinalMoney();
  printDaysWaiting();
}

function deleteData() {
  document.getElementById("result").innerHTML = "...";
  document.getElementById("resultEuros").innerHTML = "...";
  document.getElementById("daysWaiting").innerHTML = "...";
}
