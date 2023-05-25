// ---------------HANDLE BOOKMARK BUTTON---------------

const bookmarkBtn = document.querySelector('#bookmark-btn');

bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.classList.toggle('bookmarked');
})


// ---------------HANDLE MODAL---------------

const modal = document.querySelector('.selection-modal-wrapper');
let modalInitialized = false;

function showModal() {
    modal.setAttribute('style', 'display:flex');
    if(!modalInitialized) initModal();
}

const backProjBtn = document.querySelector('#back-proj-btn');
backProjBtn.addEventListener('click', showModal);

const closeModalBtn = document.querySelector('#close-modal-btn');
closeModalBtn.addEventListener('click', () => {
    modal.setAttribute('style', 'display:none');
    resetModal();
})

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
}

function resetModal() {
    modalOptions.forEach(option => {
        option.radioButton.checked = false;
        option.classList.remove('selected');
        if(option.selectedContent) {
            option.selectedContent.style.height = '0px'
        }
    })
}

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
}

function handleRadioButton(e) {
    resetModal();
    let selectedRadioButton = e.target.parentElement.firstElementChild;
    setRadioBtn(selectedRadioButton);
}

const handleContinue = (e) => {
    e.preventDefault();
    let option = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    if(isInputValid(option)) {
        option.pledgeInput.classList.remove('invalid')
        console.log(option.pledgeInput.value)
        //continue to success modal
    } else {
        console.log('cheapo')
        option.pledgeInput.classList.add('invalid')
    }
}

const isInputValid = (option) => {
    if(option.pledgeInput.value >= option.inputMin) {
        return true;
    }
    return false;
}


// ---------------HANDLE SELECT REWARD BUTTONS---------------

const bambooRewardBtn = document.querySelector('#bamboo-reward-btn');
bambooRewardBtn.addEventListener('click', () => {
    showModal();
    setRadioBtn(bambooModalOption.radioButton);
});

const blackRewardBtn = document.querySelector('#black-reward-btn');
blackRewardBtn.addEventListener('click', () => {
    showModal();
    setRadioBtn(blackModalOption.radioButton);
});

const mahoganyRewardBtn = document.querySelector('#mahogany-reward-btn');
mahoganyRewardBtn.addEventListener('click', () => {
    showModal();
    setRadioBtn(mahoganyModalOption.radioButton);
})