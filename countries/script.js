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

     start.addEventListener('mouseup', function()
     {
        start.style.display = 'none';
        document.getElementById('count').style.display = 'block';
        document.getElementById('input').style.display = 'block';
    });
}


  function getRGBColors()
  {
      var input = document.getElementById('input');
      var svg = document.getElementById("svgClass").contentDocument;
      
      input.addEventListener('keyup', function (event)
      {
        var val = input.value.replace(' ', '_')
        var st = svg.getElementsByClassName(val);
        if (st.length)
        {
          if (st[0].style.fill === 'mediumaquamarine')
          {
            return;
          }
          for (var i = 0; i < st.length; i++)
          {
            st[i].style.fill = 'mediumaquamarine';
          }
          input.value = "";
          count++;
          document.getElementById('count').textContent = count + '/196 countries';
        }
      });
    }