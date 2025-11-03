// State management
let walletState = {
    connected: false,
    walletType: null,
    address: null,
    balance: '0',
    network: null,
    isMobile: false
};

let tradingState = {
    virtualBalance: 10000,
    portfolio: {},
    tradeHistory: [],
    availableCoins: [
        { symbol: 'DOGE', name: 'Dogecoin', price: 0.15 },
        { symbol: 'SHIB', name: 'Shiba Inu', price: 0.000008 },
        { symbol: 'PEPE', name: 'Pepe Coin', price: 0.0000012 },
        { symbol: 'FLOKI', name: 'Floki Inu', price: 0.000025 },
        { symbol: 'BONK', name: 'Bonk', price: 0.000012 },
        { symbol: 'WIF', name: 'dogwifhat', price: 0.35 }
    ]
};

// Detect mobile device
function detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log('CypherX App Initialized');
    walletState.isMobile = detectMobile();
    initializeApp();
    setupMobileWalletOptions();
});

// Setup mobile-specific wallet options
function setupMobileWalletOptions() {
    if (!walletState.isMobile) return;
    
    const walletOptions = document.querySelector('.wallet-options');
    if (!walletOptions) return;
    
    // Replace desktop options with mobile-friendly ones
    walletOptions.innerHTML = `
        <div class="wallet-option" onclick="connectMobileWallet('metamask')">
            <div class="wallet-icon">🦊</div>
            <div class="wallet-info">
                <div class="wallet-name">MetaMask Mobile</div>
                <div class="wallet-desc">Open in MetaMask App</div>
            </div>
            <div class="wallet-badge">MOBILE</div>
        </div>
        
        <div class="wallet-option" onclick="connectMobileWallet('walletconnect')">
            <div class="wallet-icon">⚡</div>
            <div class="wallet-info">
                <div class="wallet-name">WalletConnect</div>
                <div class="wallet-desc">Scan QR Code</div>
            </div>
            <div class="wallet-badge">QR CODE</div>
        </div>
        
        <div class="wallet-option" onclick="connectMobileWallet('phantom')">
            <div class="wallet-icon">👻</div>
            <div class="wallet-info">
                <div class="wallet-name">Phantom Mobile</div>
                <div class="wallet-desc">Open in Phantom App</div>
            </div>
            <div class="wallet-badge">SOLANA</div>
        </div>
        
        <div class="wallet-option" onclick="simulateMobileConnection()">
            <div class="wallet-icon">🎮</div>
            <div class="wallet-info">
                <div class="wallet-name">Demo Mode</div>
                <div class="wallet-desc">Simulated Wallet for Testing</div>
            </div>
            <div class="wallet-badge">TEST</div>
        </div>
    `;
}

// Mobile wallet connection handlers
function connectMobileWallet(walletType) {
    if (walletType === 'metamask') {
        openMetaMaskMobile();
    } else if (walletType === 'walletconnect') {
        openWalletConnect();
    } else if (walletType === 'phantom') {
        openPhantomMobile();
    }
}

function openMetaMaskMobile() {
    // MetaMask mobile deep link
    const dappUrl = window.location.href;
    const metamaskUrl = `https://metamask.app.link/dapp/${encodeURIComponent(dappUrl)}`;
    
    // Try to open MetaMask app
    window.location.href = metamaskUrl;
    
    // Fallback: show instructions
    setTimeout(() => {
        showMobileInstructions('metamask');
    }, 2000);
}

function openWalletConnect() {
    showMobileInstructions('walletconnect');
}

function openPhantomMobile() {
    // Phantom mobile deep link
    const dappUrl = window.location.href;
    const phantomUrl = `https://phantom.app/ul/browse/${encodeURIComponent(dappUrl)}`;
    
    window.location.href = phantomUrl;
    
    setTimeout(() => {
        showMobileInstructions('phantom');
    }, 2000);
}

