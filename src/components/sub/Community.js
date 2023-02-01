import React, { useEffect } from 'react'
import Layout from '../common/Layout'

const Community = () => {
  // javascript 코드자리
  // 컴포넌트가 마운트, 업데이트, 언마운트 시
  // 하고 싶은일을 작성하는 Hook : useEffect
  // 기본적 형태
  // useEffect(() => {
    // 하고 싶은일
    // 클린업 함수 : 컴포넌트 제거시 실행 
  //   return () => {

  //   }
  // }, [의존성배열: dependency Array ]) ;

  useEffect(() => {
    console.log("mount: 컴포넌트 생성")
    //  axios , html 요소 작업  
    return () => {
      console.log("unmount: 컴포넌트 제거")
    }
  }, [])

  // jsx 코드자리 : 주의 사항 return () o
  // jsx 코드자리 : 주의 사항 return {} x
  return (<Layout title={"Community"}>Community</Layout>);  
}

export default Community