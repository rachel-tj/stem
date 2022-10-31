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