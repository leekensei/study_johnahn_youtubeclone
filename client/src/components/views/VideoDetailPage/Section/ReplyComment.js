import React from "react";
import SingleComment from "./SingleComment";

const ReplyComment = (props) => {
  const renderReplyComments = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div>
            <SingleComment
              key={index}
              comment={comment}
              postId={props.postId}
              refreshFunc={props.refreshFunc}
            />
            <ReplyComment commentList={props.commentList} parentCommentId />
          </div>
        )}
      </React.Fragment>
    ));

  return (
    <div>
      <p style={{ fontSize: "14px", margin: 0, color: "gray" }}>
        View {} more comment(s)
      </p>
      {renderReplyComments(props.parentCommentId)}
    </div>
  );
};

export default ReplyComment;
