import React, {Component} from 'react';
import EditableTable from './components/EditableTable';

export default class Clazz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="clazz-page">
        {/* 可编辑内容的表格 */}
        <EditableTable />
      </div>
    );
  }
}