function showMobileInstructions(walletType) {
    const messages = {
        metamask: `
            📱 <strong>MetaMask Mobile Setup</strong><br><br>
            1. Install MetaMask app from App Store/Play Store<br>
            2. Open this link in MetaMask browser<br>
            3. Or copy this URL and paste in MetaMask<br><br>
            <em>For demo, use "Demo Mode" below</em>
        `,
        walletconnect: `
            📱 <strong>WalletConnect Setup</strong><br><br>
            1. Open your wallet app<br>
            2. Tap "Connect" or "WalletConnect"<br>
            3. Scan QR code (desktop required)<br><br>
            <em>WalletConnect requires QR code scanning</em>
        `,
        phantom: `
            📱 <strong>Phantom Mobile Setup</strong><br><br>
            1. Install Phantom app from App Store<br>
            2. Open this link in Phantom browser<br>
            3. Approve the connection request<br><br>
            <em>For demo, use "Demo Mode" below</em>
        `
    };
    
    alert(messages[walletType] || 'Mobile wallet connection required');
}

// Demo mode for mobile testing
function simulateMobileConnection() {
    // Generate a realistic demo wallet
    const demoWallets = [
        {
            address: '0x742d35Cc6634C0532925a3b8Dc2B1c1d1E1a3f7c',
            balance: '1.25',
            network: 'Ethereum Mainnet',
            type: 'demo'
        },
        {
            address: '0x8912d3f5a6c8e7b4c1a2d3e4f5a6b7c8d9e0f1a2', 
            balance: '3.42',
            network: 'Polygon Mainnet',
            type: 'demo'
        },
        {
            address: 'PhantomDemo1234567890ABCDEF',
            balance: '15.75',
            network: 'Solana Mainnet',
            type: 'demo'
        }
    ];
    
    const randomWallet = demoWallets[Math.floor(Math.random() * demoWallets.length)];
    
    walletState = {
        connected: true,
        walletType: 'demo',
        address: randomWallet.address,
        balance: randomWallet.balance,
        network: randomWallet.network,
        isMobile: true
    };
    
    updateWalletUI();
    showSection('dashboard');
    
    // Show success message
    setTimeout(() => {
        alert(`✅ Demo wallet connected!\n\nAddress: ${randomWallet.address.substring(0, 10)}...\nBalance: ${randomWallet.balance} ${randomWallet.network.includes('Solana') ? 'SOL' : 'ETH'}\n\nThis is a simulated wallet for testing.`);
    }, 500);
}

// Enhanced wallet connection for desktop
async function connectMetaMask() {
    if (walletState.isMobile) {
        openMetaMaskMobile();
        return;
    }
    
    if (typeof window.ethereum === 'undefined') {
        alert('MetaMask not detected! Please install MetaMask first.');
        return;
    }

    try {
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        if (accounts.length === 0) {
            throw new Error('No accounts found');
        }

        const address = accounts[0];
        
        // Get real balance and network info
        let balance = '0';
        let network = 'Ethereum Mainnet';
        
        try {
            const web3 = new Web3(window.ethereum);
            const balanceWei = await web3.eth.getBalance(address);
            balance = web3.utils.fromWei(balanceWei, 'ether');
            
            const chainId = await web3.eth.getChainId();
            network = getNetworkName(chainId);
        } catch (error) {
            console.log('Using demo data for balance');
            balance = (Math.random() * 5 + 0.1).toFixed(4);
        }
        
        walletState = {
            connected: true,
            walletType: 'metamask',
            address: address,
            balance: balance,
            network: network,
            isMobile: false
        };

        updateWalletUI();
        showSection('dashboard');
        
    } catch (error) {
        alert('MetaMask connection failed: ' + error.message);
    }
}

function getNetworkName(chainId) {
    const networks = {
        1: 'Ethereum Mainnet',
        5: 'Goerli Testnet', 
        137: 'Polygon Mainnet',
        56: 'BNB Smart Chain',
        42161: 'Arbitrum One',
        10: 'Optimism'
    };
    return networks[chainId] || `Network (${chainId})`;
}

