// トロッコ画像（お手持ちの3枚のファイル名に合わせて変更可能）
const CART_IMAGES = {
    full: "minecart_3.png", // ミス0回（満タン）
    mid: "minecart_2.png",  // ミス1回（少し減る）
    low: "minecart_1.png"   // ミス2回以上（かなり減る）
};

// 指定された5問を順番に出題
const QUESTIONS = [
    {
        id: "④",
        title: "④ ハーフティーンバー構造",
        question: "赤レンガ建物の南東側の壁に見られる、木枠とレンガを組み合わせた特徴的な構造は何？",
        mapHint: "まずは赤レンガ建物の「南東側の壁」付近へ移動して、木枠とレンガの組み合わせを探してみよう！",
        choices: ["ハーフティーンバー構造", "組積造（そせきぞう）"],
        correctAnswer: "ハーフティーンバー構造",
        explanation: "「ハーフティーンバー構造」は、木骨の枠組みの間にレンガや塗り壁を詰めた伝統的な建築様式です。"
    },
    {
        id: "⑩",
        title: "⑩ 当時の木製階段",
        question: "創建当初からある５階建ての塔屋最上階まで続いている階段は、何で作られてた？",
        mapHint: "5階建ての塔屋（とうや）を目指そう！最上階まで続く階段の素材に注目です。",
        choices: ["木製階段", "レンガ製階段"],
        correctAnswer: "木製階段",
        explanation: "創建当初から残る5階建て塔屋最上階までの階段は「木製階段」で作られています。"
    },
    {
        id: "⑦",
        title: "⑦ ビール樽型の切り欠き壁",
        question: "ビール樽の収まりをよくするため、パサージュの内壁に施された工夫はどれ？",
        mapHint: "パサージュ（通路）の内壁へ移動して、ビール樽を運びやすくするための工夫をチェックしよう！",
        choices: ["丸い切り欠き壁", "四角い切り欠き壁"],
        correctAnswer: "丸い切り欠き壁",
        explanation: "ビール樽の丸みに合わせて収まりをよくするため、パサージュの内壁には「丸い切り欠き壁」が施されています。"
    },
    {
        id: "⑧",
        title: "⑧ アーチ型耐火床",
        question: "高い耐震・耐火・断熱性能を持たせるために、床に採用された構造はどれ？（通路の上を見上げてみよう！）",
        mapHint: "通路の上を見上げてみよう！耐震・耐火・断熱性能を高めるための床構造がヒントです。",
        choices: ["アーチ型耐火床", "格子型耐火床"],
        correctAnswer: "アーチ型耐火床",
        explanation: "耐震・耐火・断熱性能を高めるため、レンガをアーチ状に組んだ「アーチ型耐火床」が採用されています。"
    },
    {
        id: "①",
        title: "① 機銃掃射による弾痕",
        question: "赤レンガ建物北側の外壁に今も残っている、第二次世界大戦の傷跡とは何？",
        mapHint: "赤レンガ建物の「北側の外壁」へ移動して、歴史の跡をよく観察してみよう！",
        choices: ["機銃掃射による弾痕", "火災による赤レンガの黒ずみ"],
        correctAnswer: "機銃掃射による弾痕",
        explanation: "赤レンガ建物の北側外壁には、第二次世界大戦の「機銃掃射による弾痕」が今も残っています。"
    }
];

// ゲーム状態
let currentIndex = 0;
let missCount = 0;
let currentPair = []; // [左選択肢, 右選択肢]
let isAnsweringLocked = false;

// 傾き・ゲージ管理
const RING_CIRCUMFERENCE = 2 * Math.PI * 26; // 約163.36
const HOLD_DURATION_MS = 950; // 傾け続けて決定するまでの時間（ミリ秒）
let activeSide = null; // 'left' | 'right' | null
let holdProgressMs = 0;
let lastFrameTime = null;
let rafId = null;

