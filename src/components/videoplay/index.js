// /* eslint-disable */
import React, { Component } from 'react';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';

import { Layout, Sider, Content } from 'antd';

import '../../../node_modules/video-react/dist/video-react.css'; // import css'
import './index.css'; // import css'

import UploadVideo from '../forms/UploadVideo'

import { getVideoList } from '../../axios'

class VideoPlay extends Component {

    constructor() {
        super()
        this.state = {
            videoList: [],
        }
    }

    componentWillMount() {
        getVideoList('sports').then(res => {
            this.setState({
                videoList: res.data,
            })
        })
    }

    renderVideo(videoList) {
        const result = videoList.map((val, idx) =>
            <Player
                fluid={false}
                height={300}
                playsInline
                src={`http://localhost:7001/public/video/sports/${val}`}
            />
        )
        return result;
    }

    render() {

        const { videoList } = this.state;

        console.log('videoList', videoList)

        return (
            <div>
                <UploadVideo />
                <div className="video-list-container">
                    {this.renderVideo(videoList)}
                </div>
            </div>
        )
    }
}

export default VideoPlay;