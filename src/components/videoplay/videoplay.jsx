// /* eslint-disable */
import React, { Component } from 'react';
import { Player } from 'video-react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Radio, Input, Button, Modal, Spin, message, Table } from 'antd';

import '../../../node_modules/video-react/dist/video-react.css'; // import css'
import './index.css'; // import css'

import UploadVideo from '../forms/UploadVideo'

import { getVideoList, deleteVideo, alterProportion, alterFPS, compressionVideo, searchVideo } from '../../axios'

const RadioGroup = Radio.Group;
const Search = Input.Search;

class VideoPlay extends Component {

    constructor() {
        super()
        this.state = {
            visible: false,
            showModify: false,
            videoList: [],
            videoDetailsList: {},
            modifyType: 1,
            deleteVideoName: '',
            modifyVideoName: '',
            heightWidthType: '1920x1080',
            fps: 60,
            sizeType: 75,
            outName: undefined,
            editingVideo: '',
        }
    }

    

    componentWillMount() {
        getVideoList('sports').then(res => {
            this.setState({
                videoDetailsList: res.data,
                videoList: Object.keys(res.data),
            })
        })
    }

    handleDeleteVideo() {
        const videoName = this.state.deleteVideoName;
        console.log('videoName', videoName)
        deleteVideo(videoName).then(res => console.log('删除返回的res', res))
        getVideoList('sports').then(res => {
            this.setState({
                videoDetailsList: res.data,
                videoList: Object.keys(res.data),
            })
        })
    }

    showModal = (e) => {
        const videoName = e.target.name;
        this.setState({
            visible: true,
            deleteVideoName: videoName,
        });
    }

    showModifyTable = (e) => {
        const videoName = e.target.name;
        this.setState({
            showModify: true,
            modifyVideoName: videoName,
            editingVideo: videoName,
        });
    }
    
    handleOk = (e) => {
        console.log('handleOk', e);
        this.handleDeleteVideo();
        this.setState({
            deleteVideoName: '',
            visible: false,
        });
    }

    handleModifyOk = () => {
        const { modifyType, modifyVideoName, heightWidthType, sizeType, fps } = this.state;
        const outName = this.state.outName ? this.state.outName + '.mp4' : '(1)' + modifyVideoName
        console.log('modifyVideoName', modifyVideoName);
        if (modifyType === 1) {
            // 修改长宽比
            console.log('修改长宽比')
            alterProportion(modifyVideoName, heightWidthType, outName)
            .then(res => {
                if (res.data.err === 10001) {
                    message.success('视频修改成功！');
                    this.refreshView();
                } else {
                    message.error('视频修改失败！');
                }
            });
        } else if (modifyType === 2) {
            // 压缩视频
            console.log('压缩视频')
            compressionVideo(modifyVideoName, sizeType, outName)
            .then(res => {
                if (res.data.err === 10001) {
                    message.success('视频修改成功！');
                    this.refreshView();
                } else {
                    message.error('视频修改失败！');
                }
            });
        } else {
            // 修改帧率
            console.log('修改帧率')
            alterFPS(modifyVideoName, fps, outName)
            .then(res => {
                if (res.data.err === 10001) {
                    message.success('视频修改成功！');
                    this.refreshView();
                } else {
                    message.error('视频修改失败！');
                }
            });
        }
        this.setState({
            modifyVideoName: '',
            showModify: false,
            outName: undefined,
        });
        setTimeout(this.refreshView, 30000);
    }
    
    handleCancel = (e) => {
        console.log('handleCancel', e);
        this.setState({
          deleteVideoName: '',
          visible: false,
          editingVideo: '',
        });
    }

    handleModifyCancel = (e) => {
        console.log('handleModifyCancel', e);
        this.setState({
            modifyVideoName: '',
            showModify: false,
            editingVideo: '',
        });
    }

    handleFpsChange = (e) => {
        this.setState({
            fps: e.target.value,
        });
    }

    handleOutNameChange = (e) => {
        this.setState({
            outName: e.target.value,
        });
    }

    handleSearch = (value) => {
        searchVideo(value).then(res => {
            this.setState({
                videoList: res.data.msg,
            })
        })
    }

    refreshView = () => {
        getVideoList('sports').then(res => {
            this.setState({
                videoDetailsList: res.data,
                videoList: Object.keys(res.data),
                editingVideo: '',
            })
        })
    }

