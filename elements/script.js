var states = new Array();
var count = 0;

 
 function start()
 {
    var start = document.getElementById('startButton');
    getRGBColors();
     
    start.addEventListener('mousedown', function()
    {
        this.style.boxShadow = 'none';
    });

    makeList('p')
    makeList('f')
    makeList('s')
    makeList('d')
    

     start.addEventListener('mouseup', function()
     {
       start.style.display = 'none';
       document.getElementById('count').style.display = 'block';
       document.getElementById('wrapper').style.display = 'flex';
       makeTimer();
    });
}


  function getRGBColors()
  {
      var input = document.getElementById('input');
      var svg = document.getElementById("svgClass").contentDocument;
      
      input.addEventListener('keyup', function ()
      {
        var val = input.value.replaceAll(' ', '_')
        var st = svg.getElementsByClassName(val);
        if (st.length)
        {
          if (st[0].style.fill === getColor(st[0].getAttribute('name')))
          {
            console.log(st[0].style)
            return;
          }
          for (var i = 0; i < st.length; i++)
          {
            st[i].style.fill = getColor(st[i].getAttribute('name'));
          }
          var continent = st[0].getAttribute('name')
          var otherConts = svg.getElementsByName(st[0].getAttribute('name'))
          var amount = 0;
          var last = '';
          for (var i = 0; i < otherConts.length; i++)
          {
            var temp = otherConts[i].getAttribute('class');
            if (temp != last)
            {
              amount++;
            }
            if (temp === val)
            {
              break;
            }
            last = temp;
          }

          var listItem = document.getElementById(continent + amount);
          listItem.textContent = val.replaceAll('_', ' ');
          input.value = "";
          count++;
          document.getElementById('count').textContent = count + '/64 elements';
        }
      });
    }

    function makeList(continent)
    {
      var svg = document.getElementById("svgClass").contentDocument;
      var otherConts = svg.getElementsByName(continent);
      var amount = 0;
          var last = '';
      for (var i = 0; i < otherConts.length; i++)
          {
            var temp = otherConts[i].getAttribute('class');
            if (temp != last)
            {
              amount++;
            }
            last = temp;
          }
          var cont = document.getElementById(continent);
          for (var i = 1; i <= amount; i++)
          {
            var item = document.createElement('li');
            item.id = continent + i;
            cont.appendChild(item);
          }
    }

    function finish(continent)
    {
      var svg = document.getElementById("svgClass").contentDocument;
      var contArray = svg.getElementsByName(continent);
      var last = '';
      var amount = 1;
      for (var i = 0; i < contArray.length; i++)
      {
        if (contArray[i].style.fill !== getColor(continent))
        {
          contArray[i].style.fill = 'lightgrey';
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

    function giveUp()
    {
      var input = document.getElementById('input');
      input.placeholder = "you loose the game"
      input.readOnly = true;

      var timer = document.getElementById('timer');
      timer.textContent = "0:00";

      finish('p');
      finish('f');
      finish('s');
      finish('d');
    }

    function makeTimer()
    {
        var timeleft = 539;
        timer = document.getElementById('timer');
        var downloadTimer = setInterval(function()
        {
            if(timeleft <= 0)
            {
              clearInterval(downloadTimer);
              //giveUp();
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

    function getColor(orbital)
    {
      switch (orbital)
      {
        case 's':
          return 'rgb(179, 134, 255)';
        case 'f':
          return 'darkseagreen';
        case 'd':
          return 'hotpink';
        case 'p':
          return 'skyblue';
      }
    }