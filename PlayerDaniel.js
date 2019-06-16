class PlayerDaniel extends Player{
  constructor(team, ind) {
    super(team, ind);
    this.stage = 1
  }
  ai(){
    if (this.team == 0) {
      if (this.stage == 1) {
        this.moveTowards(this.x - 100, this.y + 100);
        if (this.x <= -110) this.stage = 2;
      }
      if (this.stage == 2) {
        this.moveTowards(this.x, 720);
        if (this.y >= 710) this.stage = 3;
      }
      if (this.stage == 3) {
        this.moveTowards(710, this.y);
        if (this.x >= 700) this.stage = 4;
      }
      if (this.stage == 4) {
        this.moveTowards(this.x, 500);
        if (this.flag == 1) this.stage = 5;
      }
      if (this.stage == 5) {
        this.moveTowards(this.x, 720);
        if (this.y >= 710) this.stage = 6;
      }
      if (this.stage == 6) {
        this.moveTowards(-120, this.y);
        if (this.x <= -110) this.stage = 7;
      }
      if (this.stage == 7) {
        this.moveTowards(this.x, 100);
        if (this.y <= 110) this.stage = 8;
      }
      if (this.stage == 8) {
        this.moveTowards(100, this.y);
        if (this.flag == 0) this.stage = 1;
      }
    } else {
      if (this.stage == 1) {
        this.moveTowards(this.x, 720);
        if (this.y >= 710) this.stage = 2;
      }
      if (this.stage == 2) {
        this.moveTowards(-120, this.y);
        if (this.x <= -110) this.stage = 3;
      }
      if (this.stage == 3) {
        this.moveTowards(this.x, 90);
        if (this.y <= 100) this.stage = 4;
      }
      if (this.stage == 4) {
        this.moveTowards(100, this.y);
        if (this.flag == 1) this.stage = 5;
      }
      if (this.stage == 5) {
        this.moveTowards(-120, this.y);
        if (this.x <= -110) this.stage = 6;
      }
      if (this.stage == 6) {
        this.moveTowards(this.x, 720);
        if (this.y >= 710) this.stage = 7;
      }
      if (this.stage == 7) {
        this.moveTowards(710, this.y);
        if (this.x >= 700) this.stage = 8;
      }
      if (this.stage == 8) {
        this.moveTowards(this.x, 500);
        if (this.flag == 0) this.stage = 1;
      }
    }
  }
}