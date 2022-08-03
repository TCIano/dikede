export const imgError = {
  inserted(ele, bind) {
    console.log(ele);
    // 如果图片加载失败
    ele.onerror = () => {
      console.log(bind);
      console.log("图片加载失败");
      ele.src = bind.value;
    };
  },
};
