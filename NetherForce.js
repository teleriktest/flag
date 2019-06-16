class NetherForce extends Player{
    ai(){
        let targetX, targetY, oldX=this.x, oldY=this.y;
        for(let i=0; i<p.length; i++){
            if(p[i].ind!=this.ind){
                if(p[i].ind==0 || (this.ind==0 && p[i]==1)){
                    targetX=p[i].x;
                    targetY=p[i].y;
                }else{
                    if(Math.sqrt((this.x-p[i].x)*(this.x-p[i].x)+(this.y-p[i].y)*(this.y-p[i].y)<Math.sqrt((this.x-targetX)*(this.x-targetX)+(this.y-targetY)*(this.y-targetY)))){
                        targetX=p[i].x;
                        targetY=p[i].y;
                    }
                }
            }
        }
        this.shoot(targetX, targetY);
        //this.speed=3.5;
        if(this.team==0){
            this.moveTowards(flag[1].x, flag[1].y);
            if(this.x==flag[1].x && this.y==flag[1].y){
               this.moveTowards(flag[0].x, flag[0].y);
            }
        }else{
            this.moveTowards(flag[0].x, flag[0].y);
            if(this.x==flag[0].x && this.y==flag[0].y){
               this.moveTowards(flag[1].x, flag[1].y);
            }
        }
    }
}
p = [new PlayerHuman(0, 0), new NetherForce(1, 1)];