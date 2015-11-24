$( document ).ready(function() {
    $('.aventure').css('display', 'block');
    $("#talkbubble").hide();

        if(localStorage.getItem("virtualQuest-enigme") !== null && localStorage.getItem("virtualQuest-state") !== null){
      
            if(localStorage.getItem("virtualQuest-state") == "endFail" || localStorage.getItem("virtualQuest-state") == "endWin"){
                end();
            }
            else if(localStorage.getItem("virtualQuest-state") == "chercher"){

                nouvelleEnigme(localStorage.getItem("virtualQuest-enigme"));
            }else{

                debutEnigme(localStorage.getItem("virtualQuest-enigme"));
            }

        }

        if (localStorage.getItem('virtualQuest-isStarted') == null) {
            //debut du  jeu
             nouvelleEnigme(1, true);
             localStorage.setItem('virtualQuest-isStarted', true);
        }

        if(localStorage.getItem("virtualQuest-indice") !== null){
            writeIndice(localStorage.getItem("virtualQuest-indice"));
        }


        $('#refreshReset').click(reset);
        $('.endButton').click(end);

    });

function reset() {
             localStorage.removeItem("virtualQuest-enigme");
            localStorage.removeItem("virtualQuest-state");
            localStorage.removeItem("virtualQuest-indice");
             localStorage.removeItem("virtualQuest-isStarted");
             localStorage.removeItem("virtualQuest-stateFail");
             document.location.href="index.html"

    }
        function end(){
            if(localStorage.getItem("virtualQuest-state") == "endWin") {
                document.location.href="goodEnd.html"
            }else if(localStorage.getItem("virtualQuest-state") == "endFail"){
                document.location.href="badEnd.html"
            }
            $('#main').css('display', 'none');
        }

        function nouvelleEnigme(number, modal){
            if(parseInt(number) > 1) {
             $('.barreEnigme').html('<p>Pour trouver la prochaine énigme :</p>');
            }
            localStorage.setItem('virtualQuest-enigme', number);
            localStorage.setItem('virtualQuest-state', 'chercher');
            $('#enigme'+number+' .enigme_info').removeClass('hidden');
            if(modal){
                $("#modal"+number).modal("show");
                $('#enigme'+(parseInt(number)-1)+' .enigme_content').addClass('hidden');
                if(parseInt(number) === 1)
                    $('#enigme7 .enigme_content').addClass('hidden');
            }       
        
        }

        function writeIndice(indice){
            $('#indices').text(indice);
            localStorage.setItem("virtualQuest-indice",indice);
        }
        function startStep(number){
            debutEnigme(number);
        }
        function debutEnigme(number){
            console.log('Appel de l\'énigme n°'+number);
            if(localStorage.getItem("virtualQuest-enigme") == number){
                localStorage.setItem('virtualQuest-state', 'resoudre');
                $('.barreEnigme').html('<p>Énigme '+number+'</p>');
                $('#enigme'+number+' .enigme_info').addClass('hidden');
                $('#enigme'+number+' .enigme_content').removeClass('hidden');
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


function enigme1() {
    letter_cases = $(".square_letter_to_pickup");
    letter_cases.disableSelection();
    letter_cases.children().disableSelection();
    $('.square_letter').disableSelection();

    $(".square_letter").droppable({
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

            /*********************************/
            /*    VERIFICATION LETTRES    */
            /*********************************/

            if($(".square_letter:eq(0)").text() == "E"){
                $(".square_letter:eq(0)").css("background","#00BB00");
                $(".square_letter:eq(0) > span").draggable("disable");
                $(".square_letter:eq(0) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(1)").text() == "V"){
                $(".square_letter:eq(1)").css("background","#00BB00");
                $(".square_letter:eq(1) > span").draggable("disable");
                $(".square_letter:eq(1) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(2)").text() == "E"){
                $(".square_letter:eq(2)").css("background","#00BB00");
                $(".square_letter:eq(2) > span").draggable("disable");
                $(".square_letter:eq(2) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(3)").text() == "Q"){
                $(".square_letter:eq(3)").css("background","#00BB00");
                $(".square_letter:eq(3) > span").draggable("disable");
                $(".square_letter:eq(3) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(4)").text() == "U"){
                $(".square_letter:eq(4)").css("background","#00BB00");
                $(".square_letter:eq(4) > span").draggable("disable");
                $(".square_letter:eq(4) > span").attr("state","locked");
                $count++;
            }

            if($(".square_letter:eq(5)").text() == "E") {
                $(".square_letter:eq(5)").css("background", "#00BB00");
                $(".square_letter:eq(5) > span").draggable("disable");
                $(".square_letter:eq(5) > span").attr("state","locked");
                $count++;
            }

            if($count == 6){
                nouvelleEnigme(2,'showModal');
                writeIndice('Evêque');
            }
        },
        cursor:'move',
        revert:"invalid"
    });
}

/*
 * Enigme 2 partie 1
 * Objectif : Trouver les R dans les B
 * */
function enigme2(){
    var nbr=11;
    $("#enigme2 .enigme_content").html("<p class='col-md-12'>Pour résoudre cette énigme, clique sur tous les R qui se cachent parmis les B.</p><p class='col-md-12'>A toi de jouer !</p><div class='col-md-12 col-xs-12 col-sm-12'><table class='GrilleEnigme2 col-md-8 col-md-offset-2  col-xs-8 col-xs-offset-2  col-sm-8 col-sm-offset-2'><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td class='clickR'>R</td><td class='clickR'>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td class='clickR'>R</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td class='clickR'>R</td><td>B</td><td>B</td><td class='clickR'>R</td><td>B</td></tr><tr><td>B</td><td>B</td><td class='clickR'>R</td><td class='clickR'>R</td><td>B</td><td>B</td></tr><tr><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td><td>B</td></tr> </table></div><br/><div class='nbR col-md-12'>Il reste 11 R à trouver. </span>");

    $(".enigmes .GrilleEnigme2 td").on('click',function(){

        var lettre=$(this).text();
        var css=$(this).css('background-color');

        if ((lettre =='R') && (css!='rgb(255, 0, 0)') && $(this).hasClass('clickR')){
            nbr--;
            $(".nbR").html("il reste "+nbr+" R à trouver. ");
            $(this).removeClass('clickR');
            $(this).css("background", "LawnGreen");
            if(nbr==0){
                $(".nbR").html("BRAVO!");
                nouvelleEnigme(3,'showModal');
                writeIndice('évèque, 3');
            }
        }

    });
}


/*
 * Enigme 2 partie 2
 * Objectif : Trouver le nombre d'ange sur une image
 * Réponse : 3 anges
 * */
function enigme3() {
    $("#anges").css('display','block');
    $("#pano").hide();
    var htmlEnigme = $("#enigme3 .enigme_content");
    var nombreAnge = 3;

    //Écriture de l'énigme <html> dans la div énigme
    htmlEnigme
        .html("<p class='col-md-12'>Pour résoudre cette énigme, dis-nous combien d'anges surplombent le portail <br/>À toi de jouer !</p><div class='col-md-12'><input type='text' placeholder='Réponse' name='reponseNbAnges' /> <button class='checkAnge'>Vérifier</button></div><div class='indication col-md-12'></div>"
    );

    //Click sur le bouton Vérifier
    //Vérifie la réponse donnée
    htmlEnigme.on("click", ".checkAnge", function(){
        var reponseUser = $('input[name="reponseNbAnges"]').val();
        if (reponseUser == nombreAnge) {
            $('.indication').text('BRAVO !');
            $("#anges").css('display','none');
            $("#pano").show();
            nouvelleEnigme(4,'showModal');
            writeIndice('évèque, 3 + 3');
        } else {
            $('.indication').text('Ce n\'est pas la bonne réponse. Essaye encore ...');
        }
    });
}

function enigme4(){
    var correctCards = 0;
    $(".dragIt").disableSelection();

    function handleCardDrop(event, ui ) {
        var slotLetter = $(this).data('letter');
        var cardLetter = ui.draggable.data('letter');

        ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});

        $("#cardPile").find("div").each(function() {
            if($(this).data("letterStock")===slotLetter){
                $(this).css("left", "");
                $(this).css("top", "");
                $(this).removeData("letterStock");
            }
        });

        if (cardLetter !== slotLetter) {
            ui.draggable.data("letterStock", $(this).data('letter'));
        } else {
            ui.draggable.addClass('correctCard');
            ui.draggable.draggable('disable');
            $(this).droppable('disable');
            ui.draggable.draggable('option', 'revert', false);
            correctCards++;
            console.log(correctCards);
            if(correctCards===4){
                nouvelleEnigme(5,'showModal');
                writeIndice('évèque, 3 + 3, Pain');
            }
        }
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

/*
 * Enigme 5
 * Objectif : Résoudre un rébus
 * Réponse : boulanger
 */
function enigme5(){
    var response1='boulanger';

    $("#enigme5 .enigme_content")
        .html("" +
        "<p class='col-md-12 col-xs-12 col-sm-12'>Sauras-tu résoudre ce rébus pour trouver le quatrième indice ?</p>" +
        "<p class='col-md-12'>À toi de jouer !</p>" +
        "<div class='col-md-12 col-xs-12 col-sm-12'>"+
        "<img class='col-md-4' src='assets/img/boule.png' alt='boule' />"+
        "<img class='col-md-4' src='assets/img/ange.png' alt='ange' />"+
        "<img class='col-md-4' src='assets/img/et.png' alt='et' />"+
        "</div>"+
        "<div class='inputRebus col-md-12 col-xs-12 col-sm-12'>"+
        "<input type='text' placeholder='Réponse' name='reponseRebus'/><button class='checkRebus'> Vérifier </button></div><div class='indication col-md-12'></div>");

    $(".enigmes").on('click', '.checkRebus', function(){
        var userResponse = $('input[name="reponseRebus"]').val().toLowerCase();
        console.log(userResponse);
        if (userResponse == response1){
            $('.indication').text('BRAVO !');
            nouvelleEnigme(6,'showModal');
            writeIndice('évèque, 3 + 3, Pain, boulanger');
        }
        else{
            $('.indication').text('Ce n\'est pas la bonne réponse. Essaye encore ...');
        }
    });

}


/*
 * Enigme 6
 * Objectif : Trouver le mot
 * Réponse : Saint ou Sain
 */
function enigme6(){
    var htmlEnigme = $("#enigme6 .enigme_content");
    var reponse1 = 'saint';
    var reponse2 = 'sain';

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
        "<input type='text' placeholder='Réponse' name='reponseEnigme6' /> <button class='checkEnigme6'>Vérifier</button>" +
        "</div><div class='indication col-md-12'></div>"
    );

    htmlEnigme.on('click', '.checkEnigme6', function(){
        var userResponse = $('input[name="reponseEnigme6"]').val().toLowerCase();
        if (userResponse == reponse1 || userResponse == reponse2) {
            $('.indication').text('BRAVO !');
            nouvelleEnigme(7,'showModal');
            writeIndice('évèque, 3 + 3, Pain, Saint');
        }else{
            $('.indication').text('Ce n\'est pas la bonne réponse. Essaye encore ...');
        }
    });
}

