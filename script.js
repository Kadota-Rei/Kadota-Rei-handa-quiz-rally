// ==========================================
// 1. UI画像・素材ファイルのパス設定
// お手持ちの画像ファイル名に合わせて変更してください
// ==========================================
const ASSETS = {
    howtoImage: "howto_tilt.png",          // 操作説明画面の画像（なければ自動フォールバック表示）
    mapImage: "handa_map.png",             // 館内マップ画像（なければ自動フォールバック表示）
    cartFull: "minecart_3.png",            // ミス0回（ビール満タン）
    cartMid: "minecart_2.png",             // ミス1回（ビール少し減る）
    cartLow: "minecart_1.png",             // ミス2回以上（ビール残りわずか）
    // 各選択肢の参考写真/イラスト（任意：ファイルがあれば表示されます）
    choiceThumbs: {
        "ハーフティーンバー構造": "thumb_half_timber.png",
        "組積造（そせきぞう）": "thumb_masonry.png",
        "木製階段": "thumb_wood_stairs.png",
        "レンガ製階段": "thumb_brick_stairs.png",
        "丸い切り欠き壁": "thumb_round_wall.png",
        "四角い切り欠き壁": "thumb_square_wall.png",
        "アーチ型耐火床": "thumb_arch_floor.png",
        "格子型耐火床": "thumb_grid_floor.png",
        "機銃掃射による弾痕": "thumb_bullet_scar.png",
        "火災による赤レンガの黒ずみ": "thumb_soot.png"
    }
};

// ==========================================
// 2. チュートリアル問題 & 本番5問データ
// ==========================================
const TUTORIAL_QUESTION = {
    question: "練習問題：半田赤レンガは100年以上の歴史を持つ？",
    choices: ["〇（そう！）", "×（ちがう）"],
    correctAnswer: "〇（そう！）"
};

const QUESTIONS = [
    {
        id: "④",
        question: "Q1. 赤レンガ建物の南東側の壁に見られる、木枠とレンガを組み合わせた特徴的な構造は何？",
        mapHeading: "【第1問目のスポット】",
        mapDesc: "赤レンガを外から観察してみよう！",
        spotLabel: "南東側の外壁エリア",
        choices: ["ハーフティーンバー構造", "組積造（そせきぞう）"],
        correctAnswer: "ハーフティーンバー構造",
        explanation: "赤レンガ建物南東側の壁には、木枠とレンガを組み合わせた「ハーフティーンバー構造」が見られます。"
    },
    {
        id: "⑩",
        question: "Q2. 創建当初からある５階建ての塔屋最上階まで続いている階段は、何で作られてた？",
        mapHeading: "【第2問目のスポット】",
        mapDesc: "長い廊下で階段を探してみよう！",
        spotLabel: "5階建て塔屋・階段エリア",
        choices: ["木製階段", "レンガ製階段"],
        correctAnswer: "木製階段",
        explanation: "創建当初からある5階建て塔屋最上階まで続いている階段は「木製階段」で作られています。"
    },
    {
        id: "⑦",
        question: "Q3. ビール樽の収まりをよくするため、パサージュの内壁に施された工夫はどれ？",
        mapHeading: "【第3問目のスポット】",
        mapDesc: "パサージュの壁を観察してみよう！",
        spotLabel: "パサージュ内壁エリア",
        choices: ["丸い切り欠き壁", "四角い切り欠き壁"],
        correctAnswer: "丸い切り欠き壁",
        explanation: "ビール樽の収まりをよくするため、パサージュの内壁には「丸い切り欠き壁」が施されています。"
    },
    {
        id: "⑧",
        question: "Q4. 高い耐震・耐火・断熱性能を持たせるために、床に採用された構造はどれ？（通路の上を見上げてみよう！）",
        mapHeading: "【第4問目のスポット】",
        mapDesc: "通路の上を見上げてみよう！",
        spotLabel: "通路天井・床構造エリア",
        choices: ["アーチ型耐火床", "格子型耐火床"],
        correctAnswer: "アーチ型耐火床",
        explanation: "高い耐震・耐火・断熱性能を持たせるため、床（通路の上側）には「アーチ型耐火床」が採用されています。"
    },
    {
        id: "①",
        question: "Q5. 赤レンガ建物北側の外壁に今も残っている、第二次世界大戦の傷跡とは何？",
        mapHeading: "【第5問目のスポット】",
        mapDesc: "赤レンガ建物北側の外壁を見にいこう！",
        spotLabel: "北側外壁エリア",
        choices: ["機銃掃射による弾痕", "火災による赤レンガの黒ずみ"],
        correctAnswer: "機銃掃射による弾痕",
        explanation: "赤レンガ建物北側の外壁には、第二次世界大戦の「機銃掃射による弾痕」が今も残っています。"
    }
];

