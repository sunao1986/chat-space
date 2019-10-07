$(function(){
  var search_list = $('#user-search-result');
  var member_list = $('#member-search-result');
  function appendUser(user) { 
     var html = `<div class="chat-group-user crearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name="${user.name}">追加</div>
                 </div>`
     search_list.append(html); 
  }

  function appendMissingUser(missing) {
    var html = `<div class="chat-group-user crearfix">
                  <p class="chat-group-user__name">${missing}</p>    
                </div>`
    search_list.append(html);
  }

  function appendMember(name,id) {
    var html = `<div class="chat-group-user crearfix">
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class="chat-group-user__name">${name}</p>                 
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id=${id} data-user-name="${name}">削除</div>
                </div>`
    member_list.append(html);
  }

  $("#user-searchfield").on("keyup", function() {
    var input = $("#user-searchfield").val();
    if (input != ""){

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input}, 
        dataType: 'json'
      })
      
      .done(function(users){
        $("#user-search-result").empty();
        if (users.length > 0) {
          users.forEach(function(user) {
            appendUser(user);
          });
        }
        else {
          appendMissingUser("一致するユーザーは存在しませんでした");
        }
      })  
      .fail(function() {
        alert('ユーザーの検索に失敗しました');
      })
    }
    else {
      search_list.empty();
    }
  })

  $(".chat-group-form__field--right").on("click", ".user-search-add", function() {
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");    
    $(this).parent(".chat-group-user").remove();
    $("#member-search-result").empty();
    appendMember(name,id);   
  })
  $(".chat-group-form__field--right").on("click", ".user-search-remove", function() {
    $(this).parent(".chat-group-user").remove();
  })
});
