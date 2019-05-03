import React, { Component } from 'react';
import { getVideoOccupancy } from '../../axios'
import { message } from 'antd';
const echarts = require('echarts');

class EchartsProjects extends Component {

    drawE(myChart) {
        let option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            title: {
                left: 'center',
                text: '服务器已使用容量比例',
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '已使用容量',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 50}]
                }
            ]
        }
        getVideoOccupancy().then(res => {
            option.series[0].data[0].value = res.data.msg;
            if (res.data.msg > 100) {
                message.warning('服务器容量超负荷！');
            }
            myChart.setOption(option, true);
        })
    }

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 绘制图表
        this.drawE(myChart);

        // 更新数据
        setInterval(() => {
            this.drawE(myChart);
        }, 10000);
    }
    render() {
        return (
            <div id="main" style={{ width: 377, height: 352 }}></div>
        );
    }
}

export default EchartsProjects;