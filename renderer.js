const { ipcRenderer } = require('electron')

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    for (const f of event.dataTransfer.files)
    {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        //ipcRenderer.send('load-movie', f.path);
        const element = document.getElementById("movie-view")
        if (element) element.innerHTML = "<video style='height:100vh; width:100vw; object-fit:contain' src='" + f.path + "' autoplay ></video>"
        break;
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
});

document.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
});

//ipcRenderer.on("load-movie", (event, arg) => {
  //  console.log("load-movie  " + arg);

    //const element = document.getElementById("movie-view")
    //if (element) element.innerText = "<video src='" + arg + "' autoplay></video>";
//})