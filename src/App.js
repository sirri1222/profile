import { Route, Switch } from "react-router-dom";

// common
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
// main
import Visual from "./components/main/Visual";
import Content from "./components/main/Content";
// sub
import Department from "./components/sub/Department";
import Community from "./components/sub/Community";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Location from "./components/sub/Location";
import Join from "./components/sub/Join";

function App() {
  return (
    <>
      {/* 
        Route : 화면별 Link에 의해 출력될 단위 
        path : 연결할 주소
        exact : 정확하게 path 가 같을 때만 보여준다.
      */}
      {/* 화면에 중첩되는 컴포넌트가 있는경우 switch 를 활용한다  */}
      <Switch exact path="/">
        <Route exact path="/">
          <Header type={"main"} />
          <Visual />
          <Content />
        </Route>

        {/* 
        Route : 화면별 Link에 의해 출력될 단위
        path : 연결할 주소 
      */}

        {/* Route 1번 방식 */}
        {/* <Route path="/department">
        <Department />
      </Route> */}
      {/* 컴포넌트를 출력하는 3번째 방법 */}
        <Route path="/" render={()=><Header type={"sub"}/>} />
      </Switch>
      {/* Route 2번 방식 : 인라인 방식의 Route 적용 */}
      <Route path="/department" component={Department} />
      <Route path="/community" component={Community} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/youtube" component={Youtube} />
      <Route path="/location" component={Location} />
      <Route path="/join" component={Join} />

      <Footer />
    </>
  );
}

export default App;
