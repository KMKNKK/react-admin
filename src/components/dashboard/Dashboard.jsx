/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import { Row, Col, Card, Timeline, Icon } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsProjects from './EchartsProjects';
import notice from '../../style/imgs/notice.png';


class Dashboard extends React.Component {
    render() {
        return (
            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                <Row gutter={10}>
                    <Col className="gutter-row" md={4}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="heart" className="text-2x text-danger" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">我的收藏</div>
                                        <h2>10</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        {/* <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="cloud" className="text-2x" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">云数据</div>
                                        <h2>30122</h2>
                                    </div>
                                </div>
                            </Card>
                        </div> */}
                    </Col>
                    <Col className="gutter-row" md={4}>
                        {/* <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="camera" className="text-2x text-info" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">照片</div>
                                        <h2>802</h2>
                                    </div>
                                </div>
                            </Card>
                        </div> */}
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="clear y-center">
                                    <div className="pull-left mr-m">
                                        <Icon type="mail" className="text-2x text-success" />
                                    </div>
                                    <div className="clear">
                                        <div className="text-muted">邮件</div>
                                        <h2>102</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={16}>
                        <div className="gutter-box">
                            <Card bordered={false} className={'no-padding'}>
                                <EchartsProjects />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>任务</h3>
                                    <small>3个已经完成，2个待完成，6个正在进行中</small>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <Timeline>
                                    <Timeline.Item color="green">开发计划完成</Timeline.Item>
                                    <Timeline.Item color="green">使用Egg.js开发出后台功能初版(包括视频播放、上传、删除等)</Timeline.Item>
                                    <Timeline.Item color="green">使用React开发出前端功能初版(包括视频播放、上传、删除、登录、数据可视化等)</Timeline.Item>
                                    <Timeline.Item color="#108ee9">
                                        <p>近期在开发的后台开发中的项目</p>
                                        <p>视频流处理：包括视频加水印、视频加字幕等简易流操作。预计使用FFmpeg完成，已查阅相关文档和文献</p>
                                        <p>用户登录、权限分级：使用MySQL记录用户账户信息，进行权限分级</p>
                                        <p>内容审核：对视频内容进行审核、分类</p>
                                    </Timeline.Item>
                                    <Timeline.Item color="#108ee9">
                                        <p>近期在开发的前端开发中的项目</p>
                                        <p>完善现有界面</p>
                                        <p>视频流处理：开发出配套后端功能的界面</p>
                                        <p>内容审核：开发出配套后端功能的界面</p>
                                    </Timeline.Item>

                                    <Timeline.Item color="red">
                                        <p>尚未规划好的功能，正在查阅相关资料</p>
                                        <p>服务器容量监测</p>
                                        <p>消息推送机制</p>
                                    </Timeline.Item>
                                </Timeline>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>消息栏</h3>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <ul className="list-group no-border">
                                    <li className="list-group-item">
                                        <span className="pull-left w-40 mr-m">
                                            <img src={notice} className="img-responsive img-circle" alt="test" />
                                        </span>
                                        <div className="clear">
                                            <span className="block">TODO(开发中)</span>
                                            <span className="text-muted">用于存放管理者对普通用户的通知消息</span>
                                        </div>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>访问量统计</h3>
                                    <small>最近7天用户访问量</small>
                                </div>
                                <span className="card-tool"><Icon type="sync" /></span>
                                <EchartsViews />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Dashboard;