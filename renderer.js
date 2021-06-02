const { ipcRenderer } = require('electron')


language = require("./lang.ko.json")


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
                    const element = document.getElementById("movie-view")
                    if (element) 
                    {
                        element.innerHTML = language.Error_Not_Support_Video;
                    }
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
