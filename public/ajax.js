$(function () {

    window.moduleApp = (function () {

        var init = function(event) {
        	var id = location.search.split('id=')[1];	
        	var name = location.search.split('name=')[1];
        	
            $.ajax('/all').done(displayAll);            		
            $.ajax('/user/'+id).done(displayId);
			$.ajax('/chart').done(addChart); 
			$.ajax('/chartId/'+id).done(addChartId);
			$.ajax('/search/'+name).done(setSearchOutput);
    	};

    	var displayAll = function(data) {
			var result = '<h2>Adress: ' + data[0].person.adress.town + ' ' + data[0].person.adress.street + ' str. ' + data[0].person.adress.number + '</h2>' +
						 '<table class="table table-hover">' +
						 '<thead><tr><th>id</th><th>name</th><th>soname</th><th>town</th><th>street</th><th>number</th><th>apartment</th></thead>' +
						 '<tbody>';

			for (var i = 0; i < data.length; ++i) {					
					result += '<td>' + data[i].person.name + ' ' + data[i].person.soname + '</td>';					
					result += '<td>' + data[i].person.adress.town + '</td>';
					result += '<td>' + data[i].person.adress.street + '</td>';
					result += '<td>' + data[i].person.adress.number + '</td>';
					result += '<td>' + data[i].person.adress.apartment + '</td>';
					result += '<td><a href="http://localhost:3000/user?id=' + i + '">Profile</a></td>';
					result += '</tr>';
				}

			result += '</tbody></table><div onclick="LoadMore()">Load more</div>';
			$('#displayAll').html(result);
		};

		var displayId = function(data) {
			var result = '<h5>Користувач: </h5><h2>'+ data[0].person.name + ' ' + data[0].person.soname + '</h3>' + 
						 '<h5>Адреса: </h5><h2>' + data[0].person.adress.street + ' ' + data[0].person.adress.number + ' кв. ' + data[0].person.adress.apartment + '</h2>' +
						 '<table class="table table-hover">' +
						 '<thead><tr><th>date</th><th>gas</th><th>energy</th><th>w.hot</th><th>w.cold</th></thead>' +
						 '<tbody>';
					
				for (var i = 0; i < 12; ++i) {
					result += '<td>' + data[0].cost.date.year[0] + '.' + data[0].cost.date.month[i] + '</td>';										
					result += '<td>' + data[0].cost.gas[i] + '</td>';
					result += '<td>' + data[0].cost.energy[i] + '</td>';
					result += '<td>' + data[0].cost.wather.hot[i] + '</td>';
					result += '<td>' + data[0].cost.wather.cold[i] + '</td>';					
					result += '</tr>';
				}

			result += '</tbody></table>';
			$('#displayId').html(result);
		};

		var addChart = function (data) {
            var ctx = document.getElementById("appartment-chart");
            var myChart = new Chart(ctx, data);
        };

        var addChartId = function (data) {
            var ctx1 = document.getElementById("appartment-chart-id");
            var myChart1 = new Chart(ctx1, data);
        };        

        var setSearchOutput = function (data) {
        	var name = location.search.split('name=')[1];
            if (!data || data.length === 0) {
                $('#search').html('<h3><strong>Не знайдено: ' + name + '</strong></h3>');
                return;
            }
            var result = '<h3>Знайдено: </h3>' + 
						 '<a href="http://localhost:3000/user?id=' + data[0].id + '"><h2>' + data[0].person.name + ' "' + data[0].person.soname + '" - ' + 
						 data[0].person.adress.street + ' - ' + data[0].person.adress.number + 
						 ' кв. ' + data[0].person.adress.apartment + '</h2></a>';			
			$('#search').html(result);
        };

		init();			  
	})();	
});