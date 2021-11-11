let time: NodeJS.Timeout | null = null;
let count = 0;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.time && count === 0) {
    time = null;
    let moveCount = 0;
      time = setInterval(() => {
      ++moveCount
      document.body.style.transform = `translateY(${-moveCount}px)`
    }, msg.time)
    count += 1;
    console.log("接收成功", msg.time, typeof msg.time, time);
  }

  if(msg.stop && count > 0) {
    clearInterval(time as NodeJS.Timeout)
    time = null;
    console.log("结束",time)
    count = 0;
  }
});
