class Table {
	draw(i) {
		let content = $(`<h1></h1>`).text(i);
		let circle = $('<div></div>');
		circle.append(content);
		circle.addClass('table open');
		circle.attr("id", i);
		$('#tableContainer').append(circle);

		let table = $(`#${i}`);
		console.log(table);
		table.on("click", () => {
			console.log(table[0].id);
			let content = `Table Number: ${table[0].id}`;
			let tableNumber = $('<h3></h3>');
			tableNumber.append(content);
			tableNumber.attr("id", "tableNumber");
			let target = $('#target');
			target.after(tableNumber);
			$('#form').show();
			/*
			$('')
			if(('.open')){
				this.addClass('.filled');
				this.removeClass('.open');
			}
			else if (this.is('.filled')) {
				this.addClass('.open');
				this.removeClass('.filled');
			}*/
		});
	}

}
class Restaurant {
	constructor(numOfTables) {
		this.tables = numOfTables;
	}
	layout() {
		for(let i=1; i<(this.tables+1); i++){
			let table = new Table();
			table.draw(i);
		}
	}
}

let tonys = new Restaurant(9);
tonys.layout();
$('#form').hide();
// pop up
// on add seat
// on empty table
$('#close').on("click", () => {

	$('#form').hide();
	$('#tableNumber').remove();

});