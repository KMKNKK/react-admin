/**
 * Created by hao.cheng on 2017/5/5.
 */
import React, { Component } from 'react';
import { getVideoOccupancy } from '../../axios'
const echarts = require('echarts');

class EchartsProjects extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 绘制图表
        myChart.setOption({
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
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
        });

        setInterval(function () {
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
                myChart.setOption(option, true);
            })

        },1000);
    }
    render() {
        return (
            <div id="main" style={{ width: 377, height: 352 }}></div>
        );
    }
}

export default EchartsProjects;