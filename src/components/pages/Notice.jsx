import React from 'react';
import { Input, Table, Button } from 'antd';
import { getFeedbackList, postFeedback } from '../../axios'

const { TextArea } = Input;

class VisitList extends React.Component {

    componentWillMount() {
        getFeedbackList().then(res => {
            this.setState({
                announcementList: res.data.msg.announcement,
            })
        })
    }

    handleSubmit() {
        const value = document.getElementById('textArea').value;
        postFeedback(value).then(res => {
            getFeedbackList().then(res => {
                this.setState({
                    announcementList: res.data.msg.announcement,
                })
            })
        })
    }

    state = {
        announcementList: [],
    }

    render() {

        const { announcementList } = this.state;

        const columns = [{
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '发送时间',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '发送内容',
            dataIndex: 'msg',
            key: 'msg',
        }]

        let data = [];

        announcementList.forEach((val, idx) => {
            data.push({
                id: idx + 1,
                created_at: val.created_at.slice(0, 10),
                msg: val.words,
            })
        })

        return (
            <div>
                <Table 
                    title={() => '历史公告记录表'}
                    dataSource={data} 
                    columns={columns} 
                    bordered
                    style={{'marginTop': '20px'}}
                />
                <TextArea
                    id="textArea"
                    rows={4}
                    placeholder="输入新公告"
                />
                <Button onClick={e => this.handleSubmit(e)}>发布公告</Button>
            </div>
        )
    }
}

export default VisitList;