import React, { useState } from "react";
import ReactDOM from "react-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './assets/popup.css'

const Popup = () => {
  const [scrollTime, setScrollTime] = useState(100);

  const getSliderValue = (value: any) => {
    setScrollTime(value)
  }

  const pageScrolling = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log("tag", tabs)
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { time: scrollTime }, (msg) => {
            console.log("页面通信回来的数据", msg);
        });
      }
    });
  };

  const stopScroll = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if(tab.id) {
        chrome.tabs.sendMessage(tab.id, { stop: true }, msg => {
          console.log("页面通信回来的回调(禁止滚动)", msg)
        })
      }
    })
  }

  return (
      <div className="popup-main">
        <h4>调节速度</h4>
        <Slider max={110} 
                defaultValue={60} 
                marks={{ 
                    10: 10,
                    30: 30, 
                    50: 50, 
                    70: 70,
                    90: 90,
                    110: 110
                }} 
                onChange={getSliderValue} 
                step={null}
        />
        <div className="scroll-btn" onClick={pageScrolling}>开始滚动</div>
        <div className="unScroll-btn" onClick={stopScroll}>取消滚动</div>
      </div>
      
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById("root")
);
