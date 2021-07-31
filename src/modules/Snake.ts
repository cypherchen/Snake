/*
*   Snake类表示贪吃蛇本体
*/
export default class Snake {
  // 定义装蛇的容器
  element: HTMLElement;
  // 定义蛇的头部
  head: HTMLElement;
  // 定义蛇的身体，包括蛇的头部
  bodies: HTMLCollection;

  constructor() {
    // 获取装蛇容器
    this.element = document.getElementById('snake')!;
    // querySelector取的是第一个元素，所以可以取到蛇的头部
    this.head = document.querySelector('#snake > div')! as HTMLElement;
    // getElementByXXX方法取到的是动态的元素集合，会随着页面变化而变化，所以这里用这种
    this.bodies = this.element.getElementsByTagName('div');
  }

  // 获取蛇头的坐标
  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value:number) {
    // 如果新旧值相等，则不需要赋值
    if (this.X === value) return;
    // 如果新值超出游戏范围，则说明撞墙了
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！')
    }

    // 如果身体的第二个方块存在，如果第二个方块的坐标和头部新坐标一样，则说明发生了调头
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      //  发生掉头时，判断是从左往右还是从右往左调头
      if (value > this.X) {
        // 如果头部新值大于旧值,则说明蛇从左往右调头,则减小新值,让其继续往左走,禁止掉头
        value = this.X - 10;
      }else {
        // 如果头部新值小于旧值,则说明蛇从右往左调头,则增大新值,让其继续往右走,禁止掉头
        value = this.X + 10;
      }
    }

    // 移动蛇的身体
    this.moveBody()
    // 修改蛇头的位置
    this.head.style.left = value + 'px';
    // 检车是否撞到身体了
    this.checkHeadBody()
  }

  set Y(value:number) {
    if (this.Y === value) return;
    if (value < 0 || value > 290) {
      throw new Error('蛇撞墙了！')
    }
    if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      }else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }

  // 吃了食物之后身体变长
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 蛇的身体移动
  moveBody() {
    /*
    *   将蛇身体的方块从后往前，依次移到前一个方块的位置
    *   第一个方块移到新的位置
    *
    */
    for (let i = this.bodies.length - 1; i > 0; i --) {
      // 获取前一块的身体方块的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将这个方块移到前一个方块的位置上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }

  }

  // 检车蛇头是否撞到了身体
  checkHeadBody() {
    // 对身体每一个块进行遍历检查
    for (let i = 1; i < this.bodies.length; i++) {
      // 获取当前的身体块
      let body = this.bodies[i] as HTMLElement;
      // 判断头部坐标和当前的身体块坐标有没有重叠
      if (this.X === body.offsetLeft && this.Y === body.offsetTop) {
        throw new Error('蛇撞到身体了！')
      }
    }
  }
}