'use strict';
'require baseclass';
'require ui';

// 获取当前页面的 URL
var currentUrl = window.location.href;

// 定义正则表达式模式
var pattern = /\/cgi-bin\/luci\/admin\/status\/logs.*/;

// 检查 URL 是否匹配日志页面
if (pattern.test(currentUrl)) {

	// 动态注入 overflow-x 和 overflow-y 样式的值为 visible
	// max-width > 1280px
	var mainElement = document.querySelector(".main");
	mainElement.style.overflowY = "visible";

	// max-width <= 1280px
	var mainRightElement = document.querySelector(".main-right");
	mainRightElement.style.overflowX = "visible";
	mainRightElement.style.overflowY = "visible";

	// 延时 500 毫秒执行
	setTimeout(function() {
		// 获取页面滚动高度
		var pageHeight = document.body.scrollHeight;

		// 将 .main-left （左侧菜单）元素的高度设置为当前页面滚动高度
		var mainLeftElement = document.querySelector(".main-left");
		mainLeftElement.style.height = pageHeight + "px";
	}, 500);
}

return baseclass.extend({
	__init__: function () {
		ui.menu.load().then(L.bind(this.render, this));
	},

	render: function (tree) {
		var node = tree,
			url = '',
			children = ui.menu.getChildren(tree);

		for (var i = 0; i < children.length; i++) {
			var isActive = (L.env.requestpath.length ? children[i].name == L.env.requestpath[0] : i == 0);

			if (isActive)
				this.renderMainMenu(children[i], children[i].name);
		}

		if (L.env.dispatchpath.length >= 3) {
			for (var i = 0; i < 3 && node; i++) {
				node = node.children[L.env.dispatchpath[i]];
				url = url + (url ? '/' : '') + L.env.dispatchpath[i];
			}

			if (node)
				this.renderTabMenu(node, url);
		}

		document.querySelector('a.showSide')
			.addEventListener('click', ui.createHandlerFn(this, 'handleSidebarToggle'));
		document.querySelector('.darkMask')
			.addEventListener('click', ui.createHandlerFn(this, 'handleSidebarToggle'));
	},

	handleMenuExpand: function (ev) {
		var a = ev.target, slide = a.parentNode, slide_menu = a.nextElementSibling;
		var collapse = false;

		document.querySelectorAll('.main .main-left .nav > li >ul.active').forEach(function (ul) {
			$(ul).stop(true).slideUp("fast", function () {
				ul.classList.remove('active');
				ul.previousElementSibling.classList.remove('active');
			});
			if (!collapse && ul === slide_menu) {
				collapse = true;
			}

		});

		if (!slide_menu)
			return;
		
		
		if (!collapse) {
			$(slide).find(".slide-menu").slideDown("fast",function(){
				slide_menu.classList.add('active');
				a.classList.add('active');
			});
			a.blur();
		}
		ev.preventDefault();
		ev.stopPropagation();
	},

	renderMainMenu: function (tree, url, level) {
		var l = (level || 0) + 1,
			ul = E('ul', { 'class': level ? 'slide-menu' : 'nav' }),
			children = ui.menu.getChildren(tree);

		if (children.length == 0 || l > 2)
			return E([]);

		for (var i = 0; i < children.length; i++) {
			var isActive = ((L.env.dispatchpath[l] == children[i].name) && (L.env.dispatchpath[l - 1] == tree.name)),
				submenu = this.renderMainMenu(children[i], url + '/' + children[i].name, l),
				hasChildren = submenu.children.length,
				slideClass = hasChildren ? 'slide' : null,
				menuClass = hasChildren ? 'menu' : 'food';
			if (isActive) {
				ul.classList.add('active');
				slideClass += " active";
				menuClass += " active";
			}

			ul.appendChild(E('li', { 'class': slideClass }, [
				E('a', {
					'href': L.url(url, children[i].name),
					'click': (l == 1) ? ui.createHandlerFn(this, 'handleMenuExpand') : null,
					'class': menuClass,
					'data-title': hasChildren ? children[i].title.replace(" ", "_") : children[i].title.replace(" ", "_"),
				}, [_(children[i].title)]),
				submenu
			]));
		}

		if (l == 1) {
			document.querySelector('#mainmenu').appendChild(ul);
			document.querySelector('#mainmenu').style.display = '';

		}
		return ul;
	},

	renderTabMenu: function (tree, url, level) {
		var container = document.querySelector('#tabmenu'),
			l = (level || 0) + 1,
			ul = E('ul', { 'class': 'tabs' }),
			children = ui.menu.getChildren(tree),
			activeNode = null;

		if (children.length == 0)
			return E([]);

		for (var i = 0; i < children.length; i++) {
			var isActive = (L.env.dispatchpath[l + 2] == children[i].name),
				activeClass = isActive ? ' active' : '',
				className = 'tabmenu-item-%s %s'.format(children[i].name, activeClass);

			ul.appendChild(E('li', { 'class': className }, [
				E('a', { 'href': L.url(url, children[i].name) }, [_(children[i].title)])
			]));

			if (isActive)
				activeNode = children[i];
		}

		container.appendChild(ul);
		container.style.display = '';

		if (activeNode)
			container.appendChild(this.renderTabMenu(activeNode, url + '/' + activeNode.name, l));

		return ul;
	},

	handleSidebarToggle: function (ev) {
		var showside = document.querySelector('a.showSide'),
			sidebar = document.querySelector('#mainmenu'),
			darkmask = document.querySelector('.darkMask'),
			scrollbar = document.querySelector('.main-right');

		if (showside.classList.contains('active')) {
			showside.classList.remove('active');
			sidebar.classList.remove('active');
			scrollbar.classList.remove('active');
			darkmask.classList.remove('active');
		}
		else {
			showside.classList.add('active');
			sidebar.classList.add('active');
			scrollbar.classList.add('active');
			darkmask.classList.add('active');
		}
	}
});
