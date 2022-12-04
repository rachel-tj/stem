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