$(function () {

    window.moduleApp = (function () {

        var init = function(event) {
        	var id = location.search.split('id=')[1];	
        	//console.log(event);
            $.ajax('/all').done(displayAll);            		
            $.ajax('/user/'+id).done(displayId);
			$.ajax('/chart').done(addChart); 
			$.ajax('/chart1/'+id).done(addChart1); 
			//$.ajax('/chart1').done(addChart1);              
    	};

    	var displayAll = function(data) {
			var result = '<h2>Adress: ' + data[0].person.adress.town + ' ' + data[0].person.adress.street + ' str. ' + data[0].person.adress.number + '</h2>' +
						 '<table class="table">' +
						 '<thead><tr><th>id</th><th>name</th><th>soname</th><th>town</th><th>street</th><th>number</th><th>apartment</th></thead>' +
						 '<tbody>';

			for (var i = 0; i < data.length; ++i) {
					result += '<tr><td>' + data[i].id + '</td>';
					result += '<td>' + data[i].person.name + ' ' + data[i].person.soname + '</td>';					
					result += '<td>' + data[i].person.adress.town + '</td>';
					result += '<td>' + data[i].person.adress.street + '</td>';
					result += '<td>' + data[i].person.adress.number + '</td>';
					result += '<td>' + data[i].person.adress.apartment + '</td>';
					result += '<td><a href="http://localhost:3000/user?id=' + i + '">Profile</a></td>';
					result += '</tr>';
				}

			result += '</tbody></table>';
			$('#displayAll').html(result);
		};

		var displayId = function(data) {
			var result = '<h2>User: '+ data[0].person.name + ' ' + data[0].person.soname + '</h2>' + 
						 '<h2>Adress: ' + data[0].person.adress.street + ' ' + data[0].person.adress.number + ' / ' + data[0].person.adress.apartment + '</h2>' +
						 '<table class="table">' +
						 '<thead><tr><th>id</th><th>name</th><th>soname</th><th>town</th><th>street</th><th>number</th><th>apartment</th></thead>' +
						 '<tbody>';
					
				for (var i = 0; i < data.length; ++i) {					
					result += '<tr><td>' + data[i].id + '</td>';					
					result += '<td>' + data[i].person.adress.town + '</td>';
					result += '<td>' + data[i].person.adress.street + '</td>';
					result += '<td>' + data[i].person.adress.number + '</td>';
					result += '<td>' + data[i].person.adress.apartment + '</td>';					
					result += '</tr>';
				}

			result += '</tbody></table>';
			$('#displayId').html(result);
		};

		var addChart = function (data) {
            var ctx = document.getElementById("appartment-chart");
            var myChart = new Chart(ctx, data);
        };

        var addChart1 = function (data) {
            var ctx1 = document.getElementById("appartment-chart-id");
            var myChart1 = new Chart(ctx1, data);
        };

		init();
	    /*return {
	    	displayAll:displayAll   
	    };*/
	})();	
});