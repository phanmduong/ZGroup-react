<!-- Modal Liked User -->
<div id="liked-user-modal" class="modal" style="background:white">
  <div class="modal-content" style="padding:0 0 12px 0;background:white">
    <h5 style="padding:3px 0px 10px 15px;border-bottom:1px solid #d9d9d9">Những người thích bài viết này</h5>
    <div id="liked-user-modal-content">
    </div>
  </div>
</div>
<script>
function get_liked_users(product_id) {
  var preloader = '<div class="progress">'+
  '<div class="indeterminate"></div>'+
  '</div>';
  $('#liked-user-modal-content').html(preloader);
  var url = "{{url('product/getlikedusers?product_id=')}}"+product_id;
  $.get(
    url,
    function(data,status){
      $('#liked-user-modal-content').html(data);
    }
  );
  $('#liked-user-modal').openModal();
}
</script>
