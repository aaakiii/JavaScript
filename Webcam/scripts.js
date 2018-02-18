const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error('OH NO!!', err);
    });

}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixcels = ctx.getImageData(0,0, width, height);
    pixcels = redeffect(pixcels);
    ctx.globalAlpha = 0.8;
    ctx.putImageData(pixcels,0,0);
  }, 16);

}

function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  strip.insertBefore(link, strip.firstChild);
}

function redeffect(pixcels) {
  for(let i = 0; i < pixcels.data.length; i+=4){
    pixcels.data[i + 0] = pixcels.data[i + 0] + 100;
    pixcels.data[i + 1] = pixcels.data[i + 1] - 50;
    pixcels.data[i + 2] = pixcels.data[i + 2] * 0.5;
  }
  return pixcels;
}

function rgbsplite(pixcels) {
  for(let i = 0; i < pixcels.data.length; i+=4){
    pixcels.data[i - 150] = pixcels.data[i + 0];
    pixcels.data[i + 100] = pixcels.data[i + 1];
    pixcels.data[i - 550] = pixcels.data[i + 2];
  }
  return pixcels;
}

getVideo();

video.addEventListener('canPlay', paintToCanvas);
