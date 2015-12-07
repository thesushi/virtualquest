$("#wrapper").hide();
$( document ).ready(function() {

    $("#talkbubble").hide();

        if(localStorage.getItem("virtualQuestPhase2-enigme") !== null && localStorage.getItem("virtualQuestPhase2-state") !== null){
      
            if(localStorage.getItem("virtualQuestPhase2-state") == "endFail" || localStorage.getItem("virtualQuestPhase2-state") == "endWin"){
               end();
            }
            else if(localStorage.getItem("virtualQuestPhase2-state") == "chercher"){
                setLuzarches(1);

                nouvelleEnigme(localStorage.getItem("virtualQuestPhase2-enigme"));
            }else{
                setLuzarches(2);
                debutEnigme(localStorage.getItem("virtualQuestPhase2-enigme"));
            }
            $('#scoreBtn').attr("src", 'assets/img/btn_points_'+(localStorage.getItem("virtualQuestPhase2-enigme") - 1)+'.png');

        }

        if (localStorage.getItem('virtualQuestPhase2-isStarted') == null) {
            //debut du  jeu
             nouvelleEnigme(1, true);
             localStorage.setItem('virtualQuestPhase2-isStarted', true);
        }

        if(localStorage.getItem("virtualQuestPhase2-indice") !== null){
            setIndices(localStorage.getItem("virtualQuestPhase2-indice"));
        }
        $("#wrapper").show();
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


function reset() {
             localStorage.removeItem("virtualQuestPhase2-enigme");
            localStorage.removeItem("virtualQuestPhase2-state");
            localStorage.removeItem("virtualQuestPhase2-indice");
             localStorage.removeItem("virtualQuestPhase2-isStarted");
             localStorage.removeItem("virtualQuestPhase2-stateFail");
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
        function startStep(number){
            debutEnigme(number);
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
    var nbr=11;
    $("#enigme2 .corps_e").html("<p class='col-md-12'>Pour résoudre cette énigme, clique sur tous les R qui se cachent parmis les B.</p><p class='col-md-12'>A toi de jouer !</p><div class='col-md-12 col-xs-12 col-sm-12'><table class='tab_e2 col-md-8 col-md-offset-2  col-xs-8 col-xs-offset-2  col-sm-8 col-sm-offset-2'><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td class='clickR'>R</td><td class='clickR'>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td class='clickR'>R</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td class='clickR'>R</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td class='clickR'>R</td><td class='clickR'>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td></tr> </table></div><br/></span>");
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
    var htmlEnigme = $("#enigme3 .corps_e");
    var nombreAnge = 3;

    //Écriture de l'énigme <html> dans la div énigme
    htmlEnigme
        .html("<p class='col-md-12'>Pour résoudre cette énigme, dis-nous combien d'anges surplombent le portail <br/>À toi de jouer !<br/> <img class='text-center' src='assets/img/anges.png' width='60%'/></p> <div class='col-md-12'><input type='text' placeholder='Réponse' name='rep_e3' /> <button class='checkAnge'>Vérifier</button></div><div class='indication col-md-12ƒ'></div>"
    );

    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
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
    var response1='boulanger';

    $("#enigme5 .corps_e")
        .html("" +
        "<p class='col-md-12 col-xs-12 col-sm-12'>Sauras-tu résoudre ce rébus pour trouver le quatrième indice ?</p>" +
        "<p class='col-md-12'>À toi de jouer !</p>" +
        "<div class='col-md-12 col-xs-12 col-sm-12'>"+
        "<img class='col-md-4' src='assets/img/boule.png' alt='boule' />"+
        "<img class='col-md-4' src='assets/img/ange.png' alt='ange' />"+
        "<img class='col-md-4' src='assets/img/et.png' alt='et' />"+
        "</div>"+
        "<div class='inputRebus col-md-12 col-xs-12 col-sm-12'>"+
        "<input type='text' placeholder='Réponse' name='rep_e5'/><button class='checkRebus'> Vérifier </button></div><div class='indication col-md-12'></div>");

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
    var htmlEnigme = $("#enigme6 .corps_e");

    htmlEnigme
        .html(
        "<p class='col-md-12 col-xs-12'>Pour résoudre cette énigme, trouve le nom commun à toutes les définitions :</p>" +
        "<p class='col-md-12 col-xs-12'>" +
        "1. Il est parfois synonyme de bonne santé <br/>" +
        "2. Les personnes ayant bon cœur en sont qualifiés <br/>" +
        "3. Valentin et Nicolas sont très connus <br/>" +
        "4. Chaque jour le calendrier en célèbre un différent <br/>" +
        "</p>" +
        "<div class='col-md-12'>" +
        "<input type='text' placeholder='Réponse' name='rep_6' /> <button class='checkEnigme6'>Vérifier</button>" +
        "</div><div class='indication col-md-12'></div>"
    );

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
    if (localStorage.getItem('virtualQuestPhase2-stateFail') == null) {
    $("#modal8").modal("show");
    var chances = 3;
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