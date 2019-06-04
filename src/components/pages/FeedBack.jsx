import React from 'react';
import { Input, Table } from 'antd';
import { getFeedbackList } from '../../axios'

const Search = Input.Search;

class VisitList extends React.Component {

    componentWillMount() {
        getFeedbackList().then(res => {
            this.setState({
                feedbackList: res.data.msg.feedback,
            })
        })
    }

    state = {
        feedbackList: [

        ],
    }

    render() {

        const { feedbackList } = this.state;

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '反馈时间',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '反馈内容',
            dataIndex: 'msg',
            key: 'msg',
        }]

        let data = [];

        feedbackList.forEach((val, idx) => {
            data.push({
                id: idx + 1,
                created_at: val.created_at.slice(0, 10),
                msg: val.words,
            })
        })

        return (
            <Table 
                title={() => '历史反馈记录表'}
                dataSource={data} 
                columns={columns} 
                bordered
                style={{'marginTop': '20px'}}
            />
        )
    }
}

export default VisitList;