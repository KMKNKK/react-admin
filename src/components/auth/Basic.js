/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card, Button, Table, Input, message } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
import { getUserList, changeUserAuth, deleteAccount, changeUserPassword } from '../../axios'

class Basic extends Component {

    componentWillMount() {
        getUserList().then(res => {
            this.setState({
                users: res.data.msg,
            })
        })
    }

    handleUpChange = (e) => {
        changeUserAuth(e.target.value, 'up').then(res => {
            getUserList().then(res => {
                this.setState({
                    users: res.data.msg,
                })
            })
        })
    }

    handleDownChange = (e) => {
        changeUserAuth(e.target.value, 'down').then(res => {
            getUserList().then(res => {
                this.setState({
                    users: res.data.msg,
                })
            })
        })
    }

    handleDelete = (e) => {
        deleteAccount(e.target.value).then(res => {
            getUserList().then(res => {
                this.setState({
                    users: res.data.msg,
                })
            })
        })
    }

    handleChangeUserPassword = (e) => {
        const id = e.target.value;
        const newPassword = document.getElementById(id).value;
        if (newPassword === null || newPassword === undefined || newPassword === '') {
            message.error('重置密码不能为空！')
        } else {
            changeUserPassword(id, newPassword).then(res => {
                message.success('重置密码成功！')
            })
        }
    }

    state = {
        users: {
            admin: [],
            guest: [],
        },
        refresh: true,
    }
    render() {
        const { users: { admin, guest } } = this.state;
        const columns = [{
            title: '账号名',
            dataIndex: 'account',
            key: 'account',
        }, {
            title: '手机号',
            dataIndex: 'phone_number',
            key: 'phone_number',
        }, {
            title: '权限等级',
            dataIndex: 'auth',
            key: 'auth',
        }, {
            title: '创建日期',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '更新日期',
            dataIndex: 'updated_at',
            key: 'updated_at',
        }, {
            title: '提升权限',
            dataIndex: 'up_auth',
            key: 'up_auth',
        }, {
            title: '降低权限',
            dataIndex: 'down_auth',
            key: 'down_auth',
        }, {
            title: '重置密码',
            dataIndex: 'reset_password',
            key: 'reset_password',
        }, {
            title: '删除账号',
            dataIndex: 'delete_account',
            key: 'delete_account',
        }]

        let data = [];
        admin.forEach(val => {
            if (val.account !== localStorage.getItem('accountName')) {
                data.push({
                    account: val.account,
                    phone_number: val.phone_number,
                    auth: val.auth,
                    created_at: val.created_at.slice(0, 10),
                    updated_at: val.updated_at.slice(0, 10),
                    up_auth: <Button value={val.account} disabled={val.auth === 'admin'} onClick={e => this.handleUpChange(e)}>提升权限</Button>,
                    down_auth: <Button value={val.account} disabled={val.auth === 'guest'} onClick={e => this.handleDownChange(e)}>降低权限</Button>,
                    reset_password: <div><Input style={{width: '100px'}} /><Button value={val.account} disabled={val.auth === 'guest'} onClick={e => this.handleChangeUserPassword(e)}>重置密码</Button></div>,
                    delete_account: <Button value={val.account} type="danger" onClick={e => this.handleDelete(e)}>删除账号</Button>,
                })
            }
        })
        guest.forEach(val => {
            data.push({
                account: val.account,
                phone_number: val.phone_number,
                auth: val.auth,
                created_at: val.created_at.slice(0, 10),
                updated_at: val.updated_at.slice(0, 10),
                up_auth: <Button value={val.account} disabled={val.auth === 'admin'} onClick={e => this.handleUpChange(e)}>提升权限</Button>,
                down_auth: <Button value={val.account} disabled={val.auth === 'guest'} onClick={e => this.handleDownChange(e)}>降低权限</Button>,
                reset_password: <div><Input style={{width: '100px'}} id={val.id} /><Button value={val.id} onClick={e => this.handleChangeUserPassword(e)}>重置密码</Button></div>,
                delete_account: <Button value={val.account} type="danger" onClick={e => this.handleDelete(e)}>删除账号</Button>,
            })
        })
        return (
            <div>
                <BreadcrumbCustom first="权限管理" second="用户权限管理" />
                <AuthWidget
                    children={auth => (
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} bodyStyle={{minHeight: 600}}>
                                    {(auth.role === '访客') && (<h2 style={{height: 500}} className="center">仅高级管理员可做权限管理</h2>)}
                                    {(auth.role !== '访客') && (
                                        <Table dataSource={data} columns={columns} />
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    )}
                />
            </div>

        )
    }
}

export default Basic;