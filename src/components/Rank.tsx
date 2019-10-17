import React from 'react';
import './Rank.css';

export default class Rank extends React.Component {
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
                <tr>
                    <td><i className="nes-icon trophy"></i></td>
                    <td>Jan</td>
                    <td>100</td>
                </tr>
                </tbody>
            </table>
            </div>
        </section>
      );
    }
  }