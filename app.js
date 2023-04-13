const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");// html에서 만든 input 굵기 조절기 가져오기
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d"); //getContext는 붓이다.
canvas.width = 800;
canvas.height = 800; //css랑 javascript에 둘다 쓰기.
ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event){
    if (isPainting) { //isPainting이 true면 그림이 그려짐!
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath(); //그리고 새로운 path로 그려주기
    ctx.moveTo(event.offsetX, event.offsetY); //마우스있는 곳으로 브러쉬 움직임
}

function onMouseDown(){ //마우스를 누르면 true로 변함
   isPainting = true;
}
function cancelPainting() { //마우스 때면 false여서 안그려짐
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
    
}
function onColorChange (event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}


canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown); //a마우스를 누른채로 있는 것만
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); //캔버스 밖을 나가도 작동함.위랑 여기랑 onMouseUp을 사용


lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);