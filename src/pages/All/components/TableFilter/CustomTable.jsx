import React, { Component } from 'react';
import { Table, Pagination, Balloon, Icon } from '@alifd/next';
import styles from './index.module.scss'

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {
      current:1
    };
  }

  handlePagination = (current) => {
    this.setState({
      current,
    });
    this.props.nextPage(current)
  };

  renderTime=(value)=>{
    if(value!=""){
      // alert(value.split(" ")[0])
      value = value.split(" ")[0]
    }
    return(value)
  }

  renderState = (value) => {
    let color = '#28a745'
    if(value=='1'){
      color = '#a71c13'
    }
    return (
      <div>
        <span className={styles.circle} style={{background:color}} />
            <span className={styles.stateText} style={{color:color}}>{value=='0'?'否':'是'}
          </span>
      </div>
    );
  };

  index=(value, index, record)=>{
    return (
        <div>
          {index+1}
        </div>
    );
  }


  render() {
    const {current} = this.state
    const { all } = this.props;
    console.log(all)
    return (
      <div className={styles.tableContainer}>
        <Table
          dataSource={all.records}
          hasBorder={false}
        >
          <Table.Column title="序列号" dataIndex="stuNo" cell={this.index}  align="center" />
          <Table.Column title="学号" dataIndex="stuNo"  align="center"  />
          <Table.Column title="班级" dataIndex="clazzName"  align="center" />
          <Table.Column title="是否离校" dataIndex="go" cell={this.renderState}  align="center" />
          <Table.Column title="电话" dataIndex="phone"  align="center" />
          <Table.Column title="离校去向" dataIndex="goDescribe"  align="center" />
          <Table.Column title="计划离校日期" cell={this.renderTime} dataIndex="goTime" align="center"  />
          <Table.Column title="实际返校日期" cell={this.renderTime} dataIndex="backTime"  align="center" />
        </Table>
        <Pagination
          className={styles.pagination}
          total={all.total}
          current={current}
          onChange={this.handlePagination}
        />
      </div>
    );
  }
}

