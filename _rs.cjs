const sharp = require("sharp");
(async () => {
  await sharp("E:/豆包工作内容存放/丁达尔建站/_assets/shot-expo-desktop.png").resize({width: 1000}).toFile("E:/豆包工作内容存放/丁达尔建站/_assets/expoD.png");
  await sharp("E:/豆包工作内容存放/丁达尔建站/_assets/shot-expo-mobile.png").resize({width: 420}).toFile("E:/豆包工作内容存放/丁达尔建站/_assets/expoM.png");
  console.log("ok");
})();
