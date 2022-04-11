import React, { Component } from 'react'
import {NavLink,Route,Routes,Redirect} from 'react-router-dom'
// import Header from './components/Header/index'
// import List from './components/List/index'
import Home from './pages/Home/index'
import Life from './pages/Life/index'
import './App.css'
export default class App extends Component {
  render() {
    return (
      <div id="AppCenter">
      <Routes id=''>
        {/* <Header></Header> */}
        {/* <List></List> */}
        {/* <Redirect to='/home' /> */}
        <Route path='/' element={<Home />} exact />
        <Route path='/home' element={<Home />} />
        <Route path='/life' element={<Life />}/>
      </Routes>
      </div>
    )
  }
}
