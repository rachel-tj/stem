/*
* @author deadfishh
*
* this is wordle, which i wrote
* it is a worse version of the new york times wordle
* but fuck the new york times
*/



// starts the game!
function addSection()
{
    body = document.body
    body.style.backgroundColor = "red";
    var opened = window.open("");
    opened.document.write("<html><head><title>MyTitle</title></head><body>test</body></html>");
}

function addRow()
{
    extraRow = document.createElement("tr")
    table = document.getElementsByTagName("table")
    td1 = document.createElement("td")
    td2 = document.createElement("td")
    tdcheck = document.createElement("td")
    trash = document.createElement("td")
    tdcheck.className = "tdcheck"
    trash.className = "trash"
    trash.textContent = "⌫"
    td1.contentEditable = true
    td2.contentEditable = true
    td1.spellcheck = false;
    td2.spellcheck =  false;
    tdcheck.addEventListener('mousedown', function()
    {
        parr = this.parentElement;
        changedColor = parr.style.backgroundColor == "thistle" ? "transparent" : "thistle";
        this.textContent = parr.style.backgroundColor == "thistle" ? "" : "✓"
        trash.style.backgroundColor = "rgb(250, 250, 250)"
        parr.style.backgroundColor = changedColor;

    });
    trash.addEventListener('mouseup', function()
    {
        parr = this.parentElement;
        table[0].removeChild(parr)
    })
    extraRow.appendChild(td1)
    extraRow.appendChild(td2)
    extraRow.appendChild(tdcheck)
    extraRow.appendChild(trash)
    console.log(table)
    table[0].appendChild(extraRow)
}


