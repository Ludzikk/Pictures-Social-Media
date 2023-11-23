const firstImg = document.querySelector(".main__img");
const username = document.querySelector(".main__username");
const likes = document.querySelector(".likes");
const nextBtn = document.querySelector(".fa-arrow-right");
const main = document.querySelector(".main");
const input = document.querySelector(".main__input");
const followBtn = document.querySelector(".main__follow");
const usernames = [];
const messages = ["Giga", "W", "Nice", "Look good", "Bomba"];
const commentsBox = document.querySelector(".main__mid");
const commentBtn = document.querySelector(".fa-comment");
const btn = document.querySelectorAll(".main__btn--canactivate");
const request = fetch("https://randomuser.me/api/?results=25")
	.then((response) => response.json())
	.then((result) => {
		for (let i = 0; i < 25; i++) {
			usernames.push(result.results[i].name.first);
		}
		createImage();
		setLikes();
		createComments();
	});
let photoSize = 750;
let avatarSize = 50;
let clickable = 0;
let following = 0;
let orderOfComment = 1;

const createImage = () => {
	const randomNum = Math.floor(Math.random() * 24);
	firstImg.setAttribute(
		"src",
		`https://random.imagecdn.app/${photoSize++}/${photoSize++}`
	);
	username.textContent = usernames[randomNum];
};

const setLikes = () => {
	const randomNum = Math.floor(Math.random() * 100000 + 100);
	likes.textContent = randomNum;
};

const createComments = () => {
	const randomNum = Math.floor(Math.random() * 10 + 1);

	for (let i = 0; i < randomNum; i++) {
		const msgNumber = Math.floor(Math.random() * messages.length);
		const nickNumber = Math.floor(Math.random() * 24);
		const commentBox = document.createElement("div");
		const commentLeft = document.createElement("div");
		const commentRight = document.createElement("div");
		const commentTop = document.createElement("div");
		const commentBottom = document.createElement("div");
		const commentNickname = document.createElement("p");
		const commentContent = document.createElement("p");
		const commentAvatar = document.createElement("img");
		commentBox.classList.add("comment");
		commentLeft.classList.add("comment__left");
		commentRight.classList.add("comment__right");
		commentTop.classList.add("comment__top");
		commentBottom.classList.add("comment__bottom");
		commentNickname.classList.add("comment__nickname");
		commentContent.classList.add("comment__content");
		commentAvatar.classList.add("comment__img");

		commentContent.textContent = messages[msgNumber];
		commentBottom.appendChild(commentContent);
		commentNickname.textContent = usernames[nickNumber];
		commentTop.appendChild(commentNickname);
		commentRight.append(commentTop, commentBottom);

		commentAvatar.setAttribute("alt", "Profile Avatar");
		commentAvatar.setAttribute(
			"src",
			`https://random.imagecdn.app/${avatarSize++}/${avatarSize++}`
		);

		commentLeft.appendChild(commentAvatar);
		commentBox.append(commentLeft, commentRight);
		commentsBox.append(commentBox);
	}
};

const createUserComment = () => {
	if (input.value.length > 0) {
		const commentBox = document.createElement("div");
		const commentLeft = document.createElement("div");
		const commentRight = document.createElement("div");
		const commentTop = document.createElement("div");
		const commentBottom = document.createElement("div");
		const commentNickname = document.createElement("p");
		const commentContent = document.createElement("p");
		const commentAvatar = document.createElement("img");
		commentBox.classList.add("comment");
		commentLeft.classList.add("comment__left");
		commentRight.classList.add("comment__right");
		commentTop.classList.add("comment__top");
		commentBottom.classList.add("comment__bottom");
		commentNickname.classList.add("comment__nickname");
		commentContent.classList.add("comment__content");
		commentAvatar.classList.add("comment__img");

		commentContent.textContent = input.value;
		commentBottom.appendChild(commentContent);
		commentNickname.textContent = "You";
		commentTop.appendChild(commentNickname);
		commentRight.append(commentTop, commentBottom);

		commentAvatar.setAttribute("alt", "Profile Avatar");
		commentAvatar.setAttribute("src", "./dist/img/avatar.png");

		commentLeft.appendChild(commentAvatar);
		commentBox.append(commentLeft, commentRight);
		commentsBox.append(commentBox);
		commentBox.style.order = `-${orderOfComment++}`;
		input.value = "";
	}
};

const activateBtn = () => {
	btn.classlist.add("is-active-btn");
};

const toggleFollow = () => {
	if (following === 0) {
		following = 1;
		followBtn.textContent = "Following";
	} else if (following === 1) {
		following = 0;
		followBtn.textContent = "Follow";
	}
};

btn.forEach((item) => {
	item.addEventListener("click", () => {
		item.classList.toggle("is-active-btn");

		if (item.classList.contains("is-active-btn")) {
			switch (parseInt(item.id)) {
				case 0:
					likes.textContent = parseInt(likes.textContent) + 1;
					break;
			}
		} else {
			switch (parseInt(item.id)) {
				case 0:
					likes.textContent = parseInt(likes.textContent) - 1;
					break;
			}
		}
	});
});

nextBtn.addEventListener("click", () => {
	if (clickable === 0) {
		clickable = 1;
		main.classList.toggle("slide-out");
		main.classList.toggle("slide-in");

		setTimeout(() => {
			createImage();
			setLikes();
			commentsBox.innerHTML = "";
			createComments();
			main.classList.toggle("slide-out");
			main.classList.toggle("slide-in");
			clickable = 0;
		}, 1000);
	}
});

document.addEventListener("keydown", (event) => {
	if (event.isComposing || event.keyCode === 39) {
		if (clickable === 0) {
			clickable = 1;
			main.classList.toggle("slide-out");
			main.classList.toggle("slide-in");

			setTimeout(() => {
				createImage();
				setLikes();
				commentsBox.innerHTML = "";
				createComments();
				main.classList.toggle("slide-out");
				main.classList.toggle("slide-in");
				clickable = 0;
			}, 1000);
		}
	}
});

document.addEventListener("keydown", (event) => {
	if (event.isComposing || event.keyCode === 13) {
		createUserComment();
	}
});

followBtn.addEventListener("click", toggleFollow);

commentBtn.addEventListener("click", () => {
	input.focus();
})