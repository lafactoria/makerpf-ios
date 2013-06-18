﻿//*************************************************************
//	File: PFItemQuizAnswer.js 
//	PFItemQuizAnswer: create particular item properties
//*************************************************************

function PFItemQuizAnswer(answer, ok, image){
	
	//=====================================================
	// VARIABLES
	//=====================================================

	this.answer	= answer;
	this.image	= image;
	if (ok == "false"){
		this.ok = false;
	}else{
		this.ok = true;
	}
	
	//----------------------------------------------
	// BOOLEAN
	//----------------------------------------------
	this.active;
	
	//=====================================================
	// GETS
	//=====================================================	
	this.getAnswer = getAnswer;
	this.getImage = getImage;
	this.getOk = getOk;
	this.getActive = getActive;		
	
	function getAnswer(){
		return this.answer;
	}
	function getImage(){
		return this.image;
	}
	function getOk(){
		return this.ok;
	}
	function getActive(){
		return this.active;
	}
	
	//=====================================================
	// SETS
	//=====================================================
	this.setActive = setActive;	

	function setActive(act){
		this.active = act;
	}	
}