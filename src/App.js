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
import Location from "./components/sub/Join";
import Youtube from "./components/sub/Youtube";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      {/* 
        Route : 화면별 Link에 의해 출력될 단위 
        path : 연결할 주소
        exact : 정확하게 path 가 같을 때만 보여준다.
      */}
      <Route exact path="/">
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