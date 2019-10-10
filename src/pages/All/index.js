import React, { Component } from 'react';
import TableFilter from './components/TableFilter';

export default class All extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="all-page">
        {/* 筛选和表格组合 */}
        <TableFilter />
      </div>
    );
  }
}
