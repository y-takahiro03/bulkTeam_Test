

/** 新規のidの場合リダイレクト */
var updatedProductId = null;

$(window).on('load', function() {
    // 商品情報タブ
    // 最後のinputに次タブへ移動するイベントを付与する
    $("#product_data1_view").find('li').filter(':last').find('input').attr('onkeydown',"nextTab(event)");

    // 商品詳細タブ
    // 商品詳細タブのid取得
                    var category_id = '7927';
        if($.isNumeric(category_id)){
        $('#category'+category_id+"_view").find('li').filter(':first').find('input').attr('onkeydown',"prevTab(event)");
        $('#category'+category_id+"_view").find('li').filter(':last').find('input').attr('onkeydown',"nextTab(event)");
    }

    // 出品詳細タブ
    $("#sell_data_view").find('li').filter(':first').find('input').attr('onkeydown',"prevTab(event)");
    $("#sell_data_view").find('li').filter(':last').find('input').attr('onkeydown',"nextTab(event)");

});

// 商品画像・関連商品・操作履歴・自動値下げタブで Shift + Tab で前のタブに遷移する
$('html').keydown(function(e){
    var tab = $("[class*=select]").attr('id');
    var tab_target = false;
    switch(tab){
        case 'product_image':
            tab_target = '#sell_data';
        break;

        case 'related_products':
            tab_target = '#product_image';
            break;

        case 'price_reduction':
            $('#related_products')
            tab_target = '#related_products';
            break;
        
        case 'operation_histories':
            tab_target = '#price_reduction';
            break;
    }
    if(tab_target){
        if(event.shiftKey){
            if(event.key == 'Tab'){
                $(tab_target).trigger('click');
                var focus_target = $(tab_target+'_view').find('li').find('input').filter(':last').attr('name');
            }
        }
    }
    $(function(){
        setTimeout( function(){
            // inputにカーソルを合わせる settimeoutでタブ遷移後のフォーカス移動を防ぐ
            $("[name="+focus_target+"]").focus();
        } , 1)
    });
});

/**
 *
 * @param {String} name name属性
 * @param {Object} options
 * @returns {Window.jQuery.fn.init|*|jQuery.fn.init|jQuery|HTMLElement}
 */
function renderMultiSelectBox2(name, options, category) {
    var id = "cnd_multiple_select_" + name;
    var $input = $('<input> type="text"').attr("id", id).attr("name", name).data('master_dict', options);

    var pattern = /\d+/g;
    var result = name.match(pattern);

    if(category == 'item'){
    options = options.filter(option => !option.text.includes('■■■■■■■■■■'));
    }

    if(category == 'item' && result[0] == '28'){
        $($input).attr('onchange',"blankNonSubmit(this)");
    }

    $(document).ready(function() {
        id = "#" + id;

        $(id).tokenInput(options, {

            propertyToSearch: "data-kana",

            resultsFormatter: function(item){ return "<li><p>" + item.text + "</p></li>" },
            tokenFormatter: function(item) { return "<li><p class='select-token-check-"+category+"'>" + item.text + "</p></li>" },
            
            theme: "facebook",
            hintText: "キーワードを入力してください",
            noResultsText: "結果がありません",
            searchingText: "検索中",

            onAdd: function (item) {
                $("#token-input-cnd_multiple_select_"+name).attr('type','hidden');
                $(id).attr('value',item.value);
            },

            onDelete: function (item) {
                $("#token-input-cnd_multiple_select_"+name).attr('type','text');
            }
        });
    });

    return $input;
}

// 最後のinputで、TABキーで次のTabに遷移する
function nextTab(evt){
    // 229はIME入力中なので処理しない
    if(event.keyCode != 229){
        // Shift + Tab の場合は一つ前のinputに戻る
        if(event.shiftKey){
            if(event.key == 'Tab'){
                return false;
            }
        }
        $(function($){
            if(evt.key == 'Tab'){
                var tab = $("[class*=select]").attr('id');
                var tab_target = null;
                // 商品詳細タブのidが一定の名前ではないためdefaultで処理する
                switch(tab){
                    case 'product_data1':
                                                                                var category_id = '7927';
                                                if($.isNumeric(category_id)){
                            tab_target = '#category'+category_id;
                            var focus_target = $('#category'+category_id+"_view").find('li').find('input').attr('name');
                        }else{
                            // alert表示
                            tab_target = '.product_data_detail_tab';
                            // focusを移動させない
                            var focus_target = $('#product_data1_view').find('li').filter(':last').find('input').attr('name');
                        }
                        break;

                    case 'sell_data':
                        tab_target = '#product_image';
                        break;

                    case 'product_image':
                        tab_target = '#price_reduction';
                        break;

                    case 'price_reduction':
                        tab_target = '#operation_histories';
                        break;

                    default:
                        tab_target = '#sell_data';
                        var focus_target = $('#sell_data_view').find('li').find('input').attr('name');
                        break;
                }
                $(tab_target).trigger('click');
                $(function(){
                    setTimeout( function(){
                        // 初めのinputにカーソルを合わせる settimeoutでTab遷移後のフォーカス移動を防ぐ
                        $("[name="+focus_target+"]").focus();
                    } , 1)
                });
            }
        });
    }
}

