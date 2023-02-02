import React, { useEffect, useRef } from "react";
import Layout from "../common/Layout";
// 카카오 지도 API 를 React 적용
/*
  1. 개발자 등록 : https://developers.kakao.com/
  2. 카카오 지도 API 가이드 : https://apis.map.kakao.com/web/guide/
  3. 애플리케이션 추가
  3.1. 내애플리케이션 > 추가 > JavaScript 키 복사( 본인 키 )
  3.2. 내 애플리케이션> 앱 설정 > 플랫폼 > Web 플랫폼 등록
      http://localhost:3000
      https://localhost:3000
  4. 지도 코드 작성
    : https://apis.map.kakao.com/web/guide/#step1
  5. 위도 경도 파악 
    : https://www.google.co.kr/maps/?hl=ko
  6. 아이콘 구하기
   : https://www.flaticon.com/kr/
  7. 마커 이미지 교체하기
  : https://apis.map.kakao.com/web/sample/basicMarkerImage/
  8. 위치 값 데이터
  [
    {
      title:"1호점",
      position : new kakao.maps.LatLng(35.868376, 128.594065),
      img : `${path}/images/a.png`,
      imgSize: new kakao.maps.Size(64, 69),
      imgOffset: {offset: new kakao.maps.Point(27, 69) }
    }
  ]
*/
const Location = () => {
  // public 폴더 참조
  const path = process.env.PUBLIC_URL;

  // React 에서 kakao 인스턴스 활용하기
  // window 객체를 구조 분해 할당해서 원하는 것을 뽑아 사용.
  const { kakao } = window;

  // 지도를 담을 영역의 DOM 레퍼런스
  // var container = document.getElementById("map");
  const container = useRef(null);

  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.868376, 128.594065), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  useEffect(() => {
    //지도 생성 및 객체 리턴
    // var map = new kakao.maps.Map(container, options);
    const map = new kakao.maps.Map(container.current, options);
    // 마커가 표시될 위치입니다
    const markerPosition = new kakao.maps.LatLng(35.868376, 128.594065);

    const imageSrc = `${path}/images/starbucks.png`, // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, []);

  return (
    <Layout title={"Location"}>
      <div id="map" ref={container}></div>
    </Layout>
  );
};

export default Location;