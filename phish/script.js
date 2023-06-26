
function toggle()
{
    inp = document.getElementById("passinput")
    eyeimg = document.getElementById("eye")
    if (eyeimg.src.includes("closedeye.png")) // eye is currently closed
    {
        passinput.type = "password"
        eyeimg.src = "openeye.png"
        eyeimg.style.height = "16px"
    }
    else // eye is currently opened
    {
        passinput.type = "text"
        eyeimg.src = "closedeye.png"
        eyeimg.style.height = "20px"
    }
    eyeimg.style.width = "18px"
}

/*

login = document.getElementById("login")
login.addEventListener("onclick",
{
        Email.send({
        Host: "smtp.gmail.com",
        Username: "rachel.tjarksen@gmail.com",
        Password: "Trixie7272",
        To: "rst68@case.edu",
        From: "rachel.tjarksen@gmail.com",
        Subject: "hey there",
        Body: "email",
    })
    .then(function (message)
    {
        alert("mail sent!")
    })
})
*/
