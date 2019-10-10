import React, { Component } from 'react';
import { Button, DatePicker, Select } from '@alifd/next';
import styles from './index.module.scss'

export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
   const list = this.props.clazz.map(e=>{return {value:e.clazzName,label:e.clazzName}});
    return (
      <div className={styles.tableFilter}>
        <div className={styles.filterItem}>
          <Select
              size="large"
              label="班级:"
              // innerAfter={<IceIcon type="person" size="small" className={styles.inputIcon}/>}
              className={styles.inputSel}
              dataSource={list}
              onChange={(value)=>{this.props.onChange(value)}}
              placeholder="班级"
              autoWidth={false}
          />
        </div>
        <Button type="primary" className={styles.submitButton} onClick={()=>this.props.export()}>
          导出
        </Button>
      </div>
    );
  }
}