// ==========================================
// 3. 状態管理変数
// ==========================================
const SCREENS = {
    title: document.getElementById("screen-title"),
    lang: document.getElementById("screen-lang"),
    howto: document.getElementById("screen-howto"),
    tutorial: document.getElementById("screen-tutorial"),
    play: document.getElementById("screen-play"),
    result: document.getElementById("screen-result")
};

let currentLanguage = "ja";
let playIndex = 0;
let missCount = 0;
let correctCount = 0;
let elapsedTotalSec = 0;
let questionStartTimeMs = 0;

// 現在の出題モード（'tutorial' または 'play'）
let activeQuizMode = null;
let currentPair = []; // [上/左スロットの選択肢, 下/右スロットの選択肢]
let isMapGateOpen = false; // 本番で「到着した！」を押すまで選択を待機する状態
let isChoiceLocked = false;

// 傾き・ゲージ管理
const HOLD_TO_SELECT_MS = 850; // 傾け続けて決定する時間
const QUESTION_TIME_MS = 25000; // 縦ゲージの基準時間
let heldSide = null; // 'top' | 'bottom' | null
let holdElapsedMs = 0;
let lastTickMs = null;
let animFrameId = null;

// 入力状態（傾きセンサー / 手動ボタン / キーボード）
let sensorTiltSide = null; // 'top' | 'bottom' | null
let manualTiltSide = null; // 'top' | 'bottom' | null
let isPortraitMode = false;

// ランキング保存用
let rankingRecords = [
    { name: "1位", score: 11163 },
    { name: "2位", score: 9793 },
    { name: "3位", score: 0 }
];

// DOM参照
const orientationStatus = document.getElementById("orientation-status");
const btnEnableTilt = document.getElementById("btn-enable-tilt");
const btnSimLeft = document.getElementById("btn-sim-left");
const btnSimRight = document.getElementById("btn-sim-right");

// ==========================================
// 4. 画面遷移とレイアウトフィット
// ==========================================
function showScreen(key) {
    Object.values(SCREENS).forEach((el) => el.classList.remove("active"));
    SCREENS[key].classList.add("active");
    detectOrientation();
}

// 端末が縦か横かを検知して表示を更新
function detectOrientation() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    let angle = 0;
    
    if (screen.orientation && typeof screen.orientation.angle === "number") {
        angle = screen.orientation.angle;
    } else if (typeof window.orientation === "number") {
        angle = window.orientation;
    }
    
    // 画面幅 > 画面高さ または 回転角が±90度なら横向き
    isPortraitMode = !(w > h || Math.abs(angle) === 90);
    orientationStatus.textContent = isPortraitMode
    ? `向き: 縦画面 (angle:${angle})`
    : `向き: 横画面 (angle:${angle})`;
}

window.addEventListener("resize", detectOrientation);
window.addEventListener("orientationchange", () => {
    setTimeout(detectOrientation, 80);
});
if (screen.orientation && screen.orientation.addEventListener) {
    screen.orientation.addEventListener("change", detectOrientation);
}

// ==========================================
// 5. 傾きセンサー（縦・横の自動判別対応）
// ==========================================
async function requestTiltPermission() {
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            try {
                const res = await DeviceOrientationEvent.requestPermission();
                if (res === "granted") {
                    btnEnableTilt.textContent = "センサーON ✓";
                }
            } catch (e) {
                // ユーザー操作外からの呼び出し時はボタンから再試行可能
            }
        } else {
            btnEnableTilt.textContent = "センサー対応 ✓";
        }
}

btnEnableTilt.addEventListener("click", requestTiltPermission);

/**
 * 縦向き・横向きを判別して、左右どちらに傾いているかを返す
 * 画面上側の選択肢を「左（または上）」、画面下側の選択肢を「右（または下）」に対応づける
 */
