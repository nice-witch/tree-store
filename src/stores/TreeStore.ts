interface TreeNode {
  id: number | string;
  parent: number | string | null;
  label: string;
}

export class TreeStore {
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

    const findChildren = (idParent: number | string) => {
      const children = this.getChildren(idParent);
      if(children.length) {
        children.map(child => result.push(child));
        children.forEach(child =>findChildren(child.id))
      }
    }

    findChildren(id);
    return result;
  }

  getAllParents(id: number | string) {
    let result = [];

    const item = this.getItem(id);
    if (!item || !item.parent) return result;

    const findParent = (idParent) => {
      const parent = this.getItem(idParent);

      if (!parent) return;

      if(parent.parent) {
        result.push(parent);
        findParent(parent.parent)
      } else {
        result.push(this.getItem(idParent))
      }
    }

    findParent(id);
    return result;
  }

  addItem(item: TreeNode) {
    this.items.push(item);
  }

  removeItem(id: number | string) {
    const children = this.getAllChildren(id);
    this.items = this.items.filter(item => item.id !== id && !children.some((child) => child.id === item.id));
  }

  updateItem(item: TreeNode) {
    const indexItem = this.items.findIndex(i => i.id === item.id)
    this.items[indexItem] = item;
  }
}
