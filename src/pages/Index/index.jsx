import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, DatePicker, Input, Message, Select} from '@alifd/next';
import HttpClient from '../../components/HttpClient';
import {
    FormBinder as IceFormBinder,
    FormBinderWrapper as IceFormBinderWrapper,
    FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/foundation-symbol';
import styles from './index.module.scss';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;

moment.locale('zh-cn');
let Index;
Index = (props) => {
    // 组件加载时获取数据源，数据获取完成会触发组件 render

    const [value, setValue] = useState({
        clazzName: '',
        stuNo: '',
        stuName: '',
        go: '1',
        goDescribe: '',
        phone: '',
        goTime: '',
        backTime: '',

    });
    const [goValue, setGoValue] = useState(false);
    const [clazzValue, setClazzValue] = useState({
        clazzList: [],
    });

    useEffect( () => {
        console.log(' 全局钩子触发 ')
         HttpClient.get("/clazz/list",{}).then((res=>{
            console.log(res)
           var d =  res.data.data.map(e=>{return {value:e.clazzName,label:e.clazzName}});
            console.log(d)
            setClazzValue({clazzList:d});
            console.log(clazzValue.clazzList)
        }));
    },[]);

    let formRef;

    const checkNum = (rule, values, callback,length) => {
        if (!values) {
            callback('请输入正确的号码');
        } else if (values.length != length) {
            callback('请输入正确的号码');
        } else {
            callback();
        }
    };

    const checkOthers = (rule, values, callback, bool) => {
        if(bool){
            callback();
            return;
        }
        if (!values) {
            callback('请选择');
        } else {
            callback();
        }
    };

    const formChange = formValue =>{
        // console.log(formValue)
        setGoValue(formValue.go=='0');
        setValue(formValue);
    }

    const myReset = ()=>setValue({
            clazzName: '',
            stuNo: '',
            stuName: '',
            go: '1',
            goDescribe: '',
            phone: '',
            goTime: '',
            backTime: '',

        });


    const handleSubmit = () => {
        formRef.validateAll((errors, values) => {
            if (errors) {
                console.log('errors', errors);
                return;
            }
            HttpClient.post("/leave-school-registration/add",values,{}).then(res=>{
                if(res.data.success){
                    Message.success('登记成功！');
                    myReset();
                }else {
                    Message.error(res.data.msg);
                    // this.reset();
                }
                console.log(res)
            })
            // props.history.push('/user/login');
        });
    };
    const config = {
        validator:(rule, values, callback) => checkOthers(rule, values, callback, goValue),
        required: goValue,
        message: "*",
    }
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>离校登记</h4>
            <IceFormBinderWrapper
                value={value}
                onChange={formChange}
                ref={form => formRef = form}
            >
                <div className={styles.formItems}>
                    <div className={styles.formItem}>
                        <IceFormBinder name="clazzName" required message="*">
                            <Select
                                size="large"
                                label="班级:"
                                // innerAfter={<IceIcon type="person" size="small" className={styles.inputIcon}/>}
                                className={styles.inputSel}
                                dataSource={clazzValue.clazzList}
                                placeholder="班级"
                                autoWidth={false}
                            />
                        </IceFormBinder>
                        <IceFormError name="clazzName"/>
                    </div>

                    <div className={styles.formItem}>
                        <IceIcon type="person" size="small" className={styles.inputIcon}/>
                        <IceFormBinder name="stuNo"
                                       required
                                       validator={(rule, values, callback) => checkNum(rule, values, callback, 10)}
                                       message="*">
                            <Input
                                hasClear
                                maxLength={10}
                                trim={true}
                                size="large"
                                placeholder="学号"
                                className={styles.inputCol}
                             />
                        </IceFormBinder>
                        <IceFormError name="stuNo"/>
                    </div>

                    <div className={styles.formItem}>
                        <IceIcon type="person" size="small" className={styles.inputIcon}/>
                        <IceFormBinder name="stuName" required message="*">
                            <Input
                                hasClear
                                trim={true}
                                size="large"
                                placeholder="姓名"
                                className={styles.inputCol}
                            />
                        </IceFormBinder>
                        <IceFormError name="stuName"/>
                    </div>

                    <div className={styles.formItem}>
                        <IceFormBinder name="go" required message="*">
                            <Select
                                size="large"
                                label="离校:"
                                // label={<IceIcon type="person" size="small" className={styles.inputIcon}/>}
                                className={styles.inputSel}
                                dataSource={[{label: "是",value:"1"},{label:"否",value:"0"}]}
                                placeholder="是否离校"
                                autoWidth={false}
                            />
                        </IceFormBinder>
                        <IceFormError name="go"/>
                    </div>


                    <div className={styles.formItem}>
                        <IceIcon type="edit" size="small" className={styles.inputIcon}/>
                        <IceFormBinder name="goDescribe" {...config} message="*">
                            <Input
                                hasClear
                                trim={true}
                                disabled={goValue}
                                size="large"
                                placeholder="离校去向"
                                className={styles.inputCol}
                            />
                        </IceFormBinder>
                        <IceFormError name="goDescribe"/>
                    </div>

                    <div className={styles.formItem}>
                        <IceIcon type="phone" size="small" className={styles.inputIcon}/>
                        <IceFormBinder
                            name="phone"
                            required={!goValue}
                            validator={(rule, values, callback) => {if(!goValue){checkNum(rule, values, callback, 11)}else {callback();}}}
                            message="*"
                        >
                            <Input
                                hasClear
                                trim={true}
                                disabled={goValue}
                                size="large"
                                maxLength={11}
                                placeholder="电话"
                                className={styles.inputCol}
                            />
                        </IceFormBinder>
                        <IceFormError name="phone"/>
                    </div>

                    <div className={styles.formItem}>
                        <IceFormBinder name="goTime" {...config}>
                            <DatePicker  disabled={goValue} size="large" format="YYYY-MM-DD"  className={styles.inputSel} placeholder={"离校日期"}/>
                        </IceFormBinder>
                        <IceFormError name="goTime"/>
                    </div>

                    <div className={styles.formItem}>
                        <IceFormBinder name="backTime"  {...config}>
                            <DatePicker disabled={goValue} size="large" format="YYYY-MM-DD"  className={styles.inputSel} placeholder={"返校日期"} />
                        </IceFormBinder>
                        <IceFormError name="backTime"/>
                    </div>

                    <div className="footer">
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            className={styles.submitBtn}
                            size="large"
                        >
                            登 记
                        </Button>
                    </div>
                </div>
            </IceFormBinderWrapper>
        </div>
    );
};
export default withRouter(Index);
