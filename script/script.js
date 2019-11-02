function alertStudentName() {
	var button = document.getElementById('submit-button');
	var student = document.getElementById('student-name').value;
	var id = document.getElementById('student-id').value;
	button.onclick = function(e) {
		e.stopPropagation();
		alert('Saving file for ' + student + ' ' + id);
	};
}

function resetForm() {
	var resetButton = document.getElementById('reset-button');
	var formInputs = document.querySelectorAll('#report-form input');
	var resultFields = document.querySelectorAll('.result');

	resetButton.addEventListener('click', function () {
		formInputs.forEach(function (input) {
			input.value = '';
		});

		resultFields.forEach(function (field) {
			field.innerText = 'D (0%)';
		});
	});

}

function calculateGrade(subject) {
	var inputs = document.querySelectorAll('#' + subject + ' td input');
	var resultField = document.querySelector('#' + subject + ' .result');
	var grades = [ 0, 0, 0 ];
	var total = 0;
	var avg = 0;
	var letterGrade = '';

	inputs.forEach(function(input, index) {

		function getStudentAvg() {
			// Capture value inputted into field
			var inputValue = input.value;

			// Check if the field is not empty
			// If so add number to grades array
			// Else set the array index to zero (0)
			if (inputValue.length > 0) {
				grades[index] = parseInt(inputValue);
			} else {
				grades[index] = 0;
			}

			// Calculate total grade total
			total = 0;

			for (var i = 0; i < grades.length; i++) {
				total += grades[i];
			}

			// Check the average of grades
			avg = total * 100 / (grades.length * 100);

			// Get letter grade based on avg
			if (avg >= 90) {
				letterGrade = 'A';
			} else if (avg >= 80 && avg <= 89) {
				letterGrade = 'B+';
			} else if (avg >= 70 && avg <= 79) {
				letterGrade = 'B-';
			} else if (avg >= 60 && avg <= 69) {
				letterGrade = 'C+';
			} else if (avg >= 50 && avg <= 59) {
				letterGrade = 'C';
			} else if (avg >= 0 && avg <= 49) {
				letterGrade = 'D';
			}

			// Insert the letter grade into the result field
			resultField.innerText = letterGrade + ' ' + '(' + Math.round(avg) + '%)';
		}

		window.addEventListener('load', getStudentAvg);
		input.addEventListener('keyup', getStudentAvg);
	});
}

function calculateAllGrades() {
	calculateGrade('math');
	calculateGrade('english');
	calculateGrade('science');
	calculateGrade('history');
	calculateGrade('econ');
	calculateGrade('lit');
	calculateGrade('music');
	calculateGrade('pe');
}

alertStudentName();
resetForm();
calculateAllGrades();