// 手動ボタン・キーボード状態
let manualLeftHeld = false;
let manualRightHeld = false;
let sensorTiltDirection = null; // 'left' | 'right' | null
let sensorEnabled = false;

// 制限時間バー（1問20秒の目安演出）
const QUESTION_TIME_LIMIT_MS = 20000;
let elapsedQuestionMs = 0;

// DOM要素取得
const screens = {
    title: document.getElementById("title-screen"),
    map: document.getElementById("map-screen"),
    game: document.getElementById("game-screen"),
    result: document.getElementById("result-screen")
};

const startBtn = document.getElementById("start-btn");
const mapQBadge = document.getElementById("map-q-badge");
const mapBeerStatus = document.getElementById("map-beer-status");
const mapQHeading = document.getElementById("map-q-heading");
const mapHintText = document.getElementById("map-hint-text");
const showMapBtn = document.getElementById("show-map-btn");
const arrivedBtn = document.getElementById("arrived-btn");
const mapEmbedBox = document.getElementById("map-embed-box");

const gameQBadge = document.getElementById("game-q-badge");
const timerBar = document.getElementById("timer-bar");
const missCounter = document.getElementById("miss-counter");
const questionText = document.getElementById("question-text");

const choiceLeftBox = document.getElementById("choice-left-box");
const choiceRightBox = document.getElementById("choice-right-box");
const choiceLeftText = document.getElementById("choice-left-text");
const choiceRightText = document.getElementById("choice-right-text");
const ringLeft = document.getElementById("ring-left");
const ringRight = document.getElementById("ring-right");

const cartWrapper = document.getElementById("cart-wrapper");
const cartImg = document.getElementById("cart-img");
const cartFallback = document.getElementById("cart-fallback");
const fallbackBeers = document.getElementById("fallback-beers");

const judgeMark = document.getElementById("judge-mark");
const judgeSymbol = document.getElementById("judge-symbol");
const judgeSubtext = document.getElementById("judge-subtext");

const holdLeftBtn = document.getElementById("hold-left-btn");
const holdRightBtn = document.getElementById("hold-right-btn");
const enableSensorBtn = document.getElementById("enable-sensor-btn");

const explainOverlay = document.getElementById("explain-overlay");
const explainResultTitle = document.getElementById("explain-result-title");
const explainBody = document.getElementById("explain-body");
const nextQuestionBtn = document.getElementById("next-question-btn");

const resultTitle = document.getElementById("result-title");
const resultBeerVisual = document.getElementById("result-beer-visual");
const resultSummary = document.getElementById("result-summary");
const retryBtn = document.getElementById("retry-btn");
const backTitleBtn = document.getElementById("back-title-btn");

// 画面切り替え
function showScreen(targetKey) {
    Object.values(screens).forEach((el) => el.classList.remove("active"));
    screens[targetKey].classList.add("active");
}

// トロッコ画像更新
function updateCartAppearance() {
    let src = CART_IMAGES.full;
    let label = "🍺🍺🍺（満タン）";
    
    if (missCount === 1) {
        src = CART_IMAGES.mid;
        label = "🍺🍺（少し減った）";
    } else if (missCount >= 2) {
        src = CART_IMAGES.low;
        label = "🍺（残りわずか）";
    }
    
    cartImg.src = src;
    fallbackBeers.textContent = label.split("（")[0];
    mapBeerStatus.textContent = `🍺 残量：${label}`;
    missCounter.textContent = `ミス: ${missCount}回`;
}

// 画像読み込みエラー時のフォールバック
cartImg.addEventListener("error", () => {
    cartImg.classList.add("hidden");
    cartFallback.classList.remove("hidden");
});

cartImg.addEventListener("load", () => {
    cartImg.classList.remove("hidden");
    cartFallback.classList.add("hidden");
});

