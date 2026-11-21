// ==========================================
// 1. UI画像・素材ファイルのパス設定
// ==========================================
const ASSETS = {
    howtoImage: "howto_tilt.png",
    defaultMapImage: "handa_map.png",
    cartFull: "minecart_3.png", // ミス0回（ビール満タン）
    cartMid: "minecart_2.png",  // ミス1回（少し減る）
    cartLow: "minecart_1.png",  // ミス2回（かなり減る）
    cartEmpty: "minecart_0.png",// ミス3回以上（ビールが空）
    
    // 各問題ごとのマップ画像
    questionMaps: {
        "④": "map_q1.png",
        "⑩": "map_q2.png",
        "⑦": "map_q3.png",
        "⑧": "map_q4.png",
        "①": "map_q5.png"
    },
    
    // 各UIパーツの画像（用意した画像を配置すると自動で反映されます）
    ui: {
        choiceLeft: "ui_choice_left.png",
        choiceRight: "ui_choice_right.png",
        questionFrame: "ui_question_frame.png",
        timerFrame: "ui_timer_frame.png",
        timerFill: "ui_timer_fill.png",
        timerPivot: "ui_timer_pivot.png",
        qBadge: "ui_q_badge.png",
        statusFrame: "ui_status_frame.png"
    },
    
    // 選択肢の参考画像（任意）
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
// 2. チュートリアル & 本番5問データ
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
        mapImage: ASSETS.questionMaps["④"],
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
        mapImage: ASSETS.questionMaps["⑩"],
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
        mapImage: ASSETS.questionMaps["⑦"],
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
        mapImage: ASSETS.questionMaps["⑧"],
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
        mapImage: ASSETS.questionMaps["①"],
        choices: ["機銃掃射による弾痕", "火災による赤レンガの黒ずみ"],
        correctAnswer: "機銃掃射による弾痕",
        explanation: "赤レンガ建物北側の外壁には、第二次世界大戦の「機銃掃射による弾痕」が今も残っています。"
    }
];

// ==========================================
// 3. 状態管理
// ==========================================
const SCREENS = {
    title: document.getElementById("screen-title"),
    lang: document.getElementById("screen-lang"),
    howto: document.getElementById("screen-howto"),
    tutorial: document.getElementById("screen-tutorial"),
    play: document.getElementById("screen-play"),
    result: document.getElementById("screen-result")
};

const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 29; // 約182.21
const HOLD_TO_SELECT_MS = 900; // 傾けて選択確定までの時間
const QUESTION_TIME_MS = 10000; // 各問題10秒

let currentLanguage = "ja";
let playIndex = 0;
let missCount = 0;
let correctCount = 0;
let elapsedTotalSec = 0;

let activeQuizMode = null; // 'tutorial' | 'play'
let currentPair = []; // [左選択肢, 右選択肢]
let hasConfirmedMapForQuestion = false; // その問題でマップを確認して「到着した！」を押したか
let isMapModalOpen = false;
let isReadyGateOpen = false;
let isChoiceLocked = false;
let isTimerRunning = false;
let questionRemainingMs = QUESTION_TIME_MS;

let heldSide = null; // 'left' | 'right' | null
let holdElapsedMs = 0;
let lastFrameMs = null;
let rafId = null;

let sensorTiltSide = null; // 'left' | 'right' | null
let manualTiltSide = null; // 'left' | 'right' | null
let isPortraitScreen = false;

let rankingRecords = [
    { name: "1位", score: 11163 },
    { name: "2位", score: 9793 },
    { name: "3位", score: 0 }
];

// ==========================================
// 4. UI画像の適用とフォールバック
// ==========================================
function bindOptionalBgImage(imgEl, src) {
    if (!imgEl || !src) return;
    imgEl.onload = () => imgEl.classList.remove("hidden");
    imgEl.onerror = () => imgEl.classList.add("hidden");
    imgEl.src = src;
}

