var astraGetParents = function (elem, selector) {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }
    var parents = [];
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (selector) {
            if (elem.matches(selector)) {
                parents.push(elem);
            }
        } else {
            parents.push(elem);
        }
    }
    return parents;
};
var getParents = function (elem, selector) {
    console.warn("getParents() function has been deprecated since version 2.5.0 or above of Astra Theme and will be removed in the future. Use astraGetParents() instead.");
    astraGetParents(elem, selector);
};
var astraToggleClass = function (el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);
    } else {
        el.classList.add(className);
    }
};
var toggleClass = function (el, className) {
    console.warn("toggleClass() function has been deprecated since version 2.5.0 or above of Astra Theme and will be removed in the future. Use astraToggleClass() instead.");
    astraToggleClass(el, className);
};
(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
var astraTriggerEvent = function astraTriggerEvent(el, typeArg) {
    var customEventInit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var event = new CustomEvent(typeArg, customEventInit);
    el.dispatchEvent(event);
};
astraSmoothScroll = function astraSmoothScroll(e, top) {
    e.preventDefault();
    window.scrollTo({ top: top, left: 0, behavior: "smooth" });
};
astScrollToTopHandler = function (masthead, astScrollTop) {
    var content = getComputedStyle(astScrollTop).content,
        device = astScrollTop.dataset.onDevices;
    content = content.replace(/[^0-9]/g, "");
    if ("both" == device || ("desktop" == device && "769" == content) || ("mobile" == device && "" == content)) {
        var scrollTop = window.pageYOffset || document.body.scrollTop;
        if (masthead && masthead.length) {
            if (scrollTop > masthead.offsetHeight + 100) {
                astScrollTop.style.display = "block";
            } else {
                astScrollTop.style.display = "none";
            }
        } else {
            if (window.pageYOffset > 300) {
                astScrollTop.style.display = "block";
            } else {
                astScrollTop.style.display = "none";
            }
        }
    } else {
        astScrollTop.style.display = "none";
    }
};
(function () {
    var menu_toggle_all = document.querySelectorAll("#masthead .main-header-menu-toggle"),
        main_header_masthead = document.getElementById("masthead"),
        menu_click_listeners_nav = {},
        mobileHeaderType = "",
        body = document.body,
        mobileHeader = "";
    if (undefined !== main_header_masthead && null !== main_header_masthead) {
        mobileHeader = main_header_masthead.querySelector("#ast-mobile-header");
    }
    if ("" !== mobileHeader && null !== mobileHeader) {
        mobileHeaderType = mobileHeader.dataset.type;
    }
    document.addEventListener("astMobileHeaderTypeChange", updateHeaderType, false);
    function updateHeaderType(e) {
        mobileHeaderType = e.detail.type;
        var popupTrigger = document.querySelectorAll(".menu-toggle");
        if ("dropdown" === mobileHeaderType) {
            document.getElementById("ast-mobile-popup").classList.remove("active", "show");
            updateTrigger("updateHeader");
        }
        if ("off-canvas" === mobileHeaderType) {
            for (var item = 0; item < popupTrigger.length; item++) {
                if (undefined !== popupTrigger[item] && popupTrigger[item].classList.contains("toggled")) {
                    popupTrigger[item].click();
                }
            }
        }
        init(mobileHeaderType);
    }
    popupTriggerClick = function (event) {
        var triggerType = event.currentTarget.trigger_type;
        var popupWrap = document.getElementById("ast-mobile-popup");
        const menuToggleClose = document.getElementById("menu-toggle-close");
        if (menuToggleClose) {
            menuToggleClose.focus();
        }
        if (!body.classList.contains("ast-popup-nav-open")) {
            body.classList.add("ast-popup-nav-open");
        }
        if (!body.classList.contains("ast-main-header-nav-open") && "mobile" !== triggerType) {
            body.classList.add("ast-main-header-nav-open");
        }
        if (!document.documentElement.classList.contains("ast-off-canvas-active")) {
            document.documentElement.classList.add("ast-off-canvas-active");
        }
        if ("desktop" === triggerType) {
            popupWrap.querySelector(".ast-mobile-popup-content").style.display = "none";
            popupWrap.querySelector(".ast-desktop-popup-content").style.display = "block";
        }
        if ("mobile" === triggerType) {
            popupWrap.querySelector(".ast-desktop-popup-content").style.display = "none";
            popupWrap.querySelector(".ast-mobile-popup-content").style.display = "block";
        }
        this.style.display = "none";
        popupWrap.classList.add("active", "show");
    };
    function updateTrigger(currentElement) {
        mobileHeader = main_header_masthead.querySelector("#ast-mobile-header");
        var parent_li_sibling = "";
        if (undefined !== mobileHeader && null !== mobileHeader && "dropdown" === mobileHeader.dataset.type && "updateHeader" !== currentElement) {
            return;
        }
        if (undefined !== currentElement && "updateHeader" !== currentElement) {
            parent_li_sibling = currentElement.closest(".ast-mobile-popup-inner").querySelectorAll(".menu-item-has-children");
        } else {
            var popup = document.querySelector("#ast-mobile-popup");
            parent_li_sibling = popup.querySelectorAll(".menu-item-has-children");
        }
        for (var j = 0; j < parent_li_sibling.length; j++) {
            parent_li_sibling[j].classList.remove("ast-submenu-expanded");
            var all_sub_menu = parent_li_sibling[j].querySelectorAll(".sub-menu");
            for (var k = 0; k < all_sub_menu.length; k++) {
                all_sub_menu[k].style.display = "none";
            }
        }
        var popupTrigger = document.querySelectorAll(".menu-toggle");
        document.body.classList.remove("ast-main-header-nav-open", "ast-popup-nav-open");
        document.documentElement.classList.remove("ast-off-canvas-active");
        for (var item = 0; item < popupTrigger.length; item++) {
            popupTrigger[item].classList.remove("toggled");
            popupTrigger[item].style.display = "flex";
        }
    }
    function init(mobileHeaderType) {
        var popupTriggerMobile = document.querySelectorAll("#ast-mobile-header .menu-toggle");
        var popupTriggerDesktop = document.querySelectorAll("#ast-desktop-header .menu-toggle");
        if (undefined === mobileHeaderType && null !== main_header_masthead) {
            mobileHeader = main_header_masthead.querySelector("#ast-mobile-header");
            if (mobileHeader) {
                mobileHeaderType = mobileHeader.dataset.type;
            } else {
                var desktopHeader = main_header_masthead.querySelector("#ast-desktop-header");
                if (desktopHeader) {
                    mobileHeaderType = desktopHeader.dataset.toggleType;
                } else {
                    return;
                }
            }
        }
        if ("off-canvas" === mobileHeaderType) {
            var popupClose = document.getElementById("menu-toggle-close"),
                popupInner = document.querySelector(".ast-mobile-popup-inner");
            if (undefined === popupInner || null === popupInner) {
                return;
            }
            popupLinks = popupInner.getElementsByTagName("a");
            for (var item = 0; item < popupTriggerMobile.length; item++) {
                popupTriggerMobile[item].removeEventListener("click", astraNavMenuToggle, false);
                popupTriggerMobile[item].addEventListener("click", popupTriggerClick, false);
                popupTriggerMobile[item].trigger_type = "mobile";
            }
            for (var item = 0; item < popupTriggerDesktop.length; item++) {
                popupTriggerDesktop[item].removeEventListener("click", astraNavMenuToggle, false);
                popupTriggerDesktop[item].addEventListener("click", popupTriggerClick, false);
                popupTriggerDesktop[item].trigger_type = "desktop";
            }
            popupClose.addEventListener("click", function (e) {
                document.getElementById("ast-mobile-popup").classList.remove("active", "show");
                updateTrigger(this);
            });
            document.addEventListener("keyup", function (event) {
                if (event.keyCode === 27) {
                    event.preventDefault();
                    document.getElementById("ast-mobile-popup").classList.remove("active", "show");
                    updateTrigger();
                }
            });
            document.addEventListener("click", function (event) {
                var target = event.target;
                var modal = document.querySelector(".ast-mobile-popup-drawer.active .ast-mobile-popup-overlay");
                if (target === modal) {
                    document.getElementById("ast-mobile-popup").classList.remove("active", "show");
                    updateTrigger();
                }
            });
            for (let link = 0, len = popupLinks.length; link < len; link++) {
                if (
                    null !== popupLinks[link].getAttribute("href") &&
                    (popupLinks[link].getAttribute("href").startsWith("#") || -1 !== popupLinks[link].getAttribute("href").search("#")) &&
                    (!popupLinks[link].parentElement.classList.contains("menu-item-has-children") ||
                        (popupLinks[link].parentElement.classList.contains("menu-item-has-children") && document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-icon")))
                ) {
                    popupLinks[link].addEventListener("click", triggerToggleClose, true);
                    popupLinks[link].headerType = "off-canvas";
                }
            }
            AstraToggleSetup();
        } else if ("dropdown" === mobileHeaderType) {
            var mobileDropdownContent = document.querySelectorAll(".ast-mobile-header-content") || false,
                desktopDropdownContent = document.querySelector(".ast-desktop-header-content") || false;
            if (mobileDropdownContent.length > 0) {
                for (let index = 0; index < mobileDropdownContent.length; index++) {
                    var mobileLinks = mobileDropdownContent[index].getElementsByTagName("a");
                    for (link = 0, len = mobileLinks.length; link < len; link++) {
                        if (
                            null !== mobileLinks[link].getAttribute("href") &&
                            (mobileLinks[link].getAttribute("href").startsWith("#") || -1 !== mobileLinks[link].getAttribute("href").search("#")) &&
                            (!mobileLinks[link].parentElement.classList.contains("menu-item-has-children") ||
                                (mobileLinks[link].parentElement.classList.contains("menu-item-has-children") && document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-icon")))
                        ) {
                            mobileLinks[link].addEventListener("click", triggerToggleClose, true);
                            mobileLinks[link].headerType = "dropdown";
                        }
                    }
                }
            }
            if (desktopDropdownContent) {
                var desktopLinks = desktopDropdownContent.getElementsByTagName("a");
                for (link = 0, len = desktopLinks.length; link < len; link++) {
                    desktopLinks[link].addEventListener("click", triggerToggleClose, true);
                    desktopLinks[link].headerType = "dropdown";
                }
            }
            for (var item = 0; item < popupTriggerMobile.length; item++) {
                popupTriggerMobile[item].removeEventListener("click", popupTriggerClick, false);
                popupTriggerMobile[item].addEventListener("click", astraNavMenuToggle, false);
                popupTriggerMobile[item].trigger_type = "mobile";
            }
            for (var item = 0; item < popupTriggerDesktop.length; item++) {
                popupTriggerDesktop[item].removeEventListener("click", popupTriggerClick, false);
                popupTriggerDesktop[item].addEventListener("click", astraNavMenuToggle, false);
                popupTriggerDesktop[item].trigger_type = "desktop";
            }
            AstraToggleSetup();
        }
        accountPopupTrigger();
    }
    function triggerToggleClose(event) {
        var headerType = event.currentTarget.headerType;
        switch (headerType) {
            case "dropdown":
                var popupTrigger = document.querySelectorAll(".menu-toggle.toggled");
                for (var item = 0; item < popupTrigger.length; item++) {
                    popupTrigger[item].click();
                }
                break;
            case "off-canvas":
                var popupClose = document.getElementById("menu-toggle-close");
                popupClose.click();
                break;
            default:
                break;
        }
    }
    window.addEventListener("load", function () {
        init();
    });
    document.addEventListener("astLayoutWidthChanged", function () {
        init();
    });
    document.addEventListener("astPartialContentRendered", function () {
        menu_toggle_all = document.querySelectorAll(".main-header-menu-toggle");
        body.classList.remove("ast-main-header-nav-open");
        document.addEventListener("astMobileHeaderTypeChange", updateHeaderType, false);
        init();
        accountPopupTrigger();
    });
    var mobile_width = null !== navigator.userAgent.match(/Android/i) && "Android" === navigator.userAgent.match(/Android/i)[0] ? window.visualViewport.width : window.innerWidth;
    function AstraHandleResizeEvent() {
        var menu_offcanvas_close = document.getElementById("menu-toggle-close");
        var menu_dropdown_close = document.querySelector(".menu-toggle.toggled");
        var desktop_header_content = document.querySelector("#masthead > #ast-desktop-header .ast-desktop-header-content");
        var elementor_editor = document.querySelector(".elementor-editor-active");
        if (desktop_header_content) {
            desktop_header_content.style.display = "none";
        }
        var mobileResizeWidth = null !== navigator.userAgent.match(/Android/i) && "Android" === navigator.userAgent.match(/Android/i)[0] ? window.visualViewport.width : window.innerWidth;
        if (mobileResizeWidth !== mobile_width) {
            if (menu_dropdown_close && null === elementor_editor) {
                menu_dropdown_close.click();
            }
            document.body.classList.remove("ast-main-header-nav-open", "ast-popup-nav-open");
            if (menu_offcanvas_close && null == elementor_editor) {
                menu_offcanvas_close.click();
            }
        }
        updateHeaderBreakPoint();
        AstraToggleSetup();
    }
    window.addEventListener("resize", function () {
        if ("INPUT" !== document.activeElement.tagName) {
            AstraHandleResizeEvent();
        }
    });
    document.addEventListener("DOMContentLoaded", function () {
        AstraToggleSetup();
        var containerButton;
        if (body.classList.contains("ast-header-break-point")) {
            containerButton = document.getElementById("ast-mobile-header");
        } else {
            containerButton = document.getElementById("ast-desktop-header");
        }
        if (null !== containerButton) {
            var containerMenu = containerButton.querySelector(".navigation-accessibility");
            navigation_accessibility(containerMenu, containerButton);
        }
    });
    var get_window_width = function () {
        return document.documentElement.clientWidth;
    };
    var updateHeaderBreakPoint = function () {
        var originalOverflow = body.style.overflow;
        body.style.overflow = "hidden";
        var ww = get_window_width();
        body.style.overflow = originalOverflow;
        var break_point = astra.break_point;
        if (ww > break_point || 0 === ww) {
            if (menu_toggle_all.length > 0) {
                for (var i = 0; i < menu_toggle_all.length; i++) {
                    if (null !== menu_toggle_all[i]) {
                        menu_toggle_all[i].classList.remove("toggled");
                    }
                }
            }
            body.classList.remove("ast-header-break-point");
            body.classList.add("ast-desktop");
            astraTriggerEvent(body, "astra-header-responsive-enabled");
        } else {
            body.classList.add("ast-header-break-point");
            body.classList.remove("ast-desktop");
            astraTriggerEvent(body, "astra-header-responsive-disabled");
        }
    };
    var accountPopupTrigger = function () {
        var header_account_trigger = document.querySelectorAll(".ast-account-action-login");
        if (undefined !== header_account_trigger) {
            var header_account__close_trigger = document.querySelectorAll("#ast-hb-login-close");
            var login_popup = document.querySelectorAll("#ast-hb-account-login-wrap");
            if (0 < header_account__close_trigger.length) {
                for (let index = 0; index < header_account_trigger.length; index++) {
                    header_account_trigger[index].onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (!login_popup[index].classList.contains("show")) {
                            login_popup[index].classList.add("show");
                        }
                    };
                    header_account__close_trigger[index].onclick = function (event) {
                        event.preventDefault();
                        login_popup[index].classList.remove("show");
                    };
                }
            }
        }
    };
    updateHeaderBreakPoint();
    AstraToggleSubMenu = function (event) {
        event.preventDefault();
        if ("false" === event.target.getAttribute("aria-expanded") || !event.target.getAttribute("aria-expanded")) {
            event.target.setAttribute("aria-expanded", "true");
        } else {
            event.target.setAttribute("aria-expanded", "false");
        }
        var parent_li = this.parentNode;
        if (parent_li.classList.contains("ast-submenu-expanded") && document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-link")) {
            if (!this.classList.contains("ast-menu-toggle")) {
                var link = parent_li.querySelector("a").getAttribute("href");
                if ("" !== link && "#" !== link) {
                    window.location = link;
                }
            }
        }
        var parent_li_child = parent_li.querySelectorAll(".menu-item-has-children");
        for (var j = 0; j < parent_li_child.length; j++) {
            parent_li_child[j].classList.remove("ast-submenu-expanded");
            var parent_li_child_sub_menu = parent_li_child[j].querySelector(".sub-menu, .children");
            if (null !== parent_li_child_sub_menu) {
                parent_li_child_sub_menu.style.display = "none";
            }
        }
        var parent_li_sibling = parent_li.parentNode.querySelectorAll(".menu-item-has-children");
        for (var j = 0; j < parent_li_sibling.length; j++) {
            if (parent_li_sibling[j] != parent_li) {
                parent_li_sibling[j].classList.remove("ast-submenu-expanded");
                var all_sub_menu = parent_li_sibling[j].querySelectorAll(".sub-menu");
                for (var k = 0; k < all_sub_menu.length; k++) {
                    all_sub_menu[k].style.display = "none";
                }
            }
        }
        if (parent_li.classList.contains("menu-item-has-children")) {
            astraToggleClass(parent_li, "ast-submenu-expanded");
            if (parent_li.classList.contains("ast-submenu-expanded")) {
                parent_li.querySelector(".sub-menu").style.display = "block";
            } else {
                parent_li.querySelector(".sub-menu").style.display = "none";
            }
        }
    };
    AstraToggleSetup = function () {
        if (typeof astraAddon != "undefined" && typeof astraToggleSetupPro === "function") {
            astraToggleSetupPro(mobileHeaderType, body, menu_click_listeners_nav);
        } else {
            var flag = false;
            var menuToggleAllLength;
            if ("off-canvas" === mobileHeaderType || "full-width" === mobileHeaderType) {
                var __main_header_all = document.querySelectorAll("#ast-mobile-popup, #ast-mobile-header");
                var menu_toggle_all = document.querySelectorAll("#ast-mobile-header .main-header-menu-toggle");
                menuToggleAllLength = menu_toggle_all.length;
            } else {
                var __main_header_all = document.querySelectorAll("#ast-mobile-header"),
                    menu_toggle_all = document.querySelectorAll("#ast-mobile-header .main-header-menu-toggle");
                menuToggleAllLength = menu_toggle_all.length;
                flag = menuToggleAllLength > 0 ? false : true;
                menuToggleAllLength = flag ? 1 : menuToggleAllLength;
            }
            if (menuToggleAllLength > 0 || flag) {
                for (var i = 0; i < menuToggleAllLength; i++) {
                    if (!flag) {
                        menu_toggle_all[i].setAttribute("data-index", i);
                        if (!menu_click_listeners_nav[i]) {
                            menu_click_listeners_nav[i] = menu_toggle_all[i];
                            menu_toggle_all[i].addEventListener("click", astraNavMenuToggle, false);
                        }
                    }
                    if ("undefined" !== typeof __main_header_all[i]) {
                        for (var mainHeaderCount = 0; mainHeaderCount < __main_header_all.length; mainHeaderCount++) {
                            if (document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-link")) {
                                var astra_menu_toggle = __main_header_all[mainHeaderCount].querySelectorAll("ul.main-header-menu .menu-item-has-children > .menu-link, ul.main-header-menu .ast-menu-toggle");
                            } else {
                                var astra_menu_toggle = __main_header_all[mainHeaderCount].querySelectorAll("ul.main-header-menu .ast-menu-toggle");
                            }
                            if (astra_menu_toggle.length > 0) {
                                for (var j = 0; j < astra_menu_toggle.length; j++) {
                                    astra_menu_toggle[j].addEventListener("click", AstraToggleSubMenu, false);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    astraNavMenuToggle = function (event) {
        if (typeof astraAddon != "undefined") {
            astraNavMenuTogglePro(event, body, mobileHeaderType, this);
        } else {
            event.preventDefault();
            var __main_header_all = document.querySelectorAll("#masthead > #ast-mobile-header .main-header-bar-navigation");
            menu_toggle_all = document.querySelectorAll("#masthead > #ast-mobile-header .main-header-menu-toggle");
            var event_index = "0";
            if (null !== this.closest("#ast-fixed-header")) {
                __main_header_all = document.querySelectorAll("#ast-fixed-header > #ast-mobile-header .main-header-bar-navigation");
                menu_toggle_all = document.querySelectorAll("#ast-fixed-header .main-header-menu-toggle");
                event_index = "0";
            }
            if ("undefined" === typeof __main_header_all[event_index]) {
                return false;
            }
            var menuHasChildren = __main_header_all[event_index].querySelectorAll(".menu-item-has-children");
            for (var i = 0; i < menuHasChildren.length; i++) {
                menuHasChildren[i].classList.remove("ast-submenu-expanded");
                var menuHasChildrenSubMenu = menuHasChildren[i].querySelectorAll(".sub-menu");
                for (var j = 0; j < menuHasChildrenSubMenu.length; j++) {
                    menuHasChildrenSubMenu[j].style.display = "none";
                }
            }
            var menu_class = this.getAttribute("class") || "";
            if (menu_class.indexOf("main-header-menu-toggle") !== -1) {
                astraToggleClass(__main_header_all[event_index], "toggle-on");
                astraToggleClass(menu_toggle_all[event_index], "toggled");
                if (__main_header_all[event_index].classList.contains("toggle-on")) {
                    __main_header_all[event_index].style.display = "block";
                    body.classList.add("ast-main-header-nav-open");
                } else {
                    __main_header_all[event_index].style.display = "";
                    body.classList.remove("ast-main-header-nav-open");
                }
            }
        }
    };
    body.addEventListener(
        "astra-header-responsive-enabled",
        function () {
            var __main_header_all = document.querySelectorAll(".main-header-bar-navigation");
            if (__main_header_all.length > 0) {
                for (var i = 0; i < __main_header_all.length; i++) {
                    if (null != __main_header_all[i]) {
                        __main_header_all[i].classList.remove("toggle-on");
                        __main_header_all[i].style.display = "";
                    }
                    var sub_menu = __main_header_all[i].getElementsByClassName("sub-menu");
                    for (var j = 0; j < sub_menu.length; j++) {
                        sub_menu[j].style.display = "";
                    }
                    var child_menu = __main_header_all[i].getElementsByClassName("children");
                    for (var k = 0; k < child_menu.length; k++) {
                        child_menu[k].style.display = "";
                    }
                    var searchIcons = __main_header_all[i].getElementsByClassName("ast-search-menu-icon");
                    for (var l = 0; l < searchIcons.length; l++) {
                        searchIcons[l].classList.remove("ast-dropdown-active");
                        searchIcons[l].style.display = "";
                    }
                }
            }
        },
        false
    );
    var get_browser = function () {
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return;
        }
        if ("Chrome" === M[1]) {
            tem = ua.match(/\bOPR|Edge\/(\d+)/);
            if (tem != null) {
                return;
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1]);
        }
        if ("Safari" === M[0] && M[1] < 11) {
            document.body.classList.add("ast-safari-browser-less-than-11");
        }
    };
    get_browser();
    var SearchIcons = document.getElementsByClassName("astra-search-icon");
    for (var i = 0; i < SearchIcons.length; i++) {
        SearchIcons[i].onclick = function (event) {
            if (this.classList.contains("slide-search")) {
                event.preventDefault();
                var sibling = this.parentNode.parentNode.parentNode.querySelector(".ast-search-menu-icon");
                if (!sibling.classList.contains("ast-dropdown-active")) {
                    sibling.classList.add("ast-dropdown-active");
                    sibling.querySelector(".search-field").setAttribute("autocomplete", "off");
                    setTimeout(function () {
                        sibling.querySelector(".search-field").focus();
                    }, 200);
                } else {
                    var searchTerm = sibling.querySelector(".search-field").value || "";
                    if ("" !== searchTerm) {
                        sibling.querySelector(".search-form").submit();
                    }
                    sibling.classList.remove("ast-dropdown-active");
                }
            }
        };
    }
    var SearchInputs = document.querySelectorAll(".search-field");
    SearchInputs.forEach((input) => {
        input.addEventListener("focus", function (e) {
            var sibling = this.parentNode.parentNode.parentNode.querySelector(".ast-search-menu-icon");
            if (sibling) {
                astraToggleClass(sibling, "ast-dropdown-active");
            }
        });
        input.addEventListener("blur", function (e) {
            var sibling = this.parentNode.parentNode.parentNode.querySelector(".ast-search-menu-icon");
            if (sibling) {
                sibling.classList.remove("ast-dropdown-active");
                astraToggleClass(sibling, "ast-dropdown-active");
            }
        });
    });
    body.onclick = function (event) {
        if (typeof event.target.classList !== "undefined") {
            if (!event.target.classList.contains("ast-search-menu-icon") && astraGetParents(event.target, ".ast-search-menu-icon").length === 0 && astraGetParents(event.target, ".ast-search-icon").length === 0) {
                var dropdownSearchWrap = document.getElementsByClassName("ast-search-menu-icon");
                for (var i = 0; i < dropdownSearchWrap.length; i++) {
                    dropdownSearchWrap[i].classList.remove("ast-dropdown-active");
                }
            }
        }
    };
    function navigation_accessibility(containerMenu, containerButton) {
        if (!containerMenu || !containerButton) {
            return;
        }
        var button = containerButton.getElementsByTagName("button")[0];
        if ("undefined" === typeof button) {
            button = containerButton.getElementsByTagName("a")[0];
            var search_type = button.classList.contains("astra-search-icon");
            if (true === search_type) {
                return;
            }
            if ("undefined" === typeof button) {
                return;
            }
        }
        var menu = containerMenu.getElementsByTagName("ul")[0];
        if ("undefined" === typeof menu) {
            button.style.display = "none";
            return;
        }
        if (-1 === menu.className.indexOf("nav-menu")) {
            menu.className += " nav-menu";
        }
        document.addEventListener("DOMContentLoaded", function () {
            if ("off-canvas" === mobileHeaderType) {
                var popupClose = document.getElementById("menu-toggle-close");
                if (popupClose) {
                    popupClose.onclick = function () {
                        if (-1 !== containerMenu.className.indexOf("toggled")) {
                            containerMenu.className = containerMenu.className.replace(" toggled", "");
                            button.setAttribute("aria-expanded", "false");
                            menu.setAttribute("aria-expanded", "false");
                        } else {
                            containerMenu.className += " toggled";
                            button.setAttribute("aria-expanded", "true");
                            menu.setAttribute("aria-expanded", "true");
                        }
                    };
                }
            }
        });
        button.onclick = function () {
            if (-1 !== containerMenu.className.indexOf("toggled")) {
                containerMenu.className = containerMenu.className.replace(" toggled", "");
                button.setAttribute("aria-expanded", "false");
                menu.setAttribute("aria-expanded", "false");
            } else {
                containerMenu.className += " toggled";
                button.setAttribute("aria-expanded", "true");
                menu.setAttribute("aria-expanded", "true");
            }
        };
        if (!astra.is_header_footer_builder_active) {
            var links = menu.getElementsByTagName("a");
            var subMenus = menu.getElementsByTagName("ul");
            for (var i = 0, len = subMenus.length; i < len; i++) {
                subMenus[i].parentNode.setAttribute("aria-haspopup", "true");
            }
            for (i = 0, len = links.length; i < len; i++) {
                links[i].addEventListener("focus", toggleFocus, true);
                links[i].addEventListener("blur", toggleFocus, true);
                links[i].addEventListener("click", toggleClose, true);
            }
        }
        if (astra.is_header_footer_builder_active) {
            tabNavigation();
        }
    }
    function tabNavigation() {
        const dropdownToggleLinks = document.querySelectorAll("nav.site-navigation .menu-item-has-children > a .ast-header-navigation-arrow");
        const siteNavigationSubMenu = document.querySelectorAll("nav.site-navigation .sub-menu");
        const menuLi = document.querySelectorAll("nav.site-navigation .menu-item-has-children");
        const megaMenuFullWidth = document.querySelectorAll(".astra-full-megamenu-wrapper");
        if (dropdownToggleLinks) {
            dropdownToggleLinks.forEach((element) => {
                element.addEventListener("keydown", function (e) {
                    if ("Enter" === e.key) {
                        if (!e.target.closest("li").querySelector(".sub-menu").classList.contains("astra-megamenu")) {
                            setTimeout(() => {
                                e.target.closest("li").querySelector(".sub-menu").classList.toggle("toggled-on");
                                e.target.closest("li").classList.toggle("ast-menu-hover");
                                if ("false" === e.target.getAttribute("aria-expanded") || !e.target.getAttribute("aria-expanded")) {
                                    e.target.setAttribute("aria-expanded", "true");
                                } else {
                                    e.target.setAttribute("aria-expanded", "false");
                                }
                            }, 10);
                        } else {
                            setTimeout(() => {
                                const subMenuTarget = e.target.closest("li").querySelector(".sub-menu");
                                const fullMegaMenuWrapper = e.target.closest("li").querySelector(".astra-full-megamenu-wrapper");
                                if (subMenuTarget) {
                                    subMenuTarget.classList.toggle("astra-megamenu-focus");
                                }
                                if (fullMegaMenuWrapper) {
                                    fullMegaMenuWrapper.classList.toggle("astra-megamenu-wrapper-focus");
                                }
                                e.target.closest("li").classList.toggle("ast-menu-hover");
                                if ("false" === e.target.getAttribute("aria-expanded") || !e.target.getAttribute("aria-expanded")) {
                                    e.target.setAttribute("aria-expanded", "true");
                                } else {
                                    e.target.setAttribute("aria-expanded", "false");
                                }
                            }, 10);
                        }
                    }
                });
            });
            if (siteNavigationSubMenu || menuLi) {
                document.addEventListener(
                    "click",
                    function (e) {
                        closeNavigationMenu(siteNavigationSubMenu, dropdownToggleLinks, menuLi, megaMenuFullWidth);
                    },
                    false
                );
            }
            if (siteNavigationSubMenu || menuLi) {
                document.addEventListener(
                    "keydown",
                    function (e) {
                        if ("Escape" === e.key) {
                            closeNavigationMenu(siteNavigationSubMenu, dropdownToggleLinks, menuLi, megaMenuFullWidth);
                        }
                    },
                    false
                );
            }
        }
        const allParentMenu = document.querySelectorAll("nav.site-navigation .ast-nav-menu > .menu-item-has-children > a .ast-header-navigation-arrow");
        if (allParentMenu) {
            allParentMenu.forEach((element) => {
                element.addEventListener(
                    "keydown",
                    function (e) {
                        if (!e.target.closest("li").classList.contains("ast-menu-hover") && "Enter" === e.key) {
                            closeNavigationMenu(siteNavigationSubMenu, dropdownToggleLinks, menuLi, megaMenuFullWidth);
                        }
                    },
                    false
                );
            });
        }
    }
    function closeNavigationMenu(siteNavigationSubMenu, dropdownToggleLinks, menuLi, megaMenuFullWidth) {
        if (siteNavigationSubMenu) {
            siteNavigationSubMenu.forEach((element) => {
                element.classList.remove("astra-megamenu-focus");
                element.classList.remove("toggled-on");
            });
        }
        if (menuLi) {
            menuLi.forEach((element) => {
                element.classList.remove("ast-menu-hover");
            });
        }
        if (megaMenuFullWidth) {
            megaMenuFullWidth.forEach((element) => {
                element.classList.remove("astra-megamenu-wrapper-focus");
            });
        }
        if (dropdownToggleLinks) {
            dropdownToggleLinks.forEach((element) => {
                element.setAttribute("aria-expanded", "false");
            });
        }
    }
    function toggleClose() {
        var self = this || "",
            hash = "#";
        if (self && !self.classList.contains("astra-search-icon") && null === self.closest(".ast-builder-menu")) {
            var link = new String(self);
            if (link.indexOf(hash) !== -1) {
                var link_parent = self.parentNode;
                if (body.classList.contains("ast-header-break-point")) {
                    if (!(document.querySelector("header.site-header").classList.contains("ast-builder-menu-toggle-link") && link_parent.classList.contains("menu-item-has-children"))) {
                        var builder_header_menu_toggle = document.querySelector(".main-header-menu-toggle");
                        builder_header_menu_toggle.classList.remove("toggled");
                        var main_header_bar_navigation = document.querySelector(".main-header-bar-navigation");
                        main_header_bar_navigation.classList.remove("toggle-on");
                        main_header_bar_navigation.style.display = "none";
                        astraTriggerEvent(document.querySelector("body"), "astraMenuHashLinkClicked");
                    }
                } else {
                    while (-1 === self.className.indexOf("nav-menu")) {
                        if ("li" === self.tagName.toLowerCase()) {
                            if (-1 !== self.className.indexOf("focus")) {
                                self.className = self.className.replace(" focus", "");
                            }
                        }
                        self = self.parentElement;
                    }
                }
            }
        }
    }
    function toggleFocus() {
        var self = this;
        while (-1 === self.className.indexOf("navigation-accessibility")) {
            if ("li" === self.tagName.toLowerCase()) {
                self.classList.toggle("focus");
            }
            self = self.parentElement;
        }
    }
    if (!astra.is_header_footer_builder_active) {
        if ("querySelector" in document && "addEventListener" in window) {
            body.addEventListener("mousedown", function () {
                body.classList.add("ast-mouse-clicked");
            });
            body.addEventListener("keydown", function () {
                body.classList.remove("ast-mouse-clicked");
            });
        }
    }
    if (astra.is_scroll_to_id) {
        const links = document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"]):not([href*="uagb-tab"]):not(.uagb-toc-link__trigger):not(.skip-link):not(.nav-links a)');
        if (links) {
            for (const link of links) {
                if (link.hash !== "") {
                    link.addEventListener("click", scrollToIDHandler);
                }
            }
        }
        function scrollToIDHandler(e) {
            let offset = 0;
            const siteHeader = document.querySelector(".site-header");
            if (siteHeader) {
                const headerHeight = siteHeader.querySelectorAll("div[data-stick-support]");
                if (headerHeight) {
                    headerHeight.forEach((single) => {
                        offset += single.clientHeight;
                    });
                }
                const href = this.hash;
                if (href) {
                    const scrollId = document.querySelector(href);
                    if (scrollId) {
                        const scrollOffsetTop = scrollId.offsetTop - offset;
                        if (scrollOffsetTop) {
                            astraSmoothScroll(e, scrollOffsetTop);
                        }
                    }
                }
            }
        }
    }
    if (astra.is_scroll_to_top) {
        var masthead = document.querySelector("#page header");
        var astScrollTop = document.getElementById("ast-scroll-top");
        astScrollToTopHandler(masthead, astScrollTop);
        window.addEventListener("scroll", function () {
            astScrollToTopHandler(masthead, astScrollTop);
        });
        astScrollTop.onclick = function (e) {
            astraSmoothScroll(e, 0);
        };
        astScrollTop.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                astraSmoothScroll(e, 0);
            }
        });
    }
})();