// Update Wallet UI
function updateWalletUI() {
    if (!walletState.connected) return;

    const currency = walletState.network.includes('Solana') ? 'SOL' : 'ETH';
    
    document.getElementById('wallet-address').textContent = 
        `${walletState.address.substring(0, 6)}...${walletState.address.substring(walletState.address.length - 4)}`;
    document.getElementById('wallet-balance').textContent = `${walletState.balance} ${currency}`;

    document.getElementById('real-balance').textContent = `${walletState.balance} ${currency}`;
    document.getElementById('network-name').textContent = walletState.network;
    document.getElementById('network-dot').style.background = '#10b981';

    document.getElementById('wallet-connected').classList.remove('hidden');
    document.getElementById('connect-wallet-btn').classList.add('hidden');
    document.getElementById('wallet-connect').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
    document.getElementById('bottom-nav').classList.remove('hidden');

    updateTradingUI();
}

// Disconnect Wallet
function disconnectWallet() {
    walletState = {
        connected: false,
        walletType: null,
        address: null,
        balance: '0',
        network: null,
        isMobile: detectMobile()
    };

    document.getElementById('wallet-connected').classList.add('hidden');
    document.getElementById('connect-wallet-btn').classList.remove('hidden');
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('wallet-connect').classList.add('active');
    document.getElementById('bottom-nav').classList.add('hidden');

    tradingState.virtualBalance = 10000;
    tradingState.portfolio = {};
    tradingState.tradeHistory = [];
    
    updateTradingUI();
}

// Trading Functions (keep from previous version)
function setupTradingInterface() {
    const container = document.getElementById('coins-grid');
    if (!container) return;
    
    container.innerHTML = tradingState.availableCoins.map(coin => `
        <div class="trade-btn buy" onclick="executeTrade('BUY', '${coin.symbol}')">
            📈 BUY ${coin.symbol}
        </div>
        <div class="trade-btn sell" onclick="executeTrade('SELL', '${coin.symbol}')">
            📉 SELL ${coin.symbol}
        </div>
    `).join('');
}

function executeTrade(action, coinSymbol) {
    if (!walletState.connected) {
        alert('Please connect your wallet first!');
        showSection('wallet-connect');
        return;
    }

    const coin = tradingState.availableCoins.find(c => c.symbol === coinSymbol);
    if (!coin) return;

    const amount = Math.floor(Math.random() * 500) + 10;
    const cost = amount * coin.price;

    if (action === 'BUY') {
        if (cost > tradingState.virtualBalance) {
            alert('Insufficient virtual balance');
            return;
        }
        tradingState.virtualBalance -= cost;
        if (!tradingState.portfolio[coinSymbol]) {
            tradingState.portfolio[coinSymbol] = { amount: 0, cost: 0 };
        }
        tradingState.portfolio[coinSymbol].amount += amount;
        tradingState.portfolio[coinSymbol].cost += cost;
    } else {
        if (!tradingState.portfolio[coinSymbol] || tradingState.portfolio[coinSymbol].amount < amount) {
            alert('Insufficient coins');
            return;
        }
        const revenue = amount * coin.price;
        tradingState.virtualBalance += revenue;
        tradingState.portfolio[coinSymbol].amount -= amount;
    }

    const trade = {
        coin: coinSymbol,
        action: action,
        amount: amount,
        price: coin.price,
        time: new Date().toLocaleTimeString(),
        signal: 'AI Trade Executed'
    };
    
    tradingState.tradeHistory.push(trade);
    simulateMarketMove();
    updateTradingUI();
    
    alert(`✅ ${action} ${amount} ${coinSymbol} @ $${coin.price.toFixed(8)}`);
}

