/**
 * Created by 叶子 on 2017/7/31.
 */
import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';

class Basic extends Component {
    render() {
        return (
            <div>
                <BreadcrumbCustom first="权限管理" second="用户权限管理" />
                <AuthWidget
                    children={auth => (
                        <Row>
                            <Col span={24}>
                                <Card bordered={false} bodyStyle={{minHeight: 600}}>
                                    {auth.role === '访客' ? <h2 style={{height: 500}} className="center">仅高级管理员可做权限管理</h2> : <h2 style={{height: 500}} className="center">你现在是管理员身份</h2>}
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