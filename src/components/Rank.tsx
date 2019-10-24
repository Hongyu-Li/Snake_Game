import { observer, inject } from 'mobx-react';
import RecordStore from '../stores/recordStore';
import React from 'react';
import './Rank.css';

interface RecordProps {
  record?: RecordStore
}

@inject("record")
@observer
export default class Rank extends React.Component<RecordProps> {

  render() {
    const top3Records = this.props.record.records.sort((a, b) => b.score - a.score).slice(0,3);
    return (
      <section className="nes-container with-title">
          <h3 className="title">Ranking List</h3>
          <div className="nes-table-responsive">
          {top3Records.length !== 0? <table className="nes-table is-bordered is-centered">
            <thead>
            <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {top3Records.map((record, index) => {
              return (
              <tr key={index}>
                  {index === 0
                    ? <td><i className="nes-icon trophy"></i></td>
                    : <td>{index + 1}</td>}
                  <td>
                    <img width="30px" height="30px" src={record.user} alt='player'/> 
                  </td>
                  <td>{record.score}</td>
              </tr>)
            })}
            </tbody>
        </table>:<span className="nes-text">Hi</span>}  
          </div>
      </section>
    );
  }
  }