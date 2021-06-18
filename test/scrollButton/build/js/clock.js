let haveClock = document.getElementById('offices')
if (haveClock){
    //Seconds value on the page load
    let initSeconds = moment().seconds();

    //Miliseconds until the timeout start
    let synch = (60 - initSeconds) * 1000;

    //Different time zones UTC offsets
    let zonesOffsets = [1, 8, 2, -5, -8];

    //Initial activation
    updateClock(zonesOffsets);

    //Function that sets the time on the clock and check for working hours
    function updateClock(x)
    {
        setClock(x);
        dimOutClock(x.length, 8, 20);
    }

    function setClock(x)
    {
        for (let i = 0; i < x.length; i++)
        {
            let y = document.getElementById("clock" + (i + 1));
            y.innerHTML = moment().utcOffset(x[i]).format("HH:mm");
        }
    }

    //Function that checks the local time for "x" clock divs, change styles if not in interval [t1 - t2)
    function dimOutClock(x, t1, t2)
    {
        for (i = 0; i < x; i++)
        {
            let y = document.getElementById("clock" + (i + 1));
            let z = parseInt(y.innerHTML);
            if ((z < t1 ) || (z >= t2))
            {
                y.parentElement.classList.add('offices-group__item-disable');
            } else
            {
                y.parentElement.classList.remove('offices-group__item-disable');
            }
        }
    }

    //Start clock
    setTimeout(setInterval(() => {updateClock(zonesOffsets)}, 60000), synch);
}