function computeTiltSideFromEvent(event) {
    detectOrientation();
    const gamma = event.gamma; // -90〜90
    const beta = event.beta;   // -180〜180
    if (gamma === null || beta === null) return null;
    
    let angle = 0;
    if (screen.orientation && typeof screen.orientation.angle === "number") {
        angle = screen.orientation.angle;
    } else if (typeof window.orientation === "number") {
        angle = window.orientation;
    }
    
    let tiltAxis = 0;
    
    if (!isPortraitMode) {
        // 横向きプレイ時：端末を横にしたときの左右傾きを抽出
        // 端末を横向きで傾けると beta または gamma が変化する
        if (angle === 90) {
            tiltAxis = beta;
        } else if (angle === -90 || angle === 270) {
            tiltAxis = -beta;
        } else {
            // angle情報が取れないブラウザでも横幅>高さなら beta を主軸にしつつ gamma も補助
            tiltAxis = Math.abs(beta) >= 12 ? beta : gamma;
        }
    } else {
        // 縦向きプレイ時：左右の傾きは gamma
        tiltAxis = gamma;
    }
    
    const DEADZONE = 15;
    if (tiltAxis <= -DEADZONE) {
        return "top"; // 画面上側/左側レーン
    }
    if (tiltAxis >= DEADZONE) {
        return "bottom"; // 画面下側/右側レーン
    }
    return null;
}

window.addEventListener("deviceorientation", (event) => {
    sensorTiltSide = computeTiltSideFromEvent(event);
});

// テスト・補助用の左右傾けボタン＆キーボード
function bindSimButton(btn, side) {
    const startHold = (e) => {
        e.preventDefault();
        manualTiltSide = side;
    };
    const endHold = () => {
        if (manualTiltSide === side) manualTiltSide = null;
    };
    btn.addEventListener("pointerdown", startHold);
    btn.addEventListener("pointerup", endHold);
    btn.addEventListener("pointerleave", endHold);
    btn.addEventListener("pointercancel", endHold);
}

bindSimButton(btnSimLeft, "top");
bindSimButton(btnSimRight, "bottom");

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") manualTiltSide = "top";
    if (e.key === "ArrowRight" || e.key === "ArrowDown") manualTiltSide = "bottom";
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowDown") {
        manualTiltSide = null;
    }
});

// ==========================================
// 6. 画像の読み込みフォールバック設定
// ==========================================
function setupImageFallback(imgEl, fallbackEl) {
    if (!imgEl || !fallbackEl) return;
    imgEl.addEventListener("load", () => {
        imgEl.classList.remove("hidden");
        fallbackEl.style.display = "none";
    });
    imgEl.addEventListener("error", () => {
        imgEl.classList.add("hidden");
        fallbackEl.style.display = "flex";
    });
}

setupImageFallback(document.getElementById("img-howto"), document.getElementById("howto-fallback"));
setupImageFallback(document.getElementById("map-spot-img"), document.getElementById("map-fallback-box"));
setupImageFallback(document.getElementById("tut-cart-img"), document.querySelector("#screen-tutorial .cart-emoji-fallback"));
setupImageFallback(document.getElementById("play-cart-img"), document.getElementById("play-cart-fallback"));
setupImageFallback(document.getElementById("result-cart-img"), document.getElementById("result-cart-fallback"));

// ミス回数に応じてトロッコ画像（3枚）を切り替える
function getCurrentCartAsset() {
    if (missCount === 0) return ASSETS.cartFull;
    if (missCount === 1) return ASSETS.cartMid;
    return ASSETS.cartLow;
}

function syncCartImages() {
    const src = getCurrentCartAsset();
    const tutCart = document.getElementById("tut-cart-img");
    const playCart = document.getElementById("play-cart-img");
    const resultCart = document.getElementById("result-cart-img");
    
    tutCart.src = src;
    playCart.src = src;
    resultCart.src = src;
    
    const beerText = missCount === 0 ? "🛒🍺🍺🍺" : missCount === 1 ? "🛒🍺🍺" : "🛒🍺";
    document.querySelectorAll(".cart-emoji-fallback").forEach((el) => {
        el.textContent = beerText;
    });
}

// ==========================================
// 7. タイトル → 言語選択 → 遊び方説明
// ==========================================
document.getElementById("btn-to-lang").addEventListener("click", async () => {
    await requestTiltPermission();
    showScreen("lang");
});

function goToHowTo(lang) {
    currentLanguage = lang;
    const howtoImg = document.getElementById("img-howto");
    howtoImg.src = ASSETS.howtoImage;
    showScreen("howto");
}

