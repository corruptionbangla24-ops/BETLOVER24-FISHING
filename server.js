const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 🐟 ওরিজিনাল জিলি ফিশিং গভীর সমুদ্রের মেরিন মাশরুম ও ডাইনামিক মাল্টিপ্লায়ার ম্যাট্রিক্স
const fishConfigPool = {
    "NEMO_SMALL": { minOdds: 2, maxOdds: 4 },
    "TURTLE_SHIELD": { minOdds: 5, maxOdds: 12 },
    "OCTOPUS_INK": { minOdds: 15, maxOdds: 30 },
    "SHARK_HUNTER": { minOdds: 40, maxOdds: 80 },
    "GOLDEN_DRAGON": { minOdds: 100, maxOdds: 300 }, // মেগা গোল্ডেন ড্রাগন বস ৩০০ গুণ ওডস!
    "TREASURE_KING": { minOdds: 500, maxOdds: 500 }  // আলটিমেট ট্রেজার কিং ৫০০ গুণ ফিক্সড জ্যাকপট!
};

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/fishing-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. রিয়েল-টাইম বুলেট কস্ট রাউট (প্লেয়ার যখন প্রতিটি ট্রিগার চাপবে - বুলেট কস্ট কেটে নেওয়ার বর্ম ভাই ভাই)
app.post('/api/fishing-shoot', async (req, res) => {
    const { userId, bulletCost, wallet } = req.body;
    const targetWallet = wallet || "main";
    const cost = parseFloat(bulletCost) || 1;

    // 🔒 [বুলেট কস্ট ফিল্টার]: প্রতিটি কামানের গুলির কস্ট ১ টাকা থেকে ৫০০০ টাকা পর্যন্ত লক ভাই ভাই!
    if (cost < 1 || cost > 5000) {
        return res.json({ success: false, message: "🚨 Invalid Bullet Cost (৳১ - ৳৫০০০)" });
    }

    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: cost,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, message: "❌ Bullet Declined by Database!" });
    } catch (e) { return res.json({ success: false, message: "⚠️ Timeout!" }); }
});

// 🎯 ৩. বুলেট যখন মাছে হিট করবে - ওরিজিনাল ৯৫% ক্যাসিনো RTP ভ্যালিডেশন ও রিওয়ার্ড প্রসেসর চাবি
app.post('/api/fishing-hit', async (req, res) => {
    const { userId, fishType, bulletCost, wallet } = req.body;
    const targetWallet = wallet || "main";
    const originalBulletValue = parseFloat(bulletCost) || 1;

    if (!fishConfigPool[fishType]) {
        return res.json({ success: false, message: "🚨 Target Missing!" });
    }

    const currentFish = fishConfigPool[fishType];
    let isCaptured = false;
    let finalWinMultiplier = 0;

    // 🎰 [৯৫% ওরিজিনাল ক্যাসিনো RTP শুটিং ভ্যালিডেশন ম্যাথ লুপ ভাই ভাই]
    let hitRandomizer = Math.random();
    
    // ছোট মাছ সহজে মরবে, বড় ড্রাগন বস মারতে ৯৫% আরটিপি লুপ কন্ট্রোল ট্র্যাকে কড়া সিকিউরিটি থাকবে
    if (fishType === "NEMO_SMALL" && hitRandomizer <= 0.45) isCaptured = true;
    else if (fishType === "TURTLE_SHIELD" && hitRandomizer <= 0.25) isCaptured = true;
    else if (fishType === "OCTOPUS_INK" && hitRandomizer <= 0.12) isCaptured = true;
    else if (fishType === "SHARK_HUNTER" && hitRandomizer <= 0.05) isCaptured = true;
    else if (fishType === "GOLDEN_DRAGON" && hitRandomizer <= 0.015) isCaptured = true; // বস চান্স ১.৫% এ কড়া সুরক্ষায় লক!
    else if (fishType === "TREASURE_KING" && hitRandomizer <= 0.005) isCaptured = true; // আলটিমেট ৫০০ গুণ জ্যাকপট চান্স ০.৫%!

    if (isCaptured) {
        // ডাইনামিক ওッズ রেঞ্জ থেকে র্যান্ডম প্রফিট জেনারেটর চাবি
        finalWinMultiplier = Math.floor(Math.random() * (currentFish.maxOdds - currentFish.minOdds + 1)) + currentFish.minOdds;
    }

    if (!isCaptured || finalWinMultiplier <= 0) {
        return res.json({ success: true, captured: false, winAmount: 0 });
    }

    let calculatedWinAmount = parseFloat((originalBulletValue * finalWinMultiplier).toFixed(2));

    try {
        let phpPayload = {
            action: "win",
            username: userId,
            amount: calculatedWinAmount,
            wallet: targetWallet,
            bet_amount: originalBulletValue,
            multiplier: finalWinMultiplier.toFixed(2),
            status: "win",
            type: "win",
            is_win: 1,
            win_status: "win",
            log_status: "win"
        };

        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({
                success: true,
                captured: true,
                balance: response.data.balance,
                winAmount: calculatedWinAmount,
                odds: finalWinMultiplier
            });
        }
        return res.json({ success: false, message: "❌ Catch Sync Error!" });
    } catch (e) {
        return res.json({ success: false, message: "⚠️ Connection Timeout!" });
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });

io.on('connection', (socket) => { console.log("Player connected to Royal Jili Fishing Arcade!"); });

// জিলি ফিশিং কাস্টম ৭১০০ পোর্টে কড়া নিয়নে অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 7100; 
server.listen(PORT, () => { console.log(`🎡 Royal Jili Fishing Engine Running on port ${PORT}`); });
