function scrollFunction(id)
{
    let e = document.getElementById(id);
    console.log(id);
    e.scrollIntoView
    ({
      block: 'start',
      behavior: 'smooth',
      inline: 'start'
    });
  }

  function crollFunction(id)
  {
    var node = document.getElementById(id);
    var yourHeight = '100px';
    // scroll to your element
    node.scrollIntoView(true);
    // now account for fixed header
    var scrolledY = window.scrollY;
    if(scrolledY)
    {
      window.scroll(0, scrolledY - yourHeight);
    }
  }
    

