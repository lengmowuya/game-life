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
            areaLibrary:null,
            dead:false
        },
        famaily:[
            {identity:"父亲",industry:"赤脚医生"},
            {identity:"母亲",industry:"农妇"}
        ],
        attributes:{
            '精神':{count:6,level:2},
            '颜值':{count:2,level:1},
            '体质':{count:1,level:1},
            '魅力':{count:1,level:1},
            '快乐':{count:1,level:1},
            '家境':{count:3,level:1},
            '金钱':{count:0,level:1}
        },
        levelColors:['danger','black','green','blue','purple','red'],
        lifeStorys:[
        ],
        entryLibrary:[
            '你换了好几颗牙',
            '你生了场重病，家里花了不少钱',
            '偷橘子差点被主人家发现',
            '顺利的一年，没发生什么大事',
            '你对人生有些迷茫，还有些懵懂',
            '你得了感冒',
            '你发觉生活有些时候很无趣'
        ],
        entryList:[]
    }
    updateAttributes = ()=>{
        const {attributes} = this.state
        Object.keys(attributes).map(attr=>{
            const attribute = attributes[attr]
            if(attribute.count <= -1){
                attribute.level = 0;
            }else if(attribute.count <= 4){
                attribute.level = 1;
            }else if(attribute.count <= 9){
                attribute.level = 2;
            }else if(attribute.count <= 19){
                attribute.level = 3;
            }
        })
    }
    roleSurvive = ()=>{
        const {lifeStorys,role,attributes} = this.state
        if(attributes['体质'].count <= -3){
            lifeStorys.push({text:`因为身体过于虚弱,【${role.name}】死了`,class:'red'});
            role.dead = true;
            this.setState({lifeStorys})
            this.setState({role})
        }
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
        const {role,attributes} = this.state
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
        const award = targetLibrary[randomNumber].award;
        if(award){
            console.log(award)
            // attributes[award]
            for(let attr in award){
                attributes[attr].count += award[attr];
            }
        }
        this.setState({attributes})
        return targetLibrary[randomNumber].text;
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
        // 角色不能死亡
        if(role.dead) return;
        if(role.age === 0){
            this.randomRole();
            lifeStorys.push({text:`你顺利出生了，是个${role.sex}娃，你被取名【${role.name}】`,class:'green'});
        }else if(role.age === 1){
            lifeStorys.push({text:`${role.age}岁:`+`你从小生活在${role.area}`});
        }else{
            lifeStorys.push({text:`${role.age}岁:`+ this.getRandomEntry()});
        }
        role.age++
        this.updateAttributes();
        this.roleSurvive();
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
                        Object.keys(attributes).map(attr=>{
                            const attribute = attributes[attr]
                            const levelColor = levelColors[attribute.level];
                            return (
                                <div className={classNames('attributeLi',levelColor)} key={attr}>
                                    <p className="attributeLiName">{attr}</p>
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
