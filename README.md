# Frontend Mentor - Crowdfunding product page solution

This is a solution to the [Crowdfunding product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/crowdfunding-product-page-7uvcZe7ZR). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [The challenge](#the-challenge)
- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Author](#author)

## The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- See hover states for interactive elements
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge
- Toggle whether or not the product is bookmarked

## Links

- Solution URL: [https://dbidmead.github.io/crowdfund](https://dbidmead.github.io/crowdfund)

## Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- JS DOM manipulation, form validation, and state management

## What I learned

### When you have a modal, make an overlay div in the HTML and manipulate it in JS
```html
<body>
    <div class="overlay"></div>
</body>
```

```css
.overlay {
    position: absolute;
    width: 100%;
    z-index: 3;
    background-color: rgba(24, 24, 24, 0.188);
    display: none;
}
```
The height will be set via JS.

```js
const overlay = document.querySelector('.overlay');
overlay.style.height = getComputedStyle(document.body).height; // sets overlay height to entire body height

// change values of overlay.style.zIndex/display to appropriate values when mobile menus or modals are activated
```

### In order to change SVG colors, use an online SVG editor and save as new image file

## Author

- GitHub - [@dbidmead](https://github.com/dbidmead)
- Frontend Mentor - [@dbidmead](https://www.frontendmentor.io/profile/dbidmead)