// iOS向け 傾きセンサー許可リクエスト
async function requestMotionPermissionIfNeeded() {
    if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
            try {
                const state = await DeviceOrientationEvent.requestPermission();
                if (state === "granted") {
                    sensorEnabled = true;
                    enableSensorBtn.classList.add("hidden");
                } else {
                    enableSensorBtn.classList.remove("hidden");
                }
            } catch (err) {
                enableSensorBtn.classList.remove("hidden");
            }
        } else {
            sensorEnabled = true;
        }
}

// 傾きイベント処理（横向きプレイを考慮）
function handleDeviceOrientation(event) {
    if (!screens.game.classList.contains("active") || isAnsweringLocked) {
        sensorTiltDirection = null;
        return;
    }
    
    const gamma = event.gamma; // 左右軸（-90〜90）
    const beta = event.beta;   // 前後軸（-180〜180）
    if (gamma === null || beta === null) return;
    
    // 横向き（landscape）判定
    const isLandscape =
    window.matchMedia("(orientation: landscape)").matches ||
    Math.abs(window.angle || 0) === 90;
    
    let tiltValue = 0;
    if (isLandscape) {
        // 横向きでは持ち方によって gamma または beta が左右の傾きになる
        // 画面を自分側へ傾けた時と左右にひねった時の両方を拾う
        if (Math.abs(beta) > 22) {
            // 端末を横向きで左右に傾ける動き
            tiltValue = beta > 0 ? beta - 22 : beta + 22;
            // 画面上部の向きに応じて左右を合わせる
            if ((window.orientation || 0) === -90) {
                tiltValue = -tiltValue;
            }
        } else {
            tiltValue = gamma;
        }
    } else {
        tiltValue = gamma;
    }
    
    const THRESHOLD = 14;
    if (tiltValue <= -THRESHOLD) {
        sensorTiltDirection = "left";
    } else if (tiltValue >= THRESHOLD) {
        sensorTiltDirection = "right";
    } else {
        sensorTiltDirection = null;
    }
}

window.addEventListener("deviceorientation", handleDeviceOrientation);

enableSensorBtn.addEventListener("click", async () => {
    await requestMotionPermissionIfNeeded();
});

// スタートボタン
startBtn.addEventListener("click", async () => {
    await requestMotionPermissionIfNeeded();
    resetAndStartGame();
});

function resetAndStartGame() {
    currentIndex = 0;
    missCount = 0;
    updateCartAppearance();
    setupMapStage(0);
}

// 地図誘導画面のセットアップ
function setupMapStage(index) {
    const q = QUESTIONS[index];
    mapQBadge.textContent = `第${index + 1}問 / 全${QUESTIONS.length}問`;
    mapQHeading.textContent = `${q.title} の場所へ向かおう！`;
    mapHintText.textContent = q.mapHint;
    mapEmbedBox.classList.add("hidden");
    updateCartAppearance();
    showScreen("map");
}

// 地図を表示するボタン
showMapBtn.addEventListener("click", () => {
    mapEmbedBox.classList.toggle("hidden");
});

// 目的地へ着いたボタン → クイズ＆トロッコ画面へ
arrivedBtn.addEventListener("click", () => {
    setupQuestionStage(currentIndex);
});

// 左右の選択肢をランダムに並べる
function shuffleTwoChoices(choices) {
    const copy = [...choices];
    if (Math.random() < 0.5) {
        return [copy[0], copy[1]];
    }
    return [copy[1], copy[0]];
}

// クイズ画面セットアップ
function setupQuestionStage(index) {
    const q = QUESTIONS[index];
    isAnsweringLocked = false;
    elapsedQuestionMs = 0;
    holdProgressMs = 0;
    activeSide = null;
    lastFrameTime = performance.now();
    
    gameQBadge.textContent = `Q${index + 1} (${q.id})`;
    questionText.textContent = q.question;
    
    currentPair = shuffleTwoChoices(q.choices);
    choiceLeftText.textContent = currentPair[0];
    choiceRightText.textContent = currentPair[1];
    
    judgeMark.classList.add("hidden");
    explainOverlay.classList.add("hidden");
    resetVisualTiltAndRings();
    updateCartAppearance();
    
    showScreen("game");
    startGameLoop();
}

