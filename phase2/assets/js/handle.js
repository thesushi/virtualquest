$( document ).ready(function() {
    $('.aventure').css('display', 'block');
    $("#talkbubble").hide();
        if (localStorage.getItem('ecathedrale-isStarted') == null) {
            //debut du  jeu
             $("#modal1").modal('show');
             localStorage.setItem('ecathedrale-isStarted', true);
        }
        if(localStorage.getItem("ecathedrale-enigme") !== null && localStorage.getItem("ecathedrale-etat") !== null){
            
            if(localStorage.getItem("ecathedrale-etat") == "endFail" || localStorage.getItem("ecathedrale-etat") == "endWin"){
                afficherIntersticielFin();
            }
            else if(localStorage.getItem("ecathedrale-etat") == "chercher"){

                chercherEnigme(localStorage.getItem("ecathedrale-enigme"));

            }else{

                startStep(localStorage.getItem("ecathedrale-enigme"));
            }

        }

        if(localStorage.getItem("ecathedrale-indice") !== null){
            writeIndice(localStorage.getItem("ecathedrale-indice"));
        }

        function afficherIntersticielFin(){
            if(localStorage.getItem("ecathedrale-etat") == "endWin") {
                $('#endGame').css('display', 'block');
            }else if(localStorage.getItem("ecathedrale-etat") == "endFail"){
                $('#endGameLost').css('display', 'block');
            }
            $('.aventure').css('display', 'none');
        }

        $('#endWin').click(afficherIntersticielFin);
        $('#endLost').click(afficherIntersticielFin);

        $("#restartWin").on('click', function(){
            localStorage.removeItem("ecathedrale-enigme");
            localStorage.removeItem("ecathedrale-etat");
            localStorage.removeItem("ecathedrale-indice");
            localStorage.removeItem("ecathedrale-isStarted");
            location.reload(true);
        });

        $("#restartLost").on('click', function(){
            localStorage.removeItem("ecathedrale-enigme");
            localStorage.removeItem("ecathedrale-etat");
            localStorage.removeItem("ecathedrale-indice");
             localStorage.removeItem("ecathedrale-isStarted");
            location.reload(true);
        });


        function writeIndice(indice){
            $('#indices').text(indice);
            localStorage.setItem("ecathedrale-indice",indice);
        }

        function startStep(number){
            console.log('Appel de l\'énigme n°'+number);
            if(localStorage.getItem("ecathedrale-enigme") == number){
                localStorage.setItem('ecathedrale-etat', 'resoudre');
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
            else
                console.log('Cette énigme n\'est pas encore accessible à l\'utilisateur ...');
        }

        function chercherEnigme(number, modal){
            if(parseInt(number) > 1) {
            $('.barreEnigme').html('<p>Pour trouver la prochaine énigme :</p>');
            localStorage.setItem('ecathedrale-enigme', number);
            localStorage.setItem('ecathedrale-etat', 'chercher');
            $('#enigme'+number+' .enigme_info').removeClass('hidden');
            if(modal){
                $("#modal"+number).modal("show");
                $('#enigme'+(parseInt(number)-1)+' .enigme_content').addClass('hidden');
                if(parseInt(number) === 1)
                    $('#enigme7 .enigme_content').addClass('hidden');
            }
        }
        }
});