fetch("https://publicactiontrigger.azurewebsites.net/api/dispatches/deadfishh/stem",
{
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify({ event_type: 'some-event', client_payload: { data: 'somedata' } })
});

function scrollFunction(id)
{
    let e = document.getElementById(id);
    console.log(e);
    e.scrollIntoView
    ({
      block: 'start',
      behavior: 'smooth',
      inline: 'start'
    });
  }

  function redirect(id)
  {
    window.location.href = id + '.html';
  }

  function transform(id)
  {
    let e = document.getElementById(id);
    e.style.transform = 'rotate(20deg)';
  }

  function songTrack(link)
  {
    window.location.href = link;
  }
    

