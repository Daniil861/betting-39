import { deleteMoney, checkRemoveAddClass, noMoney, getRandom, addMoney, getRandom_2 } from './functions.js';

if (sessionStorage.getItem('privacy')) {
	document.querySelector('.preloader').classList.add('_hide');
}

export function initStartData() {
	drawStartCurrentItem();
	if (sessionStorage.getItem('money')) {
		writeScore();
	} else {
		sessionStorage.setItem('money', 850);
		writeScore();
	}

	if (!sessionStorage.getItem('current-bet')) {
		sessionStorage.setItem('current-bet', 20);
		if (document.querySelector('.betting__count')) document.querySelector('.betting__count').textContent = sessionStorage.getItem('current-bet');
	} else {
		if (document.querySelector('.betting__count')) document.querySelector('.betting__count').textContent = sessionStorage.getItem('current-bet');
	}
}

function writeScore() {
	if (document.querySelector('.score')) {
		document.querySelectorAll('.score').forEach(el => {
			el.textContent = sessionStorage.getItem('money');
		})
	}
}

initStartData();


//========================================================================================================================================================
//main

export const prices = {
	price_1: 1500,
	price_2: 2500,
	price_3: 3900,

}
export const config = {
	state: 1,
	playerSelect: 1,
	ballChoice: 0,
	winCoeff: 3
}

const betBox = document.querySelector('.bet-box');
const circles = document.querySelectorAll('.game__circle');
const buttonPlayGame = document.querySelector('[data-btn="play"]');


if (document.querySelector('.main')) {
	document.querySelector('.main').classList.add('_active');
	drawPrices();

	checkBoughtItems();

	removeSelectedItems();

	writeSelected();
}
function drawPrices() {
	document.querySelector('[data-price="1"]').textContent = prices.price_1;
	document.querySelector('[data-price="2"]').textContent = prices.price_2;
	document.querySelector('[data-price="3"]').textContent = prices.price_3;
}

function drawStartCurrentItem() {
	if (!sessionStorage.getItem('current-item')) sessionStorage.setItem('current-item', 1);
	if (!sessionStorage.getItem('item-1')) sessionStorage.setItem('item-1', true);
}

function removeSelectedItems() {
	const blocks = document.querySelectorAll('.shop__item');

	blocks.forEach(block => {
		if (block.classList.contains('_selected')) block.classList.remove('_selected');
	})
}

export function checkBoughtItems() {
	if (sessionStorage.getItem('item-1')) {
		document.querySelector('[data-shop-button="1"]').textContent = 'Select';
		document.querySelector('[data-item="1"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-2')) {
		document.querySelector('[data-shop-button="2"]').textContent = 'Select';
		document.querySelector('[data-item="2"]').classList.add('_bought');
	}
	if (sessionStorage.getItem('item-3')) {
		document.querySelector('[data-shop-button="3"]').textContent = 'Select';
		document.querySelector('[data-item="3"]').classList.add('_bought');
	}
}

export function writeSelected() {
	document.querySelectorAll('[data-shop-button]').forEach(btn => {
		if (btn.closest('._bought')) btn.textContent = 'Select';
	})

	if (+sessionStorage.getItem('current-item') === 1) {
		document.querySelector('[data-shop-button="1"]').textContent = 'Selected';
		document.querySelector('[data-item="1"]').classList.add('_selected');
	} else if (+sessionStorage.getItem('current-item') === 2) {
		document.querySelector('[data-shop-button="2"]').textContent = 'Selected';
		document.querySelector('[data-item="2"]').classList.add('_selected');
	} else if (+sessionStorage.getItem('current-item') === 3) {
		document.querySelector('[data-shop-button="3"]').textContent = 'Selected';
		document.querySelector('[data-item="3"]').classList.add('_selected');
	}
	writeCurrentBallImage();
}

function writeCurrentBallImage() {
	const finalBalls = document.querySelectorAll('.final__ball');
	const gateBalls = document.querySelectorAll('.game__circle span');
	const currentIrem = sessionStorage.getItem('current-item');

	let image = `url('img/balls/ball-${currentIrem}.png')`;

	finalBalls.forEach(ball => {
		ball.style.backgroundImage = image;
	})
	gateBalls.forEach(ball => {
		ball.style.backgroundImage = image;
	})
}


//========================================================================================================================================================
//game

export function startGame() {
	holdInteractives();

	generateRandomBallChoice();

	// Показываем результаты
	showBallCurrentCircle();
	showSelectResult();

	setTimeout(() => {
		if (checkCollision()) {
			const count = +sessionStorage.getItem('current-bet') * config.winCoeff;

			addMoney(count, '.score', 1000, 2000);
			showFinalScreen(count, 'win');
		} else {
			showFinalScreen(+sessionStorage.getItem('current-bet'));
		}

	}, 1000);
}

function holdInteractives() {
	betBox.classList.add('_hold');
	buttonPlayGame.classList.add('_hold');
}
function returnInteractives() {
	betBox.classList.remove('_hold');
	buttonPlayGame.classList.remove('_hold');
}

function generateRandomBallChoice() {
	config.ballChoice = getRandom(1, 4);
}

function showBallCurrentCircle() {
	circles.forEach(circle => {
		if (circle.dataset.circle == config.ballChoice) circle.classList.add('_ball');
	})
}

function showSelectResult() {
	if (checkCollision()) {
		circles.forEach(circle => {
			if (circle.dataset.circle == config.playerSelect) circle.classList.add('_win');
		})
	} else {
		circles.forEach(circle => {
			if (circle.dataset.circle == config.playerSelect) circle.classList.add('_lose');
		})
	}
}


function checkCollision() {
	return config.playerSelect === config.ballChoice;
}


export function removeClassGroup(blocks, className) {
	document.querySelectorAll(blocks).forEach(circle => {
		console.log(circle);
		if (circle.classList.contains(className)) circle.classList.remove(className);
	})
}


export function resetGame() {
	returnInteractives();
	removeClassGroup('.game__circle', '_ball');
	removeClassGroup('.game__circle', '_lose');
	removeClassGroup('.game__circle', '_win');

	config.state === 1;
}

//========================================================================================================================================================

export function showFinalScreen(count = 0, status = 'lose') {
	const final = document.querySelector('.final');
	const finalCheck = document.querySelector('.final-check');
	const finalTitle = document.querySelector('.final__title');
	const button = document.querySelector('.final .final__button span');

	if (status === 'win') {
		finalTitle.textContent = 'GOAL!';
		finalCheck.textContent = `+${count}`;
		button.textContent = 'GO!';
	} else {
		finalTitle.textContent = 'MISS!';
		finalCheck.textContent = `-${count}`;
		button.textContent = 'Repeat';
	}

	setTimeout(() => {
		final.classList.add('_visible');
	}, 500);
}
