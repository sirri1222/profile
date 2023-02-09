import React, { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Layout from "../common/Layout";
const Join = () => {
  // 회원 가입을 위한 정보를 한개의 객체로 관리
  // 정보 관리 초기객체
  let initVal = {
    userid: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
    address: "",
    address2: "",
    gender: "",
    birthday: "",
    interests: "",
    edu: "",
    hobby: null,
    comment: "",
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
    let data = {};
    for (let item of inputs) {
      // 각각의 항목이 체크가 되었는지를 확인하는 용도
      let { id, checked } = item;
      data[id] = checked;

      // 1개라도 체크가 되었는지 검증
      if (item.checked) isCheck = true;
    }
    // setVal({ ...val, [name]: isCheck });
    // prev state 활용
    setVal((prev) => {
      const obj = { ...prev };
      obj.hobby = data;
      return obj;
    });

    setVal((prev) => {
      const obj = { ...prev };
      obj[name] = isCheck;
      return obj;
    });
  };

  // Daum Post 연동 이벤트 핸들러
  // 우편번호 출력
  // 처음에는 안보이도록 state 설정
  const [postVisible, setPostVisible] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    // 주소 state 업데이트
    setVal({ ...val, address: fullAddress });
    setPostVisible(false);
  };

  // 전화번호 입력시 - 값 적용
  const handlePhone = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    value = value
      .replace(/[^0-9]/g, "") // 숫자를 제외한 모든 문자 제거
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

    setVal({ ...val, [name]: value });
  };
  // 생년월일
  const handleBirthday = (e) => {
    const { name } = e.target;
    let value = e.target.value;
    value = value.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    setVal({ ...val, [name]: value });
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
    // 전화번호 체크
    if (_val.phone === "") {
      errs.phone = "전화번호를 입력해주세요.";
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
    // 생년월일 체크
    if (_val.birthday === "") {
      errs.birthday = "생년월일을 입력해주세요.";
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
    // 기타내용 체크
    if (_val.comment.length < 20) {
      errs.comment = "남기는 말을 20글자 이상 입력해주세요.";
    }
    // 주소 체크
    if (_val.address === "") {
      errs.address = "주소를 입력해주세요.";
    }
    if (_val.address2 === "") {
      errs.address2 = "상세주소를 입력해주세요.";
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
              {/* 전화번호 */}
              <tr>
                <th>
                  <lable htmlFor="phone">PHONE</lable>
                </th>
                <td>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="전화번호를 입력하세요."
                    maxLength={13}
                    onChange={handlePhone}
                    value={val.phone}
                  />
                  <span className="err">{Err.phone}</span>
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
              {/* 주소입력 : https://www.npmjs.com/package/react-daum-postcode */}
              <tr>
                <th>
                  <label htmlFor="address">Address</label>
                </th>
                <td>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="주소를 입력해주세요."
                    onChange={handleChange}
                    readOnly
                    onClick={() => setPostVisible(true)}
                    style={{ cursor: "pointer" }}
                    value={val.address}
                  />
                  <span className="err">{Err.address}</span>
                  {/* Daum Post 컴포넌트 출력 자리 */}
                  {postVisible ? (
                    <div style={{ position: "absolute", background: "#fff" }}>
                      <button onClick={() => setPostVisible(false)}>
                        닫기
                      </button>
                      <DaumPostcodeEmbed
                        onComplete={handleComplete}
                        style={{ width: 400, height: 600 }}
                      />
                    </div>
                  ) : null}

                  <br />
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    placeholder="상세주소를 입력해주세요."
                    onChange={handleChange}
                  />
                  <span className="err">{Err.address2}</span>
                </td>
              </tr>
              {/* 생년월일 */}
              <tr>
                <th>
                  <label htmlFor="birthday">BIRTHDAY</label>
                </th>
                <td>
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    placeholder="생년월일을 입려해주세요."
                    onChange={handleBirthday}
                    maxLength={13}
                    value={val.birthday}
                  />
                  <span className="err">{Err.birthday}</span>
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
              {/* 기타의견 */}
              <tr>
                <th>
                  <label htmlFor="comment">COMMENT</label>
                </th>
                <td>
                  {/* 단순한 글자입력만 됩니다. WYSIWYG Editor 가 필요 */}
                  <textarea
                    name="comment"
                    id="commnet"
                    cols="30"
                    rows="5"
                    placeholder="남기는 말을 입력해주세요."
                    onChange={handleChange}
                  ></textarea>
                  <span className="err">{Err.comment}</span>
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