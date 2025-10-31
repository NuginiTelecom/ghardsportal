function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
document.addEventListener("click", function(event) {
    const menu = document.getElementById("menu");
    const button = document.querySelector(".menu-button");
    if (event.target !== menu && event.target !== button && !menu.contains(event.target)) {
        menu.style.display = "none";
    }
});
function changeFontSize(size) {
    const body = document.body; // テキスト全体に適用
    const images = document.querySelectorAll(".resizable-img"); // 指定クラスの画像のみ取得
    const buttons = document.querySelectorAll(".controls button");

    let fontSize;
    let imgWidth;

    if (size === 'small') {
        body.style.fontSize = '0.8em';
        imgWidth = 80;
    } else if (size === 'medium') {
        body.style.fontSize = '1.0em';
        imgWidth = 150;
    } else if (size === 'large') {
        body.style.fontSize = '1.5em';
        imgWidth = 200;
    }
    // テキスト全体に適用
    body.style.fontSize = fontSize;
    //一部の画像だけを拡大縮小する
    images.forEach(img => {
        img.style.width = imgWidth + "px";
    });
    // 選択中ボタンの強調
    buttons.forEach(btn => btn.classList.remove("active")); // 全ボタンから active を削除
    const targetButton = Array.from(buttons).find(btn => btn.textContent === sizeToLabel(size));
    if (targetButton) targetButton.classList.add("active");
}

// ボタン表示ラベル変換
function sizeToLabel(size) {
    if (size === 'small') return '小';
    if (size === 'medium') return '中';
    if (size === 'large') return '大';
}
let isPlaying = false;
function toggleAudio() {
    const audio = document.getElementById('audio');
    const button = document.getElementById('toggleButton');

    if (isPlaying) {
        audio.pause(); // 音声を一時停止
        audio.currentTime = 0; // 再生位置を先頭に戻す
        isPlaying = false;
        button.innerHTML = '読み上げる'; // ボタン画像を再生用に変更
    } else {
        const playPromise = audio.play(); // 再生試行

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // 再生成功
                isPlaying = true;
                button.innerHTML = '停止する'; // ボタン画像を停止用に変更
            }).catch(error => {
                console.error("音声再生エラー:", error);
            });
        }
    }
}

// 再生終了時に自動的に状態をリセット
document.getElementById('audio').addEventListener('ended', () => {
    isPlaying = false;
    document.getElementById('toggleButton').innerHTML = '読み上げる';
});

const btn = document.getElementById('backBtn');
btn.addEventListener('click', () => {
// 1) history に戻れるなら優先
try {
if (window.history && window.history.length > 1) {
// history.back() を使うとユーザーのセッション履歴に戻る
window.history.back();
return;
}
} catch (e) {
// history にアクセスできないケースは無視してフォールバックへ
console.warn('history check failed', e);
}
// 2) 直前のページが referrer にあるならそこへ飛ばす
if (document.referrer) {
window.location.href = document.referrer;
return;
}
// 3) どれも使えない場合はデフォルトURLへ
const fallback = btn.getAttribute('data-default-url') || '/';
window.location.href = fallback;
});
// キーボードで Enter / Space でも動作するようにする（button 要素なら通常不要だが明示）
btn.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
btn.click();
}
});