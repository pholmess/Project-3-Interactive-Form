/* Treehouse FSJS TechDegree

Project 3: Interactive Form and Validation

Sherri Holmes

*/

//variables declared

const nameField = document.getElementById('name');
const eMailField = document.getElementById('email');
const otherJob = document.getElementById('other-job-role');
const jobTitle = document.getElementById('title');
const shirtDesign = document.getElementById('design');
const colorChoice = document.getElementById('color');
const shirtColors = colorChoice.children;
const activitiesChoice = document.getElementById('activities');
const total = document.getElementById('activities-cost');
const checkBoxes = document.querySelectorAll('#activities input');
let totalCost = 0;
const paymentType= document.getElementById('payment');
const paymentMethod = paymentType.children;
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');
const creditCardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvCode = document.getElementById('cvv');
const formElement = document.querySelector('form');

// Prompts user to fill out name on page load
nameField.focus();

// Disallows user to select colors until theme has been chosen
colorChoice.disabled = true;
payPal.hidden = true;
bitCoin.hidden = true;
paymentMethod[1].setAttribute('selected', true);

// Function that displays "Other Jobs" textfield when "other" option is selected from the drop down menu
function showOtherJob() {
    otherJob.style.display = 'none';
    jobTitle.addEventListener('change', (e) => {
        if (e.target.value == 'other') {
            otherJob.style.display = 'block';
        } else {
            otherJob.style.display = 'none';
        }
    });
}
showOtherJob();

// Listens for user's choice and displays available color options accordingly
shirtDesign.addEventListener('change', (e) => {
    colorChoice.disabled = false;
    for (let i = 0; i < shirtColors.length; i++) {
        const themeChoice = e.target.value;
        const dataTheme = shirtColors[i].getAttribute('data-theme');
        if (themeChoice === dataTheme) {
            shirtColors[i].hidden = false;
        } else {
            shirtColors[i].hidden = true;
            shirtColors[i].removeAttribute = ('selected', false);
        }
    }
	
// Ensures that top color of 3 available options populates in select box upon choosing theme
    if (shirtDesign.value == 'js puns') {
        shirtColors[1].selected = true;
    } else if (shirtDesign.value == 'heart js') {
        shirtColors[4].selected = true;
    }
});

// Listens for user's selections for activity selections
activitiesChoice.addEventListener('change', (e) => {
    let selectedActivityCost = e.target.getAttribute('data-cost');
    selectedActivityCost = +selectedActivityCost;
    
	if (e.target.checked) {
        totalCost = totalCost + selectedActivityCost;
    } else {
        totalCost = totalCost - selectedActivityCost;
    }
    total.innerHTML = `$${totalCost}`;
    for (let i = 0; i < checkBoxes.length; i++)
        if (
            e.target.getAttribute('data-day-and-time') ===
                checkBoxes[i].getAttribute('data-day-and-time') &&
            e.target !== checkBoxes[i]
        ) {
            if (e.target.checked) {
                checkBoxes[i].disabled = true;
                checkBoxes[i].parentElement.className = 'disabled';
            } else {
                checkBoxes[i].disabled = false;
                checkBoxes[i].parentElement.className = '';
            }
        }
});

// Listens for user's selection for payment method and displays appropriate fields
paymentType.addEventListener('change', () => {
    if (paymentType.value === 'paypal') {
        payPal.hidden = false;
        creditCard.hidden = true;
        bitCoin.hidden = true;
    } else if (paymentType.value === 'credit-card') {
        creditCard.hidden = false;
        bitCoin.hidden = true;
        payPal.hidden = true;
    } else if (paymentType.value === 'bitcoin') {
        bitCoin.hidden = false;
        creditCard.hidden = true;
        payPal.hidden = true;
    }
});

//Form validation functions
const nameValidation = () => {
    const nameEntered = nameField.value;
    const validName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm.test(nameEntered);
    return validName;
};

const eMailValidation = () => {
    const eMailEntered = eMailField.value;
	
// From emailregex.com
    const validEMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(eMailField.value);
    return validEMail;
};

const activitiesValid = () => {
    const validActivitiesEntered = totalCost > 0;
        return validActivitiesEntered;
};

const ccNumValidation = () => {
    const validCreditCard = /^(\d{13,16})$/.test(creditCardNum.value);
        return validCreditCard;
};

const zipCodeValidation = () => {
    const validZip = /^(\d{5})$/.test(zipCode.value);
        return validZip;
};

const cvvValidation = () => {
    const validCVV = /^(\d{3})$/.test(cvvCode.value);
        return validCVV;
    
};

// Real-time error message to assist entering accurate cc number
cvvCode.addEventListener('keyup', (e) => {
    validityIndicators(cvvValidation(), (e), cvvCode, 'cvv-hint');
});

// Listens for form submit and prevents if functions don't return true
document.querySelector('form').addEventListener('submit', (e) => {
   validityIndicators(nameValidation(), e, nameField, 'name-hint');
    if (!eMailValidation()) {
        e.preventDefault();
			
// Alerts user that blank field is detected        
        if (eMailField.value === ''){
            eMailField.parentElement.className = 'not-valid';
            eMailField.parentElement.lastElementChild.className ='email-hint';
            eMailField.parentElement.lastElementChild.innerHTML ='Please enter your email address';
					
// Alerts user that incorrect format detected       
        } else {
            eMailField.parentElement.className = 'not-valid';
            eMailField.parentElement.lastElementChild.className ='email-hint';
            eMailField.parentElement.lastElementChild.innerHTML ='Email address must be formatted correctly';
        }
    } else {
        eMailField.parentElement.className = 'valid';
        eMailField.parentElement.lastElementChild.className = 'email-hint hint';
    }
    if(!activitiesValid()){
        e.preventDefault();
        activitiesChoice.className = 'activities not-valid';
        activitiesChoice.lastElementChild.className ='activities-hint';
   
		} else {
        activitiesChoice.className = 'activities valid';
        activitiesChoice.lastElementChild.className = 'activities-hint hint';
    } 
    if (paymentType.value === 'credit-card') {
        validityIndicators(ccNumValidation(), e, creditCardNum, "cc-hint");
        validityIndicators(zipCodeValidation(), e, zipCode, "zip-hint");
        validityIndicators(cvvValidation(), e, cvvCode, "cvv-hint");
    }
});

// Enhanced accessibility features
for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('focus', (e) => {
        checkBoxes[i].parentElement.classList.add('focus');
    });
    checkBoxes[i].addEventListener('blur', (e) => {
        checkBoxes[i].parentElement.classList.remove('focus');
    })
};

// Adds valid/not-valid classes and displays in appropriate corresponding fields when input requirements met or not.
function validityIndicators(functionName, e, requiredField, classUpdate) {
    if (!functionName) {
        e.preventDefault();
        requiredField.parentElement.className = 'not-valid';
        requiredField.parentElement.lastElementChild.className = classUpdate;
    } else {
        requiredField.parentElement.className = 'valid';
        requiredField.parentElement.lastElementChild.className = `${classUpdate} hint`;
    }
}
