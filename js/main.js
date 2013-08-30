function addCards(Ccolumn,newNumber,Current){
		for (var i = 0; i < newNumber; i++) {
			var Ncard = document.createElement('div');
			Current.cards++;
			Ncard.setAttribute('id',"card"+Current.cards);
			Ncard.setAttribute("class","card");
			Ccolumn.appendChild(Ncard);

			var Ntitle = document.createElement('div');
			Ntitle.setAttribute("class","titleText");
			Ncard.appendChild(Ntitle);

			var Nimage = document.createElement('img');
			Nimage.setAttribute("class","titleImage");
			Ncard.appendChild(Nimage);
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

	GetandSetRedditData(Current);
}

function ResizeHandle(){


	if($(window).width() > Current.refWidth+200 || $(window).width() < Current.refWidth || $(window).height() > Current.refHeight+200 || $(window).height() < Current.refHeight){

		Current.refWidth=Math.floor($(window).width()/200)*200;
	    Current.refHeight=Math.floor($(window).height()/200)*200;
		var TNode = document.getElementById("wrapper");
		TNode.innerHTML = '';
	    Current.columns = 0;
	    Current.cards = 0;
		CheckScreenColumns(Current);
	}
}

function GetandSetRedditData(Current){
	$.getJSON('http://www.reddit.com/.json?jsonp=?',
    function(data){
        result=data.data.children;
        // console.log(result.length);
        for (var i = 1; i < Current.cards+1; i++) {
            	console.log(result[i-1].data.title);
            	var Card = document.getElementById("card"+i);
            	Card.firstChild.innerHTML = result[i-1].data.title;

            	var imgSource = result[i-1].data.thumbnail;

            	if(imgSource == "self" || imgSource == ""){
            		Card.removeChild(Card.lastChild);
            		Card.firstChild.className = Card.firstChild.className + "full";
            	} else{

            	Card.lastChild.setAttribute("src",result[i-1].data.thumbnail);}
            	console.log(result[i-1].data.thumbnail);
            };    
        });
}

window.onload=function(){
	Current = new Object();
	Current.columns = 0;
	Current.cards = 0;
	Current.refWidth=Math.floor($(window).width()/200)*200;
	Current.refHeight=Math.floor($(window).height()/200)*200;

	// console.log(Current.refWidth);
	// console.log(Current.refHeight);

	CheckScreenColumns(Current);

	window.addEventListener("resize",ResizeHandle,false);
// $.getJSON('http://www.reddit.com/.json?jsonp=?',
//     function(data){
//         result=data.data.children;
//         console.log(result.length);
//     });


};