/*
Skycons is a set of ten animated weather glyphs, procedurally generated by JavaScript using the HTML5 canvas tag.
http://darkskyapp.github.io/skycons/
*/
var skycons = new Skycons();

  // you can add a icon to a html canvas. simply supply its element id and the weather you want to show.
  skycons.add("today", Skycons.PARTLY_CLOUDY_DAY);
  skycons.add("day1", Skycons.CLEAR_DAY);
  skycons.add("day2", Skycons.CLOUDY);
  skycons.add("day3", Skycons.RAIN);

  // start all icons animation!
  skycons.play();

  // update a icon on  canvas by its id
  skycons.set("today", Skycons.PARTLY_CLOUDY_NIGHT);

/*
Get value from Bootstrap dropdown menu
*/

// for(var i=0; i<$("li").length;i++){
// var cities= $('li:nth-of-type[i]').text().slice(0,3);
// };
// getJSONinfo(cities)
var defaultCir= $('li:nth-of-type(1)').text().slice(0,3);
getJSONinfo(defaultCir);
$("button").html($('li:nth-of-type(1)').text());

function getTem(){
  $('#dropdown li').each(function(index,element){
    var cities= $(element).text().slice(0,3);
    var newapi="https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+cities+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
    $.getJSON(newapi,function(data){
      console.log(data);
      var currentTemperature = data.query.results.channel.item.condition.temp ;
      var celCurTem=parseInt((currentTemperature-32)*5/9);
      $(element).children("a").children(".cityLi").text(celCurTem+" ℃");

    })
  })
};
 getTem();




