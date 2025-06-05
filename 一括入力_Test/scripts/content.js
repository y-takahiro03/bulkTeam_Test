// 商品情報編集画面かどうかを確認する
checkScreen = document.getElementById("product_code");
checkElement(checkScreen);

const triggerElement1 = document.getElementById("product_detail52"); // カラー1
const targetElement1 = document.getElementsByClassName("product_data_detail_tab"); //商品詳細:商品名タブ

let triggerElement5;

// カラー1押したときの動作
try {
  if (triggerElement1) {
    triggerElement1.addEventListener('keydown', function (event) {

      if (event.key === 'Tab' && event.shiftKey) {
        // event.preventDefault(); // デフォルトのTab移動をキャンセル
      } else if (event.key == 'Tab') {
        clickElement(targetElement1[0]);
        event.preventDefault();
      }
    });
  } else {
    console.log("triggerElement1は見つかりません");
  }
} catch {

}


const triggerElement2 = document.getElementById("product_detail120") // 商品詳細画面の詳細備考
const targetElement2 = document.getElementById("sell_data") // 出品詳細

const triggerDiv = document.getElementsByClassName("box-content gridster ready")[0]; //商品詳細画面の入力欄
try {
  triggerElement5 = triggerDiv.querySelector("input.form-control.unit_input"); // 商品情報画面の最初のinput要素
  console.log("商品詳細画面の要素が取得できました。");
} catch (e) {
  console.log("商品詳細画面の要素が取得できません。");
}

// 商品情報画面の最初の要素を押したときの動作
if (triggerElement5) {
  //商品詳細 最初のinput要素でshift + tab押したときの動作
  triggerElement5.addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && event.shiftKey) {
      event.preventDefault(); // デフォルトのTab移動をキャンセル

      // 数秒遅れてタブをクリックするようにしてみる
      setTimeout(function () {
        focusElement(triggerElement1);
        // clickElement(targetElement1[0]);
        console.log("0.1秒後にカラー1にフォーカスを実行します");
      }, 100);
    }
  });
} else {
  console.log("triggerElement5 (商品詳細画面の最初のinput要素) が見つかりませんでした。");
}

try {
  //商品詳細 詳細備考で shift + tab  tab押したときの動作
  triggerElement2.addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && event.shiftKey) {
      const previousElement = triggerElement2.previousElementSibling;
      if (previousElement) {
        previousElement.focus();
      }
    } else if (event.key == 'Tab') {
      clickElement(targetElement2);
      event.preventDefault();
    }
  })

} catch {

}


const triggerElement3 = document.getElementById("product_detail214"); // 出品詳細画面の全体コンディション詳細

// 値を保存するときになぜか発火するため try-catch 
try {
  // 出品詳細 全体コンディションでshift + tab 押したときの動作
  triggerElement3.addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && event.shiftKey) {
      clickElement(targetElement1[0], 1); // クリック動作はOK
      // focusElement(triggerElement2); // 本当は詳細備考 triggerElement2　にフォーカスしたい
      event.preventDefault();
    }
  });

} catch {

}


// 呼び出す元で動作をかえてみる
// オブジェクトつくって、キーで分ける
// clickElement({element:'a', actionType:'typeA'}); 
// clickElement({element:'b', actionType:'typeb'});


// nullかどうか確認
function checkElement(element) {
  if (!element) return;
}


// とりあえずのコード
function clickElement(element, param2) {
  if (param2 === undefined) {
    // param2 が渡されなかった場合 (引数が1つ)
    element.click();
  } else {
    // param2 が渡された場合 (引数が2つ以上)
    element.click();
    focusElement(triggerElement2);
    // param2 を使用した追加の処理
  }
}


// function clickElement(element) {
//   element.click();
// }

// 

function focusElement(element) {
  element.focus();
}

