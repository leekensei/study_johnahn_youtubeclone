import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];
const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
];

const VideoUploadPage = (props) => {
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Private, setPrivate] = useState(0);
  const [category, setCategory] = useState("Film & Animation");
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState(0);
  const [thumbnailPath, setThumbnailPath] = useState("");

  const onTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onDescChange = (e) => {
    setDescription(e.currentTarget.value);
  };
  const onPrivateChange = (e) => {
    setPrivate(e.currentTarget.value);
  };
  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  };
  const onDrop = (files) => {
    // 파일을 보낼때는 다음과 같은 헤더를 붙이지 않으면 오류
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);

        let variable = {
          url: res.data.url,
          fileName: res.data.fileName,
        };

        setFilePath(res.data.url);

        Axios.post("/api/video/thumbnail", variable).then((res) => {
          if (res.data.success) {
            console.log(res.data);
            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.url);
          } else {
            alert("fail to create thumbnail");
          }
        });
      } else {
        alert("비디오를 업로드하는데 실패했습니다");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault(); // 섭밋 새로고침 방지
    console.log("onsubmit user", user);
    const variables = {
      writer: user.userData._id,
      title: title,
      description: description,
      privacy: Private,
      filePath: filePath,
      category: category,
      duration: duration,
      thumbnail: thumbnailPath,
    };

    Axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data.success) {
        message.success("성공적으로 업로드를 했습니다");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("fail to video upload");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* {Drop zone} */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* {thumb nail} */}
          {thumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${thumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={title} />
        <label>Description</label>
        <TextArea onChange={onDescChange} value={description} />
        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default VideoUploadPage;
