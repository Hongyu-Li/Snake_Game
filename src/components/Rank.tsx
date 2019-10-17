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

  componentDidMount() {

  }

  render() {
    return (
      <section className="nes-container with-title">
          <h3 className="title">Ranking List</h3>
          <div className="nes-table-responsive">
          <table className="nes-table is-bordered is-centered">
              <thead>
              <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
              </tr>
              </thead>
              <tbody>
              {this.props.record.records.map((record, index) => {
                return (
                <tr key={index}>
                    {index === 0
                      ? <td><i className="nes-icon trophy"></i></td>
                      : <td>{index + 1}</td>}
                    <td>{record.user}</td>
                    <td>{record.score}</td>
                </tr>)
              })}
              </tbody>
          </table>
          </div>
      </section>
    );
  }
  }