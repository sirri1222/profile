import React from 'react'
import { Link } from 'react-router-dom'
// a태그 href 를 이용하면 페이지갱신
// Link 컴포넌트를 이용하면 컴포넌트 갱신(spa)
// :a태그로 자동 변환이 된다 .
// to = ""라는 props가 필요하다 
const Header = () => {
  return (
  <header>

    {/* {레이아웃} */}
    <div className='inner'>
    <h1>
      <Link to="/">logo</Link>
    </h1>
    <ul>
      <li> <Link to="/department">department</Link> </li>
      <li> <Link to="/community">community</Link> </li>
      <li> <Link to="/gallery">gallery</Link> </li>
      <li> <Link to="/youtube">youtube</Link> </li>
      <li> <Link to="/location">location</Link> </li>
      <li> <Link to="/join">join</Link> </li>
   
      </ul></div>
  </header>
  )
}

export default Header