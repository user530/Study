/*========== Показать телефон на фиксированном меню ==========*/
window.addEventListener('scroll', ()=>{
	if(window.pageYOffset > 80){
		document.querySelector('.header').classList.add('header-fixed');
	}else{
		document.querySelector('.header').classList.remove('header-fixed');
	}
});
/*============= menu toggle ===============*/
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.header-menu');
const overlayBlock = document.querySelector('#overlay');
const bodyEl = document.body;
  menuToggle.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      
      this.classList.remove('active');
      mobileMenu.classList.remove('active');
      overlayBlock.classList.remove('active');
      bodyEl.classList.remove('noscroll');

    } else {
      this.classList.add('active');
	  mobileMenu.classList.add('active');
	  overlayBlock.classList.add('active');
      bodyEl.classList.add('noscroll');
    }
  });
  window.addEventListener('resize', function () {
    menuToggle.classList.remove('active');
	mobileMenu.classList.remove('active');
	overlayBlock.classList.remove('active');
    bodyEl.classList.remove('noscroll');
  });
   overlayBlock.addEventListener('click', function () {
      this.classList.remove('active');
      mobileMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      bodyEl.classList.remove('noscroll');

    });
/*==================HEADER SEARCH FORM ==========*/
const showSearchForm = document.querySelector('#showSearchForm');
const headerSearchForm = document.querySelector('#headerForm');
const headerCloseSearch = document.querySelector('#closeSearch');

showSearchForm.addEventListener('click', function () {
	headerSearchForm.classList.add('active');
});
headerCloseSearch.addEventListener('click', function () {
	headerSearchForm.classList.remove('active');
	headerSearchForm.querySelector('input').value = '';
});
/*============header-menu ==================*/
function pageTabsToggle(tabBtn, tabContent){
	const menuItems = tabBtn.querySelectorAll('[data-role]');
	const menuItemContent = tabContent.querySelectorAll('[data-content]');
	for(let i=0; i<menuItems.length; i++ ){
		menuItems[i].addEventListener('click', ()=>{
			for(let j=0; j<menuItems.length; j++){
				if(j !==i){
					menuItems[j].classList.remove('active');
				}
				if(j==i){
					if(menuItems[j].classList.contains('active')){
						menuItems[j].classList.remove('active');
					}else{
						menuItems[j].classList.add('active');
					}
				}
			}
			const thisData = menuItems[i].getAttribute('data-role');
			for(let block of menuItemContent ){
				block.classList.remove('active');
				overlayBlock.classList.remove('active');
				bodyEl.classList.remove('noscroll');
				const contentData = block.getAttribute('data-content');				
				if(thisData == contentData && menuItems[i].classList.contains('active')){
					block.classList.add('active');
					
				}
			}
		});
	}
}
function pageTabs(tabBtn, tabContent){
	const menuItems = tabBtn.querySelectorAll('[data-role]');
	const menuItemContent = tabContent.querySelectorAll('[data-content]');
	for(let i=0; i<menuItems.length; i++ ){
		menuItems[i].addEventListener('click', ()=>{
			for(let j=0; j<menuItems.length; j++){
				if(j !==i){
					menuItems[j].classList.remove('active');
				}
				if(j==i){
					menuItems[j].classList.add('active');
				}
			}
			const thisData = menuItems[i].getAttribute('data-role');
			for(let block of menuItemContent ){
				block.classList.remove('active');
				const contentData = block.getAttribute('data-content');				
				if(thisData == contentData && menuItems[i].classList.contains('active')){
					block.classList.add('active');
					
				}
			}
		});
	}
}
const headerNav = document.getElementById('headerNav');
const headerDrop = document.getElementById('headerDrop');
const teamtabs = document.getElementById('teamTabs');
const faqTabs = document.getElementById('faqTabs');

pageTabsToggle(headerNav,  headerDrop);

pageTabs(teamTabs,  teamTabs);
pageTabs(faqTabs,  faqTabs);

/* ========== моб меню - показать выпадающие меню ==========*/
	const openMenuLevel2 = document.querySelectorAll('.drop-menu_2');
	const openMenuLevel3 = document.querySelectorAll('.drop-menu_3');
	

	function foldWithChildren(dropMenuItem) {
		let itemIcon = dropMenuItem.querySelector(".drop-icon");
		let childrenMenu = dropMenuItem.querySelector(".submenu");

		itemIcon.classList.remove('active');
		childrenMenu.classList.remove('active');

		let childrenMenuChildren = childrenMenu.querySelectorAll('.drop-menu');
		for (let item of childrenMenuChildren) {
			foldWithChildren(item);
		}
	}

	function goUpAndFoldSiblings(dropMenuItem) {
		let ancestor = dropMenuItem.parentElement.closest('.drop-menu');

		if (ancestor == null)
			return;

		let next = dropMenuItem.nextElementSibling;
		while (next != null) {
			if (next.classList.contains("drop-menu")) {
				foldWithChildren(next);
			}
			next = next.nextElementSibling;
		}
		let prev = dropMenuItem.previousElementSibling;
		while (prev != null) {
			if (prev.classList.contains("drop-menu")) {
				foldWithChildren(prev);
			}
			prev = prev.previousElementSibling;
		}
		goUpAndFoldSiblings(ancestor);
	}

	function showSubmenu(item, subMenuClass) {
		item.addEventListener('click', function (e) {
			//e.stopPropagation();

			const thisIcon = this.querySelector('.drop-icon')
			const subMenuLevel = this.querySelector(`${subMenuClass}`)

			if (e.target == thisIcon) {

				if (thisIcon.classList.contains('active')) {
					foldWithChildren(item);
					//subMenuLevel.classList.remove('active');
					//thisIcon.classList.remove('active');
				} else {
					goUpAndFoldSiblings(item);
					subMenuLevel.classList.add('active');
					thisIcon.classList.add('active');
				}
			}
		});
	}
	for (let item of openMenuLevel2) {
		showSubmenu(item, '.submenu-2');
	}
	for (let item of openMenuLevel3) {
		showSubmenu(item, '.submenu-3');
	}
