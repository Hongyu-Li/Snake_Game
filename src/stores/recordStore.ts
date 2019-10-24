import {observable, action} from 'mobx';
import {Record} from '../components/snake-game/Record';

export default class RecordStore {
    @observable records: Record[] = [];
    @observable player = '';

    @action.bound addRecord(record: Record) {
        this.records.push(record);
    }

    @action.bound changePlayer(avatar: string){
        this.player = avatar;
    }
};