// 最初のinputで、Shift+TABキーで前のタブに遷移する
function prevTab(evt){
    // 229はIME入力中なので処理しない
    if(event.keyCode != 229){
        if(event.shiftKey){
            if(event.key == 'Tab'){
                var tab = $("[class*=select]").attr('id');
                var tab_target = null;
                // 商品詳細タブのidが一定の名前ではないためdefaultで処理する
                switch(tab){
                    case 'sell_data':
                                                                                var category_id = '7927';
                                                if($.isNumeric(category_id)){
                            tab_target = '#category'+category_id;
                            var focus_target = $('#category'+category_id+"_view").find('li').find('input').filter(':last').attr('name');
                        }else{
                            // alert表示
                            tab_target = '.product_data_detail_tab';
                            // focusを移動させない
                            var focus_target = $('#sell_data_view').find('li').filter(':first').find('input').attr('name');
                        }
                        break;
                    case 'product_image':
                        tab_target = '#sell_data';
                        var focus_target = $('#sell_data_view').find('li').find('input').filter(':last').attr('name');
                        break;
                    default :
                        tab_target = '#product_data1';
                        var focus_target = $('#product_data1_view').find('li').filter(':last').find('input').attr('name');
                    break;
                }
                $(tab_target).trigger('click');
                $(function(){
                    setTimeout( function(){
                        // inputにカーソルを合わせる settimeoutでTab遷移後のフォーカス移動を防ぐ
                        $("[name="+focus_target+"]").focus();
                    } , 1)
                });
            }
        }
    }
}

// アイテムが未選択になった時submitしない
 function blankNonSubmit(obj){

     //店内カテゴリ
     selectAll('category_id');

     if(obj.value != '' && obj.value != null){
         document.form1.mode.value = 'select_category';
         document.form1.input = obj;
         document.form1.submit();
     }
 }

// 表示非表示切り替え
function lfDispSwitch(id){
    var obj = document.getElementById(id);
    if (obj.style.display == 'none') {
        obj.style.display = '';
    } else {
        obj.style.display = 'none';
    }
}

// セレクトボックスのリストを移動
// (移動元セレクトボックスID, 移動先セレクトボックスID)
function fnMoveSelect(select, target) {
    $('#' + select).children().each(function() {
        if (this.selected) {
            $('#' + target).append(this);
            $(this).attr({selected: false});
        }
    });

}

// target の子要素を選択状態にする
function selectAll(target) {
    $('#'+target+' option').each(function() {
            this.selected = 'selected';
    });
}

// 登録
function fnCompleteSubmit() {
  // ローディング表示
  $('#btModal .modal-body').append('<div id="modal_loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 98%; background-color: #fff; text-align: center;"><img src="/okoku/user_data/packages/okoku/admin/img/common/loading.gif" style="margin: 5em 0 0;" /></div>');
  // 1秒後に実行
  setTimeout('fnCompleteSubmitExe()', 1000);
}
function fnCompleteSubmitExe() {
  //商品番号が空欄の時は自動生成
  if ($('#product_code').val() == '') {
      $('#product_code').val('[連番]');
  }

  $('input[name="mode"]').val('complete');
  //さぶみっと
  // document.form1.submit();
  // return;

  // 更新
  var formData = new FormData(document.getElementById('form1'));
  $.ajax('./product.php', {
    method: 'POST',
    dataType: 'html',
    contentType: false,
    processData: false,
    async: false,
    data: formData,
    error: function(xhr, error) {
    },
    success: function(html) {
      $('#btModal .modal-body').html(html);
        //エラーメッセージを表示
        $('.confirm-error-msgs').each(function(){
            var item_id = $(this).attr('data-error-id');
            $('#'+item_id+'_attention').text($(this).text());
            $('#'+item_id+'_attention').css('display', 'block');
            $('#'+item_id).css('background-color', '#ffe8e8');
            $('#'+item_id).addClass('disp_err');
        });
        //新規idがある場合保存しておく
        let recentlyCreated = $('#updated_product_id');
        if (recentlyCreated.length && recentlyCreated.val()){
            updatedProductId = recentlyCreated.val();
        }
    },
  });
}
function setSearchProductCode(product_code) {
  if(product_code != '') {
    $('input[name="search_product_code"]').val($('input#product_code').val());
  }
}
var category_id_first_selected = [];
$(function() {
  $('select#category_id').children().each(function(i, e) {
    category_id_first_selected.push($(this).text());
  });
})

var fnTackSealSetting = function(url, removeOnHide, modalId, callback){
    if (!url.indexOf('#') == 0) {
        modalId = modalId || "DLSettingmodalwindow";
        if (removeOnHide === undefined || removeOnHide === null) {
            removeOnHide = true;
        }

        var modal, modalDialog, modalContent;
        modal = $('<div class="modal fade" id="' + modalId + '" tabindex="-1" ' + ModalTools.backdropAttr() + '/>');
        modalDialog = $('<div class="modal-dialog modal-lg" />');
        modalContent = $('<div class="modal-content" />');
        
        modal.modal('hide')
            .append(modalDialog)
            .on('hidden.bs.modal', function(){
                removeOnHide && $(this).remove();
            })
            .appendTo('body');

        modalDialog.append(modalContent);

        $.get(url, function(data) {
            modalContent.html(data);
            var $modalBody = $('#' + modalId + ' .modal-body');
            var $modalLg= $('#' + modalId + ' .modal-lg');
            if(url.indexOf('mode=') < 0){
                $modalBody.removeAttr('style');
            }else{
                $modalBody.css({
                    height: '507.25px',
                    'overflow-y': 'scroll'
                });
                $modalLg.css({width: '1400px'});
                $modalBody.data('height', '507.25');
                $modalBody.data('height', '507.25');
                $modalLg.data('width', '1400');
                $modalLg.data('width', '1400');

            }
            if (callback !== undefined) {
                callback(modal);
            }
            modal.modal('show');
        });
    }
};