function applyAllUiFrames() {
    bindOptionalBgImage(document.getElementById("tut-badge-img"), ASSETS.ui.qBadge);
    bindOptionalBgImage(document.getElementById("play-badge-img"), ASSETS.ui.qBadge);
    
    bindOptionalBgImage(document.getElementById("tut-qframe-img"), ASSETS.ui.questionFrame);
    bindOptionalBgImage(document.getElementById("play-qframe-img"), ASSETS.ui.questionFrame);
    
    bindOptionalBgImage(document.getElementById("tut-left-frame-img"), ASSETS.ui.choiceLeft);
    bindOptionalBgImage(document.getElementById("play-left-frame-img"), ASSETS.ui.choiceLeft);
    
    bindOptionalBgImage(document.getElementById("tut-right-frame-img"), ASSETS.ui.choiceRight);
    bindOptionalBgImage(document.getElementById("play-right-frame-img"), ASSETS.ui.choiceRight);
    
    bindOptionalBgImage(document.getElementById("tut-status-img"), ASSETS.ui.statusFrame);
    bindOptionalBgImage(document.getElementById("play-status-img"), ASSETS.ui.statusFrame);
    
    bindOptionalBgImage(document.getElementById("tut-timer-frame-img"), ASSETS.ui.timerFrame);
    bindOptionalBgImage(document.getElementById("play-timer-frame-img"), ASSETS.ui.timerFrame);
    
    bindOptionalBgImage(document.getElementById("tut-timer-fill-img"), ASSETS.ui.timerFill);
    bindOptionalBgImage(document.getElementById("play-timer-fill-img"), ASSETS.ui.timerFill);
    
    bindOptionalBgImage(document.getElementById("tut-timer-pivot-img"), ASSETS.ui.timerPivot);
    bindOptionalBgImage(document.getElementById("play-timer-pivot-img"), ASSETS.ui.timerPivot);
}

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

// 4段階のトロッコ画像（満タン → 1ミス → 2ミス → 3ミス以上：空）
function getCurrentCartAsset() {
    if (missCount === 0) return ASSETS.cartFull;
    if (missCount === 1) return ASSETS.cartMid;
    if (missCount === 2) return ASSETS.cartLow;
    return ASSETS.cartEmpty;
}

function getBeerEmojiSummary() {
    if (missCount === 0) return "🛒🍺🍺🍺";
    if (missCount === 1) return "🛒🍺🍺";
    if (missCount === 2) return "🛒🍺";
    return "🛒（ビール空…）";
}

function syncCartImages() {
    const src = getCurrentCartAsset();
    document.getElementById("tut-cart-img").src = src;
    document.getElementById("play-cart-img").src = src;
    document.getElementById("result-cart-img").src = src;
    
    const summary = getBeerEmojiSummary();
    document.querySelectorAll(".cart-emoji-fallback").forEach((el) => {
        el.textContent = summary;
    });
}

// ==========================================
// 5. 画面遷移と縦横向き検知
// ==========================================
const orientationStatus = document.getElementById("orientation-status");
const btnEnableTilt = document.getElementById("btn-enable-tilt");

function showScreen(key) {
    Object.values(SCREENS).forEach((el) => el.classList.remove("active"));
    SCREENS[key].classList.add("active");
    detectScreenOrientation();
}

function getScreenAngle() {
    if (screen.orientation && typeof screen.orientation.angle === "number") {
        return screen.orientation.angle;
    }
    if (typeof window.orientation === "number") {
        return window.orientation;
    }
    return 0;
}

function detectScreenOrientation() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const angle = getScreenAngle();
    
    // 横向き判定：画面幅が高さより大きい、または回転角が±90度
    const isLandscape = w > h || Math.abs(angle) === 90;
    isPortraitScreen = !isLandscape;
    
    orientationStatus.textContent = isPortraitScreen
    ? `向き: 縦向き (${angle}°)`
    : `向き: 横向き (${angle}°)`;
}

window.addEventListener("resize", detectScreenOrientation);
window.addEventListener("orientationchange", () => setTimeout(detectScreenOrientation, 80));
if (screen.orientation && screen.orientation.addEventListener) {
    screen.orientation.addEventListener("change", detectScreenOrientation);
}

// ==========================================
// 6. 傾きセンサー（縦・横向きを判別して左右を算出）
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
                // ボタン操作から再試行可能
            }
        } else {
            btnEnableTilt.textContent = "センサー対応 ✓";
        }
}

btnEnableTilt.addEventListener("click", requestTiltPermission);

/**
 * 現在の端末が縦向きか横向きかを検知したうえで、
 * 左選択肢（'left'）または右選択肢（'right'）への傾きを返す
 */
