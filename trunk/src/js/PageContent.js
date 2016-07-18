// Author: Sarah Cleveland
// Date: 7.15.16

// Dependent Upon
//
//
var PageControl = function() {
	// global variables -- init
	var container;
	var mainParent;
	var contentPath;

	// global variables -- set
	var classes = {
		'container': 'page-content--container',
		'mainParent': 'js-page-content',
		'nextParent': 'js-page-content--next'
	};

	var dataAttr = {
		'page': 'data-page'
	};

	var _init = function(){
		// set needed variables
		container = document.querySelector('.'+classes.container);
		mainParent = document.querySelector('.'+classes.mainParent);
		nextParent = document.querySelector('.'+classes.nextParent);
		contentPath = 'content/';

		// init page wide functionality
		_contentInit();
	}

	var _contentInit = function(){
		// set needed variables
		var _contentLinks = document.querySelectorAll('['+dataAttr.page+']');

		// add page change event listeners
		// todo: find a more efficient way
		for(var i = 0; i < _contentLinks.length; i++){
			_contentLinks[i].addEventListener('click', _contentChange);
		}
	}

	var _contentChange = function(){
		var pageID = event.target.dataset.page;
		var pagePath = contentPath + pageID + '.html';

		//todo: figure out a pure javascript version
		_getHTML(pagePath, function(html){
			if(mainParent.innerHTML === html) return;
			nextParent.innerHTML = html;
			_contentChangeAnimation();
		});		
	}

	var _getHTML = function(pagePath, onComplete){
		$.ajax({
			url: pagePath,
			// context: document.body,
			dataType: 'html',
			success: function(data) {
				// Util.log('Util._loadHTML() data : ', data);
				if (onComplete && typeof(onComplete) === "function") onComplete(data);
			}
		});
	}

	var _contentChangeAnimation = function(){
		nextParent.className += ' move-left';
		setTimeout(function(){
			nextParent.className = mainParent.className;
			mainParent.innerHTML = '';
			container.appendChild(mainParent);
			mainParent.className = classes.nextParent;

			mainParent = document.querySelector('.'+classes.mainParent);
			nextParent = document.querySelector('.'+classes.nextParent);
		}, 1500);
	}

  // output/public   
  return {
    init: _init
  };
}();