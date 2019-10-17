import {observable, action} from 'mobx';

interface Record {
    user: string,
    game: string,
    score: number,
}

export default class RecordStore {
    @observable records: Record[] = [{user:"Jan", game: "snake", score: 100}, {user:"Annie", game: "snake", score: 90}];

    @action.bound addRecord(record: Record) {
        this.records.push(record);
    }
};