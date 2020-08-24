export function CodeToTag(codeArr, list, Alias){
  /*
  * codeArr{
  *   type:array,
  *   作用:将需要匹配的code从父到子按顺序放入数组中
  *   例如： ['省','市']=>[310000,310104]
  * }
  * list{
  *   type:array,
  *   作用:数据匹配源，必须是数组，且必须是嵌套接口，children中是子元素节点
  *   例如：
  *    {
          children: [{code: 110101, tag: "东城区", parent: 110000, level: 2},…]
          code: 110000
          level: 1
          parent: 0
          tag: "北京市"
        }
  * }
  * Alias{
  *   type:Object,
  *   作用:更改目标匹配字段的别名，可不填
  *   例如：
  *    (默认)：
       {
          targetCode:code,
          targetTag:tag,
       }
       (可修改为)：
       {
          targetCode:value,
          targetTag:label,
       }
  * }
  *
  * */
  let defaultTarget = {
    targetCode: 'code',
    targetTag: 'tag',
  };
  if (!(Array.isArray(codeArr) && Array.isArray(list))) {
    throw new Error('codeArr&list must be Array!');
  }
  if (Alias) {
    if (Alias.constructor === Object) {
      defaultTarget = Object.assign(defaultTarget, Alias);
    } else {
      throw new Error('Alias must be Object!');
    }
  }
  const tagArr = [];
  const { targetCode, targetTag } = defaultTarget;
  const getTag = (itemCode, itemList) => {
    const targetList = itemList.filter(item => item[targetCode] === itemCode)[0];
    if (targetList) {
      tagArr.push(targetList[targetTag]);
      if (targetList.children && targetList.children.length > 0) {
        getTag(codeArr[tagArr.length], targetList.children);
      }
    }
  };
  getTag(codeArr[tagArr.length], list);
  return tagArr;
}


