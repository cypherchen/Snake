/*
*   ScorePanel类表示底下积分牌的类
*/
export default class ScorePanel {
  // 记录分数和等级的变量，默认值是0和1
  score = 0;
  level = 1;

  // 显示分数和等级的元素
  scoreEle: HTMLElement;
  levelEle: HTMLElement;

  // 设置一个最大等级
  maxLevel: number;
  // 设置一个升级的分段
  upScore: number;

  // 最大等级和升级分段没传参时，默认是10
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 加分的方法
  addScore() {
    // 分数加一
    this.score ++;
    this.scoreEle.innerHTML = this.score.toString();

    // 当分数升到整10时候，就升一级
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 升级的方法
  levelUp() {
    // 等级有上限
    if (this.level < this.maxLevel) {
      // 等级提升
      this.level ++;
      this.levelEle.innerHTML = this.level.toString();
    }
  }
}
