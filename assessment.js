'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素を全て削除する
 * @palam{HTMLElement} element HTML の要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {   //子要素がある限り全て削除
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空のときは処理を終了
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);  //appendChild: 子を追加する

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const herfValue =
        `https://twitter.com/intent/tweet?button_hashtag=
        ${encodeURIComponent('あなたのいいところ')}
        &ref_src=twsrc%5Etfw`;
    
    anchor.setAttribute('herf', herfValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
    
    //Widgets.jsの設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers = [    //診断結果のコレクション
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ印象に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は気になって仕方ないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されるでしょう。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにします。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しませます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられています。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられている人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感しわかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです、ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思った時にしっかりと衝動を抑えられる{userName}が皆から評価されています',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * @return{string} 診断結果
 */

function assessment(userName) {
    //全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;

    //{username}をユーザーの名前に置き換える
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);

    return result;
}


//テストコード
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられている人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
