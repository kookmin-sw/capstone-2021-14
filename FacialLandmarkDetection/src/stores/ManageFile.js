import { observable, action, makeObservable } from "mobx";

class ManageFile {
  constructor() {
    makeObservable(this);
  }

  @observable imageUrl = "test";
  @observable pageIndex = 0;
  @observable counter = 0;

  @action increase = (t) => {
    this.pageIndex = t;
  };
  @action decrease = () => {
    this.counter++;
  };
}

export default new ManageFile();