function resolveTiltSideFromOrientation(event) {
    detectScreenOrientation();
    const gamma = event.gamma; // -90〜90
    const beta = event.beta;   // -180〜180
    if (gamma === null || beta === null) return null;
    
    const angle = getScreenAngle();
    let horizontalTilt = 0;
    
    if (!isPortraitScreen) {
        // 横向き時：端末を左右に傾けたときの傾き成分を取り出す
        if (angle === 90) {
            horizontalTilt = beta;
        } else if (angle === -90 || angle === 270) {
            horizontalTilt = -beta;
        } else {
            // 画面幅 > 高さだが angle 未取得の場合：beta と gamma の大きい方を採用
            horizontalTilt = Math.abs(beta) >= Math.abs(gamma) ? beta : gamma;
        }
    } else {
        // 縦向き時：左右の傾きは gamma
        horizontalTilt = gamma;
    }
    
    const THRESHOLD = 14;
    if (horizontalTilt <= -THRESHOLD) {
        return "left";
    }
    if (horizontalTilt >= THRESHOLD) {
        return "right";
    }
    return null;
}

window.addEventListener("deviceorientation", (event) => {
    sensorTiltSide = resolveTiltSideFromOrientation(event);
});

// 補助操作（左傾け・右傾けボタン／矢印キー）
function bindAssistSide(btn, side) {
    const down = (e) => {
        e.preventDefault();
        manualTiltSide = side;
    };
    const up = () => {
        if (manualTiltSide === side) manualTiltSide = null;
    };
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointerleave", up);
    btn.addEventListener("pointercancel", up);
}

bindAssistSide(document.getElementById("btn-sim-left"), "left");
bindAssistSide(document.getElementById("btn-sim-right"), "right");

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") manualTiltSide = "left";
    if (e.key === "ArrowRight") manualTiltSide = "right";
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        manualTiltSide = null;
    }
});

// ==========================================
// 7. タイトル → 言語選択 → 遊び方説明
// ==========================================
document.getElementById("btn-to-lang").addEventListener("click", async () => {
    await requestTiltPermission();
    showScreen("lang");
});

function goToHowTo(lang) {
    currentLanguage = lang;
    document.getElementById("img-howto").src = ASSETS.howtoImage;
    showScreen("howto");
}

document.getElementById("btn-lang-ja").addEventListener("click", () => goToHowTo("ja"));
document.getElementById("btn-lang-en").addEventListener("click", () => goToHowTo("en"));

