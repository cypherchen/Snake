import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";

/*
*  GameControl类是用来控制其他类的
*/
export default class GameControl {
  // 定义蛇的三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel

  // 定义一个蛇的移动方向
  direction: string = '';
  // 定义一个蛇是否存活的标志
  isLive: boolean = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }

  // 初始化游戏，调用后，游戏开始
  init() {
    // 读取键盘按键按下，每次按下都会调用keydownHandler，用bind修正this的指向
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    // 调用run方法
    this.run()
  }

  // 按键被按下后修改方向属性
  keydownHandler(event: KeyboardEvent) {
    this.direction = event.key;
  }

  // 控制蛇的移动
  run() {
    /*
    *   根据direction来判断蛇的移动
    *     上 top减少
    *     下 top增减
    *     左 left减少
    *     右 left增减
    */
    // 获取蛇头当前的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据方向修改蛇头坐标
    switch (this.direction) {
      case 'ArrowUp':
        Y -= 10;
        break;
      case 'ArrowDown':
        Y += 10;
        break;
      case 'ArrowLeft':
        X -= 10;
        break;
      case 'ArrowRight':
        X += 10;
        break;
    }

    // 检查蛇是否吃到食物
    this.checkEat(X, Y)

    // 修改蛇头的位置
    try{
      // 这里调用的是Snake里set X和set Y的方法，如果值不合法会抛出错误
      this.snake.X = X;
      this.snake.Y = Y;
    }catch (e){
      // 值不合法时捕获错误，弹出提示窗
      alert(e.message + 'GAME OVER');
      // 修改蛇的存活标志
      this.isLive = false;
    }

    /*
    *   让蛇自动开始移动
    *   每次进入run函数，都会判断蛇的存活标志，为true时调用这个定时器
    *   这个定时器定时结束后又会调用run函数，所以会一直移动
    *   定时器的时间随着等级的提升而越来越短，即蛇移动的越来越快
    */
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) *30)
  }

  // 判断蛇是否吃到了食物
  checkEat(X: number, Y: number) {
    // 蛇当前的坐标和食物的坐标相等，则吃到了
    if (X === this.food.X && Y === this.food.Y) {
      // 修改食物的位置
      this.food.change();
      // 如果食物的位置和蛇重叠，则再次修改食物的位置
      for (let i = 0; i < this.snake.bodies.length; i++) {
        let body = this.snake.bodies[i] as HTMLElement;
        if (this.food.X === body.offsetLeft && this.food.Y === body.offsetTop) {
          this.food.change();
        }
      }
      // 增加分数
      this.scorePanel.addScore();
      // 蛇体长增加
      this.snake.addBody();
    }
  }

}