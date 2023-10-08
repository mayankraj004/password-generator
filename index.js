const inputSlider= document.querySelector('.slider');
const lengthNumber= document.querySelector("[data-lengthNumber]");
const passwordDisplay= document.querySelector('.display');
const cpyBtn= document.querySelector("[data-copy]");
const cpyMsg= document.querySelector("[data-copyMsg]");

const upperCaseCheck= document.querySelector("#upperCase");
const lowerCaseCheck= document.querySelector("#lowerCase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");

const indicator= document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generate-button");

const allCheckboxes= document.querySelectorAll("input[type=checkbox]")

const symbols='~!@)#$%&*{_<}(,>/?;:'


let password="";
let passwordLength= 10;
let checkCount=0;
handleSlider();
// set the strength color to grey
setIndicatorColor('#ccc')

// set password length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthNumber.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize =((passwordLength-min)*100/(max-min)) + "% 100%";
}
// set Indicator color

function setIndicatorColor(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow='0px 0px 12px 1px ${color}';
}

function getRandomNumber(min,max){
    return Math.floor(Math.random()* (max-min)) + min;
}

function generateRandomNumber(){
    return getRandomNumber(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRandomNumber(97,122));
}

function generateUpperCase() {
   return String.fromCharCode(getRandomNumber(65,91));
}


function generateSymbol(){
    const randNum=getRandomNumber(0,symbols.length);

    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower= false;
    let hasSymbol=false;
    let hasNumber= false;

    if(upperCaseCheck.checked)  hasUpper=true;
    if(lowerCaseCheck.checked)  hasLower= true;
    if(numbersCheck.checked)  hasNumber= true;
    if(symbolsCheck.checked)  hasSymbol= true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicatorColor('green');
    }  else if ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength>=8){
        setIndicatorColor('yellow');
    }
    else {
        setIndicatorColor('red');
    }
}

async function copyClipBoard(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        cpyMsg.innerText='copied';
    } catch (error) {
        cpyMsg.innerText='failed'
    }

    cpyMsg.classList.add("active");

    setTimeout(() => {
        cpyMsg.classList.remove("active");
    }, 2000 );
}
// Fisher Yates Method 
function shufflePassword(array){
    for(let i=array.length-1; i>=0; i--){
        const j=Math.floor(Math.random() * (i+1));
        const temp= array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el) =>(str += el));
    return str;
}

function handleCheckboxChange(){
    checkCount=0;
    allCheckboxes.forEach( (checkbox)=> {
        if(checkbox.checked)
        checkCount++;
    });

    if(passwordLength< checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

}

allCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange)
});

inputSlider.addEventListener('input',(e) => {
    passwordLength=e.target.value;
    handleSlider();
})

cpyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
    copyClipBoard();
})

generateBtn.addEventListener('click', () => {
    if(checkCount ==0) 
     return;

     if(passwordLength< checkCount){
        passwordLength=checkCount;
        handleSlider();
    }


    password="";

   
    let funcArr=[];

    if(upperCaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowerCaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0; i<funcArr.length; i++){
    password = password + funcArr[i]();
   }
   console.log('yaha tk sahi hai')
  
   let dummy = passwordLength - funcArr.length;

   for (let i = 0; i < dummy; i++) {
       let randIndex = getRandomNumber(0, funcArr.length); // Adjust the range
       console.log("randIndex: " + randIndex);
       if (funcArr[randIndex]) {
           password += funcArr[randIndex]();
       }
   }

   password= shufflePassword(Array.from(password));

   passwordDisplay.value=password;
   console.log(password.length)

   calcStrength();

});

