import React, { Component } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/index'
import Ready from './pages/Ready/index'
import Life from './pages/Life/index'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div id="AppCenter">
      <Routes id=''>
        <Route path='/' element={<Home />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/ready' element={<Ready />}/>
        <Route path='/life' element={<Life />}/>
      </Routes>
      </div>
    )
  }
}
