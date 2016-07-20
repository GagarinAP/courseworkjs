$(function () {

    window.moduleApp = (function () {
        var init = function(event) {
        	var id = location.search.split('id=')[1];	
        	var name = location.search.split('name=')[1];
        	
            $.ajax('/all').done(displayAll);            		
            $.ajax('/user/'+id).done(displayId);
            $.ajax('/chartGas').done(addChartGas); 
			$.ajax('/chartEnergy').done(addChartEnergy);
			$.ajax('/chartWather').done(addChartWather);
			$.ajax('/chartIdGas/'+id).done(addChartIdGas);
			$.ajax('/chartIdEnergy/'+id).done(addChartIdEnergy);
			$.ajax('/chartIdWather/'+id).done(addChartIdWather);
			$.ajax('/search/'+name).done(setSearchOutput);
    	};        

    	var displayAll = function(data) {
			var result = '<div class="table-responsive"><table class="table table-striped table-bordered table-hover">' +
						 '<thead><tr><th class="text-center">#</th><th class="text-center">Власник</th><th class="text-center">Квартира</th><th class="text-center">Профіль</th></thead>' +
						 '<tbody>';

			for (var i = 0; i < data.length; ++i) {	
				result += '<td class="text-center">' + (i + 1) + '</td>';				
				result += '<td class="text-center">' + data[i].person.name + ' ' + data[i].person.soname + '</td>';					
				result += '<td class="text-center">' + data[i].person.adress.apartment + '</td>';
				result += '<td class="text-center"><a href="http://localhost:3000/user?id=' + i + '"> переглянути</a></td>';
				result += '</tr>';
			}
			
			result += '</tbody></table></div>' + '<a href="/add">Додати користувача</a>';
			$('#displayAll').html(result);
		};

		var displayId = function(data) {
			var result = '<h2>Користувач: <strong>' + data[0].person.name + ' ' + data[0].person.soname + '</strong></h2>' + 
						 '<h3>Квартира №: <strong>' + data[0].person.adress.apartment + '</strong></h3>' +
						 '<div class="table-responsive"><table class="table table-striped table-bordered table-hover">' +
						 '<thead><tr><th class="text-center">Місяць</th>'+
						 '<th class="text-center">Газ</th>'+
						 '<th class="text-center">Електроенергія</th>'+
						 '<th class="text-center">Гаряча вода</th>'+
						 '<th class="text-center">Холодна вода</th></thead>' +
						 '<tbody>';
					
			for (var i = 0; i < 12; ++i) {
				result += '<td class="text-center">' + data[0].cost.date.year[0] + '.' + data[0].cost.date.month[i] + '</td>';										
				result += '<td class="text-center">' + data[0].cost.gas[i] + '</td>';
				result += '<td class="text-center">' + data[0].cost.energy[i] + '</td>';
				result += '<td class="text-center">' + data[0].cost.wather.hot[i] + '</td>';
				result += '<td class="text-center">' + data[0].cost.wather.cold[i] + '</td>';					
				result += '</tr>';
			}

			result += '</tbody></table></div>';
			$('#displayId').html(result);
		};
		//Графіки по всіх користувачах
		var addChartGas = function (data) {
            var ctx = document.getElementById("appartment-chart-gas");
            var myChart = new Chart(ctx, data);
        };
        var addChartEnergy = function (data) {
            var ctx = document.getElementById("appartment-chart-energy");
            var myChart = new Chart(ctx, data);
        };
        var addChartWather = function (data) {
            var ctx = document.getElementById("appartment-chart-wather");
            var myChart = new Chart(ctx, data);
        };
        //Графіки по заданому користувачу
        var addChartIdGas = function (data) {
            var ctx = document.getElementById("appartment-chart-id-gas");
            var myChart = new Chart(ctx, data);
        }; 
        var addChartIdEnergy = function (data) {
            var ctx = document.getElementById("appartment-chart-id-energy");
            var myChart = new Chart(ctx, data);
        };
        var addChartIdWather = function (data) {
            var ctx = document.getElementById("appartment-chart-id-wather");
            var myChart = new Chart(ctx, data);
        };       
        //Форма пошуку та результату
        var setSearchOutput = function (data) {
        	var name = location.search.split('name=')[1];
            if (!data || data.length === 0) {
                $('#search').html('<h3><strong>Нічого не знайдено по запиту: ' + name + '</strong></h3>');
                return;
            }
            var result = '<h3>Знайдено: </h3>' + 
						 '<a href="http://localhost:3000/user?id=' + data[0].id + '"><h2>' + data[0].person.name + ' ' + data[0].person.soname + ' - ' + 
						 data[0].person.adress.street + ' - ' + data[0].person.adress.number + 
						 ' кв. ' + data[0].person.adress.apartment + '</h2></a>';			
			$('#search').html(result);
        };




        var addRecord = function () {
            var namefromform = $('form[action="record"] > input[name="nameUser"]').val();
            var soname = $('input[name="soname"]').val();
            var appartment = $('input[name="appartment"]').val();
            
            var record = {
                name: namefromform,
                soname: soname,
                appartment: appartment
            };
            $.ajax('/record', {
                method: 'POST',
                data: record
            }).done(setAddMessage);
        };
        
        var setAddMessage = function (data) {
            var message = (data.success) ? 'Record added' : 'Failed to add record';
            $('#post-record-message').text(message);
        };

		init();
		return{
			addRecord:addRecord
		}		  
	})();	
});