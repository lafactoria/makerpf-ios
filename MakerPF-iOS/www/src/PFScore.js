//*****************************************************
// File: PFScore.js 
// PFScore: Score class
//*****************************************************/

function PFScore(){

	//*****************************************************
	// File: PFScore.js 
	// PFScore: Score class
	//*****************************************************/
	var score;
	//=====================================================
	// SET
	//=====================================================
	this.setScore = addScore;
	function setScore (number){
 		this.score = number;
 	}
	//=====================================================
	// GET
	//=====================================================
	this.getScore = getScore;
 	function getScore(){
 		return this.score;
 	}
	//=====================================================
	// showScore
	//=====================================================
	this.showScore = showScore;	
 	function showScore(){
	}
}