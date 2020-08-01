import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import { set } from "mongoose";
import Axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const SingleComment = (props) => {
  const user = useSelector((state) => state.user);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      comment: commentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id,
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
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author
        avatar={<Avatar src={props.comment.writer.image} alt="" />}
        content={<p>{props.comment.comment}</p>}
      />
      {openReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={commentValue}
            placeholder="코멘트를 작성해 주세요"
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default SingleComment;
