$(document).ready(function(){
    var card = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    var suit = ['spades','diamonds','hearts','clubs'];

    var gameDeck = {};

    var keys = [];


    var $hit = $(".hit");
    var $stand = $('.stand');
    var $deal = $('.deal');
    var $refresh = $(".refresh");

    var $yourCards = $('.yourCards');
    var playerCards = []
    var yourCardVals = "";

    var $dealerCards = $('.dealerCards');
    var dealerCards = [];
    var dealerCardVals = "";

    for (var i = 0; i<card.length; i++){
        var currValue;

        if (card[i] === 'A'){
            currValue = 11;

        }else if (card[i] === 'J' || card[i] === 'Q' || card[i] === 'K'){
            currValue = 10;

        }else{
            currValue = card[i]
        }  
        
        for (var j = 0; j<suit.length; j++){
            var newKey = card[i]+suit[j]
            gameDeck[newKey] = currValue

        };
    };

    for (var prop in gameDeck) {
	if (gameDeck.hasOwnProperty(prop)) {
	   	keys.push(prop);
	    }
	}

    $deal.click(function(){

    	if (yourCardVals === ""){
			var playerFirstCard = keys[ keys.length * Math.random() << 0 ];
			playerCards.push(playerFirstCard);
			$yourCards.html(playerCards);
			yourCardVals = gameDeck[playerFirstCard];
			for (var i = 0; i<keys.length; i++){
				if ( keys[i] === playerFirstCard ){
					keys.splice(i,1);
				}
			}
			var dealerFirstCard = keys[ keys.length * Math.random() << 0 ];
			dealerCards.push(dealerFirstCard);
			dealerCardVals = gameDeck[dealerFirstCard];
			for (var j = 0; j<keys.length; j++){
				if (keys[j] === dealerFirstCard){
					keys.splice(j,1);
				};
			};
			console.log(dealerCards);
			console.log(dealerCardVals);
			console.log(keys);
	    		
    	}else{
    		alert('GAME IN PROGRESS, FOR NEW GAME CLICK "REFRESH"');
    	}
  

    });

    $refresh.click(function(){
    	location.reload();
    });

    $hit.click(function(){
    	if (yourCardVals === ""){
    		alert("YOU DON'T HAVE ANY CARDS YET");
    		location.reload()
    	}

    	var currCard = keys[ keys.length * Math.random() << 0];
    	playerCards.push(currCard);
    	$yourCards.html(playerCards);
    	if (currCard === 'Aspades'|| currCard === 'Adiamonds' || currCard === 'Ahearts' || currCard === 'Aclubs'){
    		if (yourCards > 11){
    			gameDeck[currCard] = 1
    		}
    	}
    	yourCardVals = yourCardVals + gameDeck[currCard];
    	for (var i = 0; i<keys.length; i++){
    		if (keys[i] === currCard){
    			keys.splice(i,1);
    		}
    	}
    	if (dealerCardVals < 17){
    		currCard = keys[ keys.length * Math.random() << 0];
    		dealerCards.push(currCard);
    		dealerCardVals = dealerCardVals + gameDeck[currCard];
    		for(var j = 0; j<keys.length; j++){
    			if (keys[j] === currCard){
    				keys.splice(j,1);
    			}
    		}
    	}

		console.log(dealerCards);
		console.log(dealerCardVals);
		console.log(keys);
		
		if (yourCardVals === 21 && dealerCardVals === 21){
			alert('TIE');
			$dealerCards.html("dealer's hand: " + dealerCards);
		}else if (yourCardVals === 21){
			alert('YOU WIN');
			$dealerCards.html("dealer's hand: " + dealerCards);	
		}else if (dealerCardVals === 21){
			alert('DEALER WINS')
			$dealerCards.html("dealer's hand: " + dealerCards);
		}else if (dealerCardVals > 21 && yourCardVals<21){
			alert('YOU WIN');
			$dealerCards.html("dealer's hand: " + dealerCards);	
		}else if (yourCardVals > 21){
			if ("Aspades" != playerCards || "Adiamonds" != playerCards || "Ahearts" != playerCards || "Aclubs" != playerCards ){
				alert('BUST!')
				$dealerCards.html("dealer's hand: " + dealerCards);
			}else{
				yourCardVals = yourCardVals - 11
			}
		}    	
    
    })

    $stand.click(function(){
    	var yourScore = 21 - yourCardVals
    	var dealerScore = 21 - dealerCardVals
    	if (yourScore < dealerScore){
    		alert('YOU WIN');
    		$dealerCards.html("dealer's hand: " + dealerCards);
    	}else{
    		alert('DEALER WINS');
    		$dealerCards.html("dealer's hand: " + dealerCards);
    	}	
    })

});

