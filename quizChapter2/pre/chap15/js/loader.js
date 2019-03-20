
var urlPP= "https://preprod.daylight.themoocagency.com/quizMaster"

var urlBase = 'https://daylight.themoocagency.com/quizMaster'
var urlChoose

var urlPreprod = urlPP+postOrPre 
var urlAdd = urlBase + postOrPre
var x
var TotalBindQuest = 0
var configArray = [];
var configArray2 = "dds";
var qNameFile = "question1v.json"
var aNameFile = "answers1v.json"

var chronoButton = false
var pauseButton = false
var setShuffle = false
var TotalTime
$(document).ready(function() {
function promiseAjx(checkProd){

    $.ajax({
        url: checkProd + quizID,
        type: 'GET',
        dataType: 'html',
        header: 'Content-Type: application/json; charset=utf-8',
        cache: false,
        processData: false,
        success: function(data) {
            console.log(data)
            var myObject = JSON.stringify(data);
            var x = JSON.parse(data);
            configArray = x["config" + postOrPre];
            qNameFile = configArray.question_file_name + ".json"
            aNameFile = configArray.answers_file_name + ".json"
            TotalBindQuest = configArray.quiz_n_questions
            TotalTime = configArray.quiz_time
            jQuery("#quizTitle").text(x.quiz_title)
            jQuery("#quizSubtitle").text(x.quiz_title2)
            jQuery("#bindMyNestTot").text(TotalBindQuest);
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.src = "js/controllers/chrono.js";
            jQuery("#listOfMark").prepend(s);

            var bendOjerry = jQuery(".bendO")

            for (i = 0; i < configArray.SubLines.length; i++) {
                jQuery(bendOjerry[i]).append("<span class='blueRay'>" + configArray.SubLines[i] + "</br> </br> </span>");


            }



            var alreadyDone = localStorage.getItem("ale")
            $("#body").show();

            initCourse();
            $("#body").show();
            if (alreadyDone == true || alreadyDone == 'true') {
                if (window.confirm("Souhaitez vous recommencer?")) {
                    localStorage.clear();
                    $("#body").show();
                } else {
                    $("#body").show();
                }
            }
        }
    });
	}
	
	   $.ajax({
        url: "https://preprod.daylight.themoocagency.com/quizModePreprod",
        type: 'GET',
        dataType: 'html',
        header: 'Content-Type: application/json; charset=utf-8',
        cache: false,
        processData: false,
        success: function(data) {

            var myObject = JSON.stringify(data);
            var x = JSON.parse(data);
            configArray = x["config" + postOrPre];
            var preProdMode = x.active
			if(preProdMode=="true" || preProdMode==true){promiseAjx(urlPreprod)}
			else{promiseAjx(urlBase)}
			
			
   
        }
    });
	

});