document.getElementById("btn-howto-help").addEventListener("click", () => {
    alert("スマホを横向きにして左右どちらかに傾けるとサークルゲージが増え、選択肢が選ばれます！");
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
    hasConfirmedMapForQuestion = true;
    isMapModalOpen = false;
    isReadyGateOpen = false;
    isChoiceLocked = false;
    isTimerRunning = false;
    questionRemainingMs = QUESTION_TIME_MS;
    heldSide = null;
    holdElapsedMs = 0;
    
    tutResultBar.classList.add("hidden");
    tutJudgeOverlay.classList.add("hidden");
    setChoiceCardsLocked("tut", false);
    syncCartImages();
    updateTimerDisplay("tut", 1);
    
    document.getElementById("tut-question-text").textContent = TUTORIAL_QUESTION.question;
    currentPair = shuffleTwo(TUTORIAL_QUESTION.choices);
    document.getElementById("tut-text-left").textContent = currentPair[0];
    document.getElementById("tut-text-right").textContent = currentPair[1];
    document.getElementById("tut-status-banner").textContent = "スマホを傾けて正解を選ぼうね！";
    
    resetChoiceGauges("tut");
    showScreen("tutorial");
    startFrameLoop();
}

document.getElementById("btn-tut-proceed").addEventListener("click", () => {
    stopFrameLoop();
    startNewPlayRun(false);
});

// ==========================================
// 9. 本番クイズ（全5問）・マップ確認必須・リトライ時スタート待機
// ==========================================
const mapGuideOverlay = document.getElementById("map-guide-overlay");
const readyStartOverlay = document.getElementById("ready-start-overlay");
const playJudgeOverlay = document.getElementById("play-judge-overlay");
const playJudgeSymbol = document.getElementById("play-judge-symbol");
const playExplainOverlay = document.getElementById("play-explain-overlay");

function startNewPlayRun(requireReadyButtonFirst) {
    playIndex = 0;
    missCount = 0;
    correctCount = 0;
    elapsedTotalSec = 0;
    syncCartImages();
    loadPlayQuestion(0, requireReadyButtonFirst);
}

function loadPlayQuestion(index, requireReadyButtonFirst) {
    const q = QUESTIONS[index];
    activeQuizMode = "play";
    isChoiceLocked = false;
    isMapModalOpen = false;
    // 本番は必ず1回マップを確認するまで選択肢・タイマーをロック
    hasConfirmedMapForQuestion = false;
    isTimerRunning = false;
    questionRemainingMs = QUESTION_TIME_MS;
    heldSide = null;
    holdElapsedMs = 0;
    
    syncCartImages();
    mapGuideOverlay.classList.add("hidden");
    playJudgeOverlay.classList.add("hidden");
    playExplainOverlay.classList.add("hidden");
    
    document.getElementById("play-q-num-badge").textContent = `第${index + 1} / ${QUESTIONS.length}問`;
    document.getElementById("play-question-text").textContent = q.question;
    
    currentPair = shuffleTwo(q.choices);
    setChoiceContent("play", "left", currentPair[0]);
    setChoiceContent("play", "right", currentPair[1]);
    
    setChoiceCardsLocked("play", true);
    resetChoiceGauges("play");
    updateTimerDisplay("play", 1);
    
    document.getElementById("play-guide-ribbon").textContent =
    "まずは「マップを確認してみよう！」を押して場所を確認しよう！";
    
    if (requireReadyButtonFirst) {
        isReadyGateOpen = true;
        readyStartOverlay.classList.remove("hidden");
    } else {
        isReadyGateOpen = false;
        readyStartOverlay.classList.add("hidden");
    }
    
    showScreen("play");
    startFrameLoop();
}

// リトライ後の「スタート」ボタン
document.getElementById("btn-ready-start").addEventListener("click", () => {
    isReadyGateOpen = false;
    readyStartOverlay.classList.add("hidden");
    document.getElementById("play-guide-ribbon").textContent =
    "まずは「マップを確認してみよう！」を押そう！";
});

function setChoiceContent(prefix, side, labelText) {
    document.getElementById(`${prefix}-text-${side}`).textContent = labelText;
    const thumbEl = document.getElementById(`${prefix}-thumb-${side}`);
    if (thumbEl && ASSETS.choiceThumbs[labelText]) {
        thumbEl.src = ASSETS.choiceThumbs[labelText];
        thumbEl.classList.remove("hidden");
        thumbEl.onerror = () => thumbEl.classList.add("hidden");
    } else if (thumbEl) {
        thumbEl.classList.add("hidden");
    }
}

function setChoiceCardsLocked(prefix, locked) {
    const leftCard = document.getElementById(`${prefix}-box-left`);
    const rightCard = document.getElementById(`${prefix}-box-right`);
    if (locked) {
        leftCard.classList.add("locked-choice");
        rightCard.classList.add("locked-choice");
    } else {
        leftCard.classList.remove("locked-choice");
        rightCard.classList.remove("locked-choice");
    }
}

// 「マップを確認してみよう！」ボタン
document.getElementById("btn-open-map").addEventListener("click", () => {
    if (isReadyGateOpen || isChoiceLocked) return;
    const q = QUESTIONS[playIndex];
    isMapModalOpen = true;
    heldSide = null;
    holdElapsedMs = 0;
    resetChoiceGauges("play");
    
    document.getElementById("map-spot-heading").textContent = q.mapHeading;
    document.getElementById("map-spot-desc").textContent = q.mapDesc;
    document.getElementById("map-fallback-spot-name").textContent = q.spotLabel;
    
    const mapImgEl = document.getElementById("map-spot-img");
    mapImgEl.src = q.mapImage || ASSETS.defaultMapImage;
    
    mapGuideOverlay.classList.remove("hidden");
});

// 「到着した！」ボタン → マップ確認完了、選択肢＆10秒タイマー解放
document.getElementById("btn-arrived-spot").addEventListener("click", () => {
    isMapModalOpen = false;
    hasConfirmedMapForQuestion = true;
    isTimerRunning = true;
    heldSide = null;
    holdElapsedMs = 0;
    
    mapGuideOverlay.classList.add("hidden");
    setChoiceCardsLocked("play", false);
    document.getElementById("play-guide-ribbon").textContent =
    "スマホを左右に傾けて、行きたいルートを選ぼう！";
});

// タップ補助（マップ確認済みのときのみ有効）
["play-box-left", "play-box-right"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        if (
            activeQuizMode === "play" &&
            hasConfirmedMapForQuestion &&
            !isMapModalOpen &&
            !isReadyGateOpen &&
            !isChoiceLocked
            ) {
                resolveChoice(id.endsWith("left") ? "left" : "right");
            }
    });
});

