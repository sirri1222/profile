import React, { useState } from "react";
import Layout from "../common/Layout";

// https://projects.wojtekmaj.pl/react-calendar/
// npm install react-calendar
// https://www.npmjs.com/package/moment
// npm install moment --save
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
// 날짜 관련 라이브러리
import moment from "moment/moment";
// 한글로 출력하게 해줌.
import "moment/locale/ko";

const Schedule = () => {
  const initData = [
    {
      category: "star",
      title: "스타벅스간날1",
      content: "스타벅스 맛있어요",
      date: "2023-01-13",
    },
    {
      category: "star",
      title: "스타벅스간날1",
      content: "스타벅스 맛있어요",
      date: "2023-02-01",
    },
    {
      category: "star",
      title: "스타벅스간날2",
      content: "스타벅스 맛있어요",
      date: "2023-02-06",
    },
    {
      category: "star",
      title: "스타벅스간날3",
      content: "스타벅스 맛있어요",
      date: "2023-02-07",
    },
  ];

  //   로컬 정보 호출
  const getLocalPost = () => {
    const data = localStorage.getItem("post");
    if (data === null) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };
  const [todoData, setTodoData] = useState(getLocalPost());
  // 선택된 날짜.
  const [date, setDate] = useState(new Date());
  // 이미지 출력
  const publicFolder = process.env.PUBLIC_URL;

  return (
    <Layout title={"Schedule"}>
      <Calendar
        // 일요일부터 출력
        calendarType="US"
        // 날짜 선택시 날짜변경
        onChange={setDate}
        // 달력에 출력될 html 작성
        tileContent={({ date, view }) => {
          let html = [];
          // date         : Mon Feb 28 2022 00:00:00 GMT+0900 (한국 표준시)
          // item.date    : "2023-02-07"
          // 각각의 날짜 영역에 출력하고 싶은 내용을 작성한다.
          // 날짜를 비교해서 같으면 출력을 하겠다.
          if (
            todoData.find((item, index) => {
              // 현재 date 는 포맷이 다릅니다.
              return item.timestamp === moment(date).format("YYYY-MM-DD");
            })
          ) {
            // 조건에 맞으므로 html 을 생성해 준다.
            html.push(
              <img
                key={`todoData_${moment(date)}}`}
                src={`${publicFolder}/images/starbucks.png`}
                alt="아이콘"
                style={{ width: 20, height: 20 }}
              />
            );
          }
          return <div>{html}</div>;
        }}
      />
      {/* 상세 정보 내역 출력 */}
      <div className="calender-detail">
        {todoData && (
          <div className="calender-detail__item">
            <div className="calender-detail__title">
              <img
                src={`${publicFolder}/images/starbucks.png`}
                alt="스타벅스"
                className="calender-detail__icon"
                style={{ width: 20, height: 20 }}
              />
              방문한날
            </div>
            <div className="calender-detail__date-wrap">
              {todoData.map((item, index) => item.title)}
            </div>
          </div>
        )}
      </div>
      <div>{moment(date).format("YYYY년 MM월 DD일")}</div>
      <div>{todoData.map((item, index) => item.title)}</div>
    </Layout>
  );
};

export default Schedule;