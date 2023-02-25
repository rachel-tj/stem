var def = [200, 0, 0];
var states = new Array();
var count = 50;

 
 function start()
 {
    var start = document.getElementById('startButton');
    getRGBColors();
     
    start.addEventListener('mousedown', function()
    {
        this.style.boxShadow = 'none';
    });

     start.addEventListener('mouseup', function()
     {
        start.style.display = 'none';
        document.getElementById('count').style.display = 'block';
        document.getElementById('input').style.display = 'block';
        makeTimer()
    });
}


  function getRGBColors()
  {
      var input = document.getElementById('input');
      var svg = document.getElementById("svgClass").contentDocument;
      
      input.addEventListener('keyup', function (event)
      {
          if (svg.getElementById(input.value) || event.key.charCodeAt() === 69)
          {
              var st = svg.getElementById(input.value);
              if (st.style.fill !== 'rgb(255, 255, 255)')
              {
                return;
              }
              st.style.fill = 'lightblue';
              input.value = "";
              count--;
              document.getElementById('count').textContent = count + ' states left';
            }
        });
  }

  function makeTimer()
    {
        var timeleft = 299;
        timer = document.getElementById('timer');
        var downloadTimer = setInterval(function()
        {
            if(timeleft <= 0)
            {
              clearInterval(downloadTimer);
              giveUp();
              timer.innerHTML = '0:00';
              timer.style.color = 'crimson';
              document.getElementById('input').value = "";
            }
            else if ((timeleft % 60) < 10)
            {
              timer.innerHTML = Math.floor(timeleft / 60) + ':0' + (timeleft % 60);
            }
            else
            {
                timer.innerHTML = Math.floor(timeleft / 60) + ':' + (timeleft % 60);
            }
            timeleft--;
        }, 1000);
    }

    function giveUp()
    {
      var input = document.getElementById('input');
      input.placeholder = "you loose the game"
      input.readOnly = true;

      var timer = document.getElementById('timer');
      timer.textContent = "0:00";

      finish();

    }

    function finish()
    {
      var svg = document.getElementById("svgClass").contentDocument;
      var contArray = svg.getElementsByName(continent);
      var last = '';
      var amount = 1;
      for (var i = 0; i < contArray.length; i++)
      {
        if (contArray[i].style.fill !== 'mediumaquamarine')
        {
          contArray[i].style.fill = 'indianred';
        }
        var temp = contArray[i].getAttribute('class');
        console.log(temp)
        console.log(last)
        if (temp !== last)
        {
          console.log('.')
          var listItem = document.getElementById(continent + amount)
          if (!listItem.textContent)
          {
            listItem.style.color = 'crimson'
            listItem.textContent = contArray[i].getAttribute('class').replaceAll('_', ' ');
          }
          amount++;
        }
        last = temp;
      }

    }