var dataButtons = document.querySelectorAll('[data-button]');
var thing = "X";
change();


dataButtons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            if (button.textContent==" ") 
            {
                button.textContent = thing;
                xyBackground(thing, button);
                clearButton.style.backgroundColor = "red";
                change();
            }
            else
            {
                button.textContent = " ";
                button.style.backgroundColor = "rgb(255, 255, 255, 0.5)";
                console.log("e")
            }
            console.log("here")
        })
    })

    dataButtons.forEach(button =>
        {
            var clearButton = document.getElementById("clear");
            clearButton.addEventListener('click', () =>
            {
                clearButton.style.backgroundColor = "red";
            })
        })



    var clearButton = document.getElementById("clear");
    clearButton.addEventListener('click', () =>
    {
        clearButton.style.backgroundColor = "red";
        /*dataButtons.forEach(button =>
        {
            button.textContent = " ";
            button.style.backgroundColor = "red";
        })*/
    })



    function change()
    {
        var turnx = document.getElementById("turnx")
        var turno = document.getElementById("turno")
        turnx.addEventListener('click', () =>
        {
            thing = "X";
            turnx.style.padding = "25px";
            turnx.style.boxShadow = "none";
            turno.style.padding = "30px";
            turno.style.boxShadow = "5px 10px rgba(0, 0, 0, 0.4)";
        })
        turno.addEventListener('click', () =>
        {
            thing = "O";
            turno.style.padding = "25px";
            turno.style.boxShadow = "none";
            turnx.style.padding = "30px";
            turnx.style.boxShadow = "5px 10px rgba(0, 0, 0, 0.4)";
        })
    }

    function xyBackground(thing, button)
    {
        if (thing === "X")
        {
            button.style.backgroundColor = "rgb(255, 161, 247, 0.7)";
        }
        else if (thing === "O")
        {
            button.style.backgroundColor = "rgb(179, 195, 255, 0.7)";
        }
    }

    function reload()
    {
        window.location.reload();
    }
