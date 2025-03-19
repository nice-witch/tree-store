export interface TreeNode {
  id: number | string;
  parent: number | string | null;
  label: string;
}

export default class TreeStore {
  private items: TreeNode[];

  constructor(items: TreeNode[]) {
    this.items = items;
  }

  getAll(){
    return this.items;
  }

  getItem(id: number | string){
    return this.items.find(item => item.id === id);
  }

  getChildren(id: number | string){
    return this.items.filter(item => item.parent === id)
  }

  getAllChildren(id: number | string) {
    let result = [];

    function findChildren(idParent: number | string) {
      const children = getChildren(idParent);
      if(children.length) {
        result.push(getChildren(idParent));
        children.forEach(child =>findChildren(child.id))
      }
    }

    findChildren(id);
    return result;
  }

  getAllParents(id: number | string) {
    let result = [];

    if(!getItem(id).parent) return result;

    function findParent(idParent) {
      const parent = getItem(idParent);
      if(parent.parent) {
        result.push(parent);
        findParent(parent.parent)
      } else {
        result.push(getItem(idParent))
      }
    }

    findParent(id);
    return result;
  }

  addItem(item: TreeNode) {
    this.items.push(item)
  }

  removeItem(id: number | string) {
    this.items = this.items.filter(item => item.id !== id && item.parent !==id);
  }

  updateItem(item: TreeNode) {
    const indexItem = this.items.findIndex(i => i.id === item.id)
    this.items[indexItem] = item;
  }
}
