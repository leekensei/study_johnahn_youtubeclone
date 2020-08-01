import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";

import SideVideo from "./Section/SideVideo";
import Subscribe from "./Section/Subscribe";
import Comment from "./Section/Comment";

const VideoDetailPage = (props) => {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("fail to get video");
      }
    });

    Axios.post("/api/comment/getComments", variable).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log("video detail comment check", res.data.comments);
        setComments(res.data.comments);
      } else {
        alert("fail to get all comments");
      }
    });
  }, []);

  const refreshFunc = (newComments) => {
    setComments(comments.concat(newComments));
  };

  if (videoDetail.writer) {
    const subButton = videoDetail.writer._id !==
      localStorage.getItem("userId") && (
      <Subscribe userTo={videoDetail.writer} />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5000/${videoDetail.filePath}`}
              controls
            />

            <List.Item actions={[subButton]}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail.writer.image} />}
                title={videoDetail.writer.name}
                description
              />
            </List.Item>
            {/* {comment} */}
            <Comment
              commentsList={comments}
              postId={videoId}
              refreshFunc={refreshFunc}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...loading</div>;
  }
};

export default VideoDetailPage;