["tut-box-left", "tut-box-right"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        if (activeQuizMode === "tutorial" && !isChoiceLocked) {
            resolveChoice(id.endsWith("left") ? "left" : "right");
        }
    });
});

// ==========================================
// 10. フレームループ（サークルゲージ・シリンダータイマー・トロッコ傾斜）
// ==========================================
function updateTimerDisplay(prefix, ratio) {
    const clamped = Math.max(0, Math.min(1, ratio));
    const fillEl = document.getElementById(`${prefix}-timer-fill`);
    const pivotEl = document.getElementById(`${prefix}-timer-pivot`);
    const labelEl = document.getElementById(`${prefix}-timer-label`);
    
    if (fillEl) fillEl.style.width = `${clamped * 100}%`;
    if (pivotEl) pivotEl.style.left = `${clamped * 100}%`;
    if (labelEl) {
        const sec = ((clamped * QUESTION_TIME_MS) / 1000).toFixed(1);
        labelEl.textContent = `${sec}s`;
    }
}

function resetChoiceGauges(prefix) {
    ["left", "right"].forEach((side) => {
        const card = document.getElementById(`${prefix}-box-${side}`);
        const arc = document.getElementById(`${prefix}-gauge-${side}`);
        const pct = document.getElementById(`${prefix}-pct-${side}`);
        if (card) card.classList.remove("tilt-active");
        if (arc) arc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE;
        if (pct) pct.textContent = "0%";
    });
    
    const cartEl = document.getElementById(`${prefix}-cart-img`);
    const fallbackEl = document.querySelector(`#screen-${prefix === "tut" ? "tutorial" : "play"} .cart-emoji-fallback`);
    if (cartEl) cartEl.style.transform = "translateX(0px) rotate(0deg)";
    if (fallbackEl) fallbackEl.style.transform = "translateX(0px) rotate(0deg)";
}

function setSingleGaugeProgress(prefix, side, ratio) {
    const otherSide = side === "left" ? "right" : "left";
    const activeCard = document.getElementById(`${prefix}-box-${side}`);
    const activeArc = document.getElementById(`${prefix}-gauge-${side}`);
    const activePct = document.getElementById(`${prefix}-pct-${side}`);
    
    const otherCard = document.getElementById(`${prefix}-box-${otherSide}`);
    const otherArc = document.getElementById(`${prefix}-gauge-${otherSide}`);
    const otherPct = document.getElementById(`${prefix}-pct-${otherSide}`);
    
    if (otherCard) otherCard.classList.remove("tilt-active");
    if (otherArc) otherArc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE;
    if (otherPct) otherPct.textContent = "0%";
    
    if (activeCard) activeCard.classList.add("tilt-active");
    if (activeArc) {
        activeArc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE * (1 - ratio);
    }
    if (activePct) {
        activePct.textContent = `${Math.round(ratio * 100)}%`;
    }
    
    const cartEl = document.getElementById(`${prefix}-cart-img`);
    const fallbackEl = document.querySelector(`#screen-${prefix === "tut" ? "tutorial" : "play"} .cart-emoji-fallback`);
    const dirSign = side === "left" ? -1 : 1;
    const deg = dirSign * 16 * ratio;
    const tx = dirSign * 18 * ratio;
    if (cartEl) cartEl.style.transform = `translateX(${tx}px) rotate(${deg}deg)`;
    if (fallbackEl) fallbackEl.style.transform = `translateX(${tx}px) rotate(${deg}deg)`;
}

function startFrameLoop() {
    stopFrameLoop();
    lastFrameMs = performance.now();
    
    function tick(now) {
        const dt = Math.min(now - lastFrameMs, 100);
        lastFrameMs = now;
        
        if (!isChoiceLocked) {
            if (activeQuizMode === "play" && isTimerRunning && !isMapModalOpen && !isReadyGateOpen) {
                questionRemainingMs = Math.max(0, questionRemainingMs - dt);
                updateTimerDisplay("play", questionRemainingMs / QUESTION_TIME_MS);
                
                if (questionRemainingMs <= 0) {
                    handleTimeOut();
                }
            }
            
            const canTiltSelect =
            !isMapModalOpen &&
            !isReadyGateOpen &&
            (activeQuizMode === "tutorial" || (activeQuizMode === "play" && hasConfirmedMapForQuestion));
            
            const prefix = activeQuizMode === "tutorial" ? "tut" : "play";
            const inputSide = canTiltSelect ? (manualTiltSide || sensorTiltSide) : null;
            
            if (inputSide) {
                if (heldSide !== inputSide) {
                    heldSide = inputSide;
                    holdElapsedMs = 0;
                }
                holdElapsedMs += dt;
                const ratio = Math.min(1, holdElapsedMs / HOLD_TO_SELECT_MS);
                setSingleGaugeProgress(prefix, inputSide, ratio);
                
                if (holdElapsedMs >= HOLD_TO_SELECT_MS) {
                    resolveChoice(inputSide);
                }
            } else {
                heldSide = null;
                holdElapsedMs = Math.max(0, holdElapsedMs - dt * 2.5);
                resetChoiceGauges(prefix);
            }
        }
        
        rafId = requestAnimationFrame(tick);
    }
    
    rafId = requestAnimationFrame(tick);
}