document.getElementById("btn-lang-ja").addEventListener("click", () => goToHowTo("ja"));
document.getElementById("btn-lang-en").addEventListener("click", () => goToHowTo("en"));

document.getElementById("btn-howto-help").addEventListener("click", () => {
    alert("スマホを横向きにして左右どちらかに傾けるとトロッコが傾き、選択肢が選ばれます！");
});

document.getElementById("btn-howto-next").addEventListener("click", () => {
    startTutorial();
});

// ==========================================
// 8. チュートリアル進行
// ==========================================
const tutResultBar = document.getElementById("tut-result-bar");
const tutResultText = document.getElementById("tut-result-text");
const tutJudgeOverlay = document.getElementById("tut-judge-overlay");
const tutJudgeSymbol = document.getElementById("tut-judge-symbol");

function startTutorial() {
    activeQuizMode = "tutorial";
    isMapGateOpen = false;
    isChoiceLocked = false;
    holdElapsedMs = 0;
    heldSide = null;
    
    tutResultBar.classList.add("hidden");
    tutJudgeOverlay.classList.add("hidden");
    syncCartImages();
    
    document.getElementById("tut-question-text").textContent = TUTORIAL_QUESTION.question;
    currentPair = shuffleTwo(TUTORIAL_QUESTION.choices);
    document.getElementById("tut-text-top").textContent = currentPair[0];
    document.getElementById("tut-text-bottom").textContent = currentPair[1];
    document.getElementById("tut-status-banner").textContent = "スマホを傾けて正解を選ぼうね！";
    
    showScreen("tutorial");
    startLoop();
}

document.getElementById("btn-tut-proceed").addEventListener("click", () => {
    stopLoop();
    startPlaySession();
});

// ==========================================
// 9. 本番クイズ（全5問）＆ マップ誘導
// ==========================================
const mapGuideOverlay = document.getElementById("map-guide-overlay");
const playJudgeOverlay = document.getElementById("play-judge-overlay");
const playJudgeSymbol = document.getElementById("play-judge-symbol");
const playExplainOverlay = document.getElementById("play-explain-overlay");

function startPlaySession() {
    playIndex = 0;
    missCount = 0;
    correctCount = 0;
    elapsedTotalSec = 0;
    syncCartImages();
    loadPlayQuestion(0);
}

function loadPlayQuestion(index) {
    const q = QUESTIONS[index];
    activeQuizMode = "play";
    isChoiceLocked = false;
    // 動画の流れに合わせ、まずは問題画面を表示しつつ「マップを確認してみよう！」／「到着した！」で誘導
    isMapGateOpen = false;
    holdElapsedMs = 0;
    heldSide = null;
    questionStartTimeMs = performance.now();
    
    syncCartImages();
    mapGuideOverlay.classList.add("hidden");
    playJudgeOverlay.classList.add("hidden");
    playExplainOverlay.classList.add("hidden");
    
    document.getElementById("play-q-num-badge").textContent = `第${index + 1} / ${QUESTIONS.length}問`;
    document.getElementById("play-question-text").textContent = q.question;
    
    currentPair = shuffleTwo(q.choices);
    setChoiceSlot("play", "top", currentPair[0]);
    setChoiceSlot("play", "bottom", currentPair[1]);
    
    document.getElementById("play-guide-ribbon").textContent = "まずはマップを確認してみよう！";
    document.getElementById("play-timer-fill").style.height = "100%";
    
    showScreen("play");
    startLoop();
}

function setChoiceSlot(prefix, side, labelText) {
    const textEl = document.getElementById(`${prefix}-text-${side}`);
    textEl.textContent = labelText;
    
    const thumbEl = document.getElementById(`${prefix}-thumb-${side}`);
    if (thumbEl && ASSETS.choiceThumbs[labelText]) {
        thumbEl.src = ASSETS.choiceThumbs[labelText];
        thumbEl.classList.remove("hidden");
        thumbEl.onerror = () => thumbEl.classList.add("hidden");
    } else if (thumbEl) {
        thumbEl.classList.add("hidden");
    }
}

