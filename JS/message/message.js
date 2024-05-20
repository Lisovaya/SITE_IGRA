$(document).ready(function() {
    var messages = [
        "Переоценивать противника подчас не менее опасно, чем недооценивать.",
        "Нельзя забыть того, кто был твоей последней надеждой.",
        "Ничего ведь не изменится. Справедливости не станет больше.",
        "Нельзя назвать предателем того, кому ты и так никогда не доверял.",
        "И пусть удача всегда будет на вашей стороне!",
        "Выживание одного значит смерть другого. И никуда от этого не деться.",
        "Нельзя выказать слабость. Иначе помощи не жди. Жалким видом никого не удивишь. А вот стойкость часто вызывает восхищение."
    ];

    var index = 0;
    var bannerMessageElement = $('#bannerMessage');
    var bannerWidth = $('.banner').width();

    function showNextMessage() {
        var messageWidth = bannerMessageElement.width();
        bannerMessageElement.text(messages[index]);
        bannerMessageElement.css('left', bannerWidth + 'px');

        bannerMessageElement.stop(true, true).animate({ left: '-' + messageWidth + 'px' }, 20000, 'linear', function() {
            index = (index + 1) % messages.length;
            showNextMessage();
        });
    }

    showNextMessage();
});
