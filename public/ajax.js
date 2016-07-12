$(function () {
    window.moduleApp = (function () {

        var displayAll = function(event) {
        	console.log(event);
            $.ajax('/all').done(displayAllItems);            
    	};

    	var displayAllItems = function(data) {
			var result = '<h1>Всі записи</h1><div class="table-responsive"><table class="table">' +
					'<thead><tr><th>Імя</th><th>Фамілія</th><th>Місто</th><th>Вулиця</th><th>Номер</th><th>Квартира</th><th>Link</th></thead>' +
					'<tbody>';
			
			for (var i = 0; i < data.length; ++i) {
				result += '<tr><td>' + data[i].person.name + '</td>';
				result += '<td>' + data[i].person.soname + '</td>';
				result += '<td>' + data[i].person.adress.town + '</td>';
				result += '<td>' + data[i].person.adress.street + '</td>';
				result += '<td>' + data[i].person.adress.number + '</td>';
				result += '<td>' + data[i].person.adress.apartment + '</td>';
				result += '<td><a href="http://localhost:3000/db/'+ i +'">Link</a></td>';
				result += '</tr>';
			}

			result += '</tbody></table>';
			$('#ResultDisplay').html(result);
		};
		
	    return {
	        displayAll: displayAll
	    };
	})();	
});
