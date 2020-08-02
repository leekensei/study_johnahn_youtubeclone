import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props) => {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
      setChildCommentNumber(commentNumber);
    });
  }, [props.commentList]);

  const renderReplyComments = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              key={index}
              comment={comment}
              postId={props.postId}
              refreshFunc={props.refreshFunc}
            />
            <ReplyComment
              commentList={props.commentList}
              parentCommentId={comment._id}
              postId={props.videoId}
              refreshFunc={props.refreshFunc}
            />
          </div>
        )}
      </React.Fragment>
    ));

  const onHandleChange = () => {
    setOpenReplyComment(!openReplyComment);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onHandleChange}
        >
          View {childCommentNumber} more comment(s)
        </p>
      )}
      {openReplyComment && renderReplyComments(props.parentCommentId)}
    </div>
  );
};

export default ReplyComment;
