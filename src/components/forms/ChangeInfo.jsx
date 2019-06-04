import React from 'react';
import { Input, Button } from 'antd';

class ChangeInfo extends React.Component {

    state = {

    }

    handleSubmit = () => {

    }

    render() {

        const {  } = this.state;

        return (
            <div>
                <Input id="Account" placeholder="账户名(必填)" style={{'margin-bottom': '25px', 'marginTop': '25px'}}/>
                <Input id="PassWord" placeholder="密码(必填)" style={{'margin-bottom': '25px'}}/>
                <Input id="newPassWord" placeholder="新密码" style={{'margin-bottom': '25px'}}/>
                <Input id="PhoneNumber" placeholder="手机号" style={{'margin-bottom': '25px'}}/>
                <Button onClick={e => this.handleSubmit(e)}>提交更改</Button>
            </div>
        )
    }
}

export default ChangeInfo;
