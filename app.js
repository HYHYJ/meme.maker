const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("erase-btn");



const colorOptions = Array.from(document.getElementsByClassName("color-option"));
//html의 배열을 Js의 배열로 만듬. Array.from으로 생성한다.
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");// html에서 만든 input 굵기 조절기 가져오기
const canvas = document.querySelector("canvas");

const CANVAS_WIDTH = 800; //Canvas 넓이와 높이를 800으로 맞춰줌
const CANVAS_HEIGHT = 800;

let filledColor = "white";


const ctx = canvas.getContext("2d"); //getContext는 붓이다.
canvas.width = CANVAS_WIDTH; ///////////여기도 수정
canvas.height = CANVAS_HEIGHT; //css랑 javascript에 둘다 쓰기.
ctx.lineWidth = lineWidth.value; //html의 기본값을 다시 넣어줘야한다.
ctx.lineCap = "round"; //선의 끝을 둥글게한다.
let isPainting = false;
let isFilling = false;

function onMove(event){
    if (isPainting) { //isPainting이 true면 그림이 그려짐!
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath(); //그리고 새로운 path로 그려주기
    ctx.moveTo(event.offsetX, event.offsetY); //마우스있는 곳으로 브러쉬 움직임
}

function startPainting(){ //마우스를 누르면 true로 변함
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
    ctx.strokeStyle = event.target.value; //strokeStyle 선색깔
    ctx.fillStyle = event.target.value; //fillStyle 채우기색깔
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue; //위에 함수값 입혀주기
    ctx.fillStyle = colorValue;
    color.value = colorValue; //컬러 칸 말고 컬러피커칸의 색을 바꿔준다.
}

function onModeClick(){ //그리기 채우기 모드 바꾸기
   if(isFilling){ //이때 버튼이 눌리면 모드를 바꾸고 싶다는 의미.
    isFilling = false //그리기 모드
    modeBtn.innerText ="Draw"
   } else {
    isFilling = true //채우기모드 
    modeBtn.innerText ="Fill"
   }
}

function onCanvasClick(){
    if(isFilling){
      ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
      filledColor = ctx.fillStyle;
    }
}

function onEraserClick(event) {
    ctx.strokeStyle = filledColor;
    isFilling = false;
    modeBtn.innerHTML = "Fill";
}

function onDestroyClick() { //모두 한번에 지워주는 기능
    ctx.fillStyle ="white"; //면적색상을 화이트로
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT) //큰 캔버스크기의 사각형
}
function onFileChange(event) {
   const file = event.target.files[0]; // 불러온 file url불러오기
   const url = URL.createObjectURL(file); //file을 가리키는 url을 불러오기.
   const image = new Image(); // = <img src="" /> 해당 줄이랑 하단 줄이 이걸 의미. 
   image.src = url; //src 진짜 스펠링 조심하자.
   image.onload = function () { // = image.addEventListener("onload", function);
     ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) ; // ctx.drawImage 캔버스에 이미지를 그려줌 (x좌표, y좌표, 사진 넓이, 높이)
    fileInput.value =null;
    }

}

function onDoubleClick(event) {
    const text =textInput.value;
    if (text !=="") {
    ctx.save(); //ctx의 현재상태, 색상, 스타일 등 모든것을 저장함.
    ctx.lineWidth =1; // lineWidth를 바꾸면 브러쉬 굵기도 작아진다. 다시 되돌려야한다. = save 함수
    ctx.font ="53px godic"; //폰트랑 크기 바꾸기
    ctx.fillText(text, event.offsetX, event.offsetY) //strokeText or fillText
    ctx.restore() //lineWidth를 바꿔도 이전 저장상태로 돌아가게하기. (save와 restore 사이에서는 정말 어떤 수정도 저장 안됌.)
    //console.log(event.offsetX, event.offsetY); //마우스가 클릭한 좌표다.
    }
}
// canvas.onmousemove = onMove   // 하단 줄이랑 같은 의미, 하단줄을 이용하는 이유는 같은 event안에 많은 event listener들을 추가, 삭제 가능
canvas.addEventListener("dblclick", onDoubleClick) //mousedown,mouseup이 빨리될때
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);  //마우스를 누른채로 있는 것만
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting); //캔버스 밖을 나가도 작동함.위랑 여기랑 onMouseUp을 사용
canvas.addEventListener("click", onCanvasClick)

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

//colorOptions.forEach(); 이건 불가능. colorOptions은 HTML콜렉션이고 ArrayLike 객체지 Array가 아니다.
colorOptions.forEach((color) => color.addEventListener("click", onColorClick)); //위에 Array.from 사용하고 사용가능. //각각을 color라고 이름 붙여줌

modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange)

//click = mousedown + mouseup