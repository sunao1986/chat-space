$(function(){
  function buildHTML(message){
    var img = "";
    message.image ? img = `<img src="${message.image}">` : img =""

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p> 
                    ${img}         
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {  
      
      var html = buildHTML(data);      
      $('.messages').append(html);     
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});     
    })
    .fail(function() {
      alert('送信に失敗しました');
    })
    .always(function(){
      $('.form__submit').prop('disabled',false);
    })
  })
  
  var reloadMessages = function() {

    last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';      
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML); 
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}); 
      })     
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 5000);
});