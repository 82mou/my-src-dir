import ScrollMagic from 'scrollmagic';

export default class UserScalableChange {
	constructor(target, currentTarget) {
	this.controller = new ScrollMagic.Controller();
	this.scrollTrigger = target;
    this.viewport = document.querySelector('meta[name="viewport"]');
    this.scrollEvent();
	}
  scrollEvent() {
    const elViewport = document.querySelector('meta[name=viewport]');

		new ScrollMagic.Scene({
			triggerElement: this.scrollTrigger,
			triggerHook: .2
		})
    .on('enter', () => {
        const content = elViewport.getAttribute('content');
	  // シーンの状態が"DURING"に入る際に発火する
	  if (content.indexOf(',user-scalable=no') < 0) {
		this.viewport.setAttribute('content', `${content},user-scalable=no`);
	  }
    })
    .on('leave', () => {
        const content = elViewport.getAttribute('content');
	  // シーンの状態が"DURING"から"BEFORE"か"AFTER"に移る際に発火する
	  this.viewport.setAttribute('content', content.replace(',user-scalable=no', ''));
    })
	.addTo(this.controller);
  }
}

window.addEventListener('load', () => {
	Array.prototype.slice.call(document.querySelectorAll('.js-user-scalable-no')).forEach(function(target){
		new UserScalableChange(target);
	});
});