const doge =document.getElementById("pict");

doge.addEventListener("click", function(event_click){
//    alert("Wow, such click! Much precision!");
    if(event_click.button == 0){
        var click_x = event_click.clientX;
        console.log(click_x);
        window.addEventListener("mousemove", function(event_move){
            var distance_moved = event_move.clientX - click_x;
            var new_width = doge.width + distance_moved;
            console.log(event_move);
            
            doge.style.width = new_width + "px";
            click_x = event_move.clientX;
        })
            
            
        }

})