function stopFrameLoop() {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
}

// ==========================================
// 11. 正誤判定・時間切れ・解説・リザルト
// ==========================================
function handleTimeOut() {
    if (isChoiceLocked) return;
    isChoiceLocked = true;
    isTimerRunning = false;
    heldSide = null;
    holdElapsedMs = 0;
    
    const q = QUESTIONS[playIndex];
    const spentSec = (QUESTION_TIME_MS - questionRemainingMs) / 1000;
    elapsedTotalSec += spentSec;
    
    missCount += 1;
    syncCartImages();
    
    playJudgeSymbol.textContent = "×";
    playJudgeOverlay.classList.remove("hidden");
    
    setTimeout(() => {
        playJudgeOverlay.classList.add("hidden");
        document.getElementById("play-explain-badge").textContent = "× 時間切れ！";
        document.getElementById("play-explain-text").textContent = `10秒以内に選べませんでした。${q.explanation}`;
        playExplainOverlay.classList.remove("hidden");
    }, 800);
}

function resolveChoice(side) {
    if (isChoiceLocked) return;
    isChoiceLocked = true;
    isTimerRunning = false;
    heldSide = null;
    holdElapsedMs = 0;
    
    const chosenLabel = side === "left" ? currentPair[0] : currentPair[1];
    
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
    
    const q = QUESTIONS[playIndex];
    const isCorrect = chosenLabel === q.correctAnswer;
    const spentSec = (QUESTION_TIME_MS - questionRemainingMs) / 1000;
    elapsedTotalSec += spentSec;
    
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
        loadPlayQuestion(playIndex, false);
    } else {
        showResultScreen();
    }
});

function showResultScreen() {
    stopFrameLoop();
    syncCartImages();
    
    const total = QUESTIONS.length;
    const rate = Math.round((correctCount / total) * 100);
    const timeBonus = Math.max(0, Math.round((50 - elapsedTotalSec) * 60));
    const finalScore = correctCount * 2000 + timeBonus;
    
    document.getElementById("result-headline").textContent = `${total}問中 ${correctCount}問正解！`;
    document.getElementById("result-subcomment").textContent =
    missCount === 0
    ? "完璧！ビール満タンで半田駅に到着！"
    : missCount < 3
    ? "半田駅に到着！ビールも残っているよ！"
    : "半田駅に到着…ビールがなくなっちゃった！";
    
    document.getElementById("result-time-line").textContent = `回答時間：${elapsedTotalSec.toFixed(1)}秒`;
    document.getElementById("result-rate-line").textContent = `正答率：${rate}%`;
    document.getElementById("result-score-line").textContent = `最終スコア：${finalScore.toLocaleString()}点`;
    
    rankingRecords.push({ name: "あなた", score: finalScore });
    rankingRecords.sort((a, b) => b.score - a.score);
    rankingRecords = rankingRecords.slice(0, 3);
    
    const listEl = document.getElementById("result-ranking-list");
    listEl.innerHTML = "";
    rankingRecords.forEach((rec, idx) => {
        const li = document.createElement("li");
        li.textContent = `${idx + 1}位：${rec.score.toLocaleString()}点（${rec.name}）`;
        listEl.appendChild(li);
    });
    
    showScreen("result");
}

// リトライ時は「スタート」ボタンで待機してから開始
document.getElementById("btn-result-retry").addEventListener("click", () => {
    startNewPlayRun(true);
});

document.getElementById("btn-result-title").addEventListener("click", () => {
    stopFrameLoop();
    showScreen("title");
});

// ==========================================
// 12. 初期化
// ==========================================
function shuffleTwo(arr) {
    return Math.random() < 0.5 ? [arr[0], arr[1]] : [arr[1], arr[0]];
}

applyAllUiFrames();
detectScreenOrientation();
