function selected_support_category(object, selector) {
	selected_category(object, selector);
	if (selector === 'questions') {
		$('.question_tags').show();
	}
	else {
		$('.question_tags').hide();
	}
	if (selector === 'instructions') {
		$('.instruction_tags').show();
	}
	else {
		$('.instruction_tags').hide();
	}
}

let questionAllCategoryFilter = $('#question_category_all');
let instructionAllCategoryFilter = $('#instruction_category_all');
if (!questionAllCategoryFilter.is(':selected')) {
	questionAllCategoryFilter.prop('checked', true);
	questionAllCategoryFilter.change();
}
if (!instructionAllCategoryFilter.is(':selected')) {
	instructionAllCategoryFilter.prop('checked', true);
	instructionAllCategoryFilter.change();
}


$('.question_tags [name="question_category"]').on( "click", function(e) {
	let selectedCategory = $(e.target).val();
	let items = $('.questions .item');
	if (selectedCategory === '0') {
		items.show();
		return;
	}
	for (let i = 0; i < items.length; i++) {
		let categories = $(items[i]).attr('data-categories').split(',');
		if (categories.includes(selectedCategory)) {
			$(items[i]).show();
		}
		else {
			$(items[i]).hide();
		}
	}
});


$('.instruction_tags [name="instruction_category"]').on( "click", function(e) {
	let selectedCategory = $(e.target).val();
	let items = $('.instructions .item');
	if (selectedCategory === '0') {
		items.show();
		return;
	}
	for (let i = 0; i < items.length; i++) {
		let categories = $(items[i]).attr('data-categories').split(',');
		if (categories.includes(selectedCategory)) {
			$(items[i]).show();
		}
		else {
			$(items[i]).hide();
		}
	}
});