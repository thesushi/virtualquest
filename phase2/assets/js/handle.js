$("#wrapper").hide();
$( document ).ready(function() {

    $("#talkbubble").hide();

        if(localStorage.getItem("virtualQuestPhase2-enigme") !== null && localStorage.getItem("virtualQuestPhase2-state") !== null){
      
            if(localStorage.getItem("virtualQuestPhase2-state") == "endFail" || localStorage.getItem("virtualQuestPhase2-state") == "endWin"){
               end();
            }
            else if(localStorage.getItem("virtualQuestPhase2-state") == "chercher"){
                $("#wrapper").show();
                setLuzarches(1);

                nouvelleEnigme(localStorage.getItem("virtualQuestPhase2-enigme"));
            }else{
                $("#wrapper").show();
                setLuzarches(2);
                debutEnigme(localStorage.getItem("virtualQuestPhase2-enigme"));
                goToEnigme();
            }
            $('#scoreBtn').attr("src", 'assets/img/btn_points_'+(localStorage.getItem("virtualQuestPhase2-enigme") - 1)+'.png');

        }

        if (localStorage.getItem('virtualQuestPhase2-isStarted') == null) {
            //debut du  jeu
            $("#wrapper").show();
             nouvelleEnigme(1, true);
             localStorage.setItem('virtualQuestPhase2-isStarted', true);
        }

        if(localStorage.getItem("virtualQuestPhase2-indice") !== null){
            setIndices(localStorage.getItem("virtualQuestPhase2-indice"));
        }
        
        $('#helpBtn').click(help);
        $('#refreshReset').click(reset);
        $('.endButton').click(end);
        $('.resetLuzarches').click(resetLuzarches);

    });

