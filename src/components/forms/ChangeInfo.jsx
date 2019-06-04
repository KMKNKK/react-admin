import React from 'react';
import { Input, Button, message } from 'antd';
import { getUserList, changeUserPhone, changeUserPassword, confirmAccount } from '../../axios'

class ChangeInfo extends React.Component {

    componentWillMount() {
        getUserList().then(res => {
            this.setState({
                userList: [...res.data.msg.admin, ...res.data.msg.guest],
            })
        })
    }

    state = {
        userList: []
    }

    handleSubmit = (items) => {
        if (items !== undefined) {
            const Account = document.getElementById('Account').value;
            const PassWord = document.getElementById('PassWord').value;
            const newPassWord = document.getElementById('newPassWord').value;
            const PhoneNumber = document.getElementById('PhoneNumber').value;
            console.log('PhoneNumber', PhoneNumber.length)
            confirmAccount(Account, PassWord).then(res => {
                if (res.data.err === 10001) {
                    if (newPassWord.length !== 0) {
                        changeUserPassword(items.id, newPassWord);
                    }
                    if (PhoneNumber.length !== 0) {
                        changeUserPhone(items.id, PhoneNumber);
                    }
                } else {
                    message.error('账号或密码错误！');
                }
            })
        }
    }

    render() {

        const { userList } = this.state;
        const accountName = localStorage.getItem('accountName');
        let items;
        userList.forEach(val => {
            if (val.account === accountName) {
                items = val;
            }
        });

        console.log('!!!!!!!!!!!', items);

        return (
            <div>
                <Input id="Account" placeholder="账户名(必填)" style={{'margin-bottom': '25px', 'marginTop': '25px'}}/>
                <Input id="PassWord" placeholder="密码(必填)" style={{'margin-bottom': '25px'}}/>
                <Input id="newPassWord" placeholder="新密码" style={{'margin-bottom': '25px'}}/>
                <Input id="PhoneNumber" placeholder={`手机号`} style={{'margin-bottom': '25px'}}/>
                <Button onClick={e => this.handleSubmit(items)}>提交更改</Button>
            </div>
        )
    }
}

export default ChangeInfo;
