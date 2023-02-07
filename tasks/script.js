/*
* @author deadfishh
*
* this is wordle, which i wrote
* it is a worse version of the new york times wordle
* but fuck the new york times
*/

var map = new Map()
map.set("phys 121", 0)
map.set("csds 302", 0)
map.set("csds 281", 0)
map.set("math 223", 0)
map.set("sages", 0)


// starts the game!
function addSection()
{
    body = document.body
    body.style.backgroundColor = "red";
    var opened = window.open("");
    opened.document.write("<html><head><title>MyTitle</title></head><body>test</body></html>");
}

function addRow(writing, keyNum)
{
    extraRow = document.createElement("tr")
    section = document.getElementsByTagName("h1")[0].textContent
    extraRow.id = section.replace(" ", "") + "r" + map.get(section)
    map.set(section, map.get(section) + 1)
    table = document.getElementsByTagName("table")
    td1 = document.createElement("td")
    td2 = document.createElement("td")
    tdcheck = document.createElement("td")
    trash = document.createElement("td")
    if (writing)
    {
        arr = writing.split("xxx")
        td1.textContent = arr[0]
        td2.textContent = arr[1]
        extraRow.id = section.replace(" ", "") + "r" + keyNum
    }
    tdSetUp(td1, td2, tdcheck, trash)
    tdEvents(td1, td2, tdcheck, trash, writing)
    extraRow.appendChild(td1)
    extraRow.appendChild(td2)
    extraRow.appendChild(tdcheck)
    extraRow.appendChild(trash)
    table[0].appendChild(extraRow)
}

function updateLocalStorage(parent, input, place)
{
    lcString = localStorage.getItem(parent.id)
    var arr = ["", ""]
    if (lcString)
    {
        arr = lcString.split("xxx")
    }
    arr[place - 1] = input
    newString = arr[0] + "xxx" + arr[1]
    localStorage.setItem(parent.id, newString)
}

function setItems()
{
    acorn = document.getElementsByTagName("h1")[0].textContent
    table = document.getElementsByTagName("table")[0]
    lastNum = 0;
    for (var i = 0; i < localStorage.length; i++)
    {
        thing = localStorage.getItem(acorn.replace(" ", "") + "r" + i)
        keyNum = i;
        if (thing == null)
        {
            continue;
        }
        lastNum = i
        addRow(thing, keyNum)
    }
    console.log(lastNum)
    map.set(acorn, lastNum + 1)
}

function tdEvents(td1, td2, tdcheck, trash, writing)
{
    table = document.getElementsByTagName("table")
    td1.addEventListener('keyup', function()
    {
        input = this.textContent
        updateLocalStorage(this.parentElement, input, 1)
    })
    td2.addEventListener('keyup', function()
    {
        input = this.textContent

            updateLocalStorage(this.parentElement, input, 2)
    })
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
        console.log(parr.id)
        localStorage.removeItem(parr.id)
    })
}

function tdSetUp(td1, td2, tdcheck, trash)
{
    tdcheck.className = "tdcheck"
    trash.className = "trash"
    trash.textContent = "⌫"
    td1.contentEditable = true
    td2.contentEditable = true
    td1.spellcheck = false;
    td2.spellcheck =  false;
}

