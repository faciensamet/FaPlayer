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
        if (element) 
        {
            document.title = "FaPlayer - " + f.path.replace(/^.*[\\\/]/, '');
            element.innerHTML = "<video style='height:100vh; width:100vw; object-fit:contain' src='" + f.path + "' autoplay ></video>"
            
            // Error handling
            document.getElementsByTagName('video')[0].addEventListener('error', 
                function(event)
                {
                    console.log(event); 
                }, 
                true
            );
        }
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