function printTackSeal(mode) {
    let product_id = "308152";
    if (!product_id) {
        product_id = $('#form1 input[name="product_id"]').val();
    }
    fnChangeAction('./index.php');
    fnModeSubmit('create_tack_seal', 'check_product_id[]', product_id);
}

$(document).on('click', '.btn_active_tack_seal_setting', function(event) {
    event.preventDefault();
    document.form1.task_seal_output_title_id.value = $(this).data('seal');
    document.form1.multiplePrint.value = $(this).attr('multiplePrint');
    printTackSeal('createTackSeal');
});


$(document).on('click', '.btn_create_title_tack_seal_setting', function (event) {
    event.preventDefault();
    ModalTools.forwardFrom(event.target);
    fnTackSealSetting(
        '/okoku/admin/products/tack_seal_output.php?mode=edit',
        true,
        'tack_seal_output'
    );
});

$(document).on('click', '.btn_delete_task_seal_setting', function(event) {
    event.preventDefault();
    switch(confirm(`タックシール出力設定 ${event.target.parentNode.getAttribute('presetName')} を削除しますか？`))
    {
        case true:
            $.ajax({
                url: '/okoku/admin/products/tack_seal_output.php?mode=delete&TACK_SEAL_ID=' + $(this).data('seal'),
                type: "get",
                cache: false,
                async: false,
                timeout: 10000,
                success: function(result, textStatus, xhr) {
                    alert('削除しました');
                    ModalTools.refreshFrom(event.target);
                    fnTackSealSetting(
                        '/okoku/admin/products/tack_seal_output.php',
                        true,
                        'modal-setting-format'
                    );
                },
                error: function(xhr, textStatus, error) {
                    alert('通信ERROR');
                }
            });
            break;
        case false:
            break;
        default:
            console.log('error_ocurred');
    }
});


function removeModalSettingFormatWhenHide() {
    setTimeout(() => {
        $('#btModal').remove();
    }, 100)
}

$(document).on('click', '.btn_edit_task_seal_setting', function(event) {
    event.preventDefault();
    ModalTools.forwardFrom(event.target);
    fnTackSealSetting(
        '/okoku/admin/products/tack_seal_output.php?mode=edit&TACK_SEAL_ID=' + $(this).data('seal'),
        true,
        'tack_seal_output'
    );
});

$(document).on('click', '.btn_create_tack_seal_setting', function(event) {
    event.preventDefault();
        $.ajax({
            url: "/okoku/admin/products/tack_seal_output.php",
            type: "post",
            data: $(event.target).closest('.modal').find('#TaskSealSettingForm').serializeArray(),
            cache: false,
            async: false,
            timeout: 10000,
            success: function(result, textStatus, xhr) {
                ModalTools.backRefreshFrom(event.target);
                fnTackSealSetting(
                    '/okoku/admin/products/tack_seal_output.php',
                    true,
                    'modal-setting-format'
                );

            },
            error: function(xhr, textStatus, error) {
                alert('通信ERROR');
            }
    });
});

//確認画面へ
function fnConfirmSubmit() {

    //エラーメッセージを非表示
    $('.disp_err').each(function(){
        var item_id = $(this).attr('id');
        $('#'+item_id+'_attention').text('');
        $('#'+item_id+'_attention').css('display', 'none');
        $(this).css('background-color', 'inherit');
    });

    //店内カテゴリ
    selectAll('category_id');

    var title = '';
        titleText = '商品情報の更新確認';
    
    $('#btModal .modal-title').text(titleText);
    $('#btModal').modal();

    var formData = new FormData(document.getElementById('form1'));
    $.ajax('product.php', {
        method: 'POST',
        contentType: false,
        processData: false,
        async: false,
        data: formData,
        error: function(xhr, error) {},
        success: function(html) {
            $('#btModal .modal-body').html(html);
        },
    });

    //エラーメッセージを表示
    $('.confirm-error-msgs').each(function(){
        var item_id = $(this).attr('data-error-id');
        $('#'+item_id+'_attention').text($(this).text());
        $('#'+item_id+'_attention').css('display', 'block');
        $('#'+item_id).css('background-color', '#ffe8e8');
        $('#'+item_id).addClass('disp_err');
    });
}

function return2Search() {
    $("#form1").attr('action', './index.php');

    $("#form1 input").each(function (index, element) {

        if ($(element).attr('name')) {
            if ($(element).attr('name').indexOf('search_') >= 0) {
                $("#form1").append($("<input type='hidden'>").val($(element).val()).attr("name", $(element).attr('name').replace('search_', '')));
            }
        }

    });

    $('#form1 input[name="mode"]').val('search');

    $("#form1").submit();
}

