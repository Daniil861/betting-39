import { deleteMoney, checkRemoveAddClass, noMoney, addMoney } from './functions.js';
import { checkBoughtItems, writeSelected, prices, initStartData, config, removeClassGroup, startGame, resetGame } from './script.js';

const preloader = document.querySelector('.preloader');

// Объявляем слушатель событий "клик"

document.addEventListener('click', (e) => {
	const targetElement = e.target;
	const bank = +sessionStorage.getItem('money');
	const current_bet = +sessionStorage.getItem('current-bet');
	const wrapper = document.querySelector('.wrapper');

	initStartData();

	if (targetElement.closest('.preloader__button')) {
		preloader.classList.add('_hide');
		if (!sessionStorage.getItem('privacy')) sessionStorage.setItem('privacy', true);
	}

	if (targetElement.closest('[data-btn="privacy"]') && preloader.classList.contains('_hide')) {
		preloader.classList.remove('_hide');
	}

	if (targetElement.closest('[data-btn="shop"]')) {
		writeSelected();
		wrapper.classList.add('_shop');
	}

	if (targetElement.closest('.header-shop__button-back')) {
		wrapper.classList.remove('_shop');
	}

	if (targetElement.closest('[data-btn="menu"]')) {
		wrapper.classList.remove('_game');
	}

	if (targetElement.closest('[data-btn="game"]')) {
		wrapper.classList.add('_game');
	}

	//shop

	if (targetElement.closest('[data-shop-button="1"]') && !targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		if (bank >= prices.price_1) {
			deleteMoney(prices.price_1, '.score');
			sessionStorage.setItem('item-1', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="1"]') && targetElement.closest('[data-item="1"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="1"]'));
		sessionStorage.setItem('current-item', 1);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="2"]') && !targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		if (bank >= prices.price_2) {
			deleteMoney(prices.price_2, '.score');
			sessionStorage.setItem('item-2', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="2"]') && targetElement.closest('[data-item="2"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="2"]'));
		sessionStorage.setItem('current-item', 2);
		writeSelected();
	}

	if (targetElement.closest('[data-shop-button="3"]') && !targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		if (bank >= prices.price_3) {
			deleteMoney(prices.price_3, '.score');
			sessionStorage.setItem('item-3', true);
			checkBoughtItems();
		} else noMoney('.score');
	} else if (targetElement.closest('[data-shop-button="3"]') && targetElement.closest('[data-item="3"]').classList.contains('_bought')) {
		checkRemoveAddClass('.shop__item', '_selected', document.querySelector('[data-item="3"]'));
		sessionStorage.setItem('current-item', 3);
		writeSelected();
	}

	//game

	if (targetElement.closest('.bet-box__item')) {
		checkRemoveAddClass('.bet-box__item', '_active', targetElement.closest('.bet-box__item'));
		const bet = +targetElement.closest('[data-bet]').dataset.bet;
		sessionStorage.setItem('current-bet', bet);
	}

	if (targetElement.closest('.game__circle') && config.state === 1) {
		removeClassGroup('.game__circle', '_active');
		targetElement.closest('.game__circle').classList.add('_active');
		config.playerSelect = +targetElement.closest('.game__circle').dataset.circle;
	}

	if (targetElement.closest('[data-btn="play"]')) {
		config.state === 2;
		deleteMoney(+sessionStorage.getItem('current-bet'));
		setTimeout(() => {
			startGame();
		}, 500);
	}


	//===
	if (targetElement.closest('.final__button') && document.querySelector('.final').classList.contains('_visible')) {
		document.querySelector('.final').classList.remove('_visible');
		resetGame();
	}

})