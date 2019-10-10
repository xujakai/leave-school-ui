import React, {Component} from 'react';
import IceContainer from '@icedesign/container';
import {Button, Dialog, Input, Message, Table} from '@alifd/next';
import CellEditor from './CellEditor';
import styles from './index.module.scss';
import DataBinder from '@icedesign/data-binder';


@DataBinder({
  'clazz': {
    url: '/clazz/list',
    method: 'GET',
    // 接口默认数据
    defaultBindingData: []
  },
  'add': {
    url: '/clazz/add',
    method: 'POST',
  },
  'del': {
    url: '/clazz/del',
    method: 'POST',
  },
})
export default class EditableTable extends Component {
  static displayName = 'EditableTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  onOk = () => {
    console.log(this.state.clazzValue);
    this.props.updateBindingData('add', {
      data: {
        clazzName: this.state.clazzValue
      }
    });
    Message.success(
        {
          title: "添加成功！",
          duration: 1000
        })
    this.onClose();
    this.props.updateBindingData('clazz');
  };


  onOpen = () => {
    this.setState({
      visible: true
    });
  };

  onClose = reason => {

    this.setState({
      visible: false
    });
  };


  componentDidMount() {
    // 组件加载时获取数据源，数据获取完成会触发组件 render
    this.props.updateBindingData('clazz');
  }

  renderOrder = (value, index) => {
    return <span>{index}</span>;
  };

  deleteItem = (index) => {
    console.log(index)
    this.props.updateBindingData('del', {
      data: index
    });
    Message.success(
        {
          title: "删除成功！",
          duration: 1000
        })
    this.props.updateBindingData('clazz');
  };

  renderOperation = (value, index,record) => {
    return (
      <Button onClick={this.deleteItem.bind(this, record)} text>
        删除
      </Button>
    );
  };


  renderEditor = (valueKey, value, index, record) => {
    return (
      <CellEditor
        valueKey={valueKey}
        index={index}
        value={record[valueKey]}
        // onChange={this.changeDataSource}
      />
    );
  };

  addNewItem = () => {
   /* this.state.dataSource.push({
      clazzName: '暂无',
    });
    this.setState({
      dataSource: this.state.dataSource,
    });*/
  };

  render() {
    const { clazz } = this.props.bindingData;

    console.log(clazz)
    return (
      <div className={styles.editableTable}>
        <IceContainer>
          <Table loading={clazz.__loading} dataSource={clazz} hasBorder={false}>
            <Table.Column width={80} title="顺序" cell={this.renderOrder} />
            <Table.Column
              width={280}
              title="班级"
              cell={this.renderEditor.bind(this, 'clazzName')}
            />
            <Table.Column title="操作" width={80} cell={this.renderOperation} />
          </Table>
          <div onClick={this.onOpen} className={styles.addNewItem}>
            + 新增一行
          </div>
          <Dialog
              title="请输入要添加的班级"
              visible={this.state.visible}
              onOk={this.onOk.bind(this)}
              onCancel={this.onClose.bind(this, 'cancelClick')}
              onClose={this.onClose}>
            <Input
                hasClear
                trim={true}
                size="large"
                placeholder="班级名称"
                className={styles.inputCol}
                onChange={(value,e)=>this.setState({clazzValue:value})}
            />
          </Dialog>
        </IceContainer>
      </div>
    );
  }
}
