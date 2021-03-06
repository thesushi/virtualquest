$("#wrapper").hide();
$( document ).ready(function() {

    $("#talkbubble").hide();
        if(localStorage.getItem("virtualQuestPhase3-enigme") !== null && localStorage.getItem("virtualQuestPhase3-state") !== null){
      
            if(localStorage.getItem("virtualQuestPhase3-state") == "endFail" || localStorage.getItem("virtualQuestPhase3-state") == "endWin"){
               end();
            }
            else if(localStorage.getItem("virtualQuestPhase3-state") == "chercher"){
                $("#wrapper").show();
                 if (localStorage.getItem("virtualQuestPhase3-enigme") == 5 ) {
                     hideLuzarches();
                }
                setLuzarches(1);

                nouvelleEnigme(localStorage.getItem("virtualQuestPhase3-enigme"));
            }else{
                $("#wrapper").show();
                setLuzarches(2);
                debutEnigme(localStorage.getItem("virtualQuestPhase3-enigme"));

                goToEnigme();
                
            }
            var score = localStorage.getItem("virtualQuestPhase3-enigme") - 1;
            if (score == 34) {
                score = 3;
            }
            $('#scoreBtn').attr("src", 'assets/img/btn_points_'+ score +'.png');

        }

        if (localStorage.getItem('virtualQuestPhase3-isStarted') == null) {
            //debut du  jeu
            $("#wrapper").show();
             nouvelleEnigme(1, true);
             localStorage.setItem('virtualQuestPhase3-isStarted', true);
        }

        if(localStorage.getItem("virtualQuestPhase3-indice") !== null){
            setIndices(localStorage.getItem("virtualQuestPhase3-indice"));
        }
        
        $('#helpBtn').click(help);
        $('#refreshReset').click(reset);
        $('.endButton').click(end);
        $('.resetLuzarches').click(resetLuzarches);
        $('.hideLuzarches').click(hideLuzarches);
        $('.e4LuzarchesSet').click(e4LuzarchesSet);      



    });

function resetLuzarches() {
    setLuzarches(1);
    $("#talkbubble").hide();
    setLuzarchesSpeech();
}
function hideLuzarches() {
    setLuzarches(1);
    $('#luzarches').hide();

}
function setLuzarchesSpeech() {
    switch (localStorage.getItem("virtualQuestPhase3-enigme")) {
        case '1':
            luzarcheTalk(' Bonjour ! <br> Il faut que tu reviennes à la source de ton aventure...'); 
            break;
        case '3':
            luzarcheTalk("Il faut qu'on retrouve la vrai vierge dorée ! <br> Mais où est elle ? Ma mémoire me fait défaut ...");
            break;
         case '4':
             luzarcheTalk(" Mais j'y pense, il reste un mystère sur St Honoré ! Retrouve l'ange triste pour trouver notre destination finale.");
            break;
    }
}
function setLuzarchesVierge() {
    if (localStorage.getItem("virtualQuestPhase3-enigme") == 2) {
        luzarcheTalk(' Hmmm ... <br> Il y a quelque chose de louche avec cette statue...')
    }
}
function setLuzarches(posture) {
    switch(posture) {
        case 1:
            $('#luzarches').attr("src", 'assets/img/enqueteur_neutre.png');
            break;
        case 2: 
            $('#luzarches').attr("src", 'assets/img/enqueteur_reflechit.png');
            break;
        case 3:
            $('#luzarches').attr("src", 'assets/img/enqueteur_expose.png');
            break;


    }
}

function help() {
    $("#modalHelp").modal("show");
}