// 「マップを確認してみよう！」ボタン
document.getElementById("btn-open-map").addEventListener("click", () => {
    const q = QUESTIONS[playIndex];
    isMapGateOpen = true;
    heldSide = null;
    holdElapsedMs = 0;
    clearChoiceHighlights();
    
    document.getElementById("map-spot-heading").textContent = q.mapHeading;
    document.getElementById("map-spot-desc").textContent = q.mapDesc;
    document.getElementById("map-fallback-spot-name").textContent = q.spotLabel;
    document.getElementById("map-spot-img").src = ASSETS.mapImage;
    
    mapGuideOverlay.classList.remove("hidden");
});

// 「到着した！」ボタン → トロッコ傾き選択を開始
document.getElementById("btn-arrived-spot").addEventListener("click", () => {
    isMapGateOpen = false;
    heldSide = null;
    holdElapsedMs = 0;
    mapGuideOverlay.classList.add("hidden");
    document.getElementById("play-guide-ribbon").textContent = "スマホを傾けて遊んでね！";
});

// 選択肢タップでも即選択できるように対応（傾き操作が主）
["tut-box-top", "tut-box-bottom"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        if (activeQuizMode === "tutorial" && !isChoiceLocked) {
            resolveChoice(id.endsWith("top") ? "top" : "bottom");
        }
    });
});

["play-box-top", "play-box-bottom"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        if (activeQuizMode === "play" && !isChoiceLocked && !isMapGateOpen) {
            resolveChoice(id.endsWith("top") ? "top" : "bottom");
        }
    });
});

// ==========================================
// 10. フレームループ（傾きゲージ＆トロッコ傾斜）
// ==========================================
function startLoop() {
    stopLoop();
    lastTickMs = performance.now();
    
    function step(now) {
        const dt = Math.min(now - lastTickMs, 100);
        lastTickMs = now;
        
        if (!isChoiceLocked && !isMapGateOpen) {
            const desiredSide = manualTiltSide || sensorTiltSide;
            
            if (activeQuizMode === "play") {
                const elapsedQ = now - questionStartTimeMs;
                const pct = Math.max(0, 100 - (elapsedQ / QUESTION_TIME_MS) * 100);
                document.getElementById("play-timer-fill").style.height = `${pct}%`;
            } else if (activeQuizMode === "tutorial") {
                document.getElementById("tut-timer-fill").style.height = "100%";
            }
            
            if (desiredSide) {
                if (heldSide !== desiredSide) {
                    heldSide = desiredSide;
                    holdElapsedMs = 0;
                }
                holdElapsedMs += dt;
                const ratio = Math.min(1, holdElapsedMs / HOLD_TO_SELECT_MS);
                
                applyTiltVisuals(activeQuizMode, desiredSide, ratio);
                
                if (holdElapsedMs >= HOLD_TO_SELECT_MS) {
                    resolveChoice(desiredSide);
                }
            } else {
                heldSide = null;
                holdElapsedMs = Math.max(0, holdElapsedMs - dt * 2);
                applyTiltVisuals(activeQuizMode, null, 0);
            }
        }
        
        animFrameId = requestAnimationFrame(step);
    }
    
    animFrameId = requestAnimationFrame(step);
}

function stopLoop() {
    if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
    }
}

function clearChoiceHighlights() {
    document.querySelectorAll(".wood-choice-box").forEach((box) => {
        box.classList.remove("tilt-selected");
    });
}

function applyTiltVisuals(mode, side, ratio) {
    clearChoiceHighlights();
    if (!mode) return;
    
    const prefix = mode === "tutorial" ? "tut" : "play";
    const cartEl = document.getElementById(`${prefix}-cart-img`);
    const fallbackEl = document.querySelector(`#screen-${mode} .cart-emoji-fallback`);
    
    if (side === "top") {
        document.getElementById(`${prefix}-box-top`).classList.add("tilt-selected");
        const deg = -16 * ratio;
        const tx = -18 * ratio;
        cartEl.style.transform = `translateX(${tx}px) rotate(${deg}deg)`;
        if (fallbackEl) fallbackEl.style.transform = `translateX(${tx}px) rotate(${deg}deg)`;
    } else if (side === "bottom") {
        document.getElementById(`${prefix}-box-bottom`).classList.add("tilt-selected");
        const deg = 16 * ratio;
        const tx = 18 * ratio;
        cartEl.style.transform = `translateX(${tx}px) rotate(${deg}deg)`;
        if (fallbackEl) fallbackEl.style.transform = `translateX(${tx}px) rotate(${deg}deg)`;
    } else {
        cartEl.style.transform = "translateX(0px) rotate(0deg)";
        if (fallbackEl) fallbackEl.style.transform = "translateX(0px) rotate(0deg)";
    }
}

