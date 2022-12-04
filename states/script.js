var err = 2;
var def = [200, 0, 0];
var states = new Array();
var count = 50;

states[getHashCode('alabama')] = [36, 189, 207, false];
states[getHashCode('alaska')] = [220, 178, 48, false];
states[getHashCode('arizona')] = [25, 169, 167, false];
states[getHashCode('arkansas')] = [220, 133, 45, false];
states[getHashCode('california')] = [227, 91, 228, false];
states[getHashCode('colorado')] = [252, 90, 248, false];
states[getHashCode('connecticut')] = [230, 231, 3, false];
states[getHashCode('delaware')] = [231, 11, 0, false];
states[getHashCode('florida')] = [206, 184, 35, false];
states[getHashCode('georgia')] = [179, 108, 230, false];
states[getHashCode('hawaii')] = [221, 60, 50, false];
states[getHashCode('idaho')] = [197, 163, 240, false];
states[getHashCode('illinois')] = [141, 125, 233, false];
states[getHashCode('indiana')] = [226, 80, 189];
states[getHashCode('iowa')] = [180, 252, 188];
states[getHashCode('kansas')] = [238, 213, 128];
states[getHashCode('kentucky')] = [225, 197, 81];
states[getHashCode('louisiana')] = [179, 134, 235];
states[getHashCode('main')] = [130, 0, 230];
states[getHashCode('maryland')] = [220, 231, 3];
states[getHashCode('massachusetts')] = [18, 144, 231];
states[getHashCode('michigan')] = [232, 117, 151];
states[getHashCode('minnesota')] = [25, 133, 246];
states[getHashCode('mississippi')] = [133, 235, 148];
states[getHashCode('missouri')] = [251, 181, 215];
states[getHashCode('montana')] = [215, 240, 163];
states[getHashCode('nebraska')] = [135, 128, 238];
states[getHashCode('nevada')] = [137, 124, 233];
states[getHashCode('new hampshire')] = [231, 158, 0];
states[getHashCode('new jersey')] = [231, 0, 230];
states[getHashCode('new mexico')] = [204, 253, 175];
states[getHashCode('new york')] = [231, 74, 0];
states[getHashCode('north carolina')] = [241, 243, 135];
states[getHashCode('north dakota')] = [230, 25, 246];
states[getHashCode('ohio')] = [123, 211, 255];
states[getHashCode('oklahoma')] = [180, 128, 237];
states[getHashCode('oregon')] = [234, 231, 123];
states[getHashCode('pennsylvania')] = [135, 255, 123];
states[getHashCode('rhode island')] = [231, 11, 0];
states[getHashCode('south carolina')] = [219, 128, 37];
states[getHashCode('south dakota')] = [240, 246, 25];
states[getHashCode('tennessee')] = [211, 45, 220];
states[getHashCode('texas')] = [251, 251, 115];
states[getHashCode('utah')] = [221, 158, 47];
states[getHashCode('vermont')] = [28, 231, 0];
states[getHashCode('virginia')] = [238, 135, 242];
states[getHashCode('washington')] = [222, 108, 49];
states[getHashCode('west virginia')] = [182, 124, 255];
states[getHashCode('wisconsin')] = [231, 138, 54];
states[getHashCode('wyoming')] = [190, 30, 112];



 
 function start()
 {
     var canvas = document.getElementById('canvas');
     var states = new Image();
     states.src = "states.svg";
     canvas.width = states.width;
     canvas.height = states.height;
     var context = canvas.getContext('2d', { willReadFrequently: true });

     var canvas2 = document.getElementById('canvas2')
     var white = new Image()
     white.src = "white.svg";
     canvas2.width = white.width;
     canvas2.height = white.height;
     var context2 = canvas2.getContext('2d', { willReadFrequently: true });

     var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

     var start = document.getElementById('startButton');
    var data = imageData.data;
    getRGBColors(context, context2);
     
     start.addEventListener('mousedown', function()
     {
        getPixel(context, context2, states, white);
        start.style.display = 'none';
        document.getElementById('count').style.display = 'block';
        document.getElementById('input').style.display = 'block';
    });
}


function getPixel(context, context2, states, white)
{
    context2.drawImage(white, 0, 0);
    context.drawImage(states, 0, 0);

  }

  function changeColor(r, g, b, context, context2)
  {

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData2 = context2.getImageData(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < imageData.data.length; i += 4)
    {
        // red
        if (imageData.data[i] === 171 || imageData.data[i + 1] === 110)
        {
            continue;
        }
        else if (imageData.data[i] >= r - err && imageData.data[i] < r + err && imageData.data[i + 1] >= g - err && imageData.data[i + 1] < g + err && imageData.data[i + 2] >= b - err && imageData.data[i + 2] < b + err)
        {
            imageData2.data[i] = def[0];
            imageData2.data[i + 1] = def[1];
            imageData2.data[i + 2] = def[2];
        }
    }
    context2.putImageData(imageData2, 0, 0);
  }


  function getRGBColors(context, context2)
  {
      var input = document.getElementById('input');
      var arrnum;
      input.addEventListener('keyup', function (event)
      {
          var num = getHashCode(input.value);
          if (states[num] || event.key.charCodeAt() === 69)
          {
              arrnum = states[num];
              if (arrnum[3])
              {
                return;
              }
              input.value = "";
              arrnum[3] = true;
              count--;
              console.log(count);
              changeColor(arrnum[0], arrnum[1], arrnum[2], context, context2);
              console.log("legit");
              document.getElementById('count').textContent = count + ' states left';
            }
        });
        return arrnum;
  }
  
    

    function getHashCode(word)
    {
        var answer = 0;
        for (var i = 0; i < word.length; i++)
        {
            answer += (word.charCodeAt(i) * i);
        }
        return answer + word.length;
    }