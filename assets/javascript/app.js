$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['You must have 9 lives!', 'One cool cat', "The cat is out of the bag"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Egyptians cats were associated with which goddess?",
            "c": ["Nephthys", "Bastet", "Amunet"],
            "answer": 1
        },
        // question 2
        {
            "q": "What is the technical term for a cat’s hairbal?",
            "c": ["Bezoar", "Quiff", "Chortle"],
            "answer": 0
        },
        // question 3
        {
            "q": "What is a group of cats is called?",
            "c": ["Brigade", "Pack", "Clowder"],
            "answer": 2
        },
        // question 4
        {
            "q": "Approximately how many cats are eaten in Asia every year?",
            "c": ["One million", "Sixty thousand", "Four million"],
            "answer": 2
        },
        // question 5
        {
            "q": "What is the most popular pedigreed cat?",
            "c": ["Persian cat", "Main Coon cat", "Siamese cat"],
            "answer": 0
        },
        // question 6
        {
            "q": "On average, cats spend how much of their every day sleeping?",
            "c": ["1/4", "2/3", "1/2"],
            "answer": 1
        },
        // question 7
        {
            "q": "Which famous scientist invented the cat flap?",
            "c": ["Robert Oppenheimer", "Isaac Newton", "Carl Sagan"],
            "answer": 1
        },
        // question 8
        {
            "q": "A cat lover is called what?",
            "c": ["Necrophiliac", "Gallivanter", "Ailurophilia"],
            "answer": 2
        },
        // question 9
        {
            "q": "The heaviest cat on record is Himmy, a Tabby from Queensland, Australia. How much did he weigh when he died at 10 years old?",
            "c": ["47 pounds", "18 pounds", "29 pounds"],
            "answer": 0
        },
        // question 10
        {
            "q": "Approximately how long have cats been domesticated?",
            "c": ["2,000 years", "10,000 years", "5,000 years"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});