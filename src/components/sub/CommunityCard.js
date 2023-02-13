import React from "react";

// react-hook-form
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// 01. schema 설정 {...register(항목)} 에 대한 체크 출력
const schema = yup.object({
  title: yup.string().trim().required("제목을 입력해주세요."),
  content: yup.string().trim().required("내용을 입력하세요."),
  timestamp: yup.string().required("날짜를 입력해주세요."),
});

const CommunityCard = ({
  item,
  disapleUpdate,
  updatePost,
  enableUpdate,
  deletePost,
  index,
}) => {
  // 02. useForm 적용
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange", // mode 가 onChange 면 실행하라..
  });

  return (
    <>
      <article>
        {item.enableUpdate ? (
          /* 업데이트일때 보여줄 JSX */
          <>
            <form onSubmit={handleSubmit(updatePost)}>
              <div className="txt">
                <input
                  type="text"
                  defaultValue={item.title}
                  placeholder="제목을 입력하세요"
                  // ref={inputEdit}
                  {...register("title")}
                />
                <span className="err">{errors.title?.message}</span>
                <br />
                <textarea
                  cols="30"
                  rows="5"
                  defaultValue={item.content}
                  placeholder="내용을 입력해주세요."
                  // ref={textareaEdit}
                  {...register("content")}
                ></textarea>
                <span className="err">{errors.content?.message}</span>
                <br />
                <input
                  type="date"
                  defaultValue={item.timestamp}
                  {...register("timestamp")}
                />
                <span className="err">{errors.timestamp?.message}</span>
                <br />
                {/* 사용자가 볼수 없은 form 요소 */}
                <input type="hidden" value={index} {...register("index")} />
              </div>
              <div className="btnSet">
                {/* 업데이트 취소 */}
                <button type="reset" onClick={() => disapleUpdate(index)}>
                  CANCEL
                </button>
                {/* 내용 업데이트 */}
                {/* <button onClick={() => updatePost(index)}>SAVE</button> */}
                <button type="submit">SAVE</button>
              </div>
            </form>
          </>
        ) : (
          /* 목록일때 보여줄 JSX */
          <>
            <div className="txt">
              <h2>
                {item.title} <span className="day">{item.timestamp}</span>
              </h2>
              <p>{item.content}</p>
            </div>
            <div className="btnSet">
              {/* 업데이트기능 */}
              <button onClick={() => enableUpdate(index)}>EDIT</button>
              {/* 삭제기능 */}
              <button onClick={() => deletePost(index)}>DELETE</button>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default CommunityCard;