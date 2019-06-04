import React from 'react';
import { Input, Table } from 'antd';
import './VisitList.css'

const Search = Input.Search;

class VisitList extends React.Component {

    componentWillMount() {
        // getUserList().then(res => {
        //     this.setState({
        //         visitList: res.data.msg,
        //     })
        // })
    }

    state = {
        visitList: [
            {
                visited_at: '2019/5/21',
                device: 'iphone 8P',
                ip: '192.0.0.1',
            },
            {
                visited_at: '2019/2/23',
                device: 'Android',
                ip: '210.80.81.1',
            },
            {
                visited_at: '2019/3/18',
                device: 'windows',
                ip: '202.36.47.1',
            },
        ],
    }

    render() {

        const { visitList } = this.state;

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '访问时间',
            dataIndex: 'visited_at',
            key: 'visited_at',
        }, {
            title: '设备信息',
            dataIndex: 'device',
            key: 'device',
        }, {
            title: 'ip地址',
            dataIndex: 'ip',
            key: 'ip',
        }]

        let data = [];

        visitList.forEach((val, idx) => {
            data.push({
                id: idx,
                visited_at: val.visited_at.slice(0, 10),
                device: val.device,
                ip: val.ip,
            })
        })

        return (
            <Table 
                title={() => '历史用户访问记录表'}
                dataSource={data} 
                columns={columns} 
                bordered
                style={{'marginTop': '20px'}}
            />
        )
    }
}

export default VisitList;