    onModifyTypeChange = (e) => {
        this.setState({
            modifyType: e.target.value,
        });
    }

    onHeightWidthChange = (e) => {
        this.setState({
            heightWidthType: e.target.value,
        });
    }

    onSizeChange = (e) => {
        this.setState({
            sizeType: e.target.value,
        });
    }

    renderTable(val) {

        const { videoDetailsList } = this.state;

        const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '大小（MB）',
            dataIndex: 'size',
            key: 'size',
        }, {
            title: '时长',
            dataIndex: 'duration',
            key: 'duration',
        }, {
            title: '长宽比',
            dataIndex: 'heightWidth',
            key: 'heightWidth',
        }];

        const data = [{
            name: val,
            size: videoDetailsList[val].size,
            duration: videoDetailsList[val].duration,
            heightWidth: videoDetailsList[val].heightWidth,
        }];

        return (<Table columns={columns} dataSource={data} pagination={false} />);
    }

    renderVideo(videoList) {
        const result = videoList.map((val, idx) =>
            <div className="video-item">
                <Spin spinning={this.state.editingVideo === val}>
                    <Player
                        fluid={false}
                        height={300}
                        playsInline
                        src={`//127.0.0.1:7001/public/video/sports/${val}`}
                    />
                    <div className="button-container">
                        <Button name={val} onClick={e => this.showModifyTable(e)} style={{'width': '100%'}}>修改该视频</Button>
                        <Button type="danger" name={val} onClick={e => this.showModal(e)} style={{'width': '100%'}}>删除该视频</Button>
                    </div>
                    <div>
                        {this.renderTable(val)}
                    </div>
                </Spin>
            </div>
        )
        return result;
    }

    render() {

        const { videoList } = this.state;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const heightWidthRadioGroup = 
        (<RadioGroup onChange={this.onHeightWidthChange} value={this.state.heightWidthType} style={{'margin-left': '10px'}}>
            <Radio value={'1920x1080'}>
                1920x1080
            </Radio>
            <Radio value={'1280x720'}>
                1280x720
            </Radio>
            <Radio value={'720x480'}>
                720x480
            </Radio>
        </RadioGroup>)

        const sizeRadioGroup = 
        (<RadioGroup onChange={this.onSizeChange} value={this.state.sizeType} style={{'margin-left': '10px'}}>
            <Radio value={75}>
                75%
            </Radio>
            <Radio value={50}>
                50%
            </Radio>
            <Radio value={25}>
                25%
            </Radio>
        </RadioGroup>)

        console.log('process.env.NODE_ENV', process.env.NODE_ENV)

        return (
            <div>
                <BreadcrumbCustom first="视频管理"/>
                <UploadVideo
                    refreshView={this.refreshView}                
                />
                <Search
                    placeholder="可在此搜索视频"
                    enterButton="搜索"
                    size="large"
                    style={{'margin-top': '30px'}}
                    onSearch={value => this.handleSearch(value)}
                />
                <div className="video-list-container">
                    {this.renderVideo(videoList)}
                </div>
                <Modal
                    title="请二次确认"  
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>你确认要删除该视频吗？</p>
                </Modal>
                <Modal
                    title="修改视频"  
                    visible={this.state.showModify}
                    onOk={this.handleModifyOk}
                    onCancel={this.handleModifyCancel}
                >
                <RadioGroup onChange={this.onModifyTypeChange} value={this.state.modifyType}>
                    <Radio style={radioStyle} value={1}>
                        修改长宽比
                        {this.state.modifyType === 1 ? heightWidthRadioGroup : null}
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                        压缩视频
                        {this.state.modifyType === 2 ? sizeRadioGroup : null}
                    </Radio>
                    <Radio style={radioStyle} value={3}>
                        修改帧率
                        {this.state.modifyType === 3 ? <Input onChange={this.handleFpsChange} value={this.state.fps} style={{ width: 100, marginLeft: 10 }} placeholder={'帧/秒'}/> : null}
                    </Radio>
                    修改后的输出视频名
                    <Input onChange={this.handleOutNameChange} value={this.state.outName} style={{ width: 100, marginLeft: 10, marginTop: 5 }}/>
                </RadioGroup>
                </Modal>
            </div>
        )
    }
}

export default VideoPlay;