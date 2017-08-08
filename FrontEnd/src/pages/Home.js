import React, {Component} from 'react'
import {observer, inject} from 'mobx-react';
import {Grid, Icon, TabBar, List, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import '../styles/pages/Home.less';
import GeneralRepair from '../asset/general_repair.svg';
import Net from '../asset/net.svg';
import Feedback from '../asset/feedback.svg';
import homeIcon from '../asset/home.svg';
import homeIconAct from '../asset/home_active.svg';
import meIcon from '../asset/me.svg';
import meIconAct from '../asset/me_active.svg';

const Item = List.Item;

const data = [{
    icon: GeneralRepair,
    title: '通用报修',
    sub: '集合多种报修项目',
    color1: '#4de685',
    color2: '#0cd257',
    to: '/general/index'
}, {
    icon: Net,
    title: '宽带报修',
    sub: '宽带报修入口',
    color1: '#0cd6ec',
    color2: '#13b1f8'
}, {
    icon: Feedback,
    title: '建议反馈',
    sub: '功能不好?来吐槽!',
    color1: '#fd8741',
    color2: '#fa4f1d'

}, {
    icon: Feedback,
    title: '???',
    sub: '更多功能敬请期待',
    color1: '#e8e8e8',
    color2: '#c5c5c5'
}];


@inject("store")
@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.store = props.store;
        this.history = props.history;
        // console.log(this.store)
        this.state = {
            selectedTab: 'homeTab'
        };
    }

    render() {
        // const {token} = this.store;
        const {history} = this;
        return (
            <div id="home">
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white">
                    <TabBar.Item
                        title="首页"
                        key="首页"
                        icon={<Icon className="icon-img" type={homeIcon} alt="icon"/>}
                        selectedIcon={<Icon className="icon-img" type={homeIconAct} alt="icon"/>}
                        selected={this.state.selectedTab === 'homeTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'homeTab',
                            });
                        }}
                        data-seed="logId">
                        <Grid data={data}
                              columnNum={2}
                              onClick={_el => history.push(_el.to)}
                              renderItem={dataItem => (
                                  <div className="grid-item">
                                      <div className="icon" style={{
                                          background: `linear-gradient(${dataItem.color1},${dataItem.color2})`
                                      }}>
                                          <Icon className="icon-img" type={dataItem.icon} alt="icon"/>
                                      </div>
                                      <div className="icon-title">
                                          <span className="title">{dataItem.title}</span>
                                          <span className="sub-title">{dataItem.sub}</span>
                                      </div>
                                  </div>
                              )}
                        />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<Icon className="icon-img" type={meIcon} alt="icon"/>}
                        selectedIcon={<Icon className="icon-img" type={meIconAct} alt="icon"/>}
                        title="我的"
                        key="我的"
                        selected={this.state.selectedTab === 'meTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'meTab',
                            });
                        }}>
                        <List renderHeader={() => '我的'} className="my-list">
                            <Item arrow="horizontal" onClick={() => {
                            }}>个人资料</Item>
                            <Item arrow="horizontal" onClick={() => {
                            }}>我的报修</Item>
                        </List>
                        <WhiteSpace size="lg"/>
                        <WingBlank size="sm">
                            <Button style={{backgroundColor: 'red', border: 'red'}} className="btn"
                                    type="primary">退出登录</Button>
                        </WingBlank>

                    </TabBar.Item>
                </TabBar>


            </div>
        );
    }
}

