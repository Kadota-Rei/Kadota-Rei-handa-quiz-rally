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
    
    questionMaps: {
        "④": "map_q1.png",
        "⑩": "map_q2.png",
        "⑦": "map_q3.png",
        "⑧": "map_q4.png",
        "①": "map_q5.png"
    },
    
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
// 3. ボタン「ボインっ」アニメーション実行関数
// ==========================================
function triggerBoingThen(btnEl, callback) {
    if (!btnEl) {
        if (callback) callback();
        return;
    }
    if (btnEl.dataset.boingBusy === "1") return;
    btnEl.dataset.boingBusy = "1";
    
    btnEl.classList.remove("boing-playing");
    void btnEl.offsetWidth; // リフローでアニメーション再開
    btnEl.classList.add("boing-playing");
    
    let done = false;
    const finish = () => {
        if (done) return;
        done = true;
        btnEl.classList.remove("boing-playing");
        delete btnEl.dataset.boingBusy;
        if (callback) callback();
    };
    
    btnEl.addEventListener("animationend", finish, { once: true });
    setTimeout(finish, 360);
}

// ==========================================
// 4. 画像アスペクト比固定＆透明余白トリミング
// ==========================================
const trimmedUrlCache = new Map();

function trimTransparentAndLockRatio(imgEl, onSuccess, onError) {
    if (!imgEl) return;
    
    imgEl.onload = () => {
        const nw = imgEl.naturalWidth;
        const nh = imgEl.naturalHeight;
        if (!nw || !nh) {
            if (onError) onError();
            return;
        }
        
        const cacheKey = `${imgEl.currentSrc || imgEl.src}__${nw}x${nh}`;
        if (trimmedUrlCache.has(cacheKey)) {
            const cached = trimmedUrlCache.get(cacheKey);
            imgEl.style.aspectRatio = `${cached.ratio}`;
            if (onSuccess) onSuccess();
            return;
        }
        
        // 透明ピクセル（alpha <= 8）を除いたバウンディングボックスを算出
        try {
            const canvas = document.createElement("canvas");
            canvas.width = nw;
            canvas.height = nh;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(imgEl, 0, 0);
            const { data } = ctx.getImageData(0, 0, nw, nh);
            
            let minX = nw;
            let minY = nh;
            let maxX = -1;
            let maxY = -1;
            
            for (let y = 0; y < nh; y++) {
                const rowOffset = y * nw * 4;
                for (let x = 0; x < nw; x++) {
                    const alpha = data[rowOffset + x * 4 + 3];
                    if (alpha > 8) {
                        if (x < minX) minX = x;
                        if (y < minY) minY = y;
                        if (x > maxX) maxX = x;
                        if (y > maxY) maxY = y;
                    }
                }
            }
            
            if (maxX >= minX && maxY >= minY) {
                const cropW = maxX - minX + 1;
                const cropH = maxY - minY + 1;
                const cropCanvas = document.createElement("canvas");
                cropCanvas.width = cropW;
                cropCanvas.height = cropH;
                const cropCtx = cropCanvas.getContext("2d");
                cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
                
                const ratio = cropW / cropH;
                imgEl.style.aspectRatio = `${ratio}`;
                trimmedUrlCache.set(cacheKey, { ratio });
                
                // 元のsrcを差し替えず、不透明領域の比率をロック
                if (onSuccess) onSuccess();
                return;
            }
        } catch (err) {
            // クロスオリジン等でCanvas読み取り不可の場合は元画像の比率を維持
        }
        
        imgEl.style.aspectRatio = `${nw} / ${nh}`;
        if (onSuccess) onSuccess();
    };
    
    imgEl.onerror = () => {
        if (onError) onError();
    };
}

function bindOptionalUiImage(imgEl, src) {
    if (!imgEl || !src) return;
    trimTransparentAndLockRatio(
                                imgEl,
                                () => imgEl.classList.remove("hidden"),
                                () => imgEl.classList.add("hidden")
                                );
    imgEl.src = src;
}

