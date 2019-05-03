/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Modal, message, Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
import { PwaInstaller } from '../widget';
import { confirmAccount, addAccount } from '../../axios'

const FormItem = Form.Item;

class Login extends React.Component {

    state = { visible: false }

    signUp = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        const signUpAccount = document.getElementById('signUpAccount').value;
        const signUpPassWord = document.getElementById('signUpPassWord').value;
        const inviteCode = document.getElementById('inviteCode').value;
        if (!signUpAccount || !signUpPassWord) {
            message.error('账号或密码为空！');
        } else {
            if (inviteCode === 'Invited') {
                addAccount(signUpAccount, signUpPassWord, 'admin').then(res => {
                    message.success('注册成功！');
                });
            } else {
                addAccount(signUpAccount, signUpPassWord, 'guest').then(res => {
                    message.success('注册成功！');
                });
            }
            this.setState({
                visible: false,
            });
        }
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values.userName, values.password)
                const { fetchData } = this.props;
                confirmAccount(values.userName, values.password).then(res => {
                    if (res.data.err === 10001) {
                        fetchData({funcName: res.data.auth, stateName: 'auth'});
                    } else {
                        message.error('账号或密码错误！');
                    }
                })
            }
        });
    };
    gitHub = () => {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>短视频后台管理系统</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="管理员输入admin, 游客输入guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span> */}
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span onClick={this.signUp} style={{width: '45%'}}><Icon type="plus" /> 注册账号</span>
                                <span onClick={this.gitHub} style={{width: '45%'}}><Icon type="github" /> 第三方登录</span>
                            </p>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                        </FormItem>
                    </Form>

                    <Modal
                        title="注册"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Input id="signUpAccount" placeholder="账户名" style={{'margin-bottom': '25px'}}/>
                        <Input id="signUpPassWord" placeholder="密码" style={{'margin-bottom': '25px'}}/>
                        <Input id="inviteCode" placeholder="邀请码(用于注册为管理员)" />
                    </Modal>
                </div>
            </div>
        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));