function updateTradingUI() {
    document.getElementById('virtual-balance').textContent = `$${tradingState.virtualBalance.toFixed(2)}`;

    const portfolioValue = calculatePortfolioValue();
    document.getElementById('portfolio-value').textContent = `$${portfolioValue.toFixed(2)}`;

    const pnl = portfolioValue - 10000;
    document.getElementById('pnl').textContent = `${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)}`;
    document.getElementById('pnl').style.color = pnl >= 0 ? '#10b981' : '#ef4444';

    document.getElementById('total-trades').textContent = tradingState.tradeHistory.length;

    updateRecentTrades();
}

function calculatePortfolioValue() {
    let total = tradingState.virtualBalance;
    for (const [symbol, position] of Object.entries(tradingState.portfolio)) {
        const coin = tradingState.availableCoins.find(c => c.symbol === symbol);
        if (coin) {
            total += position.amount * coin.price;
        }
    }
    return total;
}

function updateRecentTrades() {
    const container = document.getElementById('recent-trades');
    const recentTrades = tradingState.tradeHistory.slice(-5).reverse();

    if (recentTrades.length === 0) {
        container.innerHTML = '<div class="no-trades">No trades yet</div>';
        return;
    }

    container.innerHTML = recentTrades.map(trade => `
        <div class="trade-item">
            <div class="trade-info">
                <span class="trade-action ${trade.action.toLowerCase()}">${trade.action}</span>
                <span class="trade-amount">${trade.amount} ${trade.coin}</span>
            </div>
            <div class="trade-price">$${trade.price.toFixed(8)}</div>
        </div>
    `).join('');
}

function simulateMarketMove() {
    tradingState.availableCoins.forEach(coin => {
        const change = (Math.random() * 0.4 - 0.15);
        coin.price *= (1 + change);
        coin.price = Math.max(coin.price, 0.0000001);
    });
}

function generateRandomTrade() {
    if (!walletState.connected || tradingState.availableCoins.length === 0) return;
    
    const coin = tradingState.availableCoins[Math.floor(Math.random() * tradingState.availableCoins.length)];
    const action = Math.random() > 0.5 ? 'BUY' : 'SELL';
    executeTrade(action, coin.symbol);
}

// UI Functions
function showSection(sectionId) {
    if (!walletState.connected && sectionId !== 'wallet-connect') {
        showSection('wallet-connect');
        return;
    }

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (sectionId === 'dashboard') {
        document.querySelector('.nav-btn:nth-child(1)').classList.add('active');
    } else if (sectionId === 'portfolio') {
        document.querySelector('.nav-btn:nth-child(2)').classList.add('active');
    } else if (sectionId === 'wallet-info') {
        document.querySelector('.nav-btn:nth-child(3)').classList.add('active');
    }
}

function updateSignal() {
    const signals = [
        "🔴 Twitter Trend Detected",
        "🔵 TikTok Viral Signal", 
        "🟢 Reddit Hype Building",
        "🟡 Influencer Mention",
        "🟣 Community Pump Signal"
    ];
    const randomSignal = signals[Math.floor(Math.random() * signals.length)];
    
    const tradeSignal = document.getElementById('trade-signal');
    const currentSignal = document.getElementById('current-signal');
    
    if (tradeSignal) tradeSignal.textContent = randomSignal;
    if (currentSignal) currentSignal.textContent = randomSignal;
}

// Initialize trading when app starts
function initializeApp() {
    console.log('Setting up trading interface...');
    setupTradingInterface();
    updateTradingUI();
    updateSignal();
    
    // Auto-update signals
    setInterval(updateSignal, 10000);
    
    console.log('CypherX App Ready!');
}

// Handle other wallet types
function connectWalletConnect() {
    if (walletState.isMobile) {
        openWalletConnect();
    } else {
        alert('WalletConnect requires mobile app or QR code scanning');
    }
}

function connectCoinbaseWallet() {
    alert('Coinbase Wallet integration coming soon!');
}

function connectPhantom() {
    if (walletState.isMobile) {
        openPhantomMobile();
    } else {
        alert('Phantom browser extension required for desktop');
    }
}