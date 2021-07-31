/*
*   Food类表示蛇的食物
*/
export default class Food {
  // 定义一个属性表示食物对应的元素
  element: HTMLElement;

  constructor() {
    // 获取页面中的food元素，并赋值给element
    this.element = document.getElementById('food')!; // 加！号表示这个元素不会为空
  }

  // 获取食物的X坐标
  get X() {
    return this.element.offsetLeft;
  }

  // 获取食物的Y坐标
  get Y() {
    return this.element.offsetTop;
  }

  // 修改食物的位置
  change() {
    /*
    *   生成0-290之间的随机整10数
    *     1.食物生成范围：0 ~ 290
    *     2.蛇每次移动一格，一格为10
    *     3.食物的生成位置坐标就必须是整10的
    */
    let left = Math.round(Math.random() * 29) * 10;
    let top = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + 'px'
    this.element.style.top = top + 'px'
  }

}
