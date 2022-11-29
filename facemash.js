var myPix = ["pics/desperado.jpg", "pics/ophelia.jpg", "pics/rollercoaster.jpg", "pics/record player.jpg", "pics/meteor shower.jpg","pics/all too well.jpg", "pics/linger.jpg", "pics/manic monday.jpg","pics/motion sickness.jpg", "pics/last night she said.jpg"];
var people;
var my = 
{
    //"pics/desperado.jpg" : 1600,
    "pics/ophelia.jpg" : 1600,
    "pics/rollercoaster.jpg" : 1600,
    "pics/record player.jpg" : 1600,
    "pics/meteor shower.jpg" : 1600,
    "pics/all too well.jpg" : 1600,
    "pics/manic monday.jpg" : 1600,
    "pics/linger.jpg" : 1600,
    "pics/motion sickness.jpg" : 1600,
    "pics/last night she said.jpg" : 1600,
}

var pictures = document.getElementsByClassName("myPics");
var otherpictures;

async function setPics()
{
    otherpictures = new Array(people.length);
    for (var i = 0; i < people.length; i++)
    {
        var value = people[i].split(',');
        otherpictures[i] = value[6];
    }
}




async function getImage()
{
    people = await makeWord('insta.csv');
    setPics();
    for (var i = 0; i < pictures.length; i++)
    {
        loadPic(i);
    }
}

async function loadPic(i)
{
    randomNum = Math.floor(Math.random() * myPix.length);
    other = i === 0 ? 1: 0;
    otherSRC = pictures[other].getAttribute('src');
    again = myPix[randomNum] === pictures[other].getAttribute('src') ? true : false;
    if (!again)
    {
        again = myPix[randomNum] === pictures[i].getAttribute('src') ? true : false;
    }
    console.log(otherpictures[randomNum] + "slgjhs_");
    pictures[i].src = myPix[randomNum];
    thisSRC = pictures[i].getAttribute('src');
    getTextContent(i, thisSRC);
    getTextContent(other, otherSRC);
    pictures[i].style.width = "300px";
}

async function makeWord(filename)
{
    const people = fetch (filename)
    .then(function(response)
    {
        return response.text();
    })
    .then(function(data)
    {
        var words = data.split('\n');
        //x =  words[Math.floor(Math.random() * words.length)];
        return words;
    })
    return people;
}

async function getPerson()
{
    x =  people[Math.floor(Math.random() * people.length)];
    return x;
}


    function singleImage(i)
    {
        var randomNum;
        var again = true;
        var other;
        var otherSRC;
        while (again)
        {
            randomNum = Math.floor(Math.random() * myPix.length);
            other = i === 0 ? 1: 0;
            otherSRC = pictures[other].getAttribute('src');
            again = myPix[randomNum] === pictures[other].getAttribute('src') ? true : false;
            if (!again)
            {
                again = myPix[randomNum] === pictures[i].getAttribute('src') ? true : false;
            }
        }
        // changing the number
        var oldSRC = pictures[i].getAttribute('src');
        my[oldSRC] = getRating1(oldSRC, otherSRC);
        my[otherSRC] = getRating2(oldSRC, otherSRC);

        pictures[i].src = myPix[randomNum];
        thisSRC = pictures[i].getAttribute('src');
        getTextContent(i, thisSRC);
        var score = document.getElementById("score" + other);
        score.textContent = my[otherSRC];

        pictures[i].style.width = "300px";
    }

    async function getTextContent(i, src)
    {
        var el = document.getElementById("cap" + i);
        var score = document.getElementById("score" + i)
        //var textContent = src.substring(5, src.length - 4);
        var textContent = await getPerson();
        var array = textContent.split(',');
        textContent = array[2].substring(1, array[2].length - 1);
        el.textContent = textContent;
        score.textContent = my[src];
        //return textContent;
    }

    function getRating1(src1, src2)
    {
        var rating1 = my[src1];
        var rating2 = my[src2];
        console.log(rating2 + " " + rating1);
        var exponent = Math.pow(10, ((rating2 - rating1) / 400));
        var calc = (1.0 / (1.0 + exponent));
        //calc = Math.floor(calc, 0.01);
        return rating1 + 10;
        //return calc;
    }

    function getRating2(src1, src2)
    {
        var rating1 = my[src1];
        var rating2 = my[src2];
        var calc = (1.0 / (1.0 + Math.pow(10, ((rating1 - rating2) / 400))));
        calc = Math.floor(calc, 0.01);
        return rating2 - 10;
        //return calc;
    }

