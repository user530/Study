// ---JS Master File---

// ---Initialize all scripts on the page load---
$( document ).ready(function() {

    // ---Index - Owl-carousel---

    // ---Initialize on page-s with Carousel---
    if(document.getElementsByClassName("carousel-container")[0]!=undefined){
        $(".img-block").owlCarousel({
            items: 1,
            margin: 20,
            center: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 2000,
            loop: true,
            dotsSpeed: 1200,
            autoplaySpeed: 1200,
            responsive : {
                0 : {
                    items : 1,
                },
                580 : {
                    items : 2,    
                },
                992 : {
                    items : 3,
                    center: false
                }
            }
        });
    }


    // ---Events - Mix-up---

    // ---Initialize on page-s with Filter---
    if(document.getElementsByClassName("mixup-container")[0]!=undefined){
        var mixer = mixitup('.mixup', {
            selectors: {
                control: '[data-mixitup-control]'}
        });
    }


    // ---About - Accordion---

    // ---Initialize on page-s with Filter---
    if(document.getElementsByClassName("accordion-container")[0]!=undefined){
        var accordionHeaders = document.getElementsByClassName("card-header");
        var accordionButtons = document.getElementsByTagName("button");

        for(let item of accordionButtons){
            item.addEventListener("click", function() {
                const elHeader = this.closest(".card-header");

                for(let thisHeader of accordionHeaders){
                    if(thisHeader !== elHeader){
                        thisHeader.classList.remove("accord_activeHeader");
                    }
                }
                if(elHeader.classList.contains("accord_activeHeader")){
                    elHeader.classList.remove("accord_activeHeader");
                }else{
                    elHeader.classList.add("accord_activeHeader");
                }
            });
        }
    }

});
