// /* eslint-disable */
import React, { Component } from 'react';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';

import { Layout, Sider, Content, Button, Modal } from 'antd';

import '../../../node_modules/video-react/dist/video-react.css'; // import css'
import './index.css'; // import css'

import UploadVideo from '../forms/UploadVideo'

import { getVideoList, deleteVideo } from '../../axios'

class VideoPlay extends Component {

    constructor() {
        super()
        this.state = {
            visible: false,
            videoList: [],
            deleteVideoName: '',
        }
    }

    

    componentWillMount() {
        getVideoList('sports').then(res => {
            this.setState({
                videoList: res.data,
            })
        })
    }

    deleteVideo() {
        const videoName = this.state.deleteVideoName;
        console.log('videoName', videoName)
        deleteVideo(videoName).then(res => console.log('删除返回的res', res))
        getVideoList('sports').then(res => {
            this.setState({
                videoList: res.data,
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
    
    handleOk = (e) => {
        console.log(e);
        this.deleteVideo();
        this.setState({
            deleteVideoName: '',
            visible: false,
        });
    }
    
    handleCancel = (e) => {
        console.log(e);
        this.setState({
          deleteVideoName: '',
          visible: false,
        });
    }

    refreshView = () => {
        getVideoList('sports').then(res => {
            this.setState({
                videoList: res.data,
            })
        })
    }


    renderVideo(videoList) {
        const result = videoList.map((val, idx) =>
            <div>
                <Player
                    fluid={false}
                    height={300}
                    playsInline
                    src={`//47.94.86.217/sports/${val}`}
                    // process.env.NODE_ENV === 'production'
                    // src={`http://localhost:7001/public/video/sports/${val}`}
                />
                <Button type="danger" name={val} onClick={e => this.showModal(e)} style={{'width': '100%'}}>删除该视频</Button>
            </div>
        )
        return result;
    }

    render() {

        const { videoList } = this.state;

        console.log('process.env.NODE_ENV', process.env.NODE_ENV)

        return (
            <div>
                <UploadVideo
                    refreshView={this.refreshView}                
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
            </div>
        )
    }
}

export default VideoPlay;