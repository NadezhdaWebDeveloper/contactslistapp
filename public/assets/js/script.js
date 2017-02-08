function Editing(that){
	that.parentNode.parentNode.parentNode.classList.add('checkedRow');
}

function Updated(that){
	that.parentNode.parentNode.parentNode.classList.remove('checkedRow');
}

function GetAll(that){
	that.classList.add('hidden');
}

