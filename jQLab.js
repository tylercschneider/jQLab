let tableClicked;
let numOfTables = 9;

// Draws a table in the Dom and add
class Table {
	constructor(tableNumber) {
		this.tableNumber = tableNumber;
	}
	draw(i) {

		let content = $(`<h1></h1>`).text(i);
		let circle = $('<div></div>');
		//let interior = $('<div></div>');
		circle.append(content);
		//circle.append(interior);
		circle.addClass('table open');
		circle.attr("id", i);
		$('#tableContainer').append(circle);

		let table = $(`#${i}`);
		//////////////////////////////
		// Event Listener on the table
		//
		//
		table.on("click", () => {
			// tableClicked is a global variable what element was last clicked
			tableClicked = table[0].id;

			let content = `Table Number: ${table[0].id}`;
			let tableNumber = $('<h3></h3>');
			tableNumber.append(content);
			tableNumber.attr("id", "tableNumber");
			let target = $('#target');
			target.after(tableNumber);
			$('#tableContainer').fadeOut();
			$('#form').fadeIn();
		});
	}
}
class Reservation {
	constructor(table, name, phone, party) {
		this.tableNumber = table;
		this.person = name;
		this.phone = phone;
		this.party = party;
	}
	displayInfo() {
		let checker = document.getElementById(`${this.tableNumber}`);
		console.log(checker);
		checker.addEventListener("mouseover", ()=>{
			let contain = document.createElement('div');
			let content = document.createElement('h5');
			let para1 = document.createElement('p');	
			content.textContent = this.person;
			para1.textContent = `Party of ${this.party}`;
			contain.appendChild(content);
			contain.appendChild(para1);
			contain.setAttribute('id', "reserve");
			checker.appendChild(contain);
					
		});
		checker.addEventListener("mouseout", ()=> {
			checker.innerHTML = '';
			let replace =document.createElement('h1');
			replace.textContent = this.tableNumber;
			replace.setAttribute("id", this.tableNumber);
			replace.setAttribute("class", "table");
			replace.setAttribute("class", "booked");
			checker.appendChild(replace);
		});
	}


}

/////////////////////////////////
// Restaurant Class allows you to make multiple restaurants
// Pass it parameters for how many tables and booking data array
class Restaurant {
	constructor(numOfTables) {
		this.numOfTables = numOfTables;
		console.log(numOfTables);
		this.tables = [];
		this.reservations = [];
	}
	layout() {
		for(let i=0; i<(this.numOfTables); i++){
			let table = new Table(i+1);
			this.tables.push(table);
			console.log(table);
			table.draw(i+1);
		}
	}
	//////////////////////////////
	// Event Listener on the table
	// changes color when it is open
	// when booked it displays booking information
	book(table, name, phone, party) {
		let reserve = new Reservation(table, name, phone, party);
		this.reservations.push(reserve);
		console.log(reserve);
		reserve.displayInfo();

	}
}

////////////////////////////////////////////
// Create a Restaurant and pass it how many tables
let tonys = new Restaurant(numOfTables);

/////////////////////////////////////////
// Draw the tables in the DOM
tonys.layout();

///////////////////////////////////////
// Hide the booking form when page loaded
$('#form').hide();

///////////////////////////////////////
// Event listener on x in form
// closes the form
// brings back the chart of tables
$('#close').on("click", () => {
	$('#form').hide();
	$('#tableContainer').fadeIn();
	$('#tableNumber').fadeOut();

});

////////////////////////////////////
// Event Listener on Book Button
// Pulls booking info and adds to array
// Hides form and resets form values
// Removes Table Information from the form
// Brings back up the chart of tables
// Changes color of booked table by switching classes
$('#book').on("click", () => {
	let name = $('#name');
	let phoneTarget = $('#phone');
	let partySizeTarget = $('#party');
	let person = name.val();
	let phone = phoneTarget.val();
	let partySize = partySizeTarget.val();

	tonys.book(tableClicked, person, phone, partySize);

	$('#form').hide();
	name.val("");
	phoneTarget.val("");
	partySizeTarget.val("");
	$('#tableNumber').remove();
	$('#tableContainer').fadeIn();
	$(`#${tableClicked}`).removeClass('open').addClass('booked').prop('disabled', true);
});