function reset() {
             localStorage.removeItem("virtualQuestPhase3-enigme");
            localStorage.removeItem("virtualQuestPhase3-state");
            localStorage.removeItem("virtualQuestPhase3-indice");
             localStorage.removeItem("virtualQuestPhase3-isStarted");
             localStorage.removeItem("virtualQuestPhase3-stateFail");
            localStorage.removeItem('virtualQuestPhase3-enigme5Count');
             document.location.href="index.html"

    }
        function end(){
            if(localStorage.getItem("virtualQuestPhase3-state") == "endWin") {
                document.location.href="goodEnd.html"
            }else if(localStorage.getItem("virtualQuestPhase3-state") == "endFail"){
                document.location.href="badEnd.html"
            }
        }

        function nouvelleEnigme(number, modal){
            setLuzarches(1);
            if(parseInt(number) > 1) {
             $('.titreEnigme').html('<p>Pour trouver la prochaine énigme :</p>');
            }
            localStorage.setItem('virtualQuestPhase3-enigme', number);
            localStorage.setItem('virtualQuestPhase3-state', 'chercher');
            
                $('#enigme'+number+' .info_e').removeClass('hidden');
            
            if(modal){
                setLuzarches(3);
                
                $("#modal"+number).modal("show");
                if (number != 35) {
                    $('#enigme'+(parseInt(number)-1)+' .corps_e').addClass('hidden');
                } else {
                    $('#enigme3'+' .corps_e').addClass('hidden');
                }
            }       
            setLuzarchesSpeech();        
        }

        function luzarcheTalk(talk) {
            $("#talkbubble").show();
            $("#talkbubble").html(talk);
        }

        function setIndices(indice){
            $('#indices').text(indice);
            localStorage.setItem("virtualQuestPhase3-indice",indice);
        }
        function debutEnigme(number){
            if(localStorage.getItem("virtualQuestPhase3-enigme") == number){
                setLuzarches(2);

                localStorage.setItem('virtualQuestPhase3-state', 'resoudre');
                $('.titreEnigme').html('<p>Bravo tu as trouvé l\'énigme '+number+'</p>');
                switch(number) {
                    case '3': 
                        $('.titreEnigme').html('<p>Bravo tu as trouvé la seconde partie de l\'énigme 2</p>');
                        break;
                }
                $('#enigme'+number+' .info_e').addClass('hidden');
                $('#enigme'+number+' .corps_e').removeClass('hidden');
                switch(number) {
                    case '1':
                        enigme1();
                        break;
                    case '2':
                        enigme2();
                        break;
                    case '3':
                        enigme3();
                        break;
                    case '35':
                        enigme35();
                        break;
                    case '4':
                        enigme4();
                        break;
                    case '5':
                        enigme5();
                        break;
                }
            }
        }
function goToEnigme() {
    
    var id = $(".titreEnigme");
    var offset = id.offset().top 
    $('html, body').animate({scrollTop: offset}, 'slow'); 
}

// mot crypté sud
function enigme1() {
    $("#talkbubble").hide();
    goToEnigme();
    var htmlEnigme = $("#enigme1 .corps_e");
    var reponseCode = "sud";

    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkCode", function(){
        var reponseUser = $('input[name="rep_e1"]').val();
        if (reponseUser.toLowerCase() == reponseCode.toLowerCase()) {
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            nouvelleEnigme(2,'showModal');
            setIndices('SUD');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_1.png');
        } else {
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();

        }
    });
}

// la fausse vierge
function enigme2(){

$("#talkbubble").hide();
goToEnigme();
    var nbCartes = 0;
     var htmlEnigme = $("#enigme2 .corps_e");
    $(".dragIt").disableSelection();

    function handleCardDrop(event, ui ) {
        var emplacements = $(this).data('letter');
        var cartes = ui.draggable.data('letter');

        ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});

        if (cartes !== emplacements) {
            ui.draggable.data("lettreActive", $(this).data('letter'));
        } else {
            $(this).css("left", "");
            $(this).css("top", "");
            $(this).removeData("lettreActive");
            ui.draggable.addClass('bonneReponse');
            ui.draggable.draggable('disable');
            $(this).droppable('disable');
            ui.draggable.draggable('option', 'revert', false);
            nbCartes++;
            $(this).removeClass('recepteur');
            
        }
        $("#e2_lettre").find("div").each(function() {
            if($(this).data("lettreActive") === emplacements){
                $(this).css("left", "");
                $(this).css("top", "");
                $(this).removeData("lettreActive");
            }
        });
         
    }
    htmlEnigme.on("click", ".checkImg2", function(){
            if(nbCartes===3){
                $("#talkbubble").html('<br> Bravo !');
                $("#talkbubble").show();
                nouvelleEnigme(3,'showModal');
                setIndices('SUD, Fausse statue');
                $('#scoreBtn').attr("src", 'assets/img/btn_points_2.png');
            } else {
                 $("#talkbubble").html('<br>Tu n\'as pas résolu le mystère. Essaye encore ...<br><br>');
                $("#talkbubble").show();
            }  });
    $(".recepteur").droppable({
        drop: handleCardDrop
    });

    $(".dragIt").draggable({
        containment: '#dragDropEnigme2',
        cursor: 'move',
        revert:"invalid"
    });
}

