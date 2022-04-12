import React, { Component } from 'react'
import classnames from 'classnames'
import {NavLink} from 'react-router-dom'
import './index.css'

export default class Ready extends Component {
  state = {
    talents:[
      {name:"地主家的傻儿子",level:4},
      {name:"壮志凌云",level:2},
      {name:"武侠梦",level:3},
      {name:"理财达人",level:1},
      {name:"理科思维",level:4},
      {name:"现实主义者",level:3}
    ],
    levelColors:['gray','green','blue','gold']
  }
  render() {
    const {talents,levelColors} = this.state
    return (
      <div id="ReadyPage">
        <div className="Role">
          <h1>准备人物</h1>
          <input type="text" className='roleName' placeholder='人物名称'/>
          <p className="roleSex">
            <button className="male active">男</button>
            <button className="female">女</button>
          </p>
        </div>
        <div className="Talent">
          <p className="talentTitle">选择天赋</p>
          <div className="talentList">
            {
              talents.map((talent,index)=>{
                const levelColor = levelColors[talent.level-1];
                return  (
                  <div className={classnames('talentLi',levelColor)} 
                      key={talent.name + index}> 
                    <p className="talentName">{talent.name}</p>
                  </div>
                )
              })
            }
          </div>
          <button className="refresh">刷新天赋</button>
        </div>
        <button className="startLife">
          <NavLink to="/life">开始人生！</NavLink>
        </button>
      </div>
    )
  }
}
