/*
 CookieConsent v2.6.2
 https://www.github.com/orestbida/cookieconsent
 Author Orest Bida
 Released under the MIT License
*/
(function(){function Xa(Ya){function Ga(a,b){return a.classList?a.classList.contains(b):!!a.className.match(new RegExp("(\\s|^)"+b+"(\\s|$)"))}function ua(a,b){a.classList?a.classList.remove(b):a.className=a.className.replace(new RegExp("(\\s|^)"+b+"(\\s|$)")," ")}function F(a,b){a.classList?a.classList.add(b):Ga(a,b)||(a.className+=" "+b)}function ha(a){if("object"===typeof a){var b=[],c=0;for(b[c++]in a);return b}}function G(a,b,c,d){a.addEventListener?!0===d?a.addEventListener(b,c,{passive:!0}):
a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)}function Ha(a,b,c){b=b?b:"/";for(var d=0;d<a.length;d++)for(var e=0;e<c.length;e++)document.cookie=a[d]+"=; path="+b+(-1<c[e].indexOf(".")?"; domain="+c[e]:"")+"; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"}function ia(a,b,c){var d;if("one"===b){if((d=(d=document.cookie.match("(^|;)\\s*"+a+"\\s*=\\s*([^;]+)"))?c?d.pop():a:"")&&a===S){try{d=JSON.parse(d)}catch(e){d=JSON.parse(decodeURIComponent(d))}d=JSON.stringify(d)}}else if("all"===b)for(a=document.cookie.split(/;\s*/),
d=[],b=0;b<a.length;b++)d.push(a[b].split("=")[0]);return d}function va(a,b){b=ja?encodeURIComponent(b):b;var c=new Date;c.setTime(c.getTime()+864E5*Ia);a=a+"="+(b||"")+("; expires="+c.toUTCString())+"; Path="+Ja+";";a+=" SameSite="+Ka+";";-1<window.location.hostname.indexOf(".")&&(a+=" Domain="+T+";");"https:"===window.location.protocol&&(a+=" Secure;");document.cookie=a}function La(){if(Ma){var a=Na,b=r.level||[],c=function(d,e){if(e<d.length){var g=d[e],l=g.getAttribute("data-cookiecategory");
if(-1<H(b,l)){g.type="text/javascript";g.removeAttribute("data-cookiecategory");l=g.getAttribute("data-src");var k=f("script");k.textContent=g.innerHTML;(function(t,m){for(var p=m.attributes,W=p.length,J=0;J<W;J++)m=p[J],t.setAttribute(m.nodeName,m.nodeValue)})(k,g);l?k.src=l:l=g.src;l&&(a?k.readyState?k.onreadystatechange=function(){if("loaded"===k.readyState||"complete"===k.readyState)k.onreadystatechange=null,c(d,++e)}:k.onload=function(){k.onload=null;c(d,++e)}:l=!1);g.parentNode.replaceChild(k,
g);if(l)return}c(d,++e)}};c(document.querySelectorAll("script[data-cookiecategory]"),0)}}function Oa(a,b){function c(e,g,l,k,t,m,p){m=m&&m.split(" ")||[];if(-1<H(g,t)&&(F(e,t),("bar"!==t||"middle"!==m[0])&&-1<H(l,m[0])))for(g=0;g<m.length;g++)F(e,m[g]);-1<H(k,p)&&F(e,p)}if("object"===typeof a){var d=a.consent_modal;a=a.settings_modal;U&&d&&c(w,["box","bar","cloud"],["top","middle","bottom"],["zoom","slide"],d.layout,d.position,d.transition);!b&&a&&c(I,["bar"],["left","right"],["zoom","slide"],a.layout,
a.position,a.transition)}}function Za(){var a=!1,b=!1;G(document,"keydown",function(c){c=c||window.event;"Tab"===c.key&&(u&&(c.shiftKey?document.activeElement===u[0]&&(u[1].focus(),c.preventDefault()):document.activeElement===u[1]&&(u[0].focus(),c.preventDefault()),b||ka||(b=!0,!a&&c.preventDefault(),c.shiftKey?u[3]?u[2]?u[2].focus():u[0].focus():u[1].focus():u[3]?u[3].focus():u[0].focus())),!b&&(a=!0))});document.contains&&G(M,"click",function(c){c=c||window.event;wa?O.contains(c.target)?ka=!0:(h.hideSettings(0),
ka=!1):la&&w.contains(c.target)&&(ka=!0)},!0)}function f(a){var b=document.createElement(a);"button"===a&&b.setAttribute("type",a);return b}function H(a,b){for(var c=a.length,d=0;d<c;d++)if(a[d]===b)return d;return-1}function $a(a,b){if("string"!==typeof a||""===a||document.getElementById("cc--style"))b();else{var c=f("style");c.id="cc--style";var d=new XMLHttpRequest;d.onreadystatechange=function(){4===this.readyState&&200===this.status&&(c.setAttribute("type","text/css"),c.styleSheet?c.styleSheet.cssText=
this.responseText:c.appendChild(document.createTextNode(this.responseText)),document.getElementsByTagName("head")[0].appendChild(c),b())};d.open("GET",a);d.send()}}function ab(a){var b=document.querySelectorAll(".c-tgl")||[],c=[],d=!1;if(0<b.length){for(var e=0;e<b.length;e++)-1!==H(a,N[e])?(b[e].checked=!0,P[e]||(c.push(N[e]),P[e]=!0)):(b[e].checked=!1,P[e]&&(c.push(N[e]),P[e]=!1));if(Pa&&V&&0<c.length){b=x.length;e=-1;var g=ia("","all"),l=[T,"."+T];if("www."===T.slice(0,4)){var k=T.substr(4);l.push(k);
l.push("."+k)}for(k=0;k<b;k++){var t=x[k];if(Object.prototype.hasOwnProperty.call(t,"toggle")&&!P[++e]&&Object.prototype.hasOwnProperty.call(t,"cookie_table")&&-1<H(c,t.toggle.value)){var m=t.cookie_table,p=ha(X[0])[0],W=m.length;"on_disable"===t.toggle.reload&&(d=!0);for(var J=0;J<W;J++){var K=m[J],n=[],v=K[p],y=K.is_regex||!1,q=K.domain||null;K=K.path||!1;q&&(l=[q,"."+q]);if(y)for(y=0;y<g.length;y++)g[y].match(v)&&n.push(g[y]);else v=H(g,v),-1<v&&n.push(g[v]);0<n.length&&(Ha(n,K,l),"on_clear"===
t.toggle.reload&&(d=!0))}}}}}r={level:a,revision:pa,data:C,rfc_cookie:ja};if(!V||0<c.length||!Y)Y=!0,va(S,JSON.stringify(r)),La();if("function"===typeof xa&&!V)return V=!0,xa(r);"function"===typeof ya&&0<c.length&&ya(r,c);d&&window.location.reload()}function bb(a,b){M=f("div");M.id="cc--main";M.style.position="fixed";M.style.zIndex="1000000";M.innerHTML='\x3c!--[if lt IE 9 ]><div id="cc_div" class="cc_div ie"></div><![endif]--\x3e\x3c!--[if (gt IE 8)|!(IE)]>\x3c!--\x3e<div id="cc_div" class="cc_div"></div>\x3c!--<![endif]--\x3e';
var c=M.children[0],d=L,e="string"===typeof ca.textContent?"textContent":"innerText";za=b;Aa=function(z){!0===z.force_consent&&F(ca,"force--consent");var Q=z.languages[d].consent_modal.description;Ba&&(Q=Y?Q.replace("{{revision_message}}",""):Q.replace("{{revision_message}}",Qa||z.languages[d].consent_modal.revision_message||""));if(w)ma.innerHTML=Q;else{w=f("div");var Z=f("div"),qa=f("div"),na=f("div");ma=f("div");var ra=f("div"),oa=f("button"),da=f("button"),sa=f("div");w.id="cm";Z.id="c-inr";qa.id=
"c-inr-i";na.id="c-ttl";ma.id="c-txt";ra.id="c-bns";oa.id="c-p-bn";da.id="c-s-bn";sa.id="cm-ov";oa.className="c-bn";da.className="c-bn c_link";na.setAttribute("role","heading");na.setAttribute("aria-level","2");w.setAttribute("role","dialog");w.setAttribute("aria-modal","true");w.setAttribute("aria-hidden","false");w.setAttribute("aria-labelledby","c-ttl");w.setAttribute("aria-describedby","c-txt");w.style.visibility=sa.style.visibility="hidden";sa.style.opacity=0;na.insertAdjacentHTML("beforeend",
z.languages[d].consent_modal.title);ma.insertAdjacentHTML("beforeend",Q);oa[e]=z.languages[d].consent_modal.primary_btn.text;da[e]=z.languages[d].consent_modal.secondary_btn.text;var Ra;"accept_all"===z.languages[d].consent_modal.primary_btn.role&&(Ra="all");G(oa,"click",function(){h.hide();h.accept(Ra)});"accept_necessary"===z.languages[d].consent_modal.secondary_btn.role?G(da,"click",function(){h.hide();h.accept([])}):G(da,"click",function(){h.showSettings(0)});qa.appendChild(na);qa.appendChild(ma);
ra.appendChild(oa);ra.appendChild(da);Z.appendChild(qa);Z.appendChild(ra);w.appendChild(Z);c.appendChild(w);c.appendChild(sa);U=!0}};a||Aa(b);I=f("div");var g=f("div"),l=f("div"),k=f("div");O=f("div");var t=f("div"),m=f("div"),p=f("button"),W=f("div"),J=f("div"),K=f("div");I.id="s-cnt";g.id="c-vln";k.id="c-s-in";l.id="cs";t.id="s-ttl";O.id="s-inr";m.id="s-hdr";J.id="s-bl";p.id="s-c-bn";K.id="cs-ov";W.id="s-c-bnc";p.className="c-bn";p.setAttribute("aria-label",b.languages[d].settings_modal.close_btn_label||
"Close");I.setAttribute("role","dialog");I.setAttribute("aria-modal","true");I.setAttribute("aria-hidden","true");I.setAttribute("aria-labelledby","s-ttl");t.setAttribute("role","heading");I.style.visibility=K.style.visibility="hidden";K.style.opacity=0;W.appendChild(p);G(g,"keydown",function(z){z=z||window.event;27===z.keyCode&&h.hideSettings(0)},!0);G(p,"click",function(){h.hideSettings(0)});x=b.languages[L].settings_modal.blocks;X=b.languages[L].settings_modal.cookie_table_headers;p=x.length;t.insertAdjacentHTML("beforeend",
b.languages[L].settings_modal.title);for(var n=0;n<p;++n){var v=f("div"),y=f("div"),q=f("div"),D=f("div");v.className="c-bl";y.className="desc";q.className="p";D.className="title";q.insertAdjacentHTML("beforeend",x[n].description);if("undefined"!==typeof x[n].toggle){var A="c-ac-"+n,aa=f("button"),E=f("label"),B=f("input"),R=f("span"),ba=f("span"),ea=f("span"),Sa=f("span");aa.className="b-tl";E.className="b-tg";B.className="c-tgl";ea.className="on-i";Sa.className="off-i";R.className="c-tg";ba.className=
"t-lb";aa.setAttribute("aria-expanded","false");aa.setAttribute("aria-controls",A);B.type="checkbox";R.setAttribute("aria-hidden","true");var Ca=x[n].toggle.value;B.value=Ca;ba[e]=x[n].title;aa.insertAdjacentHTML("beforeend",x[n].title);D.appendChild(aa);R.appendChild(ea);R.appendChild(Sa);a?-1<H(r.level,Ca)?(B.checked=!0,P.push(!0)):P.push(!1):x[n].toggle.enabled?(B.checked=!0,P.push(!0)):P.push(!1);N.push(Ca);x[n].toggle.readonly?(B.disabled=!0,F(R,"c-ro"),Da.push(!0)):Da.push(!1);F(y,"b-acc");
F(D,"b-bn");F(v,"b-ex");y.id=A;y.setAttribute("aria-hidden","true");E.appendChild(B);E.appendChild(R);E.appendChild(ba);D.appendChild(E);(function(z,Q,Z){G(aa,"click",function(){Ga(Q,"act")?(ua(Q,"act"),Z.setAttribute("aria-expanded","false"),z.setAttribute("aria-hidden","true")):(F(Q,"act"),Z.setAttribute("aria-expanded","true"),z.setAttribute("aria-hidden","false"))},!1)})(y,v,aa)}else A=f("div"),A.className="b-tl",A.setAttribute("role","heading"),A.setAttribute("aria-level","3"),A.insertAdjacentHTML("beforeend",
x[n].title),D.appendChild(A);v.appendChild(D);y.appendChild(q);if(!0!==b.remove_cookie_tables&&"undefined"!==typeof x[n].cookie_table){A=document.createDocumentFragment();for(E=0;E<X.length;++E)B=f("th"),q=X[E],B.setAttribute("scope","col"),q&&(D=q&&ha(q)[0],B[e]=X[E][D],A.appendChild(B));q=f("tr");q.appendChild(A);D=f("thead");D.appendChild(q);A=f("table");A.appendChild(D);E=document.createDocumentFragment();for(B=0;B<x[n].cookie_table.length;B++){R=f("tr");for(ba=0;ba<X.length;++ba)if(q=X[ba])D=
ha(q)[0],ea=f("td"),ea.insertAdjacentHTML("beforeend",x[n].cookie_table[B][D]),ea.setAttribute("data-column",q[D]),R.appendChild(ea);E.appendChild(R)}q=f("tbody");q.appendChild(E);A.appendChild(q);y.appendChild(A)}v.appendChild(y);J.appendChild(v)}a=f("div");p=f("button");n=f("button");a.id="s-bns";p.id="s-sv-bn";n.id="s-all-bn";p.className="c-bn";n.className="c-bn";p.insertAdjacentHTML("beforeend",b.languages[L].settings_modal.save_settings_btn);n.insertAdjacentHTML("beforeend",b.languages[L].settings_modal.accept_all_btn);
a.appendChild(n);if(b=b.languages[L].settings_modal.reject_all_btn)v=f("button"),v.id="s-rall-bn",v.className="c-bn",v.insertAdjacentHTML("beforeend",b),G(v,"click",function(){h.hideSettings();h.hide();h.accept([])}),O.className="bns-t",a.appendChild(v);a.appendChild(p);G(p,"click",function(){h.hideSettings();h.hide();h.accept()});G(n,"click",function(){h.hideSettings();h.hide();h.accept("all")});m.appendChild(t);m.appendChild(W);O.appendChild(m);O.appendChild(J);O.appendChild(a);k.appendChild(O);
l.appendChild(k);g.appendChild(l);I.appendChild(g);c.appendChild(I);c.appendChild(K);(Ya||document.body).appendChild(M)}function Ta(){function a(c,d){var e=!1,g=!1;try{for(var l=c.querySelectorAll(b.join(':not([tabindex="-1"]), ')),k,t=l.length,m=0;m<t;)k=l[m].getAttribute("data-focus"),g||"1"!==k?"0"===k&&(e=l[m],g||"0"===l[m+1].getAttribute("data-focus")||(g=l[m+1])):g=l[m],m++}catch(p){return c.querySelectorAll(b.join(", "))}d[0]=l[0];d[1]=l[l.length-1];d[2]=e;d[3]=g}var b=["[href]","button","input",
"details",'[tabindex="0"]'];a(O,fa);U&&a(w,Ea)}function Ua(a,b){if(Object.prototype.hasOwnProperty.call(b,a))return a;if(0<ha(b).length)return Object.prototype.hasOwnProperty.call(b,L)?L:ha(b)[0]}function cb(){for(var a=document.querySelectorAll('a[data-cc="c-settings"], button[data-cc="c-settings"]'),b=0;b<a.length;b++)a[b].setAttribute("aria-haspopup","dialog"),G(a[b],"click",function(c){h.showSettings(0);c.preventDefault?c.preventDefault():c.returnValue=!1})}function db(a){"number"===typeof a.cookie_expiration&&
(Ia=a.cookie_expiration);"boolean"===typeof a.autorun&&(Va=a.autorun);"string"===typeof a.cookie_domain&&(T=a.cookie_domain);"string"===typeof a.cookie_same_site&&(Ka=a.cookie_same_site);"string"===typeof a.cookie_path&&(Ja=a.cookie_path);"string"===typeof a.cookie_name&&(S=a.cookie_name);"function"===typeof a.onAccept&&(xa=a.onAccept);"function"===typeof a.onChange&&(ya=a.onChange);"number"===typeof a.revision&&(-1<a.revision&&(pa=a.revision),Ba=!0);!0===a.autoclear_cookies&&(Pa=!0);!0===a.use_rfc_cookie&&
(ja=!0);!0===a.hide_from_bots&&(Wa=navigator&&(navigator.userAgent&&/bot|crawl|spider|slurp|teoma/i.test(navigator.userAgent)||navigator.g));Ma=!0===a.page_scripts;Na=!1!==a.page_scripts_order;if(!0===a.auto_language){var b=navigator.language||navigator.browserLanguage;2<b.length&&(b=b[0]+b[1]);L=Ua(b.toLowerCase(),a.languages)}else"string"===typeof a.current_lang&&(L=Ua(a.current_lang,a.languages))}var L="en",Va=!0,S="cc_cookie",Ia=182,T=window.location.hostname,Ja="/",Ka="Lax",ja=!1,Pa=!0,pa=0,
Ma,Na,h={},r={},U=!1,V=!1,la=!1,wa=!1,ka=!1,u,X,x,xa,ya,Y=!0,Ba=!1,C=null,Wa=!1,ta,Fa,Ea=[],fa=[],P=[],N=[],Da=[],ca=document.documentElement,M,w,I,O,za,Aa,Qa="",ma;h.allowedCategory=function(a){return-1<H(JSON.parse(ia(S,"one",!0)||"{}").level||[],a)};h.run=function(a){if(!document.getElementById("cc_div")&&(db(a),!Wa&&(r=JSON.parse(ia(S,"one",!0)||"{}"),V=void 0!==r.level,C=void 0!==r.data?r.data:null,Y="number"===typeof a.revision?V?-1<a.revision?r.revision===pa:!0:!0:!0,U=!V||!Y,bb(!U,a),$a(a.theme_css,
function(){Ta();Oa(a.gui_options);cb();Va&&U&&h.show(a.delay||0);setTimeout(function(){F(M,"c--anim")},30);setTimeout(function(){Za()},100)}),V&&Y))){var b="boolean"===typeof r.rfc_cookie;if(!b||b&&r.rfc_cookie!==ja)r.rfc_cookie=ja,va(S,JSON.stringify(r));La();if("function"===typeof a.onAccept)a.onAccept(r)}};h.showSettings=function(a){setTimeout(function(){F(ca,"show--settings");I.setAttribute("aria-hidden","false");wa=!0;setTimeout(function(){la?Fa=document.activeElement:ta=document.activeElement;
0!==fa.length&&(fa[3]?fa[3].focus():fa[0].focus(),u=fa)},200)},0<a?a:0)};h.set=function(a,b){switch(a){case "data":a=b.value;var c=!1;if("update"===b.mode)if(C=h.get("data"),(b=typeof C===typeof a)&&"object"===typeof C){!C&&(C={});for(var d in a)C[d]!==a[d]&&(C[d]=a[d],c=!0)}else!b&&C||C===a||(C=a,c=!0);else C=a,c=!0;c&&(r.data=C,va(S,JSON.stringify(r)));return c;case "revision":return d=b.value,a=b.prompt_consent,b=b.message,M&&"number"===typeof d&&r.revision!==d?(Ba=!0,Qa=b,Y=!1,pa=d,!0===a?(Aa(za),
Oa(za.gui_options,!0),Ta(),h.show()):h.accept(),b=!0):b=!1,b;default:return!1}};h.get=function(a){return JSON.parse(ia(S,"one",!0)||"{}")[a]};h.loadScript=function(a,b,c){var d="function"===typeof b;if(document.querySelector('script[src="'+a+'"]'))d&&b();else{var e=f("script");if(c&&0<c.length)for(var g=0;g<c.length;++g)c[g]&&e.setAttribute(c[g].name,c[g].value);d&&(e.readyState?e.onreadystatechange=function(){if("loaded"===e.readyState||"complete"===e.readyState)e.onreadystatechange=null,b()}:e.onload=
b);e.src=a;(document.head?document.head:document.getElementsByTagName("head")[0]).appendChild(e)}};h.show=function(a){U&&setTimeout(function(){F(ca,"show--consent");w.setAttribute("aria-hidden","false");la=!0;setTimeout(function(){ta=document.activeElement;u=Ea},200)},0<a?a:0)};h.hide=function(){U&&(ua(ca,"show--consent"),w.setAttribute("aria-hidden","true"),la=!1,setTimeout(function(){ta.focus();u=null},200))};h.hideSettings=function(){ua(ca,"show--settings");wa=!1;I.setAttribute("aria-hidden","true");
setTimeout(function(){la?(Fa&&Fa.focus(),u=Ea):(ta.focus(),u=null);ka=!1},200)};h.accept=function(a,b){function c(){for(var g=document.querySelectorAll(".c-tgl")||[],l=[],k=0;k<g.length;k++)g[k].checked&&l.push(g[k].value);return l}a=a||void 0;var d=b||[];b=[];if(a)if("object"===typeof a&&"number"===typeof a.length)for(var e=0;e<a.length;e++)-1!==H(N,a[e])&&b.push(a[e]);else"string"===typeof a&&("all"===a?b=N.slice():-1!==H(N,a)&&b.push(a));else b=c();if(1<=d.length)for(e=0;e<d.length;e++)b=b.filter(function(g){return g!==
d[e]});for(e=0;e<N.length;e++)!0===Da[e]&&-1===H(b,N[e])&&b.push(N[e]);ab(b)};h.eraseCookies=function(a,b,c){var d=[];c=c?[c,"."+c]:[T,"."+T];if("object"===typeof a&&0<a.length)for(var e=0;e<a.length;e++)this.validCookie(a[e])&&d.push(a[e]);else this.validCookie(a)&&d.push(a);Ha(d,b,c)};h.validCookie=function(a){return""!==ia(a,"one",!0)};return h}"function"!==typeof window.initCookieConsent&&(window.initCookieConsent=Xa)})();


