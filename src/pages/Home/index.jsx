import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import './index.css'
export default class Home extends Component {
  render() {
    return (
      <div id="HomePage">
          {/* home */}
          <button className='startGame'>
            <NavLink to="/ready">开始人生！</NavLink>
          </button>
      </div>
    )
  }
}
