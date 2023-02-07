import React, { useEffect, useRef, useState } from "react";
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

  // 클릭된 경우 전달할 좌표의 값 모음
  // 서버에서 좌표값을 가지고 와서 처리
  const infoArr = [
    {
      title: "대구 그린 컴퓨터",
      latLng: new kakao.maps.LatLng(35.868376, 128.594065), //지도의 중심좌표.
      imgSrc: `${path}/images/starbucks.png`,
      imgSize: new kakao.maps.Size(64, 69),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "한강",
      latLng: new kakao.maps.LatLng(37.511507, 126.997067),
      imgSrc: `${path}/images/starbucks.png`,
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "남산",
      latLng: new kakao.maps.LatLng(37.551776, 126.988169),
      imgSrc: `${path}/images/starbucks.png`,
      imgSize: new kakao.maps.Size(50, 50),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ];
  const [info, setInfo] = useState(infoArr);
  const [pos, setPos] = useState(null);
  // 좌표의 배열 요소의 인덱스 번호 : 최초 0번으로 보여주기
  const [idx, setIdx] = useState(0);

  // 지도를 담을 영역의 DOM 레퍼런스
  // var container = document.getElementById("map");
  const container = useRef(null);
  // var btns = document.querySelector(".btnSet > ul")
  const btns = useRef(null);

  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: info[idx].latLng,
    level: 3, //지도의 레벨(확대, 축소 정도)
  };

  useEffect(() => {
    // 중첩되는 지도 html 태그를 지워준다.
    container.current.innerHTML = "";

    //지도 생성 및 객체 리턴
    // var map = new kakao.maps.Map(container, options);
    const map = new kakao.maps.Map(container.current, options);

    // 마커가 표시될 위치입니다
    const markerPosition = info[idx].latLng;
    // 마커이미지의 주소입니다
    const imageSrc = info[idx].imgSrc;
    // 마커이미지의 크기입니다
    const imageSize = info[idx].imgSize;
    // 마커이미지의 옵션입니다.
    // 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const imageOption = info[idx].imgPos;

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
    setPos(map);

    // 버튼에 on 클래스 포커스 유지
    // btns 는 ref 객체 입니다.
    // btns 의 current 는 ul 을 가르킵니다.
    // btns.current.children 은 하위 요소 즉 li 를 가르킵니다.
    // 이렇게 하면 총 3개의 목록이 접근됩니다.
    for (const btn of btns.current.children) {
      // btn 에는 li 가 하나씩 접근이 된다.
      // classList : 요소에 css 적용하는 법
      // btn.classList.add("on");
      // classList : 요소에 css 제거하는 법
      btn.classList.remove("on");
    }
    // btns의 current.children 중 idx 에 해당하는
    // 요소만 on 클래스 적용해 보셔요.
    btns.current.children[idx].classList.add("on");

    // window resize 체크 하기
    const mapCenter = () => {
      // 좌표를 전달해서 화면 중앙 배치
      map.setCenter(info[idx].latLng);
    };
    window.addEventListener("resize", mapCenter);

    //스카이뷰 전환버튼 추가
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

    // 확대 축소버튼 추가
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 컴포넌트 언마운트시 이벤트 제거
    // 이유는 메모리 누수 방지
    // 클린업 함수 : 언마운트시 처리할 함수
    return () => {
      window.removeEventListener("resize", mapCenter);
    };
  }, [idx]);

  return (
    <Layout title={"Location"}>
      <div id="map" ref={container}></div>
      <div className="btnSet">
        <ul ref={btns}>
          {
            // jsx 에 js 코드하려면 { 사이에 코딩한다.}
            // 목록이 여러개의 데이터가 모인 배열이다.
            // jsx 에서 그렇다면 무조건, map 을 사용하자.
            // 또는 jsx 에서 여러번 동일하게 코드 반복해야 한다면
            // map 을 쓰자.
            // item :  각각의 값
            // index : 순서번호
            // info.map()
            // info.map( ()=> {} )
            // info.map( (item, index)=> {} )
            info.map((item, index) => {
              return (
                <li key={index} onClick={() => setIdx(index)}>
                  {infoArr[index].title}
                </li>
              );
            })
          }
        </ul>
      </div>
    </Layout>
  );
};

export default Location;