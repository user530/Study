$(document).ready(function() {
    document.getElementById("emailField").addEventListener("focus",(e) => {
        removeActive();
    })

    document.getElementsByClassName("form-checkbox")[0].addEventListener("click",(e) => {
        console.log("topkek!");
        removeActive();
    })

    document.getElementById("emailSubmit").addEventListener("click",(event) => {
        event.preventDefault();
        
        removeActive();

        let a = document.getElementById("emailField").value;

        if(checkField(a) && checkBox())
        {
            console.log("kek");
        }

        

    });

    function checkField(v)
        {
            if (v == "")
            {
                document.getElementsByClassName("text-1")[0].classList.add("active");
            }
            else if(v.indexOf("@") == -1)
            {
                document.getElementsByClassName("text-2")[0].classList.add("active");
            }
            else if(v.indexOf("@") == 0 || v.indexOf("@") > v.length - 4  || v.indexOf("@.") != -1)
            {
                document.getElementsByClassName("text-3")[0].classList.add("active");
            }
            else if(v.indexOf(".lv") == v.length - 3)
            {
                document.getElementsByClassName("text-4")[0].classList.add("active");
            }
            else 
            {
                return true;
            }
        }

        function checkBox()
        {
                if (document.getElementById("form-check").checked == true)
                {
                    return true;
                }
                else
                {
                    document.getElementsByClassName("check-error")[0].classList.add("active");
                }
        }

        function removeActive()
        {
            document.getElementsByClassName("text-1")[0].classList.remove("active");
            document.getElementsByClassName("text-2")[0].classList.remove("active");
            document.getElementsByClassName("text-3")[0].classList.remove("active");
            document.getElementsByClassName("text-4")[0].classList.remove("active");
            document.getElementsByClassName("check-error")[0].classList.remove("active");
        }
})