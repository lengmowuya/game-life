import React, { Component } from 'react'
import classNames from 'classnames'
import city from './../../library/area/city.json'
import distance from './../../library/area/distance.json'
import rural from './../../library/area/rural.json'
import './index.css'

export default class Life extends Component {
    lifeStoryList = React.createRef();
    state = {
        role:{
            age:0,
            sex:'男',
            area:'农村',
            name:'张建安',
            areaLibrary:null
        },
        famaily:[
            {identity:"父亲",industry:"赤脚医生"},
            {identity:"母亲",industry:"农妇"}
        ],
        attributes:[
            {name:'精神',count:6,level:2},
            {name:'颜值',count:2,level:1},
            {name:'体质',count:1,level:1},
            {name:'魅力',count:1,level:1},
            {name:'家境',count:3,level:1},
            {name:'金钱',count:0,level:1}
        ],
        levelColors:['black','green','blue','purple','red'],
        lifeStorys:[
        ],
        entryLibrary:[
            // '你总是遭遇校园霸凌',
            '你换了好几颗牙',
            '你生了场重病，家里花了不少钱',
            // '到同学家借书看',
            '偷橘子差点被主人家发现',
            // '你追得家里的动物鸡飞狗跳',
            // '你偷了父母的零钱去买零食',
            // '今年股市大崩，股民损失惨重',
            '顺利的一年，没发生什么大事',
            // '你的身体越来越差了',
            '你对人生有些迷茫，还有些懵懂',
            '你得了感冒',
            '你发觉生活有些时候很无趣'
        ],
        entryList:[]
    }
    randomRole = ()=>{
        const {role} = this.state
        if(Math.random()<=0.5){
            role.sex="女"
            role.name="刘菲"
        }
        const randomArea = Math.random();
        if(randomArea <= 0.15){
            role.area = '偏远地区'
            role.areaLibrary = distance
        }else if(randomArea <= 0.65){
            role.area = '农村'
            role.areaLibrary = rural
        }else{
            role.area = '城市'
            role.areaLibrary = city
        }
        this.setState({role})
    }
    getRandomAreaEntry =()=>{
        const {role} = this.state
        const {age,areaLibrary} = role;
        let targetLibrary;
        if(age<18){
            targetLibrary = areaLibrary.baseEntrys.childhood;
        }else{
            targetLibrary = areaLibrary.baseEntrys.adult;
        }
        // 如果目标词库为空
        if(targetLibrary.length<=0) return '今年无事发生'
        const randomNumber = Math.floor(Math.random()*targetLibrary.length);
        return targetLibrary[randomNumber];
    }
    getRandomEntry = ()=>{
        const {entryLibrary} = this.state
        let entry;
        if(Math.random()<= 0.2){
            const randomNumber = Math.floor(Math.random()*entryLibrary.length);
            entry = entryLibrary[randomNumber];
        }else{
            entry = this.getRandomAreaEntry();
        }
        return entry;
    }
    nextStory = ()=>{
        const {lifeStorys,role} = this.state
        if(role.age === 0){
            this.randomRole();
            lifeStorys.push({text:`你顺利出生了，是个${role.sex}娃，你被取名【${role.name}】`,class:'green'});
        }else if(role.age === 1){
            lifeStorys.push({text:`${role.age}岁:`+`你从小生活在${role.area}`});
        }else{
            lifeStorys.push({text:`${role.age}岁:`+ this.getRandomEntry()});
        }
        role.age++
        this.setState({role})
        this.setState({lifeStorys})
    }
    componentDidUpdate(){
        // 滚动条至底部
        const {lifeStoryList} = this
        lifeStoryList.current.scrollTop = lifeStoryList.current.scrollHeight;
    }
    render() {
        const {attributes,levelColors,lifeStorys} = this.state
        return (
            <div id="LifePage" onClick={this.nextStory}>
                <div className="AttributeHeader">
                    {
                        attributes.map(attribute=>{
                            const levelColor = levelColors[attribute.level-1];
                            return (
                                <div className={classNames('attributeLi',levelColor)} key={attribute.name}>
                                    <p className="attributeLiName">{attribute.name}</p>
                                    <p className="attributeLiCount">{attribute.count}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="LifeStoryList" ref={this.lifeStoryList}>
                    {
                        lifeStorys.map((lifeStory,index)=>{
                            return (
                                <div className={classNames('lifeStoryLi',lifeStory.class)} key={index+lifeStory.text}>
                                    <span className="storyText">
                                        {lifeStory.text}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
