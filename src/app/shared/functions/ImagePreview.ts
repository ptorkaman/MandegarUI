declare var $;


function ReadUrl(input: any) {
  if (input.files && input.files[0]) {
    $('#errormsg').html('');
    const file = input.files[0];
    const fileType = file['type'];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      //toast
      var msg = `<div class="alert alert-danger">فایل انتخاب شده باید تصویر باشد</div>`;
      $('#errormsg').html(msg);

      $(input).val('');
      $('[data-type="img"]').attr('src', 'assets/images/Default.jpg');
      return false;
    } else {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        $('[data-type="img"]').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      return true;
    }
  } else {
    return false;
  }
}

export function ImagePreview() {
  const input = document.querySelector('[data-type="imgUpload"]');
  input!.addEventListener('change', (event) => {
    ReadUrl(input);
  });
}
