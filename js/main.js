var lenta = [];
var ukazka = 0;
var timer;
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
function add_command(){
    let html = ``;
    html +=`<div class="item">
        <div class="number"></div>
        <div class="command"><select>
            <option value="<"><-</option>
            <option value=">">-></option>
            <option value="V">V</option>
            <option value="?">?</option>
            <option value="о">о</option>
            <option value="!">!</option></select></div>
        <div class="number_command" contenteditable="true"></div>
        <div class="comment" contenteditable="true"></div>
    </div>`;
   $('.commands').append(html);
}
function execute(n) {
    let command=$(`.item:eq(${n})`);
    let make = command.find('select').val();
    switch (make) {
        case '<': {ukazka--;
            render_lenta(0, 19);
        break;};
        case '>': {ukazka++;
            render_lenta(0, 19);
        break;};
        case'!':return true;
        case'V':
            if(lenta[ukazka].mark){
                return {
                    'status':false,
                    'message':`Ошибка в строке ${n}`
                }
            }
            lenta[ukazka].mark=true;
        render_lenta(0,19);
        break;
    }
    let num=command.find('.number_command').html();
    console.log(num);
    setTimeout(execute(num), 1000);
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
    });
    $('.commands').on('click', '.item:last', function(e){add_command()});
    $('.button.start').on('click', function (e) {
        execute(1);
    })
});
