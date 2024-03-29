import React, { useEffect, useState } from "react";
import { Card, Icon, Avatar, Col, Row, Typography } from "antd";
import Axios from "axios";
import moment, { localeData } from "moment";
const { Title } = Typography;
const { Meta } = Card;

const SubscriptionPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    let variable = { userFrom: localStorage.getItem("userId") };
    Axios.post("/api/video/getSubscriptionVideo", variable).then((res) => {
      if (res.data.success) {
        console.log("subpage", res.data);
        setVideos(res.data.videos);
      } else {
        alert("fail to get videos");
      }
    });
  }, []);

  const renderCards = videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: "relative" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {minutes}:{seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          //   avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          description=""
        />
        {/* <span>{video.writer.name}</span> */}
        <br />
        <span style={{ marginLeft: "3rem" }}>{video.views}</span>-
        <span>{moment(video.createdAt).format("MMM Do YY")}</span>
      </Col>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Subscription</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
};

export default SubscriptionPage;
