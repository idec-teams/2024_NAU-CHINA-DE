function isElementInCenter(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error('Element not found');
        return;
    }

    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const elementCenterY = rect.top + rect.height / 2;

    // Tolerance for being close to the center
    const tolerance = 200;

    const isCenteredY = Math.abs(elementCenterY - windowHeight / 2) < tolerance;

    if (isCenteredY) {
        console.log('Element is in the center of the screen');
        return true
    } else {
        console.log('Element is not in the center of the screen');
        return false
    }
}
let halfWidth=(window.innerWidth)-400
let getright=false
let currentFrame = 0;
let positionX = 0; // 初始水平位置
let positionY = 0; // 初始垂直位置
let canChangeAnime=false
let stopstatus=false
const canvas_earth = document.getElementById('gifCanvas_earth');
const ctx = canvas_earth.getContext('2d');
let enable_moving = false
// 预加载所有帧
const frames = [];
const totalFrames = 87; // 假设GIF有79帧
for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    img.src = `frames/${i}.png`; // 假设每帧图像文件命名为 0.png, 1.png...
    frames.push(img);
}

let hasMovedRight = false; // 标记是否已经向右移动过
let stopsig = 0;
function drawFrame(frameIndex) {
    ctx.clearRect(0, 0, canvas_earth.width, canvas_earth.height);
    ctx.drawImage(frames[frameIndex], 0, 0, canvas_earth.width, canvas_earth.height);
}

// 初始化显示第一帧
frames[0].onload = () => drawFrame(0);

// 监听滚轮事件
window.addEventListener('wheel', (event) => {
    event.preventDefault();
    console.log("right?:" + getright)
    console.log(isElementInCenter('gifCanvas_earth'))
    if(isElementInCenter('gifCanvas_earth')&&stopstatus==false){
        canvas_earth.style.position='fixed'
        canvas_earth.style.top='1vh'
        canChangeAnime=true
    }
    // 控制动画播放


    //////////////Here is GOD'S Controllor!!!!!!!!!
    let speedLevel =1
    let moveSpeedX=30
    // const windowWidth=window.innerWidth
    // if(windowWidth<=690){
    //     speedLevel=5
    //     moveSpeedX=10
    // }
    // if(windowWidth<=1000){
    //     speedLevel=4
    //     moveSpeedX=20
    // }
    // if(windowWidth>=1000&&windowWidth<=1500){
    //     speedLevel=3
    //     moveSpeedX=30
    // }
    // if(windowWidth>=1500){
    //     speedLevel=2
    //     moveSpeedX=40
    // }
    
   

    ////////
    if (event.deltaY < 0&&canChangeAnime==true) {
        currentFrame = ((currentFrame -speedLevel)> 0) ? Math.floor(currentFrame - speedLevel) :0;
    } 
    if (event.deltaY > 0&&canChangeAnime==true)  {
        currentFrame = (currentFrame < (totalFrames - speedLevel)) ? Math.floor(currentFrame + speedLevel) : totalFrames-1;
    }
   
    



    if (event.deltaY > 0&&getright==false&&canChangeAnime==true)  {
        if ((positionX+moveSpeedX) < halfWidth&&positionX>=0&&canChangeAnime==true) {
            positionX += moveSpeedX; // 向右移动
            console.log("now"+positionX)

        }
        if(positionX+moveSpeedX>=halfWidth&&canChangeAnime==true){
            positionX=halfWidth;
            console.log("now"+positionX)
            getright=true

        }
    }
    if (event.deltaY < 0&&getright==false&&canChangeAnime==true)  {
        if ((positionX-moveSpeedX) < halfWidth&&(positionX-moveSpeedX)>=0) {
            positionX -= moveSpeedX; 
            console.log("now"+positionX)
        }
        if((positionX-moveSpeedX)<0){
            positionX =0; // 
            console.log("now"+positionX)

        }
    }
    if (event.deltaY > 0&&getright==true&&canChangeAnime==true)  {
        if ((positionX-moveSpeedX) < halfWidth&&positionX>=0) {
            positionX -= moveSpeedX; // 向右移动
            console.log("now"+positionX)

        }
        if((positionX-moveSpeedX)<0){
            positionX =0; // 
            console.log("now"+positionX)
            


        }
      
    }
    if (event.deltaY < 0&&getright==true&&canChangeAnime==true)  {
        if ((positionX+moveSpeedX) < halfWidth&&(positionX+moveSpeedX)>=0) {
            positionX += moveSpeedX; 
            console.log("now"+positionX)
        }
        if(positionX+moveSpeedX>=halfWidth){
            positionX=halfWidth;
            console.log("now"+positionX)
            getright=false

        }
       
    }
    

    // 应用动画帧和位置变化
    drawFrame(currentFrame);
    canvas_earth.style.transform = `translate(${positionX}px`;
});