function resetVisualTiltAndRings() {
    choiceLeftBox.classList.remove("active-tilt");
    choiceRightBox.classList.remove("active-tilt");
    ringLeft.style.strokeDashoffset = RING_CIRCUMFERENCE;
    ringRight.style.strokeDashoffset = RING_CIRCUMFERENCE;
    cartWrapper.style.transform = "translateX(0px) rotate(0deg)";
}

function startGameLoop() {
    stopGameLoop();
    lastFrameTime = performance.now();
    
    function tick(now) {
        const dt = Math.min(now - lastFrameTime, 100);
        lastFrameTime = now;
        
        if (screens.game.classList.contains("active") && !isAnsweringLocked) {
            // タイマーバー更新
            elapsedQuestionMs += dt;
            const remainRatio = Math.max(0, 1 - elapsedQuestionMs / QUESTION_TIME_LIMIT_MS);
            timerBar.style.width = `${remainRatio * 100}%`;
            
            // 現在の傾き方向を決定（センサー優先、なければ手動ボタン／キー）
            let desiredSide = null;
            if (manualLeftHeld && !manualRightHeld) {
                desiredSide = "left";
            } else if (manualRightHeld && !manualLeftHeld) {
                desiredSide = "right";
            } else if (sensorTiltDirection) {
                desiredSide = sensorTiltDirection;
            }
            
            if (desiredSide !== activeSide) {
                activeSide = desiredSide;
                holdProgressMs = 0;
            }
            
            if (activeSide === "left") {
                holdProgressMs = Math.min(HOLD_DURATION_MS, holdProgressMs + dt);
                const ratio = holdProgressMs / HOLD_DURATION_MS;
                choiceLeftBox.classList.add("active-tilt");
                choiceRightBox.classList.remove("active-tilt");
                ringLeft.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - ratio);
                ringRight.style.strokeDashoffset = RING_CIRCUMFERENCE;
                
                // トロッコを左へ動かしつつ左へ傾ける
                const moveX = -22 * ratio;
                const tiltDeg = -18 * ratio;
                cartWrapper.style.transform = `translateX(${moveX}px) rotate(${tiltDeg}deg)`;
                
                if (holdProgressMs >= HOLD_DURATION_MS) {
                    confirmChoice("left");
                    return;
                }
            } else if (activeSide === "right") {
                holdProgressMs = Math.min(HOLD_DURATION_MS, holdProgressMs + dt);
                const ratio = holdProgressMs / HOLD_DURATION_MS;
                choiceRightBox.classList.add("active-tilt");
                choiceLeftBox.classList.remove("active-tilt");
                ringRight.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - ratio);
                ringLeft.style.strokeDashoffset = RING_CIRCUMFERENCE;
                
                // トロッコを右へ動かしつつ右へ傾ける
                const moveX = 22 * ratio;
                const tiltDeg = 18 * ratio;
                cartWrapper.style.transform = `translateX(${moveX}px) rotate(${tiltDeg}deg)`;
                
                if (holdProgressMs >= HOLD_DURATION_MS) {
                    confirmChoice("right");
                    return;
                }
            } else {
                holdProgressMs = Math.max(0, holdProgressMs - dt * 2);
                choiceLeftBox.classList.remove("active-tilt");
                choiceRightBox.classList.remove("active-tilt");
                ringLeft.style.strokeDashoffset = RING_CIRCUMFERENCE;
                ringRight.style.strokeDashoffset = RING_CIRCUMFERENCE;
                cartWrapper.style.transform = "translateX(0px) rotate(0deg)";
            }
        }
        
        rafId = requestAnimationFrame(tick);
    }
    
    rafId = requestAnimationFrame(tick);
}

