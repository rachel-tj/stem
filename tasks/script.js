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
    tdcheck.className = "tdcheck"
    td1.contentEditable = true
    td2.contentEditable = true
    tdcheck.addEventListener('mousedown', function(event)
    {
        parr = this.parentElement;
        changedColor = parr.style.backgroundColor == "thistle" ? "transparent" : "thistle";
        this.textContent = parr.style.backgroundColor == "thistle" ? "" : "✓"
        parr.style.backgroundColor = changedColor;

    });
    extraRow.appendChild(td1)
    extraRow.appendChild(td2)
    extraRow.appendChild(tdcheck)
    console.log(table)
    table[0].appendChild(extraRow)
}