function e4LuzarchesSet() {
     $("#talkbubble").hide();
     $("#talkbubble").html("");
setLuzarches(1);
    $('#luzarches').hide();
}


// direction sud est
function enigme3() {
    $("#talkbubble").hide();
    goToEnigme();
    var htmlEnigme = $("#enigme3 .corps_e");
    var repPos1 = "sud-est";
    var repPos2 = "sud est";


    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkPos", function(){
        var reponseUser = $('input[name="rep_e3"]').val();
        if (reponseUser.toLowerCase() == repPos2 || reponseUser.toLowerCase() == repPos1) {
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            nouvelleEnigme(35,'showModal');
            setIndices('SUD, Fausse statue, SUD-EST');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_3.png');
        } else {
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();

        }
    });
}

// Vrai vierge
function enigme35(){
    $("#talkbubble").hide();
    
    $("#talkbubble").html('<br> Bravo !');
    $("#talkbubble").show();
    nouvelleEnigme(4,'showModal');
    setIndices('St Honoré, Ange Triste');
    $('#scoreBtn').attr("src", 'assets/img/btn_points_4.png');
}

//rebus portail nord
function enigme4(){
    $("#talkbubble").hide();
    goToEnigme();
    var htmlEnigme = $("#enigme4 .corps_e");
    var repPos1 = "portail nord";
    var repPos2 = "portail-nord";
    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkRebus4", function(){
        var reponseUser = $('input[name="rep_e4"]').val();
        if (reponseUser.toLowerCase() == repPos1 || reponseUser.toLowerCase() == repPos2) {
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            nouvelleEnigme(5,'showModal');
            setIndices('St Honoré, Portail Nord');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_4.png');
        } else {
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();

        }
    });
   
}

//rebus nourrice
function enigme5(){
    $('#luzarches').show();
    $("#talkbubble").hide();
    goToEnigme();
    var htmlEnigme = $("#enigme5 .corps_e");
    var repPos1 = "nourrice";
    var chances = 3;
    if (localStorage.getItem("virtualQuestPhase3-enigme5Count") !== null) {
        chances = localStorage.getItem("virtualQuestPhase3-enigme5Count");    
            var s = '';
            if (chances > 1) {
                s = 's';
            }
            $('#chanceLeft').text(chances + ' chance' + s);
    }
    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkRebus5", function(){
        var reponseUser = $('input[name="rep_e5"]').val();
        if (reponseUser.toLowerCase() == repPos1) {
            localStorage.setItem('virtualQuestPhase3-state', 'endWin');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_5.png');
            setLuzarches(3);
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            $("#modal6").modal("show");
            $("#modal6 .modal-body button").addClass("modalGagne");
            
        } else {
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();
            chances--;
            localStorage.setItem('virtualQuestPhase3-enigme5Count', chances);
            s = '';
            if (chances > 1) {
                s = 's';
            }
            $('#chanceLeft').text(chances + ' chance' + s);
            if (chances == 0) {
                endFail();
            }

        }
    });
   
}

//enigme saint-honoré v2
function endFail() {
    $("#talkbubble").html('<br>Oh non !<br><br>');
    localStorage.setItem('virtualQuestPhase3-stateFail', true);
    localStorage.setItem('virtualQuestPhase3-state', 'endFail');
    $("#modal10").modal("show");
    $('.titreEnigme').html("Dommage ...");
    $('#enigme5 .corps_e').addClass('hidden');
}