/* ============swiper slider========*/
const swiper = new Swiper('.swiper', {
  
  
  autoplay: {
	delay: 5000,
	},
	speed:2000,
  pagination: {
    el: '.swiper-pagination',
	 clickable: true,
  }
});
const swiper2 = new Swiper('.faq-tabs__buttons-block', {
  slidesPerView: 3.5,
 
  navigation: {
    nextEl: '#faqArrow'
  },
  scrollbar:{
	  	el:'.faq-scrollbar',
		  draggable:true,
  },
  watchOverflow: 'true'
});

(function() {

  'use strict';

  // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout
  const breakpoint = window.matchMedia( '(min-width:768px)' );

  // keep track of swiper instances to destroy later
  let mySwiper;///////////////////////////////////////////

  const breakpointChecker = function() {

    // if larger viewport and multi-row layout needed
    if ( breakpoint.matches === true ) {

      // clean up old instances and inline styles when available
	  if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

	  // or/and do nothing
	  return;

      // else if a small viewport and single column layout needed
      } else if ( breakpoint.matches === false ) {

        // fire small viewport version of swiper
        return enableSwiper();

      }

  };
  const enableSwiper = function() {

    mySwiper = new Swiper ('.swiper-products', {

      loop: true,
      
      slidesPerView: 1,
	  spaceBetween: 30,
      centeredSlides: true,

      a11y: true,
      keyboardControl: true,
      grabCursor: true,

      // pagination
	  pagination: {
    	el: '.swiper-products-pagination',
		 clickable: true,
  		}
    });

  };

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();
})(); /* IIFE end */
(function() {

  'use strict';

  // breakpoint where swiper will be destroyed
  // and switches to a dual-column layout
  const breakpoint = window.matchMedia( '(min-width:992px)' );

  // keep track of swiper instances to destroy later
  let mySwiper;///////////////////////////////////////////

  const breakpointChecker = function() {

    // if larger viewport and multi-row layout needed
    if ( breakpoint.matches === true ) {

      // clean up old instances and inline styles when available
	  if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

	  // or/and do nothing
	  return;

      // else if a small viewport and single column layout needed
      } else if ( breakpoint.matches === false ) {

        // fire small viewport version of swiper
        return enableSwiper();

      }

  };
  const enableSwiper = function() {

    mySwiper = new Swiper ('.articles-swiper', {

      loop: true,
      
      slidesPerView: 1,
	  spaceBetween: 30,
      centeredSlides: true,

      a11y: true,
      keyboardControl: true,
      grabCursor: true,

      // pagination
	  pagination: {
    	el: '.articles-swiper-pagination',
		 clickable: true,
  		},
		  breakpoints: {
        574: {
          slidesPerView: 1.8,
		  spaceBetween: 10,
         
        },
		768: {
          slidesPerView: 2.5,
		  spaceBetween: 30,
         
        }
	}
    });

  };

  // keep an eye on viewport size changes
  breakpoint.addListener(breakpointChecker);

  // kickstart
  breakpointChecker();
})(); /* IIFE end */

/*============faq accordeon=============*/
const accordeonTitle = document.querySelectorAll('.accordeon-item-header');
const accordeonContent = document.querySelectorAll('.accordeon-item-content');
let loock;

for (i = 0; i < accordeonTitle.length; i++) {
    accordeonTitle[i].addEventListener('click', function() {
        if (!(this.classList.contains('show'))) {

            for(j = 0; j < accordeonTitle.length; j++) {
                accordeonTitle[j].classList.remove('show');

                for (k = 0; k < accordeonContent.length; k++) {
                    this.nextElementSibling;
                    accordeonContent[k].style.maxHeight = '0px';
                }
                
            }
            
            this.classList.add('show');
            loock = this.nextElementSibling;
            loock.style.maxHeight = loock.scrollHeight + "px";
            
        } else if (this.classList.contains('show')) {
            
            for(i = 0; i < accordeonTitle.length; i++) {
                accordeonTitle[i].classList.remove('show');
                loock.style.maxHeight = '0px';

            }
        }
    });
}
/* price card hide-text*/
const priceCardsLink = document.querySelectorAll('.price-card .dashed-link');
for(let item of priceCardsLink){
	item.addEventListener('click', ()=>{
		item.nextElementSibling.classList.add('active');
		item.remove();
	})
}


