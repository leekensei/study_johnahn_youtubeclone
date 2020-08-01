import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ErrorMessage } from "formik";

const Subscribe = (props) => {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    let variable = { userTo: props.userTo };

    Axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("cannot load subscribers");
      }
    });

    let subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    Axios.post("/api/subscribe/subscribed", subscribedVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
      } else {
        alert("fail to get data");
      }
    });
  }, []);

  const onClickSubscribe = () => {
    let subscribeVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };

    if (subscribed) {
      // 구독 해제
      Axios.post("/api/subscribe/unSubscribe", subscribeVariable).then(
        (res) => {
          if (res.data.success) {
            setSubscribeNumber(subscribeNumber - 1);
            setSubscribed(!subscribed);
          } else {
            alert("fail to unsub");
          }
        }
      );
    } else {
      // 구독 처리
      Axios.post("/api/subscribe/Subscribe", subscribeVariable).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed);
        } else {
          alert("fail to sub");
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onClickSubscribe}
      >
        {subscribeNumber} {subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
