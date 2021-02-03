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
  getCicle(){
    const HIGH_PERCENT_MONEY_AMOUNT = 1000;
    const LONGCICLE = 6;
    const SHORTCICLE = 5;

    this.cicle = this.getMoney() < HIGH_PERCENT_MONEY_AMOUNT ? LONGCICLE : SHORTCICLE;
    return this.cicle;
  }

}

function moneyCalculations() {
  const myUser = new UserData();

  let userMoney = myUser.getMoney();
  const daysInvesting = myUser.getDays();
  const basePercentage = myUser.getPercentage();
  
  const basePercentageAfterCicle = myUser.getCicle() * basePercentage; //Cicle means: After 6 or 5 days you can withdraw your deposit.
 
  let moneyBenefitsAfterCicle;

  for (let dayCount = 0; dayCount < daysInvesting; dayCount += myUser.getCicle() ) {
    moneyBenefitsAfterCicle = basePercentageAfterCicle * userMoney;
    userMoney = moneyBenefitsAfterCicle + userMoney;
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
