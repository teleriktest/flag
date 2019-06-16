class IvoBot extends Player{
    constructor(team, ind){
        super(team, ind);
        this.vx = []; this.vy = []; this.e = []; this.ed = [];
        this.distv = []; this.prev = [];
        this.used = [];
        this.timeout = 0; this.randx = 0; this.randy = 0; this.nextx = -100; this.nexty = -100;
    }
    construct_graph(bx, by, ex, ey){
        this.vx = [bx, ex];
        this.vy = [by, ey];
        for (let i=0; i<w.length; ++i){
            let dist = d(w[i].x1, w[i].y1, w[i].x2, w[i].y2);
            let dx = (w[i].x2-w[i].x1)/dist*25;
            let dy = (w[i].y2-w[i].y1)/dist*25;
            this.vx.push(w[i].x1 - dx);
            this.vy.push(w[i].y1 - dy);
            this.vx.push(w[i].x2 + dx);
            this.vy.push(w[i].y2 + dy);
        }
        this.e = []; this.ed = [];
        for (let i=0; i<this.vx.length; ++i){
            this.e[i] = [];
            this.ed[i] = [];
            for (let j=0; j<this.vx.length; ++j){
                if (i==j) continue;
                let valid = true;
                for (let segm of w){
                    if (crossSegments(this.vx[i]+12, this.vy[i], this.vx[j]+12, this.vy[j], segm.x1, segm.y1, segm.x2, segm.y2) || 
                        crossSegments(this.vx[i]-12, this.vy[i], this.vx[j]-12, this.vy[j], segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i], this.vy[i]+12, this.vx[j], this.vy[j]+12, segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i], this.vy[i]-12, this.vx[j], this.vy[j]-12, segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i], this.vy[i]+12, this.vx[j], this.vy[j]-12, segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i], this.vy[i]-12, this.vx[j], this.vy[j]+12, segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i]+12, this.vy[i], this.vx[j]-12, this.vy[j], segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i]-12, this.vy[i], this.vx[j]+12, this.vy[j], segm.x1, segm.y1, segm.x2, segm.y2) ||
                        crossSegments(this.vx[i], this.vy[i], this.vx[j], this.vy[j], segm.x1, segm.y1, segm.x2, segm.y2)){
                        valid = false;
                        break;
                    }
                }
                if (valid){
                    this.e[i].push(j);
                    this.ed[i].push(d(this.vx[i], this.vy[i], this.vx[j], this.vy[j]));
                }
            }
        }
    }
    dijkstra(){
        this.distv[0] = 0;
        this.used[0] = false;
        this.prev[0] = -1;
        for (let i=1; i<this.vx.length; ++i){
            this.distv[i] = -1;
            this.prev[i] = -1;
            this.used[i] = false;
        }
        while(!this.used[1]){
            let ind = -1;
            for (let i=0; i<this.distv.length; ++i){
                if (!this.used[i] && this.distv[i]!=-1){
                    if (ind==-1 || (this.distv[ind] > this.distv[i])){
                        ind = i;
                    }
                }
            }
            if (ind == -1) break;
            for (let i=0; i<this.e[ind].length; ++i){
                let x = this.e[ind][i];
                if (this.distv[x]==-1 || this.distv[x] > this.distv[ind] + this.ed[ind][i]){
                    this.distv[x] = this.distv[ind] + this.ed[ind][i];
                    this.prev[x] = ind;
                }
            }
            this.used[ind] = true;
        }
    }
    find_path(bx, by, ex, ey){
        this.construct_graph(bx, by, ex, ey);
        this.dijkstra();
    }
    findFastest(tX, tY){
        this.find_path(tX, tY, this.x, this.y);
    }
    ai(){
        if (this.timeout > 0){
            this.moveTowards(this.randx, this.randy);
            this.timeout--;
        }else{
            if (this.nextx < -50 || d(this.x, this.y, this.nextx, this.nexty) < this.speed){
                if (this.flag){
                    this.findFastest(baseX[this.team], baseY[this.team]);
                }else{
                    this.findFastest(flag[1-this.team].x, flag[1-this.team].y);
                }
                this.nextx = this.vx[this.prev[1]];
                this.nexty = this.vy[this.prev[1]];
            }
            this.moveTowards(this.nextx, this.nexty);
            if (Math.random()<0.001){
                this.timeout = 20;
                this.randx = Math.random()*terrX;
                this.randy = Math.random()*terrY;
            }
        }
        let toShoot = -1, mdist=-1;
        for (let i=0; i<p.length; ++i){
            if (p[i].team != this.team){
                let valid = true;
                for (let j=0; j<w.length; ++j){
                    if (crossSegments(this.x, this.y, p[i].x, p[i].y, w[j].x1, w[j].y1, w[j].x2, w[j].y2)){
                        valid = false;
                        break;
                    }
                }
                if (valid){
                    let cdist = d(this.x, this.y, p[i].x, p[i].y);
                    if (toShoot==-1 || cdist < mdist){
                        toShoot = i;
                        mdist = cdist;
                    }
                }
            }
        }
        if (toShoot != -1) this.shoot(p[toShoot].x, p[toShoot].y);
    }
}
//p = [new IvoBot(0, 0), new IvoBot(0, 1), new IvoBot(0, 2), new IvoBot(1, 3), new IvoBot(1, 4), new IvoBot(1, 5)];
//p = [new PlayerHuman(0, 0), new IvoBot(1, 1)];