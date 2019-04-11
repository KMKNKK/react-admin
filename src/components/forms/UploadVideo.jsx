
import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
  
class UploadVideo extends Component {

    render() {
        const Dragger = Upload.Dragger;
        let videoCategory = 'video/sports';
        let refreshView = this.props.refreshView;

        const props = {
            name: 'file',
            // action: `//47.94.86.217/uploadVideo?videoCategory=${videoCategory}`,
            action: `//localhost:7001/uploadVideo?videoCategory=${videoCategory}`,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    refreshView();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload video</p>
                <p className="ant-upload-hint">点击或将视频拖拽到此处来上传</p>
            </Dragger>
        )
    }
}

export default UploadVideo;