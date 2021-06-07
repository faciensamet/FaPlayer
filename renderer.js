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
            element.innerHTML = "<video id='video' style='height:100vh; width:100vw; object-fit:contain' src='" + f.path + "' autoplay ></video>"
                      
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

            // vidoe loaded event 
            // - resize window to fit video size
            document.getElementsByTagName('video')[0].addEventListener('loadeddata', 
                function(event)
                {
                    var videoElement = document.getElementById("video");
                    if(videoElement)
                    {
                        var width = videoElement.videoWidth;
                        var height = videoElement.videoHeight;

                        if(width > window.screen.width)
                            width = window.screen.width;
                        if(height > window.screen.height)
                            height = window.screen.height;

                        window.resizeTo(width, height)
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


// 단축키 설정
document.onkeyup = function(e) 
{
    console.log("onkeyup - " + e.key);
    if(e.key == "Enter")
    {
        if(document.fullscreenElement)
            document.exitFullscreen();
        else
            document.body.requestFullscreen();
        /*var videoElement = document.getElementById("video");
        if(videoElement)                    
            videoElement.requestFullscreen();*/
    }
}