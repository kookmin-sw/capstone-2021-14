import { observable, action } from 'mobx';

class ManageFile {
    @observable imageFile=null;

    @action increase = () => {
        this.num++
    }
    @action decrease = () => {
        this.num--
    }
}

export default new ManageFile()