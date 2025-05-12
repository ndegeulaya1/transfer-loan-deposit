'use strict';


// Data
const account1 = {
  owner: 'Baton Ndegeulaya',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: 'Adam Good',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'ney ney ney',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Mary kibuka',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

//button
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

//input
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//username   
const Username = function(accs) {
    accs.forEach(function(acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
    });
};
Username(accounts);

  //all movements
const displayMovement= function(movements){
    containerMovements.innerHTML='';
    movements.forEach(function(mov,i){
  const type =mov>0?'deposit':'withdraw';
  if(type==='deposit'){
    const html=` <div class="flex border-b-1 border-black p-10  gap-30">
         
    <div class="text-sm  font-semibold text-center bg-gradient-to-t from-deposit to-deposit1 rounded-full px-3 pt-1 text-white ${type}">
${i+1} ${type}
    </div>
   
    <div class="text-2xl">
        ${mov}
    </div>
</div>`;
containerMovements.insertAdjacentHTML('afterbegin',html);
  }
else {
    const html=` <div class="flex border-b-1 border-black p-10  gap-30">
         
    <div class="text-sm font-semibold text-center bg-gradient-to-t from-withdraw to-withdraw1 px-3 rounded-full text-white pt-1 ${type}">
${i+1} ${type}
    </div>
   
    <div class="text-2xl">
        ${mov}
    </div>
</div>`;
//ad html in js
containerMovements.insertAdjacentHTML('afterbegin',html);
}
    });
};



//chaining map,filter and map(deposit and withdraw)
const displaySummary= function(acc){
    const deposit =acc.movements.filter((mov=>mov>0)).reduce((acc,mov)=>acc+mov,0);
    labelSumIn.textContent=`${Math.abs(deposit)}$,`;
 
    const withdraw =acc.movements.filter((mov=>mov<0)).reduce((acc,mov)=>acc+mov,0);
    labelSumOut.textContent=`${Math.abs(withdraw)}$,`;

    const interest =acc.movements.filter(mov => mov > 0).map((deposit => deposit*acc.interestRate/100 )).reduce((acc,int)=> acc+int,0);
    labelSumInterest.textContent=`${interest}$`;
}

//balance
const displayBalance = function(acc){
    acc.balance=acc.movements.reduce((acc,mov)=> acc+mov,0)
    labelBalance.textContent=`${acc.balance}$`;
};
    

//update the UI
const updateUi = function(acc){
displayMovement(acc.movements);
  displayBalance(acc);
  displaySummary(acc);

}
   let currentAccount;


   //login
   btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    
     currentAccount = accounts.find(acc=> 
        acc.username=== inputLoginUsername.value
     );
   if(currentAccount?.pin===Number(inputLoginPin.value)){

   //display welcome
    labelWelcome.textContent=`welcome ${currentAccount.owner.split('  ')[0]}`
   }
  containerApp.classList.remove('hidden');
  inputLoginPin.value='';
  inputLoginUsername.value='';
  
updateUi(currentAccount)


   });


   //transfer money
   btnTransfer.addEventListener('click',(e)=>{
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(acc=> acc.username===inputTransferTo.value); 
  inputTransferTo.value='';
  inputTransferAmount.value='';
  if(amount>0 && receiver && currentAccount.balance>=amount && receiver?.username!=currentAccount.username){
     currentAccount.movements.push(-amount);
     receiver.movements.push(amount);

updateUi(currentAccount);
  }
   });


   //logout
   btnClose.addEventListener('click',(e)=>{
    e.preventDefault();
  labelWelcome.textContent='login to get started'
    if(currentAccount.username===inputCloseUsername.value && currentAccount.pin ===Number(inputClosePin.value)){
      const index= accounts.findIndex(acc => acc.username===inputCloseUsername.value);
      accounts.splice(index,1);
      containerApp.classList.add('hidden');
      

    }
   });



   //request loan
   btnLoan.addEventListener('click',(e)=>{
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
   //check if i satisfy to request loan
    if(amount>0 && currentAccount.movements.some(mov=> mov >= amount*0.1)){
      currentAccount.movements.push(amount);

      updateUi(currentAccount);
    }
     inputLoanAmount.value='';
   });


   //sort movements
let sorted = false;
btnSort.addEventListener('click', function () {
  sorted = !sorted;

  const sortedMovements = sorted
  // ascending
    ? [...currentAccount.movements].sort((a, b) => a - b) 
    : currentAccount.movements;

  displayMovement(sortedMovements);
});





















































 // Now each account object will have a 'username' property


