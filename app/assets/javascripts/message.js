$(function(){
  function buildHTML(message){
    var img = ""
    message.image ? img = `<img src="${message.image}">` : img =""

    var html = `<div class="message">
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
    .done(function(date){  
      var html = buildHTML(date);
      $('.messages').append(html);
      $('#message_content').val('');
      $('input[type="file"]').val(null);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(date) {
      alert('送信に失敗しました');
    })
    .always(function(date){
      $('.form__submit').prop('disabled',false);
    })
  })
})