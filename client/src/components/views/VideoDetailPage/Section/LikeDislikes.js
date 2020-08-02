import React, { useEffect, useState } from "react";
import { Tooltip, Icon } from "antd";
import Axios from "axios";

const LikeDislikes = (props) => {
  const [likes, setLikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikes, setDisLikes] = useState(0);
  const [dislikeAction, setDisLikeAction] = useState(null);
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((res) => {
      if (res.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikes(res.data.likes.length);
        // 내가 좋아요를 눌렀는지
        res.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("fail to get like");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((res) => {
      if (res.data.success) {
        // 얼마나 많은 싫어요를 받았는지
        setDisLikes(res.data.dislikes.length);
        // 내가 싫어요를 눌렀는지
        res.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDisLikeAction("disliked");
          }
        });
      } else {
        alert("fail to get dislike");
      }
    });
  }, [likes, dislikes]);

  const onClickLike = () => {
    if (likeAction === null) {
      Axios.post("/api/like/upLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes + 1);
          setLikeAction("liked");

          if (dislikeAction !== null) {
            setDisLikeAction(null);
            setDisLikes(dislikes - 1);
          }
        } else {
          alert("fail to up Like");
        }
      });
    } else {
      Axios.post("/api/like/unLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes - 1);
          setLikeAction(null);
        } else {
          alert("fail to un Like");
        }
      });
    }
  };

  const onClickDisLike = () => {
    if (dislikeAction === null) {
      Axios.post("/api/like/upDisLike", variable).then((res) => {
        if (res.data.success) {
          setDisLikes(dislikes + 1);
          setDisLikeAction("disliked");

          if (likeAction !== null) {
            setLikeAction(null);
            setLikes(likes - 1);
          }
        } else {
          alert("fail to up disLike");
        }
      });
    } else {
      Axios.post("/api/like/unDisLike", variable).then((res) => {
        if (res.data.success) {
          setDisLikes(dislikes - 1);
          setDisLikeAction(null);
        } else {
          alert("fail to un DisLike");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={likeAction === "liked" ? "filled" : "outlined"}
            onClick={onClickLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{likes}</span>
      </span>

      <span
        key="comment-basic-dislike"
        style={{ paddingLeft: "12px", paddingRight: "8px" }}
      >
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={dislikeAction === "disliked" ? "filled" : "outlined"}
            onClick={onClickDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>{dislikes}</span>
      </span>
    </div>
  );
};

export default LikeDislikes;
