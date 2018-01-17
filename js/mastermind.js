var game = document.getElementById("game");
var side = document.getElementById("side")
var currentColors = [-1, -1, -1, -1];
var colors = ["red", "blue", "green", "yellow", "pink", "purple"];
var picked = [getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()];
var user = [null,null,null,null];
var activeRow = 0;
var showButton =  new Array(12);
for (var i = 0; i < 10; i++) {
  showButton[i] = new Array(4);
}

console.log(showButton);
console.log(picked);
console.log(user);


for(var rowCount = 0; rowCount < 12; rowCount++){
	var row = document.createElement("div");
	row.setAttribute("id", "row_" + rowCount);
	for(var column = 0; column < 4; column++){
		var bullet = document.createElement("div");
		bullet.setAttribute("id", "bullet_" + rowCount + "_" + column);
		bullet.setAttribute("class", "bullet");
		bullet.setAttribute("onclick", "setColor("+rowCount+","+column+")");

		if(rowCount > activeRow){
			bullet.style.display = 'none';
		}else{

		}

		row.appendChild(bullet);

	}
	game.appendChild(row);
}

for (var secondrow = 0; secondrow < 12; secondrow++) {
	var row2 = document.createElement("div");
	row2.setAttribute("id", "row2_" + secondrow);
	for (var column2 = 0; column2 < 4; column2++) {
		var bullet2 = document.createElement("div");
		bullet2.setAttribute("id", "bullet2_" + secondrow + "_" + column2);
		row2.appendChild(bullet2);
	}
	side.appendChild(row2);
}

function getRandomColor(){
	var random = Math.floor( Math.random() * colors.length );
	return colors[random];
}

function setColor(f_row, f_id){
	var bullet = document.getElementById("bullet_" + f_row + "_" + f_id);

	currentColors[f_id]++;
	if(currentColors[f_id] == colors.length){
		currentColors[f_id] = 0;
	}
	var index = currentColors[f_id];
	bullet.style.backgroundColor = colors[index];
	showButton[f_row][f_id] = colors[index];
	user[f_id] = colors[index];

	console.log(showButton[f_row][0]);
	console.log(showButton[f_row][1]);
	console.log(showButton[f_row][2]);
	console.log(showButton[f_row][3]);

	if(showButton[f_row][0] != null && showButton[f_row][1] != null && showButton[f_row][2] != null && showButton[f_row][3] != null ){
		console.log("HIER HAD IK NOG NIET MOGEN KOMEN");
		document.getElementById("check").style.display = 'block';
	}

	console.log(user);
}

function checkcolors() {
		$total = 0;

		for(var colcheck = 0; colcheck < 4; colcheck++){
				var bullet2 = document.getElementById("bullet2_" + activeRow + "_" + colcheck);
				if(picked[colcheck] == user[colcheck]){
					bullet2.style.backgroundColor = 'black';
					$total++;
				}else if (isColorPicked(user[colcheck])) {
					bullet2.style.backgroundColor = 'white';
				}
		}

		if($total == 4){
			document.getElementById("solved").style.display = 'block';
			document.getElementById("kraak").style.display = 'none';
      document.getElementById("check").style.display = 'none';
		}else{

			for(var colClickOff = 0; colClickOff < 4; colClickOff++){
				console.log("bullet_" + activeRow + "_" + colClickOff);
				document.getElementById("bullet_" + activeRow + "_" + colClickOff).removeAttribute("onclick");
			}

			activeRow++;

			if(activeRow > 11){
				document.getElementById("notsolved").style.display = 'block';
				document.getElementById("kraak").style.display = 'none';
			}else{
				for(var colClickOn = 0; colClickOn < 4; colClickOn++){
					document.getElementById("bullet_" + activeRow + "_" + colClickOn).style.display = '';
				}
			}
		}

		document.getElementById("check").style.display = 'none';
}

function isColorPicked(color) {
	var ret = false;
	for (var i = 1; i < 4; i++) {
		if (picked[i] == color) {
			ret = true;
		}
	}
	return ret;
}
