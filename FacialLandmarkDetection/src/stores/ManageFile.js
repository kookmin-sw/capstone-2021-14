import { observable, action, makeObservable } from "mobx";

class ManageFile {
  constructor() {
    makeObservable(this);
  }

  @observable imageUrl = "";
  @observable pageIndex = 0;
  @observable fileName = "";
  @observable faceType = "";

  @action increase = (t) => {
    this.pageIndex = t;
  };
  @action decrease = () => {
    this.counter++;
  };
}

export default new ManageFile();