function stopGameLoop() {
    if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
}

// 選択肢確定・正誤判定
function confirmChoice(side) {
    if (isAnsweringLocked) return;
    isAnsweringLocked = true;
    stopGameLoop();
    
    const q = QUESTIONS[currentIndex];
    const chosenText = side === "left" ? currentPair[0] : currentPair[1];
    const isCorrect = chosenText === q.correctAnswer;
    
    judgeMark.classList.remove("hidden");
    
    if (isCorrect) {
        judgeSymbol.textContent = "〇";
        judgeSymbol.className = "judge-symbol correct";
        judgeSubtext.textContent = "正解！";
        explainResultTitle.textContent = "〇 大正解！";
    } else {
        missCount += 1;
        updateCartAppearance();
        judgeSymbol.textContent = "×";
        judgeSymbol.className = "judge-symbol wrong";
        judgeSubtext.textContent = "ビールがこぼれた…";
        explainResultTitle.textContent = `× 不正解（選んだ答え：${chosenText}）`;
    }
    
    explainBody.textContent = q.explanation;
    
    // 〇 / × 演出を見せてから解説オーバーレイを表示
    setTimeout(() => {
        explainOverlay.classList.remove("hidden");
    }, 850);
}

// 次の問題へ
nextQuestionBtn.addEventListener("click", () => {
    explainOverlay.classList.add("hidden");
    currentIndex += 1;
    
    if (currentIndex < QUESTIONS.length) {
        setupMapStage(currentIndex);
    } else {
        showResultScreen();
    }
});

// リザルト画面表示
function showResultScreen() {
    stopGameLoop();
    const correctCount = QUESTIONS.length - missCount;
    
    if (missCount === 0) {
        resultTitle.textContent = "🏆 完璧な輸送で半田駅に到着！";
        resultBeerVisual.textContent = "🍺🍺🍺 カブトビール満タン！";
    } else if (missCount <= 2) {
        resultTitle.textContent = "🍺 無事に半田駅に到着！";
        resultBeerVisual.textContent = missCount === 1 ? "🍺🍺 少し減ったけど到着！" : "🍺 ギリギリ到着！";
    } else {
        resultTitle.textContent = "💦 半田駅に到着…でもビールがピンチ！";
        resultBeerVisual.textContent = "🫗 ビールがほとんど残っていない…";
    }
    
    resultSummary.textContent =
    `全${QUESTIONS.length}問中 ${correctCount}問正解（ミス：${missCount}回）。` +
    `「${QUESTIONS[currentIndex - 1].title}」までの赤レンガの謎を駆け抜けました！`;
    
    showScreen("result");
}

// リトライ＆タイトルへ戻る
retryBtn.addEventListener("click", () => {
    resetAndStartGame();
});

backTitleBtn.addEventListener("click", () => {
    stopGameLoop();
    showScreen("title");
});

// 手動ボタン操作（マウス・タッチ長押し対応）
function bindHoldButton(btn, setter) {
    const down = (e) => {
        e.preventDefault();
        setter(true);
        btn.classList.add("pressed");
    };
    const up = () => {
        setter(false);
        btn.classList.remove("pressed");
    };
    
    btn.addEventListener("pointerdown", down);
    btn.addEventListener("pointerup", up);
    btn.addEventListener("pointerleave", up);
    btn.addEventListener("pointercancel", up);
}

bindHoldButton(holdLeftBtn, (v) => (manualLeftHeld = v));
bindHoldButton(holdRightBtn, (v) => (manualRightHeld = v));

// PCテスト用（左右矢印キー）
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") manualLeftHeld = true;
    if (e.key === "ArrowRight") manualRightHeld = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") manualLeftHeld = false;
    if (e.key === "ArrowRight") manualRightHeld = false;
});
