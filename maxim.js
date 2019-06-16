var posoka = 0;
class Maxim extends Player{
    ai(){
        
        for (let i=0; i<w.length; ++i){
            if (w[i].x1 == w[i].x2 && areColliding(this.x-this.r, this.y-this.r, 2*this.r, 2*this.r, w[i].x1, w[i].y1, 1, w[i].y2-w[i].y1)){
                
            }
        }
        this.closerPLayer=-1;
		for(let i=0; i<p.length; i++){
			if(p[i].team!=this.team){
				if(this.closerPLayer==-1){
					this.closerPLayer = p[i];
				}
				if(d(p[i].x, p[i].y, this.x, this.y)<(this.closerPLayer.x, this.closerPLayer.y, this.x, this.y)){
					this.closerPLayer = p[i];
                    this.shoot(this.closerPLayer.x,this.closerPLayer.y);
				}
			}
		}
        /*if(posoka == 5) this.moveTowards(this.x - 100, this.y-100); 
        if(posoka == 6) this.moveTowards(this.x + 100, this.y-100); 
        if(posoka == 7) this.moveTowards(this.x - 100, this.y+100); 
        if(posoka == 8) this.moveTowards(this.x + 100, this.y+100); 
        if(posoka == 1) this.moveTowards(this.x - 100, this.y); 
        if(posoka == 2) this.moveTowards(this.x, this.y-100); 
        if(posoka == 3) this.moveTowards(this.x+100, this.y); 
        if(posoka == 4) this.moveTowards(this.x, this.y+100);*/
        if(flag[0].held == -1){ 
            if(this.x < flag[0].x-50) this.moveTowards(this.x+100, this.y); 
            if(this.x > flag[0].x) this.moveTowards(this.x - 100, this.y); 
            if(this.y > flag[0].y-50) this.moveTowards(this.x, this.y-100);
            if(this.y < flag[0].y) this.moveTowards(this.x, this.y+100); 
        }
         if(flag[0].held == 1){ 
            if(this.x < flag[1].x) this.moveTowards(this.x+100, this.y); 
            if(this.x > flag[1].x) this.moveTowards(this.x - 100, this.y); 
            if(this.y > flag[1].y) this.moveTowards(this.x, this.y-100);
            if(this.y < flag[1].y) this.moveTowards(this.x, this.y+100); 
        }
    }
}