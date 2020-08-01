import React, { useEffect, useState } from "react";
import Axios from "axios";

const SideVideo = () => {
  const [sideVideo, setSideVideo] = useState([]);

  useEffect(() => {
    Axios.get("/api/video/getvideos").then((res) => {
      if (res.data.success) {
        console.log(res.data.videos);
        setSideVideo(res.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);

  const renderSideVideo = sideVideo.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <div
        key={index}
        style={{ display: "flex", marginBottom: "1rem", padding: "0.2rem" }}
      >
        <div style={{ width: "40%", marginBottom: "1rem", color: "gray" }}>
          <a href="">
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div style={{ width: "50%", marginLeft: "1rem" }}>
          <a href="" style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views} views</span>
            <br />
            <span>
              {minutes}:{seconds}
            </span>
          </a>
        </div>
      </div>
    );
  });
  return <React.Fragment>{renderSideVideo}</React.Fragment>;
};

export default SideVideo;
