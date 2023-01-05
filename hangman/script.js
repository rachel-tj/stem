var count = 1;
dead = false;

var seinfeld = ["giddyup", "puffy shirt", "man hands", "get out", "inexpensive glue", "low talker", "double dipper", "crazy joe divola", "master of your domain", "spare a square", "mohel", "no soup for you", "pig man", "vandelay industries", "kramerica", "shrinkage", "importer exporter", "yada yada yada", "junior mint", "not that theres anything wrong with that", "manssiere", "hello newman", "festivus", "fusilli jerry"];

var books = ["the great gatsby", "beloved", "frankenstein", "the things they carried", "hamlet", "beowulf", "slaughterhouse five", "macbeth", "the catcher in the rye", "the cats cradle", "the bluest eye", "the bell jar", "breakfast of champions", "romeo and juliet", "maus", "the odyssey", "animal farm", "catch twenty two", "to kill a mockingbird", "tar baby", "this side of paradise", "east of eden", "middlemarch", "death of a salesman", "lord of the flies", "nineteen eighty four", "the grapes of wrath", "of mice and men", "brave new world", "the scarlett letter", "brave new world", "the giver", "the metamorphosis", "the outsiders", "on the road", "the road", "all quiet on the western front"];

var fish = ["goldfish", "bass", "trout", "halibut", "cod", "pufferfish", "anglerfish", "beta fish", "catfish", "conger eel", "salmon", "tuna", "anchovy", "sardine", "herring", "tilapia", "flounder", "swordfish", "pike", "mahi mahi"];

var movies = ["the godfather", "the truman show", "saving private ryan", "a few good men", "the social network", "good will hunting", "dead poets society", "breakfast at tiffanys", "armageddon", "forrest gump", "the great gatsby"];



async function start(arr)
{
  word = makeWord(arr);
  document.getElementById('total').style.display = 'block';
  document.getElementById('wrapper').style.display = 'flex';

  document.getElementById('bobo').style.display = 'none';

  console.log('word i ' + word);
  createSpans(word);
  getRGBColors(word);

}

function makeWord(arr)
{
  x =  arr[Math.floor(Math.random() * arr.length)];
  return x.toUpperCase();
}

function makeClear()
{
  var svg = document.getElementById("svgClass").contentDocument;
  var face = svg.getElementsByClassName("face")
  for (var i = 1; i <= 6; i++)
  {
    var el = svg.getElementsByClassName('limb' + i);
    el[0].style.stroke = 'none';
  }
  for (var i = 0; i < face.length; i++)
  {
    face[i].style.stroke = 'none';
  }
}


  function getRGBColors(word)
  {
      var input = document.getElementById('input');
      var svg = document.getElementById("svgClass").contentDocument;
      
      input.addEventListener('keyup', function ()
      {
        if (dead)
        {
          return;
        }
        var theLet = input.value.toUpperCase();
        if (document.getElementById('letters').textContent.indexOf(theLet) != -1)
        {
          input.value = "";
          return;
        }
        // it's in the word
        if (word.indexOf(theLet) != -1)
        {
          var letters = document.getElementsByClassName('span' + theLet)
          for (var i = 0; i < letters.length; i++)
          {
            number = (0.5 * i);
            letters[i].style.animation = 'fadeIn 3s ' + number + 's';
            letters[i].addEventListener("animationend", function()
                {
                    this.style.color = 'black';
                    if (checkWin(word))
                    {
                      winningSequence(word);
                    }
                });
          }
        }
        // it's not in the word
        else
        {
          var letters = document.getElementById('letters');
          letters.textContent += theLet + '   ';
          var next = 'limb' + count++;
          var st = svg.getElementsByClassName(next);
          st[0].style.stroke = '#000000';
        }
        // if the man is complete, give up
        if (count >= 7)
        {
          giveUp();
        }
        input.value = "";
      });
    }

    function createSpans(word)
    {
        var total = document.getElementById('total');
        var text = document.getElementById('text');
        var letters = word;
        for (var i = 0; i < letters.length; i++)
        {
            var yourSpan = document.createElement('span');
            yourSpan.className = 'span' + letters[i];
            yourSpan.innerText = letters[i];
            yourSpan.style.color = 'rgb(0, 0, 0, 0)';
            if (letters[i] === " ")
            {
              yourSpan.style.textDecorationColor = 'rgb(0, 0, 0, 0)';
            }
            else
            {
              yourSpan.style.textDecorationColor = 'black';
            }
            total.appendChild(yourSpan);
        }
    }

    function giveUp()
    {
      if (dead)
      {
        return;
      }
      var word = document.getElementById('total').textContent;
      dead = true;
      for (var i = 0; i < word.length; i++)
      {
        var letter = word.charAt(i);
        var el = document.getElementsByClassName('span' + letter);
        for (var j = 0; j < el.length; j++)
        {
          if (el[j].style.color !== 'rgba(0, 0, 0, 0)')
          {
            break;
          }
          el[j].style.animation = 'fadeInRed 3s';
          el[j].style.color = 'red';
          }
        }
        var svg = document.getElementById("svgClass").contentDocument;
        var face = svg.getElementsByClassName("face");
        if (svg.getElementsByClassName('limb1')[0].style.stroke == 'none')
        {
          return;
        }
        for (var i = 0; i < face.length; i++)
        {
          face[i].style.animation = "fadeInStroke 2s";
          face[i].style.stroke = 'black';
        }
      }
    

      function checkWin(word)
      {
        for (var i = 0; i < word.length; i++)
        {
          var el = document.getElementsByClassName('span' + word.charAt(i));
          if (el[0].textContent == ' ')
          {
            continue;
          }
          else if(el[0].style.color !== 'black')
          {
            return false;
          }
        }
        return true;
      }

      function winningSequence(word)
      {
        dead = true;
        for (var i = 0; i < word.length; i++)
        {
          var letter = word.charAt(i);
          var el = document.getElementsByClassName('span' + letter);
          // set of letters that are the same
          for (var j = 0; j < el.length; j++)
          {
            el[j].style.animation = 'fadeInGreen 3s';
            el[j].addEventListener('animationend', function()
            {
              this.style.color = 'green';
            });
          }
        }
      }