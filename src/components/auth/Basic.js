/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card, List, Button } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
import { getUserList, changeUserAuth } from '../../axios'

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

    state = {
        users: {
            admin: [],
            guest: [],
        },
        refresh: true,
    }
    render() {
        const { users: { admin, guest } } = this.state;
        let data = [];
        admin.forEach(val => {
            if (val.account !== localStorage.getItem('accountName')) {
                data.push(
                    <div>
                        <p>用户名: {val.account}</p>
                        <p>创建时间: {val.created_at.slice(0, 10)} 更新时间: {val.updated_at.slice(0, 10)}</p>
                        <p>权限等级: {val.auth}</p>
                        <Button value={val.account} disabled={val.auth === 'admin'} onClick={e => this.handleUpChange(e)}>提升权限</Button>
                        <Button value={val.account} disabled={val.auth === 'guest'} onClick={e => this.handleDownChange(e)}>降低权限</Button>
                    </div>
                )
            }
        })
        guest.forEach(val => {
            data.push(
                <div>
                    <p>用户名: {val.account}</p>
                    <p>创建时间: {val.created_at.slice(0, 10)} 更新时间: {val.updated_at.slice(0, 10)}</p>
                    <p>权限等级: {val.auth}</p>
                    <Button value={val.account} disabled={val.auth === 'admin'} onClick={e => this.handleUpChange(e)}>提升权限</Button>
                    <Button value={val.account} disabled={val.auth === 'guest'} onClick={e => this.handleDownChange(e)}>降低权限</Button>
                </div>
            )
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
                                        <List
                                            size="large"
                                            header={<div>除自己外的用户列表</div>}
                                            bordered
                                            dataSource={data}
                                            renderItem={item => (<List.Item>{item}</List.Item>)}
                                        />
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