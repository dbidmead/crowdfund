const bookmarkBtn = document.querySelector('#bookmark-btn');

bookmarkBtn.addEventListener('click', () => {
    bookmarkBtn.classList.toggle('bookmarked');
})


const nullModalOption = document.querySelector('#null-option');
const bambooModalOption = document.querySelector('#bamboo-option');
const blackModalOption = document.querySelector('#black-option');
const mahoganyModalOption = document.querySelector('#mahogany-option');

const modalOptions = [
    nullModalOption,
    bambooModalOption,
    blackModalOption,
    mahoganyModalOption
];

modalOptions.forEach((option, i) => {
    option.radioButton = option.firstElementChild.firstElementChild

    option.clickableBtn = option.firstElementChild;
    option.clickableBtn.addEventListener('click', handleRadioButton)

    option.clickableTxt = option.lastElementChild.firstElementChild.firstElementChild;

    if(i > 0) {
        option.selectedContent = option.lastElementChild.lastElementChild;
        option.selectedContentHeight = getComputedStyle(option.selectedContent).height;
        option.selectedContent.style.height = '0px'

        option.pledgeInput = option.selectedContent.lastElementChild.lastElementChild.firstElementChild;

        option.continueBtn = option.pledgeInput.parentElement.lastElementChild;
    }

    
})

function handleRadioButton(e) {
    let selectedRadioButton = e.target.parentElement.firstElementChild;
    modalOptions.forEach(option => {
        option.radioButton.checked = false;
        option.classList.remove('selected');
        if(option.selectedContent) {
            option.selectedContent.style.height = '0px'
        }
        if(option.radioButton === selectedRadioButton) {
            option.classList.add('selected');
            if(option.selectedContent) {
                option.selectedContent.style.height = option.selectedContentHeight;
                option.pledgeInput.focus();
            }
        }
    })
    selectedRadioButton.checked = true;
}