window.addEventListener('load', function(){
	// obtain plugin
	var cc = initCookieConsent();

	// run plugin with your configuration
	cc.run({
		current_lang: 'ru',
		theme_css: '/local/templates/.default/css/cookieconsent.css?v=4',
		autoclear_cookies: true,                   // default: false
		page_scripts: true,                        // default: false
		gui_options: {
			consent_modal: {
				layout: 'box',               // box/cloud/bar
				position: 'bottom left',     // bottom/middle/top + left/right/center
				transition: 'slide'            // zoom/slide
			},
		},
		// delay: 0,                               // default: 0
		// auto_language: false,                   // default: false
		// autorun: true,                          // default: true
		// force_consent: false,                   // default: false
		// hide_from_bots: false,                  // default: false
		// remove_cookie_tables: false             // default: false
		// cookie_name: 'cc_cookie',               // default: 'cc_cookie'
		// cookie_expiration: 182,                 // default: 182 (days)
		// cookie_domain: location.hostname,       // default: current domain
		// cookie_path: '/',                       // default: root
		// cookie_same_site: 'Lax',                // default: 'Lax'
		// use_rfc_cookie: false,                  // default: false
		// revision: 0,                            // default: 0

		onAccept: function (cookie) {
			// ...
		},

		onChange: function (cookie, changed_preferences) {
			// ...
		},

		languages: {
			'ru': {
				consent_modal: {
					title: 'Сайт использует файлы cookies!',
					description: 'Сайт использует файлы cookies. Оставаясь на этом сайте, вы соглашаетесь с условиями использования файлов cookies. <a href="/personal_data_agreement/">Подробнее</a>',
					primary_btn: {
						text: 'Понятно',
						role: 'accept_all'              // 'accept_selected' or 'accept_all'
					},
					secondary_btn: {
						text: '',
						role: ''        // 'settings' or 'accept_necessary'
					}
				},
				settings_modal: {
					title: 'Cookie preferences',
					save_settings_btn: 'Save settings',
					accept_all_btn: 'Accept all',
					reject_all_btn: 'Reject all',
					close_btn_label: 'Close',
					cookie_table_headers: [
						{col1: 'Name'},
						{col2: 'Domain'},
						{col3: 'Expiration'},
						{col4: 'Description'}
					],
					blocks: [
						{
							title: 'Cookie usage',
							description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
						}, {
							title: 'Strictly necessary cookies',
							description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
							toggle: {
								value: 'necessary',
								enabled: true,
								readonly: true          // cookie categories with readonly=true are all treated as "necessary cookies"
							}
						}, {
							title: 'Performance and Analytics cookies',
							description: 'These cookies allow the website to remember the choices you have made in the past',
							toggle: {
								value: 'analytics',     // your cookie category
								enabled: false,
								readonly: false
							},
							cookie_table: [             // list of all expected cookies
								{
									col1: '^_ga',       // match all cookies starting with "_ga"
									col2: 'google.com',
									col3: '2 years',
									col4: 'description ...',
									is_regex: true
								},
								{
									col1: '_gid',
									col2: 'google.com',
									col3: '1 day',
									col4: 'description ...',
								}
							]
						}, {
							title: 'Advertisement and Targeting cookies',
							description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
							toggle: {
								value: 'targeting',
								enabled: false,
								readonly: false
							}
						}, {
							title: 'More information',
							description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
						}
					]
				}
			}
		}
	});

});