function resetLuzarches() {
    setLuzarches(1);
    $("#talkbubble").hide();
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
function goToEnigme() {
    
    var id = $(".titreEnigme");
    var offset = id.offset().top 
    $('html, body').animate({scrollTop: offset}, 'slow'); 
}

function reset() {
             localStorage.removeItem("virtualQuestPhase2-enigme");
            localStorage.removeItem("virtualQuestPhase2-state");
            localStorage.removeItem("virtualQuestPhase2-indice");
             localStorage.removeItem("virtualQuestPhase2-isStarted");
             localStorage.removeItem("virtualQuestPhase2-stateFail");
             localStorage.removeItem("virtualQuestPhase2-enigmeChance");
             document.location.href="index.html"

    }
        function end(){
            if(localStorage.getItem("virtualQuestPhase2-state") == "endWin") {
                document.location.href="goodEnd.html"
            }else if(localStorage.getItem("virtualQuestPhase2-state") == "endFail"){
                document.location.href="badEnd.html"
            }
        }

        function nouvelleEnigme(number, modal){
            setLuzarches(1);
            if(parseInt(number) > 1) {
             $('.titreEnigme').html('<p>Pour trouver la prochaine énigme :</p>');
            }
            if (number == 7) {
                $('.titreEnigme').html('<p>Pour trouver le personnage qui se cache derrière la vierge :</p>');
            }
            localStorage.setItem('virtualQuestPhase2-enigme', number);
            localStorage.setItem('virtualQuestPhase2-state', 'chercher');
            $('#enigme'+number+' .info_e').removeClass('hidden');
            if(modal){
                setLuzarches(3);
                $("#modal"+number).modal("show");
                $('#enigme'+(parseInt(number)-1)+' .corps_e').addClass('hidden');
                if(parseInt(number) === 1)
                    $('#enigme7 .corps_e').addClass('hidden');
            }       
        
        }

        function setIndices(indice){
            $('#indices').text(indice);
            localStorage.setItem("virtualQuestPhase2-indice",indice);
        }
        function debutEnigme(number){
            if(localStorage.getItem("virtualQuestPhase2-enigme") == number){
                setLuzarches(2);

                localStorage.setItem('virtualQuestPhase2-state', 'resoudre');
                $('.titreEnigme').html('<p>Bravo tu as trouvé l\'énigme '+number+'</p>');
                switch(number) {
                    case '3': 
                        $('.titreEnigme').html('<p>Bravo tu as trouvé la seconde partie de l\'énigme 2</p>');
                        break;
                    case '7':
                        $('.titreEnigme').html('<p>Bravo tu as trouvé la dernière énigme </p>');
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
                    case '4':
                        enigme4();
                        break;
                    case '5':
                        enigme5();
                        break;
                    case '6':
                        enigme6();
                        break;
                    case '7':
                        enigme7();
                        break;
                }
            }
        }

// mot évéque mélangé
function enigme1() {
    goToEnigme();
    letter_cases = $(".lettre_e1_case_active");
    letter_cases.disableSelection();
    letter_cases.children().disableSelection();
    $('.lettre_e1_case').disableSelection();

    $(".lettre_e1_case").droppable({
        drop: function(event,ui){
            if( $(this).html() == "") {
                // case vide
                ui.draggable.removeAttr("style");
                $(this).html(ui.draggable);
            }else{
                //case non-vide
                if($(this).find("span") != ""){
                    //case contenant un span donc une lettre
                    if($(this).find("span").attr("state") != "locked") {
                        // mais lettre contenue n'est pas la bonne alors échange

                        //Ensemble de places de depart possibles pour les E
                        if($(this).find("span").text()=="E"){
                            if($("[data-letter='E']:eq(0)").html() == ""){
                                $("[data-letter='E']:eq(0)").html($(this).find("span"));
                            }else{
                                if($("[data-letter='E']:eq(1)").html() == ""){
                                    $("[data-letter='E']:eq(1)").html($(this).find("span"));
                                }else{
                                    if($("[data-letter='E']:eq(2)").html() == ""){
                                        $("[data-letter='E']:eq(2)").html($(this).find("span"));
                                    }
                                }
                            }
                        }else{
                            //Operation pour toute lettre differente du "E"
                            $("[data-letter='" + $(this).find("span").text() + "']").html($(this).find("span"));
                        }
                        //Mise en place de la lettre dans sa nouvelle case
                        $(this).html(ui.draggable);
                    }
                }
                //Permet que la lettre apparaisse a l'interieur de la case de destination
                ui.draggable.removeAttr("style");
            }
        }
    });

    letter_cases.children().draggable({
        stop:function(){
            $count=0;

            if($(".lettre_e1_case:eq(0)").text() == "E"){
                $(".lettre_e1_case:eq(0)").css("background","#00BB00");
                $(".lettre_e1_case:eq(0) > span").draggable("disable");
                $(".lettre_e1_case:eq(0) > span").attr("state","locked");
                $count++;
            }

            if($(".lettre_e1_case:eq(1)").text() == "V"){
                $(".lettre_e1_case:eq(1)").css("background","#00BB00");
                $(".lettre_e1_case:eq(1) > span").draggable("disable");
                $(".lettre_e1_case:eq(1) > span").attr("state","locked");
                $count++;
            }

            if($(".lettre_e1_case:eq(2)").text() == "E"){
                $(".lettre_e1_case:eq(2)").css("background","#00BB00");
                $(".lettre_e1_case:eq(2) > span").draggable("disable");
                $(".lettre_e1_case:eq(2) > span").attr("state","locked");
                $count++;
            }

            if($(".lettre_e1_case:eq(3)").text() == "Q"){
                $(".lettre_e1_case:eq(3)").css("background","#00BB00");
                $(".lettre_e1_case:eq(3) > span").draggable("disable");
                $(".lettre_e1_case:eq(3) > span").attr("state","locked");
                $count++;
            }

            if($(".lettre_e1_case:eq(4)").text() == "U"){
                $(".lettre_e1_case:eq(4)").css("background","#00BB00");
                $(".lettre_e1_case:eq(4) > span").draggable("disable");
                $(".lettre_e1_case:eq(4) > span").attr("state","locked");
                $count++;
            }

            if($(".lettre_e1_case:eq(5)").text() == "E") {
                $(".lettre_e1_case:eq(5)").css("background", "#00BB00");
                $(".lettre_e1_case:eq(5) > span").draggable("disable");
                $(".lettre_e1_case:eq(5) > span").attr("state","locked");
                $count++;
            }

            if($count == 6){
                $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
                nouvelleEnigme(2,'showModal');
                setIndices('Evêque');
                $('#scoreBtn').attr("src", 'assets/img/btn_points_1.png');
            }
        },
        cursor:'move',
        revert:"invalid"
    });
}

// les 11 R qui font 3
function enigme2(){
    goToEnigme();
    var nbr=11;
    $("#talkbubble").html('<br>Il te reste 11 R à trouver.');
    $("#talkbubble").show();
    $(".enigmes .tab_e2 td").on('click',function(){

        var lettre=$(this).text();
        var css=$(this).css('background-color');

        if ((lettre =='R') && (css!='rgb(255, 0, 0)') && $(this).hasClass('clickR')){
            nbr--;
            $("#talkbubble").html('<br>Il te reste '+nbr+' R à trouver.');
            $(this).removeClass('clickR');
            $(this).css("background", "LawnGreen");
            if(nbr==0){
                $("#talkbubble").html('<br> Bravo !');
                nouvelleEnigme(3,'showModal');
                setIndices('évèque, 3');
                $('#scoreBtn').attr("src", 'assets/img/btn_points_2.png');
            }
        }

    });
}


// les 3 anges
function enigme3() {
    goToEnigme();
    var htmlEnigme = $("#enigme3 .corps_e");
    var nombreAnge = 3;

    htmlEnigme.on("click", ".checkAnge", function(){
        var reponseUser = $('input[name="rep_e3"]').val();
        if (reponseUser == nombreAnge) {
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            nouvelleEnigme(4,'showModal');
            setIndices('évèque, 3 + 3');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_3.png');
        } else {
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();

        }
    });
}

//ordre des personnes (pain)
function enigme4(){
    goToEnigme();
    var nbCartes = 0;
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
            if(nbCartes===4){
                $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
                nouvelleEnigme(5,'showModal');
                setIndices('évèque, 3 + 3, Pain');
                $('#scoreBtn').attr("src", 'assets/img/btn_points_4.png');
            }
        }
        $("#e4_lettre").find("div").each(function() {
            if($(this).data("lettreActive") === emplacements){
                $(this).css("left", "");
                $(this).css("top", "");
                $(this).removeData("lettreActive");
            }
        });
    }

    $(".recepteur").droppable({
        drop: handleCardDrop
    });

    $(".dragIt").draggable({
        containment: '#dragDropEnigme4',
        cursor: 'move',
        revert:"invalid"
    });
}

