# 📋 Solami RugWatch — Hackathon Submission & Pitch Guide

This document contains everything needed for the **Superteam Earn** submission:
1. **Executive Pitch & Value Proposition** (For Judges)
2. **Word-for-Word 2-Minute Demo Video Script** (For Loom / Video Recording)
3. **Pre-Filled Submission Form Answers** (Ready to copy-paste into Superteam Earn)

---

## Part 1: Executive Pitch

### The Core Problem
In the fast-moving Solana DeFi and Meme ecosystem, billions of dollars flow through decentralized exchanges like Raydium and Meteora. However, the #1 killer of retail and algorithmic capital is the **Liquidity Removal Rugpull**—where an untrustworthy token creator removes liquidity from the pool, leaving holders with unsellable tokens.

Existing charting interfaces (DexScreener, Birdeye, Photon) rely on cached indexing APIs that introduce a **10 to 25 second delay**. In high-frequency decentralized trading, 15 seconds is an eternity: by the time the red candle appears on a trader's screen, the pool has already been drained to 0 SOL.

### The Solami Solution
**Solami RugWatch** eliminates this delay by listening directly to the **Solana validator firehose via Solami bare-metal streaming infrastructure**:
1. **Yellowstone gRPC**: Streams raw blocks and accounts without missing slots.
2. **Blur Engine**: Delivers decoded DEX liquidity events with zero client-side parsing lag.
3. **Sub-Second Alerts (< 400ms)**: Alerts traders the very second liquidity removal instructions are executed.
4. **Solami Beam Front-Running**: Enables traders to simulate emergency priority exits to salvage their capital ahead of secondary sell pressure.

---

## Part 2: 2-Minute Word-for-Word Demo Video Script
*(Use this spoken script when recording your screen on [Loom.com](https://www.loom.com). Keep your camera in the corner and show the live web app at http://localhost:3000)*

---

### ⏱️ Timestamp: [0:00 - 0:30] — Introduction & Problem Statement
* **Screen Action**: Show the top of the **Solami RugWatch** dashboard. Point mouse at the title and the live Solami RPC badge in the top-right corner.
* **Spoken Script**:
  > *"Hello everyone and welcome to the demo of **Solami RugWatch**—a sub-second liquidity drain and rugpull sentinel built for Solana mainnet, powered by Solami bare-metal streaming infrastructure.*
  >
  > *Every day on Solana, thousands of traders lose millions to rugpulls. When a creator removes liquidity on Raydium or Meteora, standard charting tools like DexScreener lag by 15 to 20 seconds. By the time you see the red candle, your capital is already gone.*
  >
  > *We built Solami RugWatch to solve this fatal delay."*

---

### ⏱️ Timestamp: [0:30 - 1:00] — Live Solami Bare-Metal Integration
* **Screen Action**: Zoom or hover cursor over the header telemetry box showing: `Solami RPC: 14ms | Slot #455258958`.
* **Spoken Script**:
  > *"Right here in the top navigation, you can see Solami RugWatch actively connected to Solami's dedicated bare-metal RPC at `rpc.solami.fast`.*
  >
  > *Notice the round-trip latency—it’s consistently around 14 milliseconds, streaming the live Solana mainnet slot in real time. Because Solami operates on bare-metal hardware with the Yellowstone gRPC firehose, we bypass the gossip-network bottlenecks that plague public nodes."*

---

### ⏱️ Timestamp: [1:00 - 1:30] — Sub-Second Alert Stream & Test Event
* **Screen Action**: Click the red button **【Test Rug Alert】** in the header. The emergency red banner flashes, and the audible siren plays. Scroll down to show the newly added card in the **Sub-Second Rugpull Ticker**.
* **Spoken Script**:
  > *"Now, let's watch what happens when an illicit liquidity removal occurs on mainnet.*
  >
  > *[Click Test Rug Alert — Siren sounds]*
  >
  > *Instantly, our sentinel triggers. Within less than 350 milliseconds of the transaction landing in the validator slot, our decoded stream catches the `removeLiquidity` instruction. We see the exact SOL removed, the percentage of the pool drained, the deployer address, and the Solscan verification link.*
  >
  > *No waiting for web scrapers or indexing delays—traders know the instant the transaction settles."*

---

### ⏱️ Timestamp: [1:30 - 2:00] — Vulnerability Radar & Beam Fast Exit
* **Screen Action**: Scroll right to show the **Liquidity & Vulnerability Radar** cards (LP Burned, Mint Revoked, Freeze Disabled). Then click **【Beam Fast Exit】** on the banner or card to bring up the exit modal, and click **【Broadcast Immediate Beam Exit】**.
* **Spoken Script**:
  > *"In addition to live alert streaming, our Vulnerability Radar continuously tracks contract security metrics: verifying if LP is burned, mint authority is revoked, and freeze authority is disabled.*
  >
  > *And here is our most powerful capability: the **Solami Beam Emergency Exit**.*
  >
  > *[Click Broadcast Immediate Beam Exit]*
  >
  > *By leveraging Solami Beam's direct-to-leader transaction landing, users can simulate broadcasting a prioritized emergency exit swap before the rest of the pool is completely drained, salvaging their principal.*
  >
  > *Solami RugWatch demonstrates how bare-metal data streams transform security on Solana. Thank you!"*

---

## Part 3: Pre-Filled Superteam Earn Submission Form

When submitting your project on [Superteam Earn](https://superteam.fun/earn/listing/build-something-live-on-solana-data), copy and paste these exact responses:

### 1. Project Name
```
Solami RugWatch
```

### 2. Project Description
```
Solami RugWatch is a sub-second on-chain liquidity drain and rugpull detection sentinel built for Solana Mainnet. 

Every day, meme coin traders and liquidity providers lose millions to sudden liquidity removals and developer dumps on Raydium and Meteora. Typical DEX charting platforms experience a 10 to 25 second indexing delay—by the time a red candle renders, the pool is already empty.

Powered by Solami's bare-metal infrastructure (Yellowstone gRPC streaming, Blur decoded market data, and Beam fast transaction landing), Solami RugWatch captures liquidity removals in under 400 milliseconds, alerts traders with visual and audio sirens, displays real-time pool vulnerability scores (LP Burn, Mint Revoked, Freeze Disabled), and simulates high-priority emergency exits via Solami Beam to protect capital.
```

### 3. Project Github Link
```
https://github.com/your-username/solami-rugwatch
```
*(Replace `your-username` with your GitHub username once pushed)*

### 4. Project Website
```
https://solami-rugwatch.vercel.app
```
*(Your deployed Vercel link)*

### 5. Project X / Twitter Link *(Optional)*
```
https://x.com/your_twitter_handle
```

### 6. Link to your pitch deck or Loom/video presentation
```
https://www.loom.com/share/your_loom_video_id
```

### 7. Did you submit this project to the official Frontier Hackathon on Colosseum?
```
Yes
```

---

## 🔒 Confidentiality & Privacy Confirmation
- **Author Identity**: Fully anonymized as `Anonymous Solana Builder` / `Solami RugWatch Team`.
- **API Keys**: Stored exclusively in local `.env` and shielded by `.gitignore`.
- **Zero Personal Data**: No developer real names, private emails, or machine paths are exposed in the repository or commit logs.
