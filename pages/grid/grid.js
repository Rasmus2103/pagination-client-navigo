
let isInitialized = false;
export function initGrid(){
  if(!isInitialized){
    isInitialized = true;
    window.addEventListener('resize', onWindowResize)
  }
}

function onWindowResize(){
  const width = window.innerWidth
  document.getElementById('width').innerText = ""+width
}

