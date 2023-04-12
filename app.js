const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d"); //getContext는 붓이다.
canvas.width = 800;
canvas.height = 800; //css랑 javascript에 둘다 쓰기.

//원 만들기
ctx.fillRect(225, 200 -17, 15, 100);
ctx.fillRect(340, 200 -17, 15, 100);
ctx.fillRect(260, 200 -17, 60, 200);

ctx.arc(290, 130, 50, 0, 2* Math.PI); //ctx.arc(x, y, 반지름, starting angle, ending angle = 2* Math.PI);
ctx.fill();


ctx.beginPath(); //새로운 색깔줄때 새로운 패스를 줘야한다.
ctx.fillStyle = "blue"

ctx.arc(270, 130 -5, 8, Math.PI, 2* Math.PI)
ctx.arc(310, 130 -5, 8, Math.PI, 2* Math.PI)
ctx.fill();