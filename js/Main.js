class UserData {

  getMoney() {
    const investmentMoney = document.getElementById("moneyInput").value;
    return parseFloat(investmentMoney);
  }

  getDays() {
    const investmentDays = document.getElementById("daysInput").value;
    return parseInt(investmentDays);
  }

  getPercentage() {
    const HIGH_PERCENT_MONEY_AMOUNT = 1000;
    const LOW_PERCENT = 0.025;
    const HIGH_PERCENT = 0.03;
    
    this.percentage = this.getMoney() < HIGH_PERCENT_MONEY_AMOUNT ? LOW_PERCENT : HIGH_PERCENT;

    return this.percentage;
  }

}

function moneyCalculations() {
  const myUser = new UserData();

  let userMoney = myUser.getMoney();
  const daysInvesting = myUser.getDays();
  const basePercentage = myUser.getPercentage();
  const basePercentageAfter6Days = 6 * basePercentage;
  
  let moneyBenefitsAfter6Days;

  for (let dayCount = 0; dayCount < daysInvesting; dayCount += 6) {
    moneyBenefitsAfter6Days = basePercentageAfter6Days * userMoney;
    userMoney = moneyBenefitsAfter6Days + userMoney;
  }
  
  return userMoney;
}

const api_url = "https://api.exchangeratesapi.io/latest?base=USD";

  const userAction = async () => {
  const response = await fetch(api_url);
  const data = await response.json();
  
  return data['rates']['EUR'];
};

async function printFinalEuros() {
  
  const data = await userAction();
  
  const finalUserMoney = moneyCalculations();
  
  document.getElementById("resultEuros").textContent = (finalUserMoney * data).toFixed(2);
}

  function printFinalDollars() { 
  
  const finalUserMoney = moneyCalculations();

  document.getElementById("result").textContent = finalUserMoney.toFixed(2);
}

function printDaysWaiting(){
  const myUser = new UserData();
  const days = myUser.getDays();
  document.getElementById("daysWaiting").textContent = days;
}

function printData(){
  printFinalDollars();
  printDaysWaiting();
  printFinalEuros();
}

function deleteData() {
  document.getElementById("result").textContent = "...";
  document.getElementById("resultEuros").textContent = "...";
  document.getElementById("daysWaiting").textContent  = "...";
}
