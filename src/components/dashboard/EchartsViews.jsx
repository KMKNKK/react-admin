import React, { Component } from 'react';
import { getPV } from '../../axios'
const echarts = require('echarts');

class EchartsViews extends Component {

    draw(myChart) {
        let option = {
            title: {
                text: '近七天视频访问次数'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            // legend: {
            //     data:['访问人数']
            // },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['一','二','三','四','五','六','今天']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'访问人数',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[120, 132, 101, 134, 90, 230, 210]
                }
            ]
        }
        getPV().then(res => {
            option.series[0].data = res.data.msg;
            myChart.setOption(option, true);
        })
    }

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('PV'));

        // 绘制图表
        this.draw(myChart);

        // 更新数据
        setInterval(() => {
            this.draw(myChart);
        }, 10000);
    }
    render() {
        return (
            <div id="PV" style={{ width: 377, height: 352 }}></div>
        );
    }
}

export default EchartsViews;