// ==========================================
// 11. 正誤判定＆解説＆リザルト
// ==========================================
function resolveChoice(side) {
    if (isChoiceLocked) return;
    isChoiceLocked = true;
    heldSide = null;
    holdElapsedMs = 0;
    
    const chosenLabel = side === "top" ? currentPair[0] : currentPair[1];
    
    if (activeQuizMode === "tutorial") {
        const isCorrect = chosenLabel === TUTORIAL_QUESTION.correctAnswer;
        tutJudgeSymbol.textContent = isCorrect ? "〇" : "×";
        tutJudgeOverlay.classList.remove("hidden");
        
        setTimeout(() => {
            tutJudgeOverlay.classList.add("hidden");
            tutResultText.textContent = isCorrect
            ? "操作はバッチリ！次からはいよいよ本番だよ。全5問に挑戦しよう！"
            : "もう一度やってみよう！〇（そう！）の方向へ傾けてみてね。";
            tutResultBar.classList.remove("hidden");
            if (!isCorrect) {
                isChoiceLocked = false;
            }
        }, 750);
        return;
    }
    
    // 本番クイズ
    const q = QUESTIONS[playIndex];
    const isCorrect = chosenLabel === q.correctAnswer;
    const qSec = (performance.now() - questionStartTimeMs) / 1000;
    elapsedTotalSec += qSec;
    
    if (isCorrect) {
        correctCount += 1;
    } else {
        missCount += 1;
        syncCartImages();
    }
    
    playJudgeSymbol.textContent = isCorrect ? "〇" : "×";
    playJudgeOverlay.classList.remove("hidden");
    
    setTimeout(() => {
        playJudgeOverlay.classList.add("hidden");
        document.getElementById("play-explain-badge").textContent = isCorrect ? "〇 正解！" : "× 不正解";
        document.getElementById("play-explain-text").textContent = q.explanation;
        playExplainOverlay.classList.remove("hidden");
    }, 800);
}

document.getElementById("btn-next-q").addEventListener("click", () => {
    playExplainOverlay.classList.add("hidden");
    playIndex += 1;
    
    if (playIndex < QUESTIONS.length) {
        loadPlayQuestion(playIndex);
    } else {
        showResultScreen();
    }
});

function showResultScreen() {
    stopLoop();
    syncCartImages();
    
    const total = QUESTIONS.length;
    const rate = Math.round((correctCount / total) * 100);
    const timeBonus = Math.max(0, Math.round((90 - elapsedTotalSec) * 45));
    const finalScore = correctCount * 2000 + timeBonus;
    
    document.getElementById("result-headline").textContent = `${total}問中 ${correctCount}問正解！`;
    document.getElementById("result-subcomment").textContent =
    correctCount === total
    ? "完璧！カブトビールを守り抜きました！"
    : correctCount >= 3
    ? "おしい！いい調子でした！"
    : "また挑戦してビールを届けよう！";
    
    document.getElementById("result-time-line").textContent = `回答時間：${elapsedTotalSec.toFixed(1)}秒`;
    document.getElementById("result-rate-line").textContent = `正答率：${rate}%`;
    document.getElementById("result-score-line").textContent = `最終スコア：${finalScore.toLocaleString()}点`;
    
    rankingRecords.push({ name: "あなた", score: finalScore });
    rankingRecords.sort((a, b) => b.score - a.score);
    rankingRecords = rankingRecords.slice(0, 3);
    
    const listEl = document.getElementById("result-ranking-list");
    listEl.innerHTML = "";
    rankingRecords.forEach((item, idx) => {
        const li = document.createElement("li");
        li.textContent = `${idx + 1}位：${item.score.toLocaleString()}点（${item.name}）`;
        listEl.appendChild(li);
    });
    
    showScreen("result");
}

document.getElementById("btn-result-retry").addEventListener("click", () => {
    startPlaySession();
});

document.getElementById("btn-result-title").addEventListener("click", () => {
    stopLoop();
    showScreen("title");
});

// ==========================================
// 12. ユーティリティ
// ==========================================
function shuffleTwo(arr) {
    return Math.random() < 0.5 ? [arr[0], arr[1]] : [arr[1], arr[0]];
}

detectOrientation();
