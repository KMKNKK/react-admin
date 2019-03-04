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

import { getAdminMock } from '../../axios';

import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../../node_modules/video-react/dist/video-react.css'; // import css'
import vedio from './vedio.mp4'
import post from './post.png'

class VedioPlay extends Component {

    componentWillMount () {
        getAdminMock('findVedio').then(res => {
            console.log(res)
        });
    }

    render() {
        return (
            <div>
                <BreadcrumbCustom first="cssModule" />
                <Player
                    playsInline
                    poster={post}
                    src={vedio}
                />
            </div>
        )
    }
}

export default VedioPlay;