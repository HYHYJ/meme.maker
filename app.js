const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d"); //getContext는 붓이다.
canvas.width = 800;
canvas.height = 800; //css랑 javascript에 둘다 쓰기.



ctx.fillRect(50, 50, 100, 200)