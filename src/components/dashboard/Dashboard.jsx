/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon, Input, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import notice from '../../style/imgs/notice.png';
import AuthWidget from '@/components/widget/AuthWidget';

const Search = Input.Search;

class Dashboard extends React.Component {

    handlePush = (value) => {
        message.success('发布成功！')
    }

    render() {
        return (
            <AuthWidget
                children={auth => auth.role === '访客' ? <h2 style={{height: 500}} className="center">您暂无权限查看数据报表</h2> : (
                    <div className="gutter-example button-demo">
                        <BreadcrumbCustom />
                        <Row gutter={10}>
                            <Col className="gutter-row" md={8}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <EchartsProjects />
                                    </Card>
                                </div>
                            </Col>
                            <Col className="gutter-row" md={8}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <EchartsViews />
                                    </Card>
                                </div>
                            </Col>
                            <Col className="gutter-row" md={8}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <div className="pb-m">
                                            <h3>发布推送</h3>
                                        </div>
                                        <span className="card-tool"><Icon type="sync" /></span>
                                        <ul className="list-group no-border">
                                            <li className="list-group-item">
                                                <div className="clear">
                                                    <Search
                                                        placeholder="输入推送内容"
                                                        enterButton="立即发布"
                                                        size="large"
                                                        onSearch={value => this.handlePush(value)}
                                                    />
                                                </div>
                                            </li>

                                        </ul>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            />
            
        )
    }
}

export default Dashboard;