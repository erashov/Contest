

jQuery(document).ready(function () {
    $('#logo').fadeIn(600);
});
function answerQuestion(questionId, email) {

    var selectedItems = $('.question-item_last .question-item__answer:checked');
    var answers = [];
    selectedItems.each(function (i, item) {
        var answerId = $(item).data('answer-id');
        answers.push({
            AnswerId: answerId,
            Text: $('.question-item__text[data-answer-id="' + answerId + '"]').val()
        });
    });

    $.ajax({
        type: 'POST',
        cache:false,
        url: $('#url-value').val() + '/Home/AnswerQuestion',
        data: { QuestionId: questionId, Answers: answers, Email: email },
        success: function (data, textStatus) {
            chaneQuestion(name, email);
        },
        timeout: 10 * 60 * 1000,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('К сожалению произошла ошибка [' + textStatus + ',' + errorThrown + ']');
        }
    });
}

function chaneQuestion(name, email) {
    var questions = $('.question-item');
    var lastClass = 'question-item_last';

    questions.each(function(index) {
        if ($(this).hasClass(lastClass)) {
            $(this).removeClass(lastClass);
            if (questions.length === index + 1) {
                $('.contest').hide();
                $('.result-panel').removeClass('result-panel').addClass('result-panel_visible');
                return false;
            }
            $(questions[index + 1]).addClass(lastClass);
            return false;
        }
    });
}