import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
const Join = () => {
  // 회원 가입을 위한 정보를 한개의 객체로 관리
  // 정보 관리 초기객체
  let initVal = {
    userid: "",
    email: "",
    password: "",
    password2: "",
    gender: "",
    interests: "",
    edu: "",
  };
  const [val, setVal] = useState(initVal);

  // form 에 입력된 name 과 value 를 이용해서 state 를 업데이트 하겠다.
  // 매번 onChange 가 별도 작성이 아닌 한 곳에서 관리하겠다.
  // state 업데이트를 한곳에서 관리하겠다.
  const handleChange = (e) => {
    // console.log(e.target); // tag = {name:"userid", value:"123"}
    // console.log(e.target.name); // tag name="userid"
    // console.log(e.target.value);// tag value
    const { name, value } = e.target;
    setVal({ ...val, [name]: value });
  };

  // 성별 라디오 이벤트 핸들러
  const handleRadio = (e) => {
    // id 를 받아서 처리할까? 고민중
    const { name, id } = e.target;
    // const isCheck = e.target.checked;
    setVal({ ...val, [name]: id });
  };

  // 관심사 체크박스 이벤트 핸들러
  const handleCheck = (e) => {
    // 사용자가 항목을 변경했는지 파악
    let isCheck = false;
    const { name } = e.target;
    // 다중으로 선택하여서 처리하는 법
    const inputs = e.target.parentElement.querySelectorAll("input");
    inputs.forEach((item) => {
      // 각각의 항목이 체크가 되었는지를 확인하는 용도
      // let { name, checked } = item;
      // console.log(name);
      // console.log(checked);
      // setVal({ ...val, [name]: checked });
      if (item.checked) isCheck = true;
    });
    setVal({ ...val, [name]: isCheck });
  };

  // 에러 정보 관리 객체
  const [Err, setErr] = useState({});
  const check = (_val) => {
    const errs = {};
    // 아이디 체크
    if (_val.userid.length < 5) {
      errs.userid = "아이디를 5글자 이상 입력해주세요.";
    }
    // 이메일 체크/이메일 정규표현식 이용한 처리
    if (_val.email.length < 8 || !/@/.test(_val.email)) {
      errs.email = "이메일은 최소 8글자 이상 @을 포함해 주세요.";
    }
    // 비밀번호
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[!@#$%^&*()_+]/;
    if (
      _val.password.length < 5 ||
      !eng.test(_val.password) ||
      !num.test(_val.password) ||
      !spc.test(_val.password)
    ) {
      errs.password =
        "비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함해 주세요.";
    }
    // 비밀번호2 체크
    if (_val.password !== _val.password2 || !_val.password2) {
      errs.password2 = "비밀번호를 동일하게 입력해주세요.";
    }
    // 성별 체크
    if (_val.gender === "") {
      errs.gender = "성별을 선택하세요.";
    }
    // 관심사 체크
    if (!_val.interests) {
      errs.interests = "관심사를 하나이상 선택해주세요.";
    }
    // 학력체크
    if (_val.edu === "") {
      errs.edu = "학력을 선택해주세요.";
    }
    return errs;
  };

  // 디버깅용
  useEffect(() => {
    console.log(val);
  }, [val]);
  useEffect(() => {
    console.log(Err);
  }, [Err]);

  // 전송 실행시 각 항목의 내용 체크
  const handleSubmit = (e) => {
    // 웹브라우저가 갱신된다.
    // SPA 컨셉과 맞지 않는다.
    // state 도 초기화가 된다.
    e.preventDefault();
    // 필요항목에 대한 체크 실행
    // 각 항목 체크용 객체를 생성해 진행
    setErr(check(val));
  };

  // 에러 및 유효성 검사 결과 한개의 객체로 관리
  return (
    <Layout title={"Join"}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원 가입</legend>
          <table>
            <caption>회원 가입 정보 입력</caption>
            <tbody>
              {/* 아이디 입력 */}
              <tr>
                <th>
                  <label htmlFor="userid">USER ID</label>
                </th>
                <td>
                  {/* http://localhost/join?userid=홍길동 */}
                  <input
                    type="text"
                    id="userid"
                    name="userid"
                    placeholder="아이디를 입력하세요."
                    onChange={handleChange}
                  />
                  <span className="err">{Err.userid}</span>
                </td>
              </tr>
              {/* 이메일 */}
              <tr>
                <th>
                  <label htmlFor="email">E-MAIL</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="이메일 주소를 입력해주세요."
                    onChange={handleChange}
                  />
                  <span className="err">{Err.email}</span>
                </td>
              </tr>
              {/* 비밀번호 */}
              <tr>
                <th>
                  <label>PASSWORD</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                  />
                  <span className="err">{Err.password}</span>
                </td>
              </tr>
              {/* 비밀번호2 */}
              <tr>
                <th>
                  <label htmlFor="password2">PASSWORD 확인</label>
                </th>
                <td>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="비밀번호를 입력하세요"
                    onChange={handleChange}
                  />
                  <span className="err">{Err.password2}</span>
                </td>
              </tr>
              {/* 성별체크 */}
              <tr>
                <th>GENDER</th>
                <td>
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    onChange={handleRadio}
                  />
                  <span className="err">{Err.gender}</span>
                </td>
              </tr>
              {/* 관심사 */}
              <tr>
                <th>INTERESTS</th>
                <td>
                  <label htmlFor="sports">Sports</label>
                  <input
                    type="checkbox"
                    id="sports"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="music">Music</label>
                  <input
                    type="checkbox"
                    id="music"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="game">Game</label>
                  <input
                    type="checkbox"
                    id="game"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <label htmlFor="etc">Etc</label>
                  <input
                    type="checkbox"
                    id="etc"
                    name="interests"
                    onChange={handleCheck}
                  />
                  <span className="err">{Err.interests}</span>
                </td>
              </tr>
              {/* 교육경력 */}
              <tr>
                <th>EDUCATION</th>
                <td>
                  <select name="edu" id="edu" onChange={handleChange}>
                    <option value="">학력을 선택하세요.</option>
                    <option value="step-1">초등학교 졸업</option>
                    <option value="step-2">중학교 졸업</option>
                    <option value="step-3">고등학교 졸업</option>
                    <option value="step-4">대학교 졸업</option>
                  </select>
                  <span className="err">{Err.edu}</span>
                </td>
              </tr>
              {/* 폼 전송 */}
              <tr>
                <th colSpan="2">
                  {/* <button type="button">전송</button> */}
                  <input type="reset" value="RESET" />
                  <input type="submit" value="SUBMIT" />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
    </Layout>
  );
};

export default Join;