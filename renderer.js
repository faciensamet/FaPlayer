const { ipcRenderer } = require('electron')

language = require("./lang.ko.json")

ipcRenderer.on("load-movie", function (event,store) 
    {
        console.log("load-movie " + store);
        LoadMovie(store);
    }
);

function LoadMovie(filename)
{
    const element = document.getElementById("movie-view")
    if (element) 
    {
        document.title = "FaPlayer - " + filename.replace(/^.*[\\\/]/, '');
        element.innerHTML = "<video id='video' style='height:100vh; width:100vw; object-fit:contain' src='" + filename + "' autoplay ></video>"
                    
        // Error handling
        document.getElementsByTagName('video')[0].addEventListener('error', 
            function(event)
            {
                window.alert(language.Error_Not_Support_Video);
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
}

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();

    for (const f of event.dataTransfer.files)
    {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        
        LoadMovie(f.path);
        break;
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});


document.onkeypress = function (e) 
{
    console.log("onkeypress - " + e.key);

    switch (e.key) 
    {
        case "ArrowRight":
            break;
        case "ArrowLeft":
            break;
        case "ArrowUp":
            var videoElement = document.getElementById("video");
            if (videoElement)
             {
                try 
                {
                    videoElement.volume += 0.05;
                }
                catch
                {
                    videoElement.volume = 1;
                }

                console.log("Volume = " + videoElement.volume);
            }
            break;
        case "ArrowDown":
            var videoElement = document.getElementById("video");
            if (videoElement) {
                try
                {
                    videoElement.volume -= 0.05;
                }
                catch
                {
                    videoElement.volume = 0;
                }

                console.log("Volume = " + videoElement.volume);
            }
            break;
    }
}

function VideoSeek(delta)
{
    var videoElement = document.getElementById("video");
    if (videoElement)
    {
        videoElement.currentTime = videoElement.currentTime+delta;
    }

    console.log("currentTime = " + videoElement.currentTime);
}

function VideoVolume(delta)
{
    var videoElement = document.getElementById("video");
    if (videoElement)
     {
        try 
        {
            videoElement.volume += delta;
        }
        catch
        {
            if(delta>0)
                videoElement.volume = 1;
            else
                videoElement.volume = 0;
        }

        console.log("volume = " + videoElement.volume);
    }
}

document.onkeydown = function(e)
{
    console.log("onkeydown - " + e.key);

    switch(e.key)
    {
        case "ArrowRight":
            VideoSeek(5);
            break;

        case "ArrowLeft":
            VideoSeek(-5);
            break;

        case "ArrowUp":
            VideoVolume(0.05);
            break;
        case "ArrowDown":
            VideoVolume(-0.05);
            break;
    }
}

// 단축키 설정
document.onkeyup = function(e) 
{
    console.log("onkeyup - " + e.key);
    
    switch(e.key)
    {
        case "Enter":
            if(document.fullscreenElement)
                document.exitFullscreen();
            else
                document.body.requestFullscreen();        
            break;

        case " ":
            var videoElement = document.getElementById("video");
            if(videoElement)
            {
                if(videoElement.paused)
                    videoElement.play();
                else
                    videoElement.pause();
            }
            break;
    }
}