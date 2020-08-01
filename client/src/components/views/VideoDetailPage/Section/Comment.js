import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input } from "antd";
import Axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";

const { TextArea } = Input;

const Comment = (props) => {
  const videoId = props.postId;
  const user = useSelector((state) => state.user);
  console.log("Comment props:", props);

  const [commentValue, setCommentValue] = useState("");

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      comment: commentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post("/api/comment/saveComment", variable).then((res) => {
      if (res.data.success) {
        console.log("Comment:", res.data);
        props.refreshFunc(res.data.result);
        setCommentValue("");
      } else {
        alert("fail to save comment");
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <br />
      {/* {comment list} */}
      {props.commentsList &&
        props.commentsList.map((comment, index) => {
          return (
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  key={index}
                  comment={comment}
                  postId={props.videoId}
                  refreshFunc={props.refreshFunc}
                />
                <ReplyComment
                  commentList={props.commentsList}
                  parentCommentId={comment._id}
                />
              </React.Fragment>
            )
          );
        })}

      {/* {reply} */}

      <form style={{ display: "flex" }}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleClick}
          value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Comment;
