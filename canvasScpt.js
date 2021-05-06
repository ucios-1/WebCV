var canvas = document.querySelector('#canvasPic');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 1.09;
canvas.style.cssText = 'position: absolute; top: 8%; z-index: 200;';

var c = canvas.getContext('2d');

var image = new Image();
var image2 = new Image();
var picArray = [];

image.onload = function(){
  function PicLines(positionPic, positionMove, dx, back, image, image2){
    this.positionPic = positionPic;
    this.positionMove = positionMove;
    this.startPos = canvas.width / 2;
    this.dx = dx;
    this.image = image;
    this.imageBack = image;
    this.image2 = image2;
    this.back = -back;

    this.draw = function(){
      c.drawImage(this.image, 100, this.positionPic, image.width - 220, image.height / 400,
                  this.startPos, this.positionMove, canvas.width/2, canvas.height / 400);
    };
    this.update = function(){
      this.startPos -= this.dx;
      this.draw();
    };
    this.checkPos = function(){
      return this.startPos;
    };
    this.leftStopMov = function(){
      this.startPos = 0;
      this.dx = 0;
      this.leftChangePict();
    };
    this.rightStopMov = function(){
      this.startPos = canvas.width / 2;
      this.dx = 0;
      this.rightChangePict();
    };
    this.leftChangePict = function(){this.image = this.image2;}
    this.rightChangePict = function(){this.image = this.imageBack;}
  }

  for(var i = 0; i < 400; i++){
    var position = (canvas.height / 400) * i;
    var dx = Math.random() * 10;
    var back = Math.random() * 10;
    if(dx < 4){dx += 4;}
    if(back < 4){back += 4;}
    picArray.push(new PicLines(position, position, dx, back, image, image2));
    picArray[i].draw();
  }

  function movePicture(){
    /*for(var i = 0; i < picArray.length; i++){
      if(end){
      console.log('true');
      return;
      }
    }*/
    requestAnimationFrame(movePicture);

    //var end = true;
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var j = 0; j < picArray.length; j++){
      picArray[j].update();

      if(picArray[j].checkPos() <= 0){
        picArray[j].leftStopMov();
      } else if(picArray[j].checkPos() > canvas.width / 2){
        picArray[j].rightStopMov();
      }
      /*if(picArray[j].checkPos() !== 0){
        end = false;
      }*/
    }
  }

document.querySelector('.next').addEventListener('click', function(){
  for(var i = 0; i < picArray.length; i++){
    picArray[i].dx = -picArray[i].back;
  }
  movePicture();
});
document.querySelector('.previous').addEventListener('click', function(){
  for(var i = 0; i < picArray.length; i++){
    picArray[i].dx = picArray[i].back;
  }
  movePicture();
});
};

image.src = "https://images.unsplash.com/photo-1506452819137-0422416856b8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=35c3a22e647b11004efd8135de82164c&auto=format&fit=crop&w=1266&q=80";
image2.src = "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjF9&s=5341e153d0297d2452a54157311caf33&auto=format&fit=crop&w=1350&q=80";
