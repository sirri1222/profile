import React, { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";
import CommunityCard from "./CommunityCard";

// https://quilljs.com/
// npm install react-quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// https://react-hook-form.com/
// npm install react-hook-form
// https://github.com/jquense/yup/tree/pre-v1
// npm install -S yup
// npm install @hookform/resolvers

// 01. useForm import
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// 02. form 요소의 항목별 에러 체크 정의
const schema = yup.object({
  title: yup.string().trim().required("제목을 입력해주세요."),
  content: yup.string().trim().required("내용을 입력해주세요."),
  timestamp: yup.string().required("날짜를 선택해 주세요"),
});

const Community = () => {
  // 03. useForm 생성
  // register : 각각의 form 의 name 을 설정
  // handleSubmit : form 에서 onSubmit 할때 실행됨
  // reset : form 에서 reset 할때 실행
  // formState: { errors }  yup 에러 출력 활용
  const {
    register,
    handleSubmit,
    reset,
    // 폼이 아니라 강제로 값을 셋팅하는 메서드
    setValue,
    trigger,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // yup 과 연결 시켜줌.
    mode: "onChange", // mode 가 onChange 면 실행하라..
  });

  // 데모용 데이터 생성
  const initPost = [
    { title: "Hello 1", content: "Welocome To React!" },
    { title: "Hello 2", content: "Welocome To React!" },
    { title: "Hello 3", content: "Welocome To React!" },
    { title: "Hello 4", content: "Welocome To React!" },
    { title: "Hello 5", content: "Welocome To React!" },
  ];

  // 로컬에 저장된 내용을 가지고 온다.
  const getLocalPost = () => {
    const data = localStorage.getItem("post");
    if (data === null) {
      return [];
    } else {
      return JSON.parse(data);
    }
  };
  const [posts, setPosts] = useState(getLocalPost());

  const [Allowed, setAllowed] = useState(true);
  const createPost = (data) => {
    console.log("submit 으로 넘겨진 데이터");
    console.log(data);

    // data ======>  { title: title, content: conten}
    setPosts([...posts, data]);
    // ...register("title")
    // ...register("conente")
    reset();

    setAllowed((prev) => true);
    setPosts((prev) => {
      const arr = [...prev];
      const updateArr = arr.map((item, index) => {
        item.enableUpdate = false;
        return item;
      });
      return updateArr;
    });

    // 파일을 강제로 업로드 한다.

    // const formData = new FormData();
    // formData.append("files", uploadFile);
    // await axios({
    //   method: "post",
    //   url: "/api/files/images",
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
  };

  // 삭제기능
  const deletePost = (idx) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    setPosts(posts.filter((item, index) => idx !== index));
  };
  // 업데이트 기능
  const enableUpdate = (idx) => {
    if (!Allowed) return;
    setAllowed(false);
    setPosts(
      posts.map((item, index) => {
        if (idx === index) {
          item.enableUpdate = true;
        }
        return item;
      })
    );
  };
  // 업데이트 취소
  const disapleUpdate = (idx) => {
    setAllowed(true);
    setPosts(
      posts.map((item, index) => {
        if (index === idx) {
          item.enableUpdate = false;
        }
        return item;
      })
    );
  };
  // 게시물 업데이트
  const updatePost = (data) => {
    setPosts(
      posts.map((item, index) => {
        // 숫자로 변경하여서 비교
        if (parseInt(data.index) === index) {
          item.title = data.title;
          item.content = data.content;
          item.timestamp = data.timestamp;
          item.enableUpdate = false;
        }
        return item;
      })
    );

    setAllowed(true);
  };

  // 로컬에 저장
  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(posts));
  }, [posts]);

  // 이미지 업로드 및 미리보기
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef(null);
  const onChangeImg = async (e) => {
    e.preventDefault();

    // 미리보기 기능
    if (e.target.files) {
      // files는 배열에 담긴다.
      // file 이 1개 이므로 e.taret.files[0]
      const uploadFile = e.target.files[0];
      console.log(uploadFile);

      // 이미지를 읽어들이는 바닐라 함수
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        // 임시 이미지주소가 만들어진다.
        // useState 입니다.
        setImgFile(reader.result);
      };

      // 서버로 이미지를 임시로 보내고 URL 글자를 받아오는 코드
      // 일반적 방법

      // const formData = new FormData();
      // formData.append("files", uploadFile);
      // await axios({
      //   method: "post",
      //   url: "/api/files/images",
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
    }
  };

  // ReactQuill 관련
  // ReactQuill 에서 image 를 바로 서버로 저장하면 곤란
  // ReactQuill 을 위해서 image 핸들러를 만들어야 함.
  // 먼저 이미지를 이미지 전용 서버에 보내고,
  // 주소를 다시 돌려받아서
  // 주소를 DB 서버 로 보낸다.
  const quillRef = useRef(null);
  const imageHandler = () => {
    console.log("에디터에서 이미지 버튼을 클릭하면 이 핸들러가 작동");
    // 1. 이미지를 저장할 input type="file" 을 생성한다.
    const input = document.createElement("input");
    // 2. 속성을 셋팅한다.
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // 에디터 이미지버튼을 클릭하면 input 이 클릭되도록 한다.
    input.click();
    // input 이 클릭되면 선택창이 나온다.
    // input 에 변화가 되면 이미지를 선택한 것이다.
    input.addEventListener("change", async () => {
      console.log("이미지 선택");
      const file = input.files[0];
      // 이미지를 변형한다.
      const formData = new FormData();
      // formData 의 형식은 키 - 벨류 구조
      formData.append("img", file);
      // formData 를 백엔드로 전송하고 주소를 받아온다.
      try {
        const result = await axios.post(
          "http://localhost:3000/images",
          formData
        );
        console.log("성공시 , 백엔드가 보내주는 데이터", result.data.url);
        // 명세서 확인 필요(url: http://127.0.123.124/image/a.gif)
        const imgURL = result.data.url;
        // ReactQuill Editer 에 html 수정해서 삽입
        // userRef 를 이용해서 해당 요소를 선택한다.
        const editer = quillRef.current.getEditor();
        // 현재 에디터 커서 위치값을 파악
        const range = editer.getSelection();
        // 가져온 이미지를 삽입해서 출력한다.
        editer.insertEmbed(range.index, "image", imgURL);
      } catch (error) {
        console.log("이미지 전송 실패");
      }
    });
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          [{ font: [] }], // font 설정
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            "formula",
          ], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // 리스트, 인덴트 설정
          ["link", "image", "video"], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ["clean"], // toolbar 설정 초기화 설정
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );
  // toolbar에 사용되는 tool format
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "formula",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];
  const handleChange = (value) => {
    console.log(value);
    // register 로 등록하지 않고, 강제로 넣어주는 기능
    // 주의사항으로 "<p><br></p>" 이 내용이 없는 것입니다.
    //-------------- useForm 에 데이터를 넣고 싶다.
    setValue("contents", value === "<p><br></p>" ? "" : value);
    // onChange 가 되었는지 여부를 react-hook-form 에 알려준다.
    trigger("contents");
    //----------- useForm
  };

  return (
    <Layout title={"Community"}>
      {/* 입력폼 */}

      <div className="inputBox">
        <form onSubmit={handleSubmit(createPost)}>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            {...register("title")}
          />
          <span className="err">{errors.title?.message}</span>
          <br />
          <textarea
            cols="30"
            rows="5"
            placeholder="본문을 입력하세요."
            {...register("content")}
          ></textarea>
          <span className="err">{errors.content?.message}</span>
          <br />
          <input type="date" {...register("timestamp")} />
          <span className="err">{errors.timestamp?.message}</span>
          <br />

          {/* 이미지 업로드 하기 : 이미지 미리보기 연동 */}
          <div>
            <img src={imgFile} alt="프로필 이미지" />
            <input
              type="file"
              accept="image/*"
              onInput={onChangeImg}
              ref={imgRef}
            ></input>
          </div>
          <br />
          <br />
          <br />
          <br />
          {/* 위지윅에디터 React-Quill */}
          <div>
            <ReactQuill
              ref={quillRef}
              modules={modules}
              formats={formats}
              onChange={handleChange}
            />
          </div>
          <br />
          <br />

          <div className="btnSet">
            {/* form 안쪽에 버튼은 type 을 정의한다. */}
            <button type="reset">CANCEL</button>
            <button type="submit">WRITE</button>
          </div>
        </form>
      </div>
      {/* 리스트 출력 */}
      <div className="showBox">
        {posts.map((item, index) => {
          return (
            <CommunityCard
              key={index}
              item={item}
              disapleUpdate={disapleUpdate}
              updatePost={updatePost}
              enableUpdate={enableUpdate}
              deletePost={deletePost}
              index={index}
            />
          );
        })}
      </div>
    </Layout>
  );
};
export default Community;