function fnRegistMallCategoryByAjax() {
    var formData = new FormData(document.getElementById('form1'));
    product_id = "308152";
    formData.append('mode', 'set_category');

    $.ajax('./product.php', {
        method: 'POST',
        contentType: false,
        processData: false,
        data:formData,
        error: function(xhr, error) {
            alert(error);
            console.log(error);
         },
        success: function(response) {
            res = JSON.parse(response);
            console.log(res);

            if(res.category_error){
                $('#btModal .modal-body').html(res.message);
                $('#btModal .modal-title').text('必須項目エラー');
                $('#btModal').modal();
            } else {
                timer_batch_progress = setInterval("fnGetBatchProgressToParsent(res,product_id)", 1000);

                $(".ss_category_input").prop('disabled', true);
                showLoading();
            }
         }
        });
}

function fnGetBatchProgressToParsent(res,product_id) {

$.ajax({
    type: "GET",
    url: '../../batch/get_batch_progress.category.php',
    data: {
        batch_id: res.batch_id,
        product_id: product_id
    },
    success: function(content){
        var response = JSON.parse(content);
        // console.log(response);
        var progress = response.info.progress || 0;
        var message = response.info.message || '';
        var result = '';


        if (response.info.result == '') {
            // console.log(progress);

        } else if ((response.info.result == 'finished')) {

            $.each(response.category, function(i, cat) {

                if (cat.message.match(/カテゴリを取得できませんでした/)){
                    $('#ss_category'+i).val('');
                    $('#ss_category'+i+'_caption').text('');
                } else if(cat.message.match(/既に登録済み/)) {
                    return true;
                } else {
                    $('#ss_category'+i).val(cat.message.match(/(?<=\().*?(?=\))/));
                    $('#ss_category'+i+'_caption').text(cat.message.match(/(?<=\:).*?(?=\()/));
                }

            });

            clearInterval(timer_batch_progress);
            $(".ss_category_input").prop('disabled', false);
            hideLoading();

        }
    }
});
}

function showLoading() {
$("#loading").append('<div id="category_loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; opacity: 0.8; text-align: center;"><img src="/okoku/user_data/packages/okoku/admin/img/common/loading.gif" style="margin: 5em 0 0;" /><p style="font-size: 1.5em; margin: 1em;></p><p style="font-size: 1.5em; margin: 1em;>各モールカテゴリを反映中</br>作業には数分を要することがあります。</p></div>');
}

function hideLoading() {
$("#loading").html('');
}


function fnEditView() {
    if ($(window).width() > 840) {
        $('#modal_window').css('width', '800px');
        $('#modal_window').css('left', (($(window).width() - $('#modal_window').width()) / 2)+'px');
    } else {
        $('#modal_window').css('width', ($(window).width()-40)+'px');
        $('#modal_window').css('left', '20px');
    }
    $('#modal_window').css('height', ($(window).height()-80)+'px');
    $('#modal_window').css('top', '60px');

    $('#input_bg')
            .css('display', 'block')
            .css('width', $(window).width() + 'px')
            .css('height', $(window).height() + 'px');
    $('#modal_window').css('display', 'block');
}

function fnShowIframeModal(title) {
    var iframe_height, modal_height;
    if(title == 'ロゴスタンプ画像'){
        modal_height = 550;
        iframe_height = 500;
    }else{
        modal_height = $( window ).height()*0.85;
        iframe_height = $( window ).height()*0.8;
    }
    $('#btModal .modal-title').text(title);
    $('#btModal .modal-body').css({'height': modal_height+'px'});
    $("#modal_iframe").css({'border':'none','height': iframe_height+'px','width':'100%'});
    $('.modal-dialog.modal-xl').removeClass('modal-xl').addClass('modal-lg');
    $('#btModal').modal();
}


function fnEditView2(url, title) {

    $('#modal_iframe').attr('src', url);

    fnShowIframeModal(title);
    $('.modal-dialog.modal-lg').removeClass('modal-lg').addClass('modal-xl');
}


function fnEditViewClose() {
    $('#btModal').modal('hide');
    $('#modal_iframe').attr('src', '');

    $( '#jquery-ui-sortable' ).sortable("refresh");
}


//文字数カウント
function strLength(strSrc){
    len = 0;
    strSrc = escape(strSrc);
//alert(strSrc);
    for(i = 0; i < strSrc.length; i++){
            if(strSrc.charAt(i) == "%"){
                    if(strSrc.charAt(++i) == "u"){
                            i += 3;
                            len += 1.0;
                    } else {
                        len += 0.5
                    }
                    i++;
            } else {
                len += 0.5
            }
    }
    return len;
}

function reloadCurrent(){
    //新規だとpostにidにまだないので、postデーターでリダイレクト
    if (updatedProductId){
        var url = '/okoku/admin/products/product.php';
        var tempform = $('<form action="' + url + '" method="post">' +
        '<input type="text" name="mode" value="pre_edit" />' +
        '<input type="text" name="product_id" value="' + updatedProductId + '" />' +
        '<input type="hidden" name="transactionid" value="7e992226b440c4d6912ad8be7bee7977be6bf99b" />' +
        '</form>');
        $('body').append(tempform);
        tempform.submit();
        return;
    }
    
    form1.mode.value = 'pre_edit';
    form1.submit();
}

$(function(){

    var $epid_div = $('.ebay_epid');

    var showHideEbayLink = function() {
        if ($epid_div.length === 0) {
            return;
        }

        var $input = $epid_div.find('input.form-control'),
            $link  = $epid_div.find('.ebay_link');

        if ($link.length === 0) {
            return;
        }
        if ($input.length && $input.val().length) {
            $link.find('a').attr('href', 'http://www.ebay.com/p/' + $input.val());
            $link.show();
        } else {
            $link.find('a').attr('href', '');
            $link.hide();
        }
    };
    showHideEbayLink();

    var doWhenSearchEpid = function() {
        var $modal = $('#btModal'),
            $tableScroll = $modal.find('.modal-body .table-scroll');

        var doWhenSuccess = function(products) {
            // Table: Header
            var $thead = $('<thead>').append(
                $('<tr>').append(
                    $('<th>').attr('width', 120).html('ePID - eBay<br />Product ID'),
                    $('<th>').text('商品名'),
                    $('<th>').attr('width', 60).html('&nbsp;')
                )
            );

            // Table: Body
            var $tbody = $('<tbody>');
            for (var index in products) {
                if (!products.hasOwnProperty(index)) {
                    continue;
                }
                var product = products[index];

                var $link = $('<a>')
                    .attr('href', 'http://www.ebay.com/p/' + product.epid)
                    .attr('target', '_blank')
                    .text(product.epid);

                var $button = $('<button>')
                    .prop('type', 'button')
                    .text('選択')
                    .data('epid', product.epid);

                $button.on('click', function() {
                    $epid_div.find('input.form-control').val($(this).data('epid'));
                    showHideEbayLink();
                    $modal.modal('hide');
                });

                $tbody.append(
                    $('<tr>').append(
                        $('<td>').append($link),
                        $('<td>').text(product.title),
                        $('<td>').css('text-align', 'center').append($button),
                    )
                );
            }
            // Modal: Body
            $tableScroll.html('').append(
                $('<table>').addClass('table-select-epid').append($thead, $tbody)
            );
        };

        var $frmSearch = $('.frm-epid-search'),
            $btn       = $frmSearch.find('button');

        $btn.prop('disabled', true);
        $tableScroll.html(
            $('<div>').css('text-align', 'center').html('検索中')
        );

        $.ajax({
            url: '../../batch/get_ebay_epid.php?key=q&value=' + $frmSearch.find('input').val(),
            method: 'get',
            dataType: 'json',
            success: function (res) {
                $btn.prop('disabled', false);
                $tableScroll.html('');

                if (res.success) {
                    doWhenSuccess(res.products);
                } else {
                    alert('エラーが発生しました。');
                }
            }
        });
    };

    // 検索
    $('.ebay_info .js-btn-search').on('click', function() {

        var formData = new FormData(document.getElementById('form1'));
        formData.append('mode', 'translate_keywords_to_en');

        $.ajax('./product.php', {
            method: 'POST',
            contentType: false,
            processData: false,
            data:formData,
            error: function(xhr, error) {
                alert(error);
                console.log(error);
             },
            success: function(response) {
                console.log(response);
                var res = JSON.parse(response);

                var $modal = $('#btModal'),
                $title = $modal.find('.modal-title'),
                $body  = $modal.find('.modal-body');

                // Title
                $title.text('ePIDの選択');

                // Body
                var keyword = res['keywords'];
                if (keyword == null)
                    keyword = '';
                var $input  = $('<input>').prop('type', 'text').addClass('form-control').val(keyword),
                    $button = $('<button>')
                        .prop('type', 'button')
                        .text('検索')
                        .on('click', function() {
                            var $table = $body.find('table');
                            if ($table.length) {
                                $table.remove();
                            }

                            doWhenSearchEpid();
                        });

                $body.text('')
                    .css({
                        "min-height": "300px",
                        "max-height": "500px"
                    })
                    .append(
                        $('<div>').addClass('frm-epid-search').append($input, $button),
                        $('<div>').addClass('table-scroll')
                    );

                $modal.modal();

                doWhenSearchEpid();
            }
        });
    });

    // 適用
    $('.ebay_info .js-btn-apply').on('click', function() {
        var $self  = $(this),
            key    = $self.data('search-key'),
            value  = $self.siblings('input.form-control').val();

        if (value.length === 0 || $epid_div.length === 0) {
            return;
        }
        $self.prop('disabled', true);

        $.ajax({
            url: '../../batch/get_ebay_epid.php?key=' + key + '&value=' + value + '&limit=1',
            method: 'get',
            dataType: 'json',
            success: function (res) {
                $self.prop('disabled', false);
                if (res.success && res.products.length) {
                    $epid_div.find('input.form-control').val(res.products[0].epid);
                    showHideEbayLink();
                } else {
                    alert('ePIDが見つかりません。');
                }
            }
        });
    });

    var product_data1_view_gridster = $("#product_data1_view .gridster ul").gridster({
        widget_margins: [-1, -1],
        widget_base_dimensions: [190, 40],
    }).data('gridster');


    var sell_data_view_gridster = $("#sell_data_view .gridster ul").gridster({
        widget_margins: [-1, -1],
        widget_base_dimensions: [190, 40],
    }).data('gridster');

    product_data1_view_gridster.disable();
    if (sell_data_view_gridster != null) {
        sell_data_view_gridster.disable();
    }

            if ($("#category7927_view .gridster ul").length > 0) {
        var category7927_view_gridster = $("#category7927_view .gridster ul").gridster({
            widget_margins: [-1, -1],
            widget_base_dimensions: [190, 40],
        }).data('gridster');

        category7927_view_gridster.disable();
    }
    


    $(".input_view").addClass('disnon');
    $("#product_data1_view").removeClass('disnon');

    $( '#jquery-ui-sortable' ).sortable();

    $(".date_input").datepicker({
            dateFormat: "yy/mm/dd"
    });
    $(".datetime_input").datetimepicker({
            controlType: 'select',
            timeFormat: 'HH:mm'
    });

    $("#tab li").click(function() {
        if ($(this).attr('id')) {
            var num = $("#tab li").index(this);
            $(".content_wrap").addClass('disnon');
            $('#'+$(this).attr('id')+'_view').removeClass('disnon');
            $("#tab li").removeClass('select');
            $(this).addClass('select');
        } else {
            alert('アイテム を選択してください。');
        }
    });

    //削除操作後にアップロード画面を表示する関数
    $(function(){
        var flag  = 0;

        if(flag === 1){
            $(".content_wrap").addClass('disnon');
            $("#product_image_view").removeClass('disnon');
            $("#tab li").removeClass('select');
            $('#product_image_view').addClass('select');
        }
    })


    //文字数チェック(半角)
    $('.input_limit').keyup(function () {
        if (strLength($(this).val()) > $(this).attr('input_limit')) {
            $('#'+$(this).attr('id')+'_attention').html('文字数が多すぎます。入力可能な文字数は 全角'+$(this).attr('input_limit')+'文字 までです。');
            $('#'+$(this).attr('id')+'_attention').css('display', 'block');
            $('#'+$(this).attr('id')).css('background-color', '#ffe8e8');

        } else {
            $('#'+$(this).attr('id')+'_attention').html('');
            $('#'+$(this).attr('id')+'_attention').css('display', 'none');
            $('#'+$(this).attr('id')).css('background-color', '');
        }
        $('#'+$(this).attr('id')+'_char_count').text(strLength($(this).val()));
    });

    //文字数チェック(半角)
    $('.input_limit').each(function(){
        if (strLength($(this).val()) > $(this).attr('input_limit')) {
            $('#'+$(this).attr('id')+'_attention').html('文字数が多すぎます。入力可能な文字数は 全角'+$(this).attr('input_limit')+'文字 までです。');
            $('#'+$(this).attr('id')+'_attention').css('display', 'block');
            $('#'+$(this).attr('id')).css('background-color', '#ffe8e8');
        } else {
            $('#'+$(this).attr('id')+'_attention').html('');
            $('#'+$(this).attr('id')+'_attention').css('display', 'none');
            $('#'+$(this).attr('id')).css('background-color', '');
        }
        $('#'+$(this).attr('id')+'_char_count').text(strLength($(this).val()));
    });


    //文字数チェック(全角半角)
    $('.input_limit2').keyup(function () {

        strlen = ($(this).val()).length;

        if (strlen > $(this).attr('input_limit2')) {
            $('#'+$(this).attr('id')+'_attention').html('文字数が多すぎます。入力可能な文字数は 全角半角'+$(this).attr('input_limit2')+'文字 までです。');
            $('#'+$(this).attr('id')+'_attention').css('display', 'block');
            $('#'+$(this).attr('id')).css('background-color', '#ffe8e8');

        } else {
            $('#'+$(this).attr('id')+'_attention').html('');
            $('#'+$(this).attr('id')+'_attention').css('display', 'none');
            $('#'+$(this).attr('id')).css('background-color', '');
        }
        $('#'+$(this).attr('id')+'_char_count').text(strlen);
    });

    //文字数チェック(全角半角)
    $('.input_limit2').each(function(){

        strlen = ($(this).val()).length;

        if (strlen > $(this).attr('input_limit2')) {
            $('#'+$(this).attr('id')+'_attention').html('文字数が多すぎます。入力可能な文字数は 全角半角'+$(this).attr('input_limit2')+'文字 までです。');
            $('#'+$(this).attr('id')+'_attention').css('display', 'block');
            $('#'+$(this).attr('id')).css('background-color', '#ffe8e8');
        } else {
            $('#'+$(this).attr('id')+'_attention').html('');
            $('#'+$(this).attr('id')+'_attention').css('display', 'none');
            $('#'+$(this).attr('id')).css('background-color', '');
        }
        $('#'+$(this).attr('id')+'_char_count').text(strlen);
    });

    //ラジオボタン　ダブルクリックしたら非選択状態に
    $('input[type="radio"]').dblclick(function(){
        $(this).prop('checked', false);
    });


    $( ".combobox" ).combobox();

    $('html, body').scrollTop(0);
    $('#input_bg').css('display', 'none');

    // clear iframe after closing modal
    $(document).on("hidden.bs.modal", function () {
      // $('#modal_iframe').attr('src', '');
      if($('h4#modal-msg').length) {
        if($('h4#modal-msg').data('complete')) {
          reloadCurrent();
        // } else {
        //   $('input[name="mode"]').val('edit');
        //   document.form1.submit();
        }
        return;
      }
      $('#btModal .modal-body').html('<iframe id="modal_iframe" name="modal_iframe"></iframe>');
      $('#btModal .modal-body').css({'height': ''});
      $('.modal-dialog.modal-xl').removeClass('modal-xl').addClass('modal-lg');
    });

    // 海外NGワード
    $(document).on('change', '.overseas-ng', function() {
        if ($(this).prop('checked')) {
            $('.hidden_' + $(this).attr('id')).val('1');
        } else {
            $('.hidden_' + $(this).attr('id')).val('0');
        }
    });
});

//手動選択でのアップロード処理
$(document).on('change','#file_upload',function(evt){
    evt.preventDefault();
    var files = evt.target.files; // inputタグからFileオブジェクトを取得

    //画像の枚数分、プログレスバーを表示
    for(var i = 0;i < files.length;i++){
         $('#jquery-ui-sortable').html(
            $('#jquery-ui-sortable').html()
            + '<li class="no_'+i+' img-item">'
            + '<div class="img-box">'
                + '<div class="thumbnail dummy">'
                    + '<div class="progress">'
                        + '<div class="progress-bar progress-bar_'+i+' progress-bar-info"></div>'
                    +'</div>'
                + '</div>'
            + '</div>'
            + '<br />'
            + '</li>'
        )

        $( '#jquery-ui-sortable' ).sortable("refresh");
    }

    //ファイルの数だけ実行
    for (var i = 0, f; file = files[i]; i++) {
        (function(j){
            var formData = new FormData();

            formData.append('add_product_image', file);
            formData.append('mode', 'upload_image');
            formData.append('transactionid', '7e992226b440c4d6912ad8be7bee7977be6bf99b');
            formData.append('product_code', $('#product_code').val());
            formData.append('product_id', $('#form1 input[name="product_id"]').val());

            var res = doAjax(formData,j); //Ajaxを実行
            var elem = $('.no_'+j); //プログレスバーの判別用クラス
            var arrStr = [];

            //成功時の処理
            res.done(function(data){
                if (data['error']) {
                    alert(data['error']);
                    //プログレスバーを削除
                    elem.remove();
                } else {
                    //画像パスの不要部分を削除
                    arrStr = data['image_key'].split('/');

                    //プログレスバーを画像で置き換え
                    elem.html(
                        '<div class="img-box">'
                            + '<img src="/okoku/upload/okoku/save_image/' + data['image_key'] + '?1745300350"  class="thumbnail">'
                            + '<input type="checkbox" class="dis-checkbox" checked/>'
                        + '</div>'
                        + '<p>'+arrStr[arrStr.length-1]+'</p>'
                        + '<br />'
                        + '<input type="hidden" name="product_images[]" class="img-key" value="' + data['image_key'] + '">'
                    );

                    $( '#jquery-ui-sortable' ).sortable("refresh");
                }

                //判別用クラスを削除
                $('.img-item').removeClass('no_'+j);
                console.log('アップロードに成功しました');

                // 画像が表示されない場合があるため
                const img = $('.img-box img', elem)[0];
                if (img) {
                    setTimeout(() => {
                        img.src = `/okoku/upload/okoku/save_image/${data['image_key']}?1745300350`;
                    }, 1000);
                    setTimeout(() => {
                        img.src = `/okoku/upload/okoku/save_image/${data['image_key']}?1745300350`;
                    }, 2000);
                }
            });

            //失敗時の処理
            res.fail(function(err){
                alert('アップロードに失敗しました')
                elem.remove();

                //D&Dエリアを表示
                $('#toggle_wrapper').css('display','');
                $('#slide').css('display','none');

                console.log(err.status+' : '+err.statusText);
                console.log('アップデートに失敗しました');
            });

        })(i);
    }

    //ファイル選択状態を初期化
    $('#file_upload').val("");

    //D&Dエリアを非表示にし、ボタンを表示
    $('#toggle_wrapper').css('display','none');
    $('#slide').css('display','');
});

// ドロップ受け付け判定
function f1( event )
{
    // ドロップを受け付ける
    event.preventDefault();
}

// ドロップ処理
function f2(event)
{
    // ページの遷移を防止
    //（これがないとドラッグ内容の文字列へブラウザが遷移する）
    event.preventDefault();

    //ダミーを表示
    for(var i = 0;i < event.dataTransfer.files.length;i++){
         $('#jquery-ui-sortable').html(
            $('#jquery-ui-sortable').html()
            + '<li class="no_'+i+' img-item">'
            + '<div class="img-box">'
                + '<div class="thumbnail dummy">'
                    + '<div class="progress">'
                        + '<div class="progress-bar progress-bar_'+i+' progress-bar-info"></div>'
                    +'</div>'
                + '</div>'
            + '</div>'
            + '<br />'
            + '</li>'
        )

        $( '#jquery-ui-sortable' ).sortable("refresh");
    }

    //画像を1枚づつアップロード
    for (i=0; i<event.dataTransfer.files.length; i++) {
        (function(j){
            var formData = new FormData();
            var file = event.dataTransfer.files[i];

            formData.append('add_product_image', file);
            formData.append('mode', 'upload_image');
            formData.append('transactionid', '7e992226b440c4d6912ad8be7bee7977be6bf99b');
            formData.append('product_code', $('#product_code').val());
            formData.append('product_id', $('#form1 input[name="product_id"]').val());

            var res = doAjax(formData,j);
            var elem = $('.no_'+j);
            var arrStr = [];

            res.done(function(data){
                if (data['error']) {
                    alert(data['error']);
                    elem.remove();
                } else {
                    arrStr = data['image_key'].split('/');
                    elem.html(
                        '<div class="img-box">'
                            + '<img src="/okoku/upload/okoku/save_image/' + data['image_key'] + '?1745300350"  class="thumbnail">'
                            + '<input type="checkbox" class="dis-checkbox" checked/>'
                        + '</div>'
                        + '<p>'+arrStr[arrStr.length-1]+'</p>'
                        + '<br />'
                        + '<input type="hidden" name="product_images[]" class="img-key" value="' + data['image_key'] + '">'
                    );

                    $( '#jquery-ui-sortable' ).sortable("refresh");
                }

                $('.img-item').removeClass('no_'+j);
                console.log('アップロードに成功しました');
            });

            res.fail(function(err){
                alert('アップロードに失敗しました')
                elem.remove();

                //D&Dエリアを表示
                $('#toggle_wrapper').css('display','');
                $('#slide').css('display','none');

                console.log(err.status+' : '+err.statusText);
                console.log('アップデートに失敗しました');
            });

        })(i);
    }

    //D&Dエリアを非表示にし、ボタンを表示
    $('#toggle_wrapper').css('display','none');
    $('#slide').css('display','');
}

//Ajaxを実行する関数
function doAjax(fd,no){
    var def = new $.Deferred();
    $.ajax({
        url:'./product.php',
        method: 'POST',
        contentType: false,
        processData: false,
        data:fd,
        xhr : function(){
            var XHR = $.ajaxSettings.xhr();
            if(XHR.upload){
                XHR.upload.addEventListener('progress',function(e){
                    var progre = parseInt(e.loaded/e.total*100);
                    $('.progress-bar_'+no).css({width: progre+'%'});
                }, false);
            }
            return XHR
        }
    })
    .done(
        function(data){
            def.resolve(data);
        }
    ).fail(
        function(err){
            def.reject(err);
        }
    )

    return def.promise(this);
}

function sleep( T ){
    var now = Date.now();
    var future = Date.now() + (500 * T);
    while(now < future){
        now = Date.now();
    }
    now = undefined;
    future = undefined;
    return;
}


//デフォルト商品名を適用
function apply_default_product_name(obj, shop_id, mtb_ss_id) {
    var formData = new FormData(document.getElementById('form1'));
    formData.append('mode', 'apply_default_product_name');
    formData.append('shop_id', shop_id);

    $.ajax('./product.php', {
        method: 'POST',
        contentType: false,
        processData: false,
        data:formData,
        error: function(xhr, error) {
            alert(error);
            console.log(error);
         },
        success: function(response) {
            console.log(response);
            var res = JSON.parse(response);

            if (res['error']) {
                alert(res['error']);
            } else {

                $('#'+obj).val(res['content']);

                if(mtb_ss_id == 12 || mtb_ss_id == 29 || mtb_ss_id == 31 || mtb_ss_id == 38 || mtb_ss_id == 40) {
                    strlen = ($('#'+obj).val()).length;
                } else {
                    strlen = strLength($('#'+obj).val())
                }
                // 他的に属性が出現する前提で、文字数チェックの制限値取得
                inputLimit=($('#'+obj).attr('input_limit') || $('#'+obj).attr('input_limit2'))
                if (strlen > inputLimit) {
                    $('#'+obj+'_attention').html('文字数が多すぎます。入力可能な文字数は 全角'+inputLimit+'文字 までです。');
                    $('#'+obj+'_attention').css('display', 'block');
                    $('#'+obj).css('background-color', '#ffe8e8');
                } else {
                    $('#'+obj+'_attention').html('');
                    $('#'+obj+'_attention').css('display', 'none');
                    $('#'+obj).css('background-color', '');
                }

                $('#'+obj+'_char_count').text(strlen);
            }
            console.log(response);
        }
    });
}


//仕入先入力
var SupplierID_obj = '';
function searchSupplierID(id) {
    SupplierID_obj = id;
    fnEditView2('/okoku/admin/customer/search_customer2.php','仕入先入力');
}

function setSupplierID(id, name) {
    if (SupplierID_obj.match(/^js-stock_/)) {
        // 仕入履歴側の修正
        var no_branch_no = SupplierID_obj.replace('js-stock_', '');
        console.log(no_branch_no);
        $('.js-customer_id-' + no_branch_no).val(id);
        $('.js-customer_name-' + no_branch_no).text(name);
    } else {
        $('#'+SupplierID_obj).val(id);
        $('#supplier_name').text(name);
    }
    fnEditViewClose();
}

function setCategoryID(obj_id, category_id, caption) {
    $('#'+obj_id).val(category_id);
    $('#'+obj_id+'_caption').text(caption);
    fnEditViewClose();
}

function removeBgImage(image_key) {
    fnShowIframeModal('画像を背景除去');
    document.form2.product_code.value = $('#product_code').val();
    document.form2.image_key.value = image_key;
    document.form2.target = 'modal_iframe';
    document.form2.action = 'remove_bg_image.php';
    document.form2.submit();
}

function createWMImage(image_key) {
    fnShowIframeModal('ロゴスタンプ画像');
    document.form2.product_code.value = $('#product_code').val();
    document.form2.image_key.value = image_key;
    document.form2.target = 'modal_iframe';
    document.form2.action = 'create_wm_image.php';
    document.form2.submit();
}

 function fnEditProduct(action, mode, product_id) {
    $("#form1").attr('action', action);
    $('#form1 input[name="mode"]').val(mode);
    $('#form1 input[name="product_id"]').val(product_id);
    $('#form1 input[name="product_images[]"]').remove();
    $("#form1").submit();
           
    return false;
}

