---
id: stop-loss-placement
order: 9
title: "Stop Loss Placement: Where to Put It (and Where Not To)"
description: "Where to place a stop loss: invalidation point, structure, volatility and time. The most common mistakes and the formula that links stop to size."
date: "2026-11-20"
pillar: trading
coverAlt: "Abstract price line falling toward a dashed horizontal threshold"
---

The stop loss is the one part of a trade you commit to before you know how it will play out. Entries and targets can be adjusted along the way; a stop moved at the wrong moment turns a small, planned loss into real damage. Yet many traders pick it almost at random: a round number, a fixed percentage, or simply "what I can stomach losing". This guide covers what your stop placement should depend on, and which choices to avoid.

## What a stop loss is actually for

A stop is not an emotional brake. It is **the point where the trade idea is proven wrong**. If you buy because price is holding a support zone, the stop belongs where that support is considered broken. Once price gets there, the reason you entered no longer exists.

That gives you a strict order of operations:

1. Find the invalidation level on the chart.
2. Measure the distance between entry and stop.
3. Only then work out how many units to buy, based on the risk you accept.

Doing it backwards, starting from a maximum loss in dollars or euros and placing the stop to match, puts your level somewhere the market has no reason to respect.

## Where to put it: four criteria

### 1. Beyond structure

The most common reference is price structure: for a long, below the last meaningful swing low or support zone; for a short, above the last swing high or resistance. If you need a refresher, see our guide to [support, resistance and market structure](/en/blog/price-action-support-resistance-market-structure).

### 2. With a buffer

Support is a zone, not a precise line. A stop sitting exactly on the prior low often gets clipped by a minor wick before price moves on. Leaving room beyond the level, even just the spread plus a fraction of a typical candle's range, cuts down on exits caused by noise.

### 3. Scaled to volatility

A 50-cent stop can be generous on a quiet stock and absurdly tight on one that swings $3 a day. That is why many traders size the distance in multiples of **ATR** (Average True Range), the average range of recent sessions. We will cover it in a dedicated guide; for now, the principle is enough: your stop should sit outside the instrument's normal fluctuation on the timeframe you trade.

### 4. In time

There is also the **time stop**: if a trade has not done what you expected after a set number of bars, you exit. It does not replace a price stop, but it frees capital from positions going nowhere.

## Where not to put it

| Choice | Why it hurts |
| --- | --- |
| Exactly on a round number | Orders cluster there; price tends to reach it and overshoot slightly |
| Same fixed percentage on every trade (e.g. always -2%) | Ignores the instrument's structure and volatility |
| "What I'm willing to lose" in cash terms | The market doesn't know your account size: the level means nothing technically |
| Too tight, to flatter the risk/reward ratio | The ratio looks better on paper, but noise-driven exits pile up |
| Pushed further away as price approaches | Breaks the plan and grows the loss beyond what you budgeted |

A stop only ever moves **in your favour**: to breakeven or to lock in profit, never wider.

## Linking stop to size: the formula

Once the stop is set, position size follows:

**Units = Cash risk ÷ (Entry price − Stop price)**

Worked example: a €10,000 account, 1% risk = €100. Entry at €50.00, structural stop at €47.50. Distance = €2.50. Units = 100 ÷ 2.50 = **40 shares**.

If the correct stop were at €45.00, the distance would be €5.00 and the size 20 shares. Risk stays at €100 either way: the quantity changes, the maximum loss does not. It is the same logic as in our guide to [the 1% rule](/en/blog/position-sizing-one-percent-rule).

## Gaps and slippage: where stops fall short

A standard stop order becomes a market order once its price is hit. If the stock gaps below your level, say after an earnings release, the fill comes at the first available price, which can be much worse. A stop caps risk in normal conditions; it does not eliminate it. So it pays to:

- check the event calendar (earnings, macro data) before opening a position;
- consider a smaller size if you hold through a known event;
- understand the order types your broker offers and their conditions.

## The bottom line

Your stop belongs where the trade idea is invalidated, with a buffer beyond structure and a distance that respects volatility. Size comes afterwards, derived from that distance. Avoid round numbers, fixed percentages and stops widened mid-trade.

**[Work out the right size for your next stop with the position size calculator](/en/tools#position-size).**
