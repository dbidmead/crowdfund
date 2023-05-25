// ---------------HANDLE PLEDGE DATA---------------

const currentMoneyDisplay = document.querySelector('#current-money-display');
const currentBackersDisplay = document.querySelector('#current-backers-display');
const progressBar = document.querySelector('.progress-bar');

let goalFunds = 100000;
let currentFunds = 45982;
let currentBackers = 2804;

function setProgressBar() {
    let percent = 100 * currentFunds / goalFunds;
    progressBar.style.width = percent <= 100 ? percent.toString() + '%' : '100%';
}

function setDisplays() {
    currentMoneyDisplay.textContent = '$' + currentFunds.toLocaleString("en-US");
    currentBackersDisplay.textContent = currentBackers.toLocaleString("en-US");
    setProgressBar();
}

function updateData(inputValue) {
    inputValue = parseFloat(inputValue);
    currentFunds = currentFunds+inputValue;
    currentBackers++;
    setDisplays();
}

setDisplays();

// ---------------HANDLE BOOKMARK BUTTON---------------

const bookmarkBtn = document.querySelector('#bookmark-btn');

bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.classList.toggle('bookmarked');
})

// ---------------HANDLE SUCCESS MODAL---------------

const overlay = document.querySelector('.overlay');
overlay.style.height = getComputedStyle(document.body).height;
const successModal = document.querySelector('.success-modal-wrapper');
const gotItBtn = document.querySelector('#got-it-btn');

gotItBtn.addEventListener('click', () => {
    successModal.setAttribute('style', 'display:none');
    overlay.style.display = 'none';
})

// ---------------HANDLE MAIN MODAL---------------

const modal = document.querySelector('.selection-modal-wrapper');
let modalInitialized = false;

function showModal() {
    modal.setAttribute('style', 'display:flex');
    if(!modalInitialized) initModal();
    // document.body.style.height = modal.modalHeight;
    // document.body.style.overflow = 'hidden';
    overlay.style.display = 'block';
}

function closeModal() {
    modal.setAttribute('style', 'display:none');
    resetModal();
    overlay.style.display = 'none';
}

const backProjBtn = document.querySelector('#back-proj-btn');
backProjBtn.addEventListener('click', showModal);

const closeModalBtn = document.querySelector('#close-modal-btn');
closeModalBtn.addEventListener('click', closeModal)


const nullModalOption = document.querySelector('#null-option');
const bambooModalOption = document.querySelector('#bamboo-option');
bambooModalOption.inputMin = 25;
const blackModalOption = document.querySelector('#black-option');
blackModalOption.inputMin = 75;
const mahoganyModalOption = document.querySelector('#mahogany-option');
mahoganyModalOption.inputMin = 200;

const modalOptions = [
    nullModalOption,
    bambooModalOption,
    blackModalOption,
    mahoganyModalOption
];

function initModal() {
    modal.modalHeight = getComputedStyle(modal).height;
    modalOptions.forEach((option, i) => {
        // initialize radio buttons
        option.radioButton = option.firstElementChild.firstElementChild
        option.clickableBtn = option.firstElementChild;
        option.clickableBtn.addEventListener('click', handleRadioButton)
    
        // initialize selected option styles and inputs
        if(i > 0) {
            option.selectedContent = option.lastElementChild.lastElementChild;
            option.selectedContentHeight = getComputedStyle(option.selectedContent).height;
            option.selectedContent.style.height = '0px'
    
            option.pledgeInput = option.selectedContent.lastElementChild.lastElementChild.firstElementChild.lastElementChild;
    
            option.continueBtn = option.selectedContent.lastElementChild.lastElementChild.lastElementChild;
        }
    })
    modalInitialized = true;
};

function resetModal() {
    modalOptions.forEach(option => {
        option.radioButton.checked = false;
        option.classList.remove('selected');
        if(option.selectedContent) {
            option.selectedContent.style.height = '0px'
        }
    })
};

function setRadioBtn(selectedRadioButton) {
    modalOptions.forEach(option => {
        if(option.radioButton === selectedRadioButton) {
            option.classList.add('selected');
            if(option.selectedContent) {
                option.selectedContent.style.height = option.selectedContentHeight;
                option.pledgeInput.focus();
                option.pledgeInput.value = option.inputMin;
                option.continueBtn.addEventListener('click', handleContinue)
            }
        }
    })
    selectedRadioButton.checked = true;
};

function handleRadioButton(e) {
    resetModal();
    let selectedRadioButton = e.target.parentElement.firstElementChild;
    setRadioBtn(selectedRadioButton);
};

const handleContinue = (e) => {
    e.preventDefault();
    let option = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    if(isInputValid(option)) {
        option.pledgeInput.classList.remove('invalid');
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        successModal.setAttribute('style', 'display:flex');
        closeModal();
        updateData(option.pledgeInput.value);
        overlay.style.display = 'block';
    } else {
        console.log('cheapo')
        option.pledgeInput.classList.add('invalid')
    }
};

const isInputValid = (option) => {
    if(option.pledgeInput.value >= option.inputMin) {
        return true;
    }
    return false;
};


// ---------------HANDLE SELECT REWARD BUTTONS---------------

const bambooRewardBtn = document.querySelector('#bamboo-reward-btn');
bambooRewardBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
    showModal();
    setRadioBtn(bambooModalOption.radioButton);
});

const blackRewardBtn = document.querySelector('#black-reward-btn');
blackRewardBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
    showModal();
    setRadioBtn(blackModalOption.radioButton);
});

const mahoganyRewardBtn = document.querySelector('#mahogany-reward-btn');
mahoganyRewardBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
    showModal();
    setRadioBtn(mahoganyModalOption.radioButton);
});