function applyAllUiFrames() {
    bindOptionalUiImage(document.getElementById("tut-badge-img"), ASSETS.ui.qBadge);
    bindOptionalUiImage(document.getElementById("play-badge-img"), ASSETS.ui.qBadge);
    
    bindOptionalUiImage(document.getElementById("tut-qframe-img"), ASSETS.ui.questionFrame);
    bindOptionalUiImage(document.getElementById("play-qframe-img"), ASSETS.ui.questionFrame);
    
    bindOptionalUiImage(document.getElementById("tut-left-frame-img"), ASSETS.ui.choiceLeft);
    bindOptionalUiImage(document.getElementById("play-left-frame-img"), ASSETS.ui.choiceLeft);
    
    bindOptionalUiImage(document.getElementById("tut-right-frame-img"), ASSETS.ui.choiceRight);
    bindOptionalUiImage(document.getElementById("play-right-frame-img"), ASSETS.ui.choiceRight);
    
    bindOptionalUiImage(document.getElementById("tut-status-img"), ASSETS.ui.statusFrame);
    bindOptionalUiImage(document.getElementById("play-status-img"), ASSETS.ui.statusFrame);
    
    bindOptionalUiImage(document.getElementById("tut-timer-frame-img"), ASSETS.ui.timerFrame);
    bindOptionalUiImage(document.getElementById("play-timer-frame-img"), ASSETS.ui.timerFrame);
    
    bindOptionalUiImage(document.getElementById("tut-timer-fill-img"), ASSETS.ui.timerFill);
    bindOptionalUiImage(document.getElementById("play-timer-fill-img"), ASSETS.ui.timerFill);
    
    bindOptionalUiImage(document.getElementById("tut-timer-pivot-img"), ASSETS.ui.timerPivot);
    bindOptionalUiImage(document.getElementById("play-timer-pivot-img"), ASSETS.ui.timerPivot);
}

function setupContentImageWithFallback(imgEl, fallbackEl) {
    if (!imgEl || !fallbackEl) return;
    trimTransparentAndLockRatio(
                                imgEl,
                                () => {
                                    imgEl.classList.remove("hidden");
                                    fallbackEl.style.display = "none";
                                },
                                () => {
                                    imgEl.classList.add("hidden");
                                    fallbackEl.style.display = "flex";
                                }
                                );
}

setupContentImageWithFallback(document.getElementById("img-howto"), document.getElementById("howto-fallback"));
setupContentImageWithFallback(document.getElementById("map-spot-img"), document.getElementById("map-fallback-box"));
setupContentImageWithFallback(document.getElementById("tut-cart-img"), document.querySelector("#screen-tutorial .cart-emoji-fallback"));
setupContentImageWithFallback(document.getElementById("play-cart-img"), document.getElementById("play-cart-fallback"));
setupContentImageWithFallback(document.getElementById("result-cart-img"), document.getElementById("result-cart-fallback"));

// ==========================================
// 5. 状態管理変数
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
const HOLD_TO_SELECT_MS = 900; // 傾けてゲージ満タンになる時間
const QUESTION_TIME_MS = 10000; // 各問題10秒

let currentScreenKey = "title";
let currentLanguage = "ja";
let playIndex = 0;
let missCount = 0;
let correctCount = 0;
let elapsedTotalSec = 0;

let currentPair = [];
let hasConfirmedMapForQuestion = false;
let isMapModalOpen = false;
let isReadyGateOpen = false;
let isChoiceLocked = false;
let isTimerRunning = false;
let questionRemainingMs = QUESTION_TIME_MS;

let heldSide = null; // 'left' | 'right' | null
let holdElapsedMs = 0;
let lastFrameMs = null;
let rafId = null;

let sensorTiltSide = null;
let manualTiltSide = null;
let isPortraitScreen = false;

let rankingRecords = [
    { name: "1位", score: 11163 },
    { name: "2位", score: 9793 },
    { name: "3位", score: 0 }
];

// 4段階トロッコ画像
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
// 6. 画面遷移と縦横向き検知
// ==========================================
const orientationStatus = document.getElementById("orientation-status");
const btnEnableTilt = document.getElementById("btn-enable-tilt");

function showScreen(key) {
    currentScreenKey = key;
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
// 7. 傾きセンサー（縦・横向きを判別して左右を算出）
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

btnEnableTilt.addEventListener("click", () => {
    triggerBoingThen(btnEnableTilt, () => {
        requestTiltPermission();
    });
});

function resolveTiltSideFromOrientation(event) {
    detectScreenOrientation();
    const gamma = event.gamma;
    const beta = event.beta;
    if (gamma === null || beta === null) return null;
    
    const angle = getScreenAngle();
    let horizontalTilt = 0;
    
    if (!isPortraitScreen) {
        if (angle === 90) {
            horizontalTilt = beta;
        } else if (angle === -90 || angle === 270) {
            horizontalTilt = -beta;
        } else {
            horizontalTilt = Math.abs(beta) >= Math.abs(gamma) ? beta : gamma;
        }
    } else {
        horizontalTilt = gamma;
    }
    
    const THRESHOLD = 14;
    if (horizontalTilt <= -THRESHOLD) return "left";
    if (horizontalTilt >= THRESHOLD) return "right";
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
        btn.classList.remove("boing-playing");
        void btn.offsetWidth;
        btn.classList.add("boing-playing");
        setTimeout(() => btn.classList.remove("boing-playing"), 340);
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
// 8. タイトル → 言語選択 → 傾きチュートリアル説明
// ==========================================
const btnToLang = document.getElementById("btn-to-lang");
btnToLang.addEventListener("click", () => {
    triggerBoingThen(btnToLang, async () => {
        await requestTiltPermission();
        showScreen("lang");
    });
});

function goToHowTo(lang) {
    currentLanguage = lang;
    heldSide = null;
    holdElapsedMs = 0;
    resetHowtoGauges();
    
    const howtoImg = document.getElementById("img-howto");
    howtoImg.src = ASSETS.howtoImage;
    showScreen("howto");
    startFrameLoop();
}

const btnLangJa = document.getElementById("btn-lang-ja");
const btnLangEn = document.getElementById("btn-lang-en");

btnLangJa.addEventListener("click", () => {
    triggerBoingThen(btnLangJa, () => goToHowTo("ja"));
});

btnLangEn.addEventListener("click", () => {
    triggerBoingThen(btnLangEn, () => goToHowTo("en"));
});

const btnHowtoHelp = document.getElementById("btn-howto-help");
btnHowtoHelp.addEventListener("click", () => {
    triggerBoingThen(btnHowtoHelp, () => {
        alert("スマホを横向きにして左右どちらかに傾けるとサークルゲージがたまり、100%で次のステップへ進みます！");
    });
});

function resetHowtoGauges() {
    ["left", "right"].forEach((side) => {
        const card = document.getElementById(`howto-card-${side}`);
        const arc = document.getElementById(`howto-gauge-${side}`);
        const pct = document.getElementById(`howto-pct-${side}`);
        if (card) card.classList.remove("tilt-active");
        if (arc) arc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE;
        if (pct) pct.textContent = "0%";
    });
    const previewCart = document.getElementById("howto-preview-cart");
    if (previewCart) previewCart.style.transform = "translateX(0px) rotate(0deg)";
    const statusEl = document.getElementById("howto-gauge-status");
    if (statusEl) statusEl.textContent = "0%";
}

function updateHowtoGaugeVisual(side, ratio) {
    const other = side === "left" ? "right" : "left";
    const activeCard = document.getElementById(`howto-card-${side}`);
    const activeArc = document.getElementById(`howto-gauge-${side}`);
    const activePct = document.getElementById(`howto-pct-${side}`);
    
    const otherCard = document.getElementById(`howto-card-${other}`);
    const otherArc = document.getElementById(`howto-gauge-${other}`);
    const otherPct = document.getElementById(`howto-pct-${other}`);
    
    if (otherCard) otherCard.classList.remove("tilt-active");
    if (otherArc) otherArc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE;
    if (otherPct) otherPct.textContent = "0%";
    
    if (activeCard) activeCard.classList.add("tilt-active");
    if (activeArc) activeArc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE * (1 - ratio);
    if (activePct) activePct.textContent = `${Math.round(ratio * 100)}%`;
    
    const statusEl = document.getElementById("howto-gauge-status");
    if (statusEl) statusEl.textContent = `${Math.round(ratio * 100)}%`;
    
    const previewCart = document.getElementById("howto-preview-cart");
    if (previewCart) {
        const sign = side === "left" ? -1 : 1;
        previewCart.style.transform = `translateX(${sign * 16 * ratio}px) rotate(${sign * 15 * ratio}deg)`;
    }
}

// ==========================================
// 9. チュートリアル進行
// ==========================================
const tutResultBar = document.getElementById("tut-result-bar");
const tutResultText = document.getElementById("tut-result-text");
const tutJudgeOverlay = document.getElementById("tut-judge-overlay");
const tutJudgeSymbol = document.getElementById("tut-judge-symbol");

function startTutorial() {
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

const btnTutProceed = document.getElementById("btn-tut-proceed");
btnTutProceed.addEventListener("click", () => {
    triggerBoingThen(btnTutProceed, () => {
        stopFrameLoop();
        startNewPlayRun(false);
    });
});

// ==========================================
// 10. 本番クイズ（全5問）・マップ確認必須・リトライ時スタート待機
// ==========================================
const mapGuideOverlay = document.getElementById("map-guide-overlay");
const readyStartOverlay = document.getElementById("ready-start-overlay");
const playJudgeOverlay = document.getElementById("play-judge-overlay");
const playJudgeSymbol = document.getElementById("play-judge-symbol");
const playExplainOverlay = document.getElementById("play-explain-overlay");
const btnOpenMap = document.getElementById("btn-open-map");

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
    isChoiceLocked = false;
    isMapModalOpen = false;
    hasConfirmedMapForQuestion = false;
    isTimerRunning = false;
    questionRemainingMs = QUESTION_TIME_MS;
    heldSide = null;
    holdElapsedMs = 0;
    
    syncCartImages();
    mapGuideOverlay.classList.add("hidden");
    playJudgeOverlay.classList.add("hidden");
    playExplainOverlay.classList.add("hidden");
    
    btnOpenMap.classList.remove("attention-dimmed");
    
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

const btnReadyStart = document.getElementById("btn-ready-start");
btnReadyStart.addEventListener("click", () => {
    triggerBoingThen(btnReadyStart, () => {
        isReadyGateOpen = false;
        readyStartOverlay.classList.add("hidden");
        document.getElementById("play-guide-ribbon").textContent =
        "まずは「マップを確認してみよう！」を押そう！";
    });
});

function setChoiceContent(prefix, side, labelText) {
    document.getElementById(`${prefix}-text-${side}`).textContent = labelText;
    const thumbEl = document.getElementById(`${prefix}-thumb-${side}`);
    if (thumbEl && ASSETS.choiceThumbs[labelText]) {
        trimTransparentAndLockRatio(
                                    thumbEl,
                                    () => thumbEl.classList.remove("hidden"),
                                    () => thumbEl.classList.add("hidden")
                                    );
        thumbEl.src = ASSETS.choiceThumbs[labelText];
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
btnOpenMap.addEventListener("click", () => {
    if (isReadyGateOpen || isChoiceLocked) return;
    triggerBoingThen(btnOpenMap, () => {
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
});

// 「到着した！」ボタン → マップ確認完了、選択肢＆10秒タイマー解放
const btnArrivedSpot = document.getElementById("btn-arrived-spot");
btnArrivedSpot.addEventListener("click", () => {
    triggerBoingThen(btnArrivedSpot, () => {
        isMapModalOpen = false;
        hasConfirmedMapForQuestion = true;
        isTimerRunning = true;
        heldSide = null;
        holdElapsedMs = 0;
        
        btnOpenMap.classList.add("attention-dimmed");
        mapGuideOverlay.classList.add("hidden");
        setChoiceCardsLocked("play", false);
        document.getElementById("play-guide-ribbon").textContent =
        "スマホを左右に傾けて、行きたいルートを選ぼう！";
    });
});

// タップ補助（マップ確認済みのときのみ有効）
["play-box-left", "play-box-right"].forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
        if (
            currentScreenKey === "play" &&
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
        if (currentScreenKey === "tutorial" && !isChoiceLocked) {
            resolveChoice(id.endsWith("left") ? "left" : "right");
        }
    });
});

// ==========================================
// 11. フレームループ（サークルゲージ・シリンダータイマー・トロッコ傾斜）
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
    if (activeArc) activeArc.style.strokeDashoffset = GAUGE_CIRCUMFERENCE * (1 - ratio);
    if (activePct) activePct.textContent = `${Math.round(ratio * 100)}%`;
    
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
        
        if (currentScreenKey === "howto" && !isChoiceLocked) {
            const inputSide = manualTiltSide || sensorTiltSide;
            if (inputSide) {
                if (heldSide !== inputSide) {
                    heldSide = inputSide;
                    holdElapsedMs = 0;
                }
                holdElapsedMs += dt;
                const ratio = Math.min(1, holdElapsedMs / HOLD_TO_SELECT_MS);
                updateHowtoGaugeVisual(inputSide, ratio);
                
                if (holdElapsedMs >= HOLD_TO_SELECT_MS) {
                    isChoiceLocked = true;
                    heldSide = null;
                    holdElapsedMs = 0;
                    setTimeout(() => {
                        startTutorial();
                    }, 220);
                }
            } else {
                heldSide = null;
                holdElapsedMs = Math.max(0, holdElapsedMs - dt * 2.5);
                resetHowtoGauges();
            }
        } else if (!isChoiceLocked && (currentScreenKey === "tutorial" || currentScreenKey === "play")) {
            if (currentScreenKey === "play" && isTimerRunning && !isMapModalOpen && !isReadyGateOpen) {
                questionRemainingMs = Math.max(0, questionRemainingMs - dt);
                updateTimerDisplay("play", questionRemainingMs / QUESTION_TIME_MS);
                
                if (questionRemainingMs <= 0) {
                    handleTimeOut();
                }
            }
            
            const canTiltSelect =
            !isMapModalOpen &&
            !isReadyGateOpen &&
            (currentScreenKey === "tutorial" || (currentScreenKey === "play" && hasConfirmedMapForQuestion));
            
            const prefix = currentScreenKey === "tutorial" ? "tut" : "play";
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
        
        animFrameId = requestAnimationFrame(tick);
    }
    
    animFrameId = requestAnimationFrame(tick);
}

function stopFrameLoop() {
    if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
    }
}

// ==========================================
// 12. 正誤判定・時間切れ・解説・リザルト
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
    
    if (currentScreenKey === "tutorial") {
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

const btnNextQ = document.getElementById("btn-next-q");
btnNextQ.addEventListener("click", () => {
    triggerBoingThen(btnNextQ, () => {
        playExplainOverlay.classList.add("hidden");
        playIndex += 1;
        
        if (playIndex < QUESTIONS.length) {
            loadPlayQuestion(playIndex, false);
        } else {
            showResultScreen();
        }
    });
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

const btnResultRetry = document.getElementById("btn-result-retry");
btnResultRetry.addEventListener("click", () => {
    triggerBoingThen(btnResultRetry, () => {
        startNewPlayRun(true);
    });
});

const btnResultTitle = document.getElementById("btn-result-title");
btnResultTitle.addEventListener("click", () => {
    triggerBoingThen(btnResultTitle, () => {
        stopFrameLoop();
        showScreen("title");
    });
});

// ==========================================
// 13. 初期化
// ==========================================
function shuffleTwo(arr) {
    return Math.random() < 0.5 ? [arr[0], arr[1]] : [arr[1], arr[0]];
}

applyAllUiFrames();
detectScreenOrientation();
