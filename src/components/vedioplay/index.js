/**
 *
 * 添加注释
 * Created by SEELE on 2018/1/12
 *
 */
import React, { Component } from 'react';
import { Player, ControlBar, ReplayControl,
    ForwardControl, CurrentTimeDisplay,
    TimeDivider, PlaybackRateMenuButton, VolumeMenuButton } from 'video-react';

import { Layout, Sider, Content } from 'antd';

import '../../../node_modules/video-react/dist/video-react.css'; // import css'

import UploadVideo from '../forms/UploadVideo'

class VedioPlay extends Component {

    render() {
        return (
            <div>
                <Player
                    playsInline
                    // poster={post}
                    src={'http://localhost:7001/public/ball.mp4'}
                />
                <UploadVideo />
            </div>
        )
    }
}

export default VedioPlay;