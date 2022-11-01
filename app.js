let nameCard = document.querySelector('.card__details-name');
let nameInput = document.querySelector('#cardholder');
let nameErrorDiv = document.querySelector('.form__cardholder--error');

let numberCard = document.querySelector('.card__number');
let numberInput = document.querySelector('#cardNumber');
let numberErrorDiv = document.querySelector('.form__inputnumber--error');

let monthCard = document.querySelector('.card__month');
let monthInput = document.querySelector('#cardMonth');
let monthErrorDiv = document.querySelector('.form__input-mm--error');

let yearCard = document.querySelector('.card__year');
let yearInput = document.querySelector('#cardYear');
let yearErrorDiv = document.querySelector('.form__input-yy--error');

let cvcCard = document.querySelector('.card-back__cvc');
let cvcInput = document.querySelector('#cardCvc');
let cvcErrorDiv = document.querySelector('.form__input-cvc--error');


nameInput.addEventListener('input', ()=>{
    if(nameInput.value == ''){
        nameCard.innerText = 'JANE APPLESEED';
    }else{
        nameCard.innerText = nameInput.value;
    }
});

numberInput.addEventListener('input', event=>{

    let inputValue = event.target.value;

    numberCard.innerText = numberInput.value;

    let regExp = /[A-z]/g;
    if(regExp.test(numberInput.value)){
        showError(numberInput, numberErrorDiv,  'Wrong format, numbers only');
        
    }else{
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        hideError(numberInput, numberErrorDiv);
    }

    if(numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000';
    }
});

monthInput.addEventListener('input', ()=>{
    monthCard.innerText = monthInput.value + '/';
    validateLetters(monthInput, monthErrorDiv);

});

yearInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);

});

cvcInput.addEventListener('input', ()=>{
    yearCard.innerText = yearInput.value;
    validateLetters(yearInput, yearErrorDiv);
    cvcCard.innerText = cvcInput.value;
    validateLetters(cvcInput, cvcErrorDiv);
});



let confirmBtn = document.querySelector('.form__submit');
let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

let formSection = document.querySelector('.form');
let thanksSection = document.querySelector('.thanks-section');

confirmBtn.addEventListener('click', event=>{
    event.preventDefault();


    if(verifyIsFilled(nameInput, nameErrorDiv)){
        nameValidation = true;
    }else{
        nameValidation = false;

    }

    if(verifyIsFilled(numberInput, numberErrorDiv) == true){
        if(numberInput.value.length == 19){
            hideError(numberInput, numberErrorDiv);
            numberValidation = true;
        }else{
            showError(numberInput, numberErrorDiv, 'Wrong number');
            numberValidation = false;
        }
    }
    
    if(verifyIsFilled(monthInput, monthErrorDiv)){
        if(parseInt(monthInput.value)>0 &&  parseInt(monthInput.value)<=12){
            hideError(monthInput, monthErrorDiv);
            monthValidation = true;
        }else{
            showError(monthInput, monthErrorDiv, 'Wrong month');
            monthValidation = false;

        }
    }


    if(verifyIsFilled(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value)> 22 && parseInt(yearInput.value)<= 27){
            hideError(yearInput, yearErrorDiv);
            yearValidation = true;
        }else{
            showError(yearInput, yearErrorDiv, 'Wrong year');
            yearValidation = false;

        }
    }

    if(verifyIsFilled(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length == 3){
            hideError(cvcInput, cvcErrorDiv);
            cvcValidation = true;
        }else{
            showError(cvcInput, cvcErrorDiv, 'Wrong CVC');
            cvcValidation = false;

        }
    }

    if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true){
        formSection.style.display = 'none';
        thanksSection.style.display = 'block';
    }
});




function showError(divInput, divError, msgError){
    divError.innerText = msgError;
    divInput.style.borderColor = '#FF0000';
}
function hideError(divInput, divError){
    divError.innerText = '';
    divInput.style.borderColor = 'hsl(270, 3%, 87%)';
}
function verifyIsFilled(divInput, divError){
    if(divInput.value.length>0){
        hideError(divInput, divError);
        return true;
    }else{
        showError(divInput, divError, "Can't be blank");
        return false;
    }
}
function validateLetters(input, divError){
    let regExp = /[A-z]/g;
    if(regExp.test(input.value)){
        showError(input, divError,  'Wrong format, numbers only');
        
    }else{
        hideError(input, divError);
    }

}