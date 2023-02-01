import React, { useEffect, useRef } from "react";

const Layout = (props) => {
  // useRef(초기값)   변수   입니다. 즉, state 가 아닙니다.
  // useSate(초기값)  state 는 무엇인가요?
  // 아래 구문은 real DOM 을 참조함.
  // 하지만 아직, real DOM 이 안 만들어졌으므로
  // 참조가 어렵다.
  // useRef(document.querySelector("section"));
  // 순서 1 번
  const frame = useRef(null);

  useEffect(() => {
    // frame useRef를 활용해서 section 태그를 참조해서 CSS 작업
    frame.current.classList.remove("on");
    frame.current.classList.add("on");
    return () => {
      // 아래 구문은 에러가 발생합니다.
      // unmount 가 되면 참조 요소가 null 이된다.
      // frame.current.classList.remove("");
    };
  }, []);

  return (
    // 순서2. 상위에 만들어둔 useRef 변수 frame 을 ref 속성으로 참조
    <section className={`content ${props.title}`} ref={frame}>
      <figure></figure>
      <div className="inner">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </section>
  );
};

export default Layout;