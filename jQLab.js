let id;
let bookings = [];

class Table {
	draw(i) {
		let content = $(`<h1></h1>`).text(i);
		let circle = $('<div></div>');
		circle.append(content);
		circle.addClass('table open');
		circle.attr("id", i);
		$('#tableContainer').append(circle);

		let table = $(`#${i}`);
		// opens form...
		table.on("click", () => {
			id = table[0].id;
			let content = `Table Number: ${table[0].id}`;
			let tableNumber = $('<h3></h3>');
			tableNumber.append(content);
			tableNumber.attr("id", "tableNumber");
			let target = $('#target');
			target.after(tableNumber);
			$('#tableContainer').hide();
			$('#form').show();
		});
	}

}
class Restaurant {
	constructor(numOfTables, bookings) {
		this.tables = numOfTables;
		this.bookings = bookings;
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
	$('#tableContainer').show();
	$('#tableNumber').remove();

});
$('#book').on("click", () => {
	$(`#${id}`).removeClass('open').addClass('filled').prop('disabled', true);
	let name = $('#name');
	let phone = $('#phone');
	let partySize = $('#party');
	let booking = {
		name: name.val(),
		phone: phone.val(),
		partySize: partySize.val()
	};
	bookings.push(booking);

	$('#form').hide();
	name.val("");
	phone.val("");
	partySize.val("");
	$('#tableNumber').remove();
	$('#tableContainer').show();
});