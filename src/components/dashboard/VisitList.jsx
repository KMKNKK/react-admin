import React from 'react';
import { Input, Table } from 'antd';
import { postRecord, getRecordList } from '../../axios'
import './VisitList.css'

const Search = Input.Search;

class VisitList extends React.Component {

    componentWillMount() {
        getRecordList().then(res => {
            this.setState({
                visitList: res.data.msg.list,
            })
        })
    }

    state = {
        visitList: [],
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
            title: '系统信息',
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
                visited_at: val.created_at.slice(0, 10),
                device: val.broswer,
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