import React, { Component } from 'react'
import classNames from 'classnames'
import './index.css'

export default class Life extends Component {
    lifeStoryList = React.createRef();
    state = {
        role:{
            age:3
        },
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
            {text:'你顺利出生了，是个女娃，你被取名【张梦菲】',class:'green'},
            {text:'1岁：你从小生活在城市'},
            {text:'2岁：你的父母对你爱护有加'}
        ],
        entryLibrary:[
            '你总是遭遇校园霸凌',
            '你换了好几颗牙',
            '到同学家借书看',
            '上山偷橘子差点被主人发现'
        ]
    }
    getRandomEntry = ()=>{
        const {entryLibrary} = this.state
        const randomNumber = Math.floor(Math.random()*entryLibrary.length);
        return entryLibrary[randomNumber];
    }
    nextStory = ()=>{
        const {lifeStorys,role} = this.state
        lifeStorys.push({text:`${role.age}岁:`+ this.getRandomEntry()});
        role.age++
        // console.log(lifeStoryList.current.scrollHeight);
        // console.log(lifeStoryList.current.scrollTop);
        // setTimeout(()=>{
        //     lifeStoryList.current.scrollTop = lifeStoryList.current.scrollHeight;
        // },500)
        this.setState({role})
        this.setState({lifeStorys})
    }
    componentDidUpdate(){
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
