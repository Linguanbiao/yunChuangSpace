import './banner';
import "./blog";
import "./setting"
import "./about"
import "./project"
import './message'
import Mock from 'mockjs';

//模拟网络延时，网络延时 1000ms - 2000ms , mock 配置设置

Mock.setup({
    timeout: '1000-2000'
})