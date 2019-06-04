import React from 'react';
import { Input, Table } from 'antd';

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
                created_at: '2019/5/21',
                name: 'admin',
                msg: '公告1',
            },
            {
                created_at: '2019/2/23',
                name: 'guest1',
                msg: '公告2',
            },
            {
                created_at: '2019/3/18',
                name: 'guest2',
                msg: '公告3',
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
            title: '发送时间',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '管理员账号名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '发送内容',
            dataIndex: 'msg',
            key: 'msg',
        }]

        let data = [];

        visitList.forEach((val, idx) => {
            data.push({
                id: idx,
                created_at: val.created_at.slice(0, 10),
                name: val.name,
                msg: val.msg,
            })
        })

        return (
            <Table 
                title={() => '历史公告记录表'}
                dataSource={data} 
                columns={columns} 
                bordered
                style={{'marginTop': '20px'}}
            />
        )
    }
}

export default VisitList;