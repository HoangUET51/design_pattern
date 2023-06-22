class FifaOnlinePlayer {
  constructor(builder) {
    this.name = builder.name;
    this.age = builder.age;
    this.team = builder.team;
    this.status = builder.status;
    this.position = builder.position;
  }

  toString() {
    let player = `Player:\n`;
    player += `- Name: ${this.name}\n`;
    player += `- age: ${this.age}\n`;
    player += `- team: ${this.team}\n`;
    player += `- status: ${JSON.stringify(this.status)}\n`;
    player += `- position: ${this.position}\n`;

    return player;
  }
}

class FifaOnlinePlayerBuilder {
  constructor() {
    this.name = "";
    this.age = 0;
    this.team = "";
    this.status = {};
    this.position = "";
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withAge(age) {
    this.age = age;
    return this;
  }

  withTeam(team) {
    this.team = team;
    return this;
  }

  withStatus(status) {
    this.status = status;
    return this;
  }

  withPosition(position) {
    this.position = position;
    return this;
  }

  build() {
    return new FifaOnlinePlayer(this);
  }
}

const builder = new FifaOnlinePlayerBuilder();

const cr7 = builder
  .withName("Cr7")
  .withAge(38)
  .withTeam("AI nassr")
  .withStatus({ goals: 15, assits: 2 })
  .withPosition("FW")
  .build();
console.log(cr7.toString());