function enigme7() {
    if (localStorage.getItem('virtualQuest-stateFail') == null) {
    $("#modal8").modal("show");
    var essaisRestant = 3;
    var bonnesReponses = 0;
    var bonnesLettres = ['A', 'I', 'N', 'T', 'O', 'R', 'É'];

    bonnesLettres.forEach(function(lettre) {
        $('.'+lettre).text('_');
        $('.letter').show();
    });

    $('.choice_letter .letter').on('click', function(event) {
        var lettreChoisie = event.target.innerText;

        if(bonnesLettres.indexOf(lettreChoisie) > -1){
            $('.pendu .'+lettreChoisie).text(lettreChoisie);
            bonnesReponses++;
            $(event.target).hide();
        }else{
            essaisRestant--;
            $('#essaisRestant').text(essaisRestant);
        }

        if(essaisRestant === 0){
            derniereChance();
        }

        if(bonnesReponses === 7){
            $("#modal9").modal("show");
            $("#modal9 .modal-body button").addClass("modalGagne");
            localStorage.setItem('virtualQuest-state', 'endWin');
        }
    });
    } else {
        derniereChance();
    }
}

function derniereChance() {
    localStorage.setItem('virtualQuest-stateFail', true);
    $("#modal10").modal("show");
    $('.barreEnigme').html("C'est ta dernière chance ...");
    $('#enigme7 .enigme_content').addClass('hidden');
    $('#derniereChance .enigme_content').removeClass('hidden');
    $(".dcLabel").disableSelection();
    $(".dcLabel").click(function(){
        if($(this).hasClass("dcFaux")){
            $(this).removeClass("label-default");
            $(this).addClass("label-danger");
        }
        else if($(this).hasClass("dcVrai")){
            localStorage.setItem('virtualQuest-state', 'endFail');
            $(this).removeClass("label-default");
            $(this).addClass("label-success");
            $("#modal9").modal("show");
        }
    });

}