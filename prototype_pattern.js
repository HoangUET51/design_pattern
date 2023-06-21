/*
    - Cách sử dụng prototype pattern: tính nguyên mẫu
    - Nhược điểm khi thay đổi 1 thuộc tính sẽ bị reference
*/

class FifaOnlinePlayer {
  constructor(name, team, position, goals) {
    this.name = name;
    this.team = team;
    this.position = position;
    this.goals = goals;
  }

  score() {
    this.goals++;
  }

  clone() {
    return new FifaOnlinePlayer(
      this.name,
      this.team,
      this.position,
      this.goals
    );
  }
}

const prototypePattern = new FifaOnlinePlayer("CR7", "AI Nassr", "FW", 0);

const cr7 = prototypePattern.clone();
const m10 = prototypePattern.clone();

m10.name = "M10";
m10.team = "PSG";

console.log(cr7);
console.log(m10);
