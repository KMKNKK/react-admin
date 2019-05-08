/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';

export const getBbcNews = () => get({ url: config.NEWS_BBC });

export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

export const gitOauthLogin = () => get({ url: `${config.GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin` });
export const gitOauthToken = code => post({ 
    url: `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
    data: {
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
        redirect_uri: 'http://localhost:3006/',
        state: 'reactAdmin',
        code,
    } 
});
// {headers: {Accept: 'application/json'}}
export const gitOauthInfo = access_token => get({ url: `${config.GIT_USER}access_token=${access_token}` });

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });
// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });

const newAxios = axios.create({
    // baseURL: '//47.94.86.217',
    baseURL: 'http://localhost:7001',
    timeout: 60 * 1000,
    // headers: {
    //     'Content-Type':'application/x-www-form-urlencoded',
    // },
    // withCredentials:true,
});

export const getVideoList = (dirPath) => newAxios.get('/getVideoList?dirPath=' + dirPath)

export const getVideoOccupancy = () => newAxios.get('/getVideoList/videoOccupancy')

export const getPV = () => newAxios.get('/getVideoList/getPV')

export const deleteVideo = (fileName) => newAxios.post('/deleteVideo?fileType=video/sports&fileName=' + fileName)

export const alterProportion = (fileName, heightWidth, outName) => newAxios.post('/modifyVideo/alterProportion?fileType=video/sports&fileName=' + fileName + '&heightWidth=' + heightWidth + '&outName=' + outName)

export const alterFPS = (fileName, fps, outName) => newAxios.post('/modifyVideo/alterFPS?fileType=video/sports&fileName=' + fileName + '&fps=' + fps + '&outName=' + outName)

export const compressionVideo = (fileName, size, outName) => newAxios.post('/modifyVideo/compressionVideo?fileType=video/sports&fileName=' + fileName + '&size=' + size + '&outName=' + outName)

// 验证账号
export const confirmAccount = (account, password) => newAxios.post('user/confirmAccount?account=' + account + '&password=' + password)

// 注册账号
export const addAccount = (account, password, auth) => newAxios.post('user/addItem?account=' + account + '&password=' + password + '&auth=' + auth)

// 搜索视频
export const searchVideo = (name) => newAxios.get('getVideoList/searchVideo?name=' + name)

// 获取用户列表
export const getUserList = () => newAxios.get('user/getUserList')

// 修改用户权限
export const changeUserAuth = (name, doWhat) => newAxios.post('user/changeUserAuth?name=' + name + '&doWhat=' + doWhat) 