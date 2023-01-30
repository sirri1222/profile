import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// FontAwsome 적용
// https://fontawesome.com/v5/docs/web/use-with/react
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// a태그 href 를 이용하면 페이지갱신
// Link 컴포넌트를 이용하면 컴포넌트 갱신(spa)
// :a태그로 자동 변환이 된다 .
// to = ""라는 props가 필요하다 

// navlink : 객체를 이용해서 포커스 스타일 적용
// activeStyle="CSS 객체" 이라는 props에 적용
// :to ="" props 는 필수 
const Header = () => {
  const active = {color:"hotpink"}
  return (
  <header>

    <div className='inner'>
    <h1>
      <Link to="/">logo</Link>
    </h1>
    <ul id='gnb'>
      <li> <NavLink activeStyle={active} to="/department">department</NavLink> </li>
      <li> <NavLink activeStyle={active} to="/community">community</NavLink> </li>
      <li> <NavLink activeStyle={active} to="/gallery">gallery</NavLink> </li>
      <li> <NavLink activeStyle={active} to="/youtube">youtube</NavLink> </li>
      <li> <NavLink activeStyle={active} to="/location">location</NavLink> </li>
      <li> <NavLink activeStyle={active} to="/join">join</NavLink> </li>
   
      </ul>
      <FontAwesomeIcon icon={faBars} className="fabars"></FontAwesomeIcon></div>
  </header>
  )
}

export default Header