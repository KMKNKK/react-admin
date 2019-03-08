
import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
  
class UploadVideo extends Component {

    render() {
        const Dragger = Upload.Dragger;
        let videoCategory = 'video/sports';

        const props = {
            name: 'file',
            action: `//localhost:7001/uploadVideo?videoCategory=${videoCategory}`,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
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