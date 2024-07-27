const slider_items = $('.slider-items li');
const slider_dots = $('.slider-dots li');
const nav_next = $('.slider-navigation .next')
const nav_prev = $('.slider-navigation .prev')
const slider_bg_1 = $('.slider-bg-1');

let selected_item = 0;
const colors = ['#004CA0', '#0078B4', '#33FF57', '#3357FF', '#FF33A0']; 
function setItemSlider(index){
    selected_item = index;

    slider_items.each(function(idx){
        let offset = idx - selected_item;
        if (offset < 0)  offset += slider_items.length;

        // Correcting the class removal and addition logic
        for (let i = 0; i < slider_items.length; i++) {
            $(this)
                .removeClass(`item-${i + 1}`);
        }
        $(this).addClass(`item-${offset + 1}`);


        slider_dots
        .eq(selected_item)
        .addClass('active')
        .siblings('li')
        .removeClass('active')
    });
  // Change the background color with GSAP animation
  gsap.to(slider_bg_1, {
    scale: 0,
    duration: 0.5,
    onComplete: () => {
        slider_bg_1.css('background-color', colors[selected_item % colors.length]);
        gsap.to(slider_bg_1, {
            scale: 1,
            duration: 0.5
        });
    }
});
}


slider_items.click(function(){
    setItemSlider($(this).index());
});


// slider_dots.click(function(){
//     setItemSlider($(this).index());
// })

nav_next.click(function(){
    selected_item = selected_item < slider_items.length  - 1 ? ++selected_item : 0;
    setItemSlider(selected_item);
})
nav_prev.click(function(){
    selected_item = selected_item >= 1 ? --selected_item : slider_items.length;
    setItemSlider(selected_item);
})