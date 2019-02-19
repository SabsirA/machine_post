var lenta = [];
var ukazka = 0;
function render_lenta(a, b) {
    let html = ``;
    for (let i = a; i <= b; i++){
        html +=`<div class="cel ${lenta[i].mark ? 'mark':''} ${ i == ukazka ? 'active':''}" data-id="${i}"></div>`
    }
    $('.tape').html(html);
}
function init() {
    lenta = [];
    for (let i = 0; i < 20; i++){
        lenta.push ({
            mark: false}
        )
    }
}
$(function () {

   init();
   ukazka = lenta.length / 2;
   render_lenta(0, lenta.length - 1);
   $('.tape').on('click', '.cel', function (e) {
       let id= $(e.currentTarget).data('id');
   lenta[id].mark=!lenta[id].mark;
   render_lenta(0, 19);
   });
    $('.button.left').on('click', function (e) {
        ukazka--;
        render_lenta(0, 19);
    });
    $('.button.right').on('click', function (e) {
        ukazka++;
        render_lenta(0, 19);
    })
});
