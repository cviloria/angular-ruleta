import { Component, VERSION, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular ' + VERSION.major;
@ViewChild('canvas') private canvas: any;

 //color = ['#fbc','#f88','#fbc','#f88','#fbc','#f88', "#fbc", "#f67"];
 color = ['#fbc','#f88'];
 label = ['Pregunta', 'Reto', 'Pregunta', 'Reto','Pregunta', 'Reto', 'Extra', "Pregunta",'Pregunta', 'Reto'];
 slices:any;
 sliceDeg:any;
 deg: any;
 speed = 0;
 slowDownRand = 0;
 ctx:any;
 width: any; 
 center: any;   
 isStopped = false;
 lock = false;
 loopFrame;
ngOnInit() {
 
}
ngAfterViewInit(){
  this.slices = this.label.length;
  this.sliceDeg = 360/this.slices;
  this.deg = this.rand(0, 360);
  this.width = this.canvas.nativeElement.width; 
  this.center = this.width/2;  
 
  this.ctx = this.canvas.nativeElement.getContext('2d');
  
  this.drawImg();
  

  const anim = () =>  {
      this.deg += this.speed;
      this.deg %= 360;

      // Increment speed
      if(!this.isStopped && this.speed<3){
        this.speed = this.speed+1 * 0.1;
      }
      // Decrement Speed
      if(this.isStopped){
        if(!this.lock){
          this.lock = true;
          this.slowDownRand = this.rand(0.994, 0.998);
        } 
        this.speed = this.speed>0.2 ? this.speed*=this.slowDownRand : 0;
      }
      // Stopped!
      if(this.lock && !this.speed){
        var ai = Math.floor(((360 - this.deg - 90) % 360) / this.sliceDeg); 
        ai = (this.slices+ai)%this.slices; // Fix negative index
        return alert("You got:\n"+ this.label[ai] ); // Get Array Item from end Degree
      }

      this.drawImg();
    this.loopFrame = requestAnimationFrame(anim);
  };
  this.loopFrame = requestAnimationFrame(anim);
}

start(){
   this.isStopped = false;
   this.speed = 0;
   this.lock=false;
}
 rand(min, max) {
  return Math.random() * (max - min) + min;
}
 deg2rad(deg) {
  return deg * Math.PI/180;
}

 drawSlice(deg, color) {
      //console.log(deg,color)
  this.ctx.beginPath();
   this.ctx.fillStyle = color;
   this.ctx.moveTo( this.center,  this.center);
   this.ctx.arc( this.center,  this.center,  this.width/2,  this.deg2rad(deg),  this.deg2rad(deg+ this.sliceDeg));
   this.ctx.lineTo( this.center,  this.center);
   this.ctx.fill();

}

 drawText(deg, text) {
   this.ctx.save();
   this.ctx.translate( this.center,  this.center);
   this.ctx.rotate( this.deg2rad(deg));
   this.ctx.textAlign = "right";
   this.ctx.fillStyle = "#fff";
   this.ctx.font = 'bold 20px quicksand';
   this.ctx.fillText(text, 130, 10);
   this.ctx.restore();
}

 drawImg() {
   this.ctx.clearRect(0, 0,  this.width,  this.width);
  let colorIndex=0;
  for(var i=0; i< this.slices; i++){
     if(colorIndex>=this.color.length){
       colorIndex=0;
     }
     if( this.label[i]==='Extra'){
      this.drawSlice( this.deg,  '#FFD700');

     }else{
      this.drawSlice( this.deg,  this.color[colorIndex]);

     }
     
     this.drawText( this.deg+ this.sliceDeg/2,  this.label[i]);
     this.deg +=  this.sliceDeg;
     colorIndex++;
  }

}





}