$('#dropdown li').on('click', function(){
    alert($(this).text());
    // $(this).text().addclass('city');
    $("button").html($(this).text());
    var cityJson = $(this).text().slice(0,3);
    console.log(cityJson)
    getJSONinfo(cityJson);
    //var currentem
    // $(".temperature").html(currentTemperature);
});
function getJSONinfo(location){
$.getJSON(getCityUrl(location),function(data){
	// 可以比較方便找到你要的資料在這個物件的哪個位置
	console.log (data) ;

	// 例如如果要拿取該縣市的目前溫度。
	var currentTemperature = data.query.results.channel.item.condition.temp  ;
 var celCurTem=parseInt((currentTemperature-32)*5/9);

  $(".temperature").html(celCurTem);

  // cities.each(function(cities,element){
  //   $(element).html(celCurTem+$(".cityLi").text());
  // });


  var unit=data.query.results.channel.units.temperature;
  var currentTime= data.query.results.channel.lastBuildDate;
  var day22= data.query.results.channel.item.forecast[1].date;
  var day33=data.query.results.channel.item.forecast[2].date;
  var day44=data.query.results.channel.item.forecast[3].date;
  console.log(currentTime.slice(5,16));
  $('.date').text(currentTime.slice(5,16));
  $('th:nth-of-type(1)').text(day22);
  $('th:nth-of-type(2)').text(day33);
  $('th:nth-of-type(3)').text(day44);
  var day2TemHigh=data.query.results.channel.item.forecast[1].high;
  console.log(day2TemHigh);
  var day2TemLow=data.query.results.channel.item.forecast[1].low;
  var day3TemHigh=data.query.results.channel.item.forecast[2].high;
  var day3TemLow=data.query.results.channel.item.forecast[2].low;
  var day4TemHigh=data.query.results.channel.item.forecast[3].high;
  var day4TemLow=data.query.results.channel.item.forecast[3].low;
  $('.day11').text(parseInt((day2TemHigh-32)*5/9)+"-"+parseInt((day2TemLow-32)*5/9)+ " ℃");
  $('.day22').text(parseInt((day3TemHigh-32)*5/9)+"-"+parseInt((day3TemLow-32)*5/9)+ " ℃");
  $('.day33').text(parseInt((day4TemHigh-32)*5/9)+"-"+parseInt((day4TemLow-32)*5/9)+ " ℃");

  var currentCodition= data.query.results.channel.item.forecast[0].code;
  if(currentCodition==="4"||currentCodition==="11"||currentCodition==="12"||currentCodition==="37"||currentCodition==="38"||currentCodition==="39"||currentCodition==="40"||currentCodition==="45"||currentCodition==="47"){
    skycons.set("today",Skycons.RAIN);
    $(".curCon").html(" "+"Rain");
  }else if(currentCodition==="26"||currentCodition==="27"||currentCodition==="28"){
    skycons.set("today",Skycons.CLOUDY);
      $(".curCon").html(" "+"Cloudy");
  }else if(currentCodition==="20"){
    skycons.set("today",Skycons.FOG);
    $(".curCon").html(" "+"Fog");
  }else if(currentCodition==="24"){
    skycons.set("today",Skycons.WIND);
    $(".curCon").html(" "+"Windy");
  }else if(currentCodition==="29"){
    skycons.set("today",Skycons.PARTLY_CLOUDY_NIGHT);
    $(".curCon").html(" "+"Partly Cloudy Night");
  }else if(currentCodition==="30"||currentCodition==="44"){
    skycons.set("today",Skycons.PARTLY_CLOUDY_DAY);
    $(".curCon").html(" "+"Partly Cloudy Day");
  }else if(currentCodition==="31"){
    skycons.set("today",Skycons.CLEAR_NIGHT);
    $(".curCon").html(" "+"Clear Night");
  }else if(currentCodition==="32"||currentCodition==="36"){
    skycons.set("today",Skycons.CLEAR_DAY);
    $(".curCon").html(" "+"Clear Day");
  };
  console.log($(".date").text());
  var day1Con=data.query.results.channel.item.forecast[1].code;
  if(day1Con==="4"||day1Con==="11"||day1Con==="12"||day1Con==="37"||day1Con==="38"||day1Con==="39"||day1Con==="40"||day1Con==="45"||day1Con==="47"){
    skycons.set("day1",Skycons.RAIN);
  //$("#day1").html("Rain");
  }else if(day1Con==="26"||day1Con==="27"||day1Con==="28"){
    skycons.set("day1",Skycons.CLOUDY);
    //$("#day1").html("Cloudy");
  }else if(day1Con==="20"){
    skycons.set("day1",Skycons.FOG);
  //$("#day1").html("Fog");
  }else if(day1Con==="24"){
    skycons.set("day1",Skycons.WIND);
  //$("#day1").html("Windy");
  }else if(day1Con==="29"){
    skycons.set("day1",Skycons.PARTLY_CLOUDY_NIGHT);
  //$("#day1").html("Partly Cloudy Night");
  }else if(day1Con==="30"||day1Con==="44"){
    skycons.set("day1",Skycons.PARTLY_CLOUDY_DAY);
  //$("#day1").html("Partly Cloudy Day");
  }else if(day1Con==="31"){
    skycons.set("day1",Skycons.CLEAR_NIGHT);
  //$("#day1").html("Clear Night");
}else if(day1Con==="32"||day1Con==="36"){
    skycons.set("day1",Skycons.CLEAR_DAY);
  //$("#day1").html("Clear Day");
};

  var day2Con=data.query.results.channel.item.forecast[2].code;
  if(day2Con==="4"||day2Con==="11"||day2Con==="12"||day2Con==="37"||day2Con==="38"||day2Con==="39"||day2Con==="40"||day2Con==="45"||day2Con==="47"){
    skycons.set("day2",Skycons.RAIN);
  //$("#day2").text("Rain");
  }else if(day2Con==="26"||day2Con==="27"||day2Con==="28"){
    skycons.set("day2",Skycons.CLOUDY);
    //$("#day2").text("Cloudy");
  }else if(day2Con==="20"){
    skycons.set("day2",Skycons.FOG);
  //$("#day2").text("Fog");
  }else if(day2Con==="24"){
    skycons.set("day2",Skycons.WIND);
  //$("#day2").text("Windy");
  }else if(day2Con==="29"){
    skycons.set("day2",Skycons.PARTLY_CLOUDY_NIGHT);
  //$("#day2").text("Partly Cloudy Night");
  }else if(day2Con==="30"||day2Con==="44"){
    skycons.set("day2",Skycons.PARTLY_CLOUDY_DAY);
  //$("#day2").text("Partly Cloudy Day");
  }else if(day2Con==="31"){
    skycons.set("day2",Skycons.CLEAR_NIGHT);
  //$("#day2").text("Clear Night");
}else if(day2Con==="32"||day2Con==="36"){
    skycons.set("day2",Skycons.CLEAR_DAY);
  //$("#day2").text("Clear Day");
};

  var day3Con=data.query.results.channel.item.forecast[3].code;
  if(day3Con==="4"||day3Con==="11"||day3Con==="12"||day3Con==="37"||day3Con==="38"||day3Con==="39"||day3Con==="40"||day3Con==="45"||day3Con==="47"){
    skycons.set("day3",Skycons.RAIN);
  //$("#day3").text("Rain");
  }else if(day3Con==="26"||day3Con==="27"||day3Con==="28"){
    skycons.set("day3",Skycons.CLOUDY);
    //$("#day3").text("Cloudy");
  }else if(day3Con==="20"){
    skycons.set("day3",Skycons.FOG);
  //$("#day3").text("Fog");
  }else if(day3Con==="24"){
    skycons.set("day3",Skycons.WIND);
  //$("#day3").text("Windy");
  }else if(day3Con==="29"){
    skycons.set("day3",Skycons.PARTLY_CLOUDY_NIGHT);
  //$("#day3").text("Partly Cloudy Night");
  }else if(day3Con==="30"||day3Con==="44"){
    skycons.set("day3",Skycons.PARTLY_CLOUDY_DAY);
  //$("#day3").text("Partly Cloudy Day");
  }else if(day3Con==="31"){
    skycons.set("day3",Skycons.CLEAR_NIGHT);
  //$("#day3").text("Clear Night");
}else if(day3Con==="32"||day3Con==="36"){
    skycons.set("day3",Skycons.CLEAR_DAY);
  //$("#day3").text("Clear Day");
};

});
};


function getCityUrl(location){
  return "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+location+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"
}


function getJsonUntilSuccess (url , callback ){

  $.getJSON (getCityUrl(location) , function (data){

    if (data.query.results){ // if data.query.results exist , do the following action.
      callback (data)
    }else {
      console.info("reloading : ",url)
      getJsonUntilSuccess(url,callback)
    }

  })

}
