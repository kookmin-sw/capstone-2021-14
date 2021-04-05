import { observable, action, makeObservable } from "mobx";

class ManageFile {
  constructor() {
    makeObservable(this);
  }

  @observable imageUrl = "";
  @observable pageIndex = 0;
  @observable counter = 0;
  @observable downFlag = true;

  @action increase = (t) => {
    this.pageIndex = t;
  };
  @action decrease = () => {
    this.counter++;
  };
}

export default new ManageFile();