//Rébus boulanger
function enigme5(){
    goToEnigme();
    var response1='boulanger';

    $(".enigmes").on('click', '.checkRebus', function(){
        var userResponse = $('input[name="rep_e5"]').val().toLowerCase();
        if (userResponse == response1){
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            nouvelleEnigme(6,'showModal');
            setIndices('évèque, 3 + 3, Pain, boulanger');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_5.png');
        }
        else{
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();
        }
    });

}


// le mot saint
function enigme6(){
    goToEnigme();
    var htmlEnigme = $("#enigme6 .corps_e");

    htmlEnigme.on('click', '.checkEnigme6', function(){
        var userResponse = $('input[name="rep_6"]').val().toLowerCase();
        if (userResponse == 'saint') {
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            nouvelleEnigme(7,'showModal');
            setIndices('évèque, 3 + 3, Pain, Saint');
            $('#scoreBtn').attr("src", 'assets/img/btn_points_6.png');
        }else{
            $("#talkbubble").html('<br>Ce n\'est pas la bonne réponse. Essaye encore ...<br><br>');
            $("#talkbubble").show();
        }
    });
}

//saint honoré
function enigme7() {
    goToEnigme();
    if (localStorage.getItem('virtualQuestPhase2-stateFail') == null) {

    $("#modal8").modal("show");
    var chances = 3;
    if (localStorage.getItem("virtualQuestPhase2-enigmeChance") !== null) {
        chances = localStorage.getItem("virtualQuestPhase2-enigmeChance");
        $('#chances').text(chances);
    }
    var bonnesReponses = 0;
    var bonnesLettres = ['A', 'I', 'N', 'T', 'O', 'R', 'É'];

    bonnesLettres.forEach(function(lettre) {
        $('.'+lettre).text('_');
        $('.lettre').show();
    });

    $('.lettre_e7 .lettre').on('click', function(event) {
        var lettreChoisie = event.target.innerText;

        if(bonnesLettres.indexOf(lettreChoisie) > -1){
            $('.pendu .'+lettreChoisie).text(lettreChoisie);
            bonnesReponses++;
            $(event.target).hide();
        }else{
            chances--;
            localStorage.setItem("virtualQuestPhase2-enigmeChance", chances);
            $('#chances').text(chances);
        }

        if(chances === 0){
            endFail();
        }

        if(bonnesReponses === 7){
            setLuzarches(3);
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
            $("#modal9").modal("show");
            $("#modal9 .modal-body button").addClass("modalGagne");
            localStorage.setItem('virtualQuestPhase2-state', 'endWin');
        }
    });
    } else {
        endFail();
    }
}

//enigme saint-honoré v2
function endFail() {
    localStorage.setItem('virtualQuestPhase2-stateFail', true);
    $("#modal10").modal("show");
    $('.titreEnigme').html("L'énigme 7");
    $('#enigme7 .corps_e').addClass('hidden');
    $('#endFail .corps_e').removeClass('hidden');
    $(".dcLabel").disableSelection();
    $(".dcLabel").click(function(){
        if($(this).hasClass("dcFaux")){
            $(this).removeClass("label-default");
            $(this).addClass("label-danger");
        }
        else if($(this).hasClass("dcVrai")){
            setLuzarches(3);
            localStorage.setItem('virtualQuestPhase2-state', 'endFail');
            $(this).removeClass("label-default");
            $(this).addClass("label-success");
            $("#modal9").modal("show");
            $("#talkbubble").html('<br> Bravo !');
            $("#talkbubble").show();
        }
    });

}