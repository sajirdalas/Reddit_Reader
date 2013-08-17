function addCards(Ccolumn,newNumber,Current){
		for (var i = 0; i < newNumber; i++) {
			var Ncard = document.createElement('div');
			Current.cards++;
			Ncard.setAttribute('id',"card"+Current.cards);
			Ncard.setAttribute("class","card");
			Ccolumn.appendChild(Ncard);
		};
}

function addColumns(newNumber,Current){
	var wrap = document.getElementById("wrapper");
	for (var i = 0; i < newNumber; i++) {
		Current.columns++;
		var NewColumn = document.createElement('div');
		NewColumn.setAttribute("id","column"+Current.columns);
    	NewColumn.setAttribute("class","column");
    	CheckScreenCards(NewColumn,Current);
    	wrap.appendChild(NewColumn);
    };
}


function CheckScreenCards(column,Current){
	if($(window).width()>=200 && $(window).width()<=400){
		addCards(column,1,Current);
	}

	else if($(window).width()>=400 && $(window).width()<=600){
		addCards(column,2,Current);
	}

	else if($(window).width()>=600 && $(window).width()<=800){
		addCards(column,3,Current);
	}

	else if($(window).width()>=800 && $(window).width()<=1000){
		addCards(column,4,Current);
	}


	else if($(window).width()>=1000){
		addCards(column,5,Current);
	}
}

function CheckScreenColumns(Current){

	if($(window).height()>=200 && $(window).height()<=400){
		addColumns(1,Current);
	}

 	else if($(window).height()>=400 && $(window).height()<=600){
		addColumns(2,Current);
	}

	else if($(window).height()>=600 && $(window).height()<=800){
		addColumns(3,Current);
	}

	else if($(window).height()>=800 && $(window).height()<=1000){
		addColumns(4,Current);
	}


	else if($(window).height()>=1000){
		addColumns(5,Current);
	}
}

function ResizeHandle(){


	if($(window).width() > Current.refWidth+200 || $(window).width() < Current.refWidth ){

		Current.refWidth=Math.floor($(window).width()/200)*200;
	    Current.refHeight=Math.floor($(window).height()/200)*200;

		var TNode = document.getElementById("wrapper");
		TNode.innerHTML = '';

		CheckScreenColumns(Current);
	}
}

window.onload=function(){
	Current = new Object();
	Current.columns = 0
	Current.cards = 0
	Current.refWidth=Math.floor($(window).width()/200)*200;
	Current.refHeight=Math.floor($(window).height()/200)*200;

	// console.log(Current.refWidth);
	// console.log(Current.refHeight);

	CheckScreenColumns(Current);

	window.addEventListener("resize",ResizeHandle,false);
	
// $.getJSON('http://www.reddit.com/.json?jsonp=?',
//     function(data){
//         result=data.data.children;
//     });


};