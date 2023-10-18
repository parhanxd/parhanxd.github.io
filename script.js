window.addEventListener("DOMContentLoaded",() => {
	const c = new Clock12(".clock");
});

class Clock12 {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.timeUpdate();
	}
	get timeAsObject() {
		const date = new Date();
		const h = date.getHours();
		const m = date.getMinutes();

		return { h, m };
	}
	get timeAsString() {
		const [h,m] = this.timeDigitsGrouped;

		return `${h}:${m}`;
	}
	get timeDigits() {
		return this.timeAsString.replaceAll(":","").split("");
	}
	get timeDigitsGrouped() {
		// this accessible string uses the 12-hour clock
		let { h, m } = this.timeAsObject;
		// deal with midnight
		if (h === 0) h += 12;
		else if (h > 12) h -= 12;
		// prepend 0 to the minute and second if single digits
		if (h < 10) h = ` ${h}`;
		if (m < 10) m = `0${m}`;

		return [h,m];
	}
	timeUpdate() {
		// update the `aria-label`
		this.el?.setAttribute("aria-label", this.timeAsString.trim());
		// update the digits
		this.timeDigits.forEach((digit,i) => {
			const digitEl = this.el.querySelectorAll("[data-digit]")[i];
			if (!digitEl) return;

			digitEl.setAttribute("data-digit",digit);
		});
		// loop
		clearTimeout(this.timeUpdateLoop);
		this.timeUpdateLoop = setTimeout(this.timeUpdate.bind(this),1e3);
	}
}