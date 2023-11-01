const p1ScoreSpan = document.getElementById("p1-score");
const p2ScoreSpan = document.getElementById("p2-score");

let p1Score = 0;
let p2Score = 0;

const a1 = document.getElementById("a1");
const a2 = document.getElementById("a2");
const a3 = document.getElementById("a3");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const turnText = document.getElementById("turn");
turnText.innerText = `Vez de X`;

let turn = "p1";

const squares = document.querySelectorAll(".square");
squares.forEach((square) => {
	square.addEventListener("click", move);
});

function move(ev) {
	if (turn === "p1") {
		ev.target.innerText = "X";
		ev.target.classList.add("p1");
		ev.target.removeEventListener("click", move);
		const isWin = verifyWin(turn);
		if (isWin) {
			return;
		}
		turnText.innerText = `Vez de O`;
		turnText.classList.toggle("p1");
		turnText.classList.toggle("p2");
		turn = "p2";
	} else {
		ev.target.innerText = "O";
		ev.target.classList.add("p2");
		ev.target.removeEventListener("click", move);
		const isWin = verifyWin(turn);
		if (isWin) {
			return;
		}
		turnText.innerText = `Vez de X`;
		turnText.classList.toggle("p2");
		turnText.classList.toggle("p1");
		turn = "p1";
	}
}

function squareRemoveListener() {
	squares.forEach((square) => {
		square.removeEventListener("click", move);
	});
}

function showWin(x, y, z, turn) {
	x.classList.add("win");
	y.classList.add("win");
	z.classList.add("win");
	if (turn === "p1") {
		turnText.innerText = `X ganhou!`;
		p1Score++;
		p1ScoreSpan.innerText = p1Score;
	} else {
		turnText.innerText = `O ganhou!`;
		p2Score++;
		p2ScoreSpan.innerText = p2Score;
	}
}

function verifyWin(turn) {
	if (a1.innerText !== "" && a1.innerText === a2.innerText && a2.innerText === a3.innerText) {
		showWin(a1, a2, a3, turn);
		squareRemoveListener();
		return true;
	} else if (b1.innerText !== "" && b1.innerText === b2.innerText && b2.innerText === b3.innerText) {
		showWin(b1, b2, b3, turn);
		squareRemoveListener();
		return true;
	} else if (c1.innerText !== "" && c1.innerText === c2.innerText && c2.innerText === c3.innerText) {
		showWin(c1, c2, c3, turn);
		squareRemoveListener();
		return true;
	} else if (a1.innerText !== "" && a1.innerText === b1.innerText && b1.innerText === c1.innerText) {
		showWin(a1, b1, c1, turn);
		squareRemoveListener();
		return true;
	} else if (a2.innerText !== "" && a2.innerText === b2.innerText && b2.innerText === c2.innerText) {
		showWin(a2, b2, c2, turn);
		squareRemoveListener();
		return true;
	} else if (a3.innerText !== "" && a3.innerText === b3.innerText && b3.innerText === c3.innerText) {
		showWin(a3, b3, c3, turn);
		squareRemoveListener();
		return true;
	} else if (a1.innerText !== "" && a1.innerText === b2.innerText && b2.innerText === c3.innerText) {
		showWin(a1, b2, c3, turn);
		squareRemoveListener();
		return true;
	} else if (a3.innerText !== "" && a3.innerText === b2.innerText && b2.innerText === c1.innerText) {
		showWin(a3, b2, c1, turn);
		squareRemoveListener();
		return true;
	} else if (a1.innerText !== "" && a2.innerText !== "" && a3.innerText !== "" && b1.innerText !== "" && b2.innerText !== "" && b3.innerText !== "" && c1.innerText !== "" && c2.innerText !== "" && c3.innerText !== "") {
		turnText.innerText = "Empate!";
		turnText.classList.remove("p1", "p2");
		return true;
	}
}

document.getElementById("reset").addEventListener("click", () => {
	squares.forEach((square) => {
		square.classList.remove("p1", "p2");
		square.addEventListener("click", move);
		square.innerText = "";
		square.classList.remove("win");
	});
	turn = "p1";
	turnText.innerText = `Vez de X`;
	turnText.classList.remove("p2");
	turnText.classList.add("p1");
});
