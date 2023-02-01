import { Route, Switch } from "react-router-dom";

// common
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
// main
import Visual from "./components/main/Visual";
import Content from "./components/main/Content";
//  sub
import Department from "./components/sub/Department";
import Community from "./components/sub/Community";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Location from "./components/sub/Location";
import Join from "./components/sub/Join";

function App() {
  return (
    <>
      {/* 화면에 중첩되는 컴포넌트가 있는 경우 Switch 를 활용한다. */}
      <Switch>
        <Route exact path="/">
          {/* 라우터 값에 따라서 header props로 type="main" */}
          <Header type={"main"} />
          <Visual />
          <Content />
        </Route>

        {/* 라우터에 따라서 header 의 css를 달리하겠다.  */}
        {/* 중첩되는 Header 에 대한 처리가 필요하다  */}
        {/* 컴포넌트를 출력하는 3번째 방법 */}
        {/* <Header type={"sub"} /> */}
        <Route path="/" render={() => <Header type={"sub"} />} />
      </Switch>

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
