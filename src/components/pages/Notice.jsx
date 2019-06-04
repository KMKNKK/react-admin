import React from 'react';
import { Input, Table, Button } from 'antd';

const { TextArea } = Input;

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
                phone: '123',
                msg: '112233',
            },
            {
                created_at: '2019/2/23',
                phone: '456',
                msg: '好',
            },
            {
                created_at: '2019/3/18',
                phone: '789',
                msg: '还不错',
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
            title: '反馈时间',
            dataIndex: 'created_at',
            key: 'created_at',
        }, {
            title: '联系号码',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '反馈内容',
            dataIndex: 'msg',
            key: 'msg',
        }]

        let data = [];

        visitList.forEach((val, idx) => {
            data.push({
                id: idx,
                created_at: val.created_at.slice(0, 10),
                phone: val.phone,
                msg: val.msg,
            })
        })

        return (
            <div>
                <Table 
                    title={() => '历史反馈记录表'}
                    dataSource={data} 
                    columns={columns} 
                    bordered
                    style={{'marginTop': '20px'}}
                />
                <TextArea 
                    rows={4}
                    placeholder="输入新公告"
                />
                <Button onClick={e => this.handleSubmit(e)}>发布公告</Button>
            </div>
        )
    }
}

export default VisitList;