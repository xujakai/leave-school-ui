import React, {Component} from 'react';
import CustomTable from './CustomTable';
import Filter from './Filter';
import DataBinder from '@icedesign/data-binder';


@DataBinder({
  'clazz': {
    url: '/clazz/list',
    method: 'GET',
    // 接口默认数据
    defaultBindingData: []
  },
  'all': {
    url: '/leave-school-registration/list',
    method: 'GET',
    // 接口默认数据
    defaultBindingData: []
  },
  'export': {
    url: '/leave-school-registration/export',
    method: 'GET',
    // 接口默认数据
    defaultBindingData: []
  },
})
export default class TableFilter extends Component {
  static displayName = 'TableFilter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      ps:'10',
      pi:'1',
      clazzName:'',
    };
  }

  componentDidMount() {
    // 组件加载时获取数据源，数据获取完成会触发组件 render
    this.props.updateBindingData('clazz');
    this.props.updateBindingData('all',{
      // 参数放在 query 上
      params: this.state
    });
  }

  update=(ps,pi,clazzName)=>{
    this.props.updateBindingData('all',{
      // 参数放在 query 上
      params: {ps:ps,pi:pi,clazzName:clazzName}
    });
  }

  nextPage=(pi)=>{
    this.setState({ps:'10', pi: pi})
    // console.log(pi)
    this.update('10', pi, this.state.clazzName);
  }

  onChange=(clazzName)=>{
    this.setState({clazzName:clazzName})
    // console.log(this.state.clazzName)
    this.update(this.state.ps,this.state.pi,clazzName);
  }

  export=()=>{
    // console.log(this.state)
   this.download(this.state.clazzName)
  }

  download = (clazzName) => {
    fetch('http://top.topme.pro/leave-school-registration/export?clazz='+clazzName).then(res => res.blob().then(blob => {
      let a = document.createElement('a');
      let url = window.URL.createObjectURL(blob);
      // let filename = res.headers.get('Content-Disposition');
      let filename=clazzName+'_导出数据'+'.xlsx'
      if(clazzName||""==clazzName){
         filename='导出数据'+'.xlsx'
      }
      /*if(!filename){
        filename=clazzName+'_导出数据'+'.xlsx'
      }else {
        filename =clazzName+'-'+ filename.match(/\"(.*)\"/)[1]; //提取文件名
      }*/
      if (filename) {
        a.href = url;
        a.download = filename; //给下载下来的文件起个名字
        a.click();
        window.URL.revokeObjectURL(url);
        a = null;
      }
    }));
  };

  render() {
    const { clazz,all } = this.props.bindingData;
    return (
      <div>
        <Filter clazz={clazz} export={this.export} onChange={this.onChange}/>
        <CustomTable all={all} nextPage={this.nextPage} />
      </div>
    );
  }
}
