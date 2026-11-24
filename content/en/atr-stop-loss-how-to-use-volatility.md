---
id: atr-stop-loss-volatility
order: 13
title: "ATR Stop Loss: How to Use Volatility to Size Your Stop"
description: "How the Average True Range works, how to set an ATR stop loss with a multiplier, and how to turn that stop into a position size with a fixed risk."
date: "2026-11-24"
pillar: trading
coverAlt: "Abstract price line inside a widening and narrowing band of soft color"
---

A stop that fits a quiet market is a trap in a noisy one. Place it 50 cents below entry when the asset normally swings a dollar a day, and ordinary noise will take you out before your idea has a chance to work. Place it too far away in a calm market and you give back far more than the setup justifies. The Average True Range (ATR) solves this by measuring how much the market is actually moving right now, so your stop adapts to conditions instead of to a round number.

## What ATR measures

ATR was introduced by J. Welles Wilder in 1978. It answers one question: **how far does price typically travel in one bar?** It says nothing about direction. A rising ATR means bars are getting bigger; a falling ATR means the market is quieting down.

### True range, bar by bar

The building block is the true range (TR) of each bar, the largest of three distances:

- High − Low
- |High − Previous close|
- |Low − Previous close|

The last two matter because of gaps. If a market closes at 50.30 and opens the next day at 51.60, a simple high-low range ignores that jump. True range captures it.

| Bar | High | Low | Close | Prev. close | TR |
|---|---|---|---|---|---|
| 1 | 51.00 | 49.80 | 50.60 | 50.00 | 1.20 |
| 2 | 51.40 | 50.20 | 50.30 | 50.60 | 1.20 |
| 3 | 52.50 | 51.60 | 52.20 | 50.30 | 2.20 |
| 4 | 52.60 | 51.50 | 51.80 | 52.20 | 1.10 |
| 5 | 52.00 | 51.00 | 51.40 | 51.80 | 1.00 |

On bar 3 the high-low range is only 0.90, but the gap from the previous close makes the true range 2.20.

### From true range to ATR

ATR is an average of the last *n* true ranges. A simple average of the five bars above is (1.20 + 1.20 + 2.20 + 1.10 + 1.00) / 5 = **1.34**. Most platforms use Wilder's smoothing instead:

**ATR today = (ATR yesterday × (n − 1) + TR today) / n**

The conventional default is n = 14. Shorter periods react faster to volatility changes; longer ones are steadier. Whatever you pick, keep it consistent between testing and live trading.

## Setting an ATR stop

The rule is simple: **stop distance = k × ATR**, where k is a multiplier you choose.

- For a long: stop = entry − k × ATR
- For a short: stop = entry + k × ATR

Suppose you buy at 50.00, ATR(14) is 1.20, and you use k = 1.5. The stop distance is 1.5 × 1.20 = 1.80, so the stop sits at 48.20.

### Choosing the multiplier

There is no universally correct k. A small multiplier keeps losses small but gets hit more often by normal fluctuations; a large one survives noise but costs more when you are wrong. The right value depends on your timeframe, your holding period and your strategy, and the only honest way to choose it is to test it on your own data. Two practical checks help:

1. **Combine with structure.** ATR tells you how much room the market needs; the chart tells you where the idea is invalidated. If 1.5 × ATR lands just above an obvious support level, extend the stop to the other side of it rather than leaving it where stops cluster. Our guide on [stop loss placement](/en/blog/stop-loss-placement-where-to-put-it) covers invalidation levels in detail.
2. **Check the reward side.** A wider stop needs a proportionally larger target to keep the same risk-reward ratio. If the nearest realistic target is only 1 ATR away, a 2-ATR stop makes the trade unattractive.

## Turning the stop into a position size

This is where ATR becomes a risk tool rather than just an indicator. Fix the amount you are willing to lose per trade, then let the stop distance decide how many units you buy:

**Position size = (Account × Risk %) / Stop distance**

With a €10,000 account and 1% risk, the budget is €100. With a 1.80 stop distance: 100 / 1.80 = 55.5, rounded down to **55 units**, for an actual risk of 55 × 1.80 = €99.

Now volatility doubles and ATR rises to 2.40. The stop distance becomes 1.5 × 2.40 = 3.60, and the size becomes 100 / 3.60 = 27.7, so **27 units**, risking €97.20. The euro risk stays almost the same; only the size changes. That is the point: volatile markets automatically get smaller positions. The logic behind the fixed percentage is explained in our article on the [1% position sizing rule](/en/blog/position-sizing-one-percent-rule).

## ATR as a trailing stop

ATR also works for exits. A common approach is to trail the stop at the highest high since entry minus k × ATR for a long position (the reverse for a short). The stop only moves in your favor and widens or tightens with volatility. It will not catch the top of a move, but it gives a trend room to breathe without a fixed, arbitrary distance.

## Limits to keep in mind

- **ATR is in price units.** An ATR of 1.20 means nothing without knowing the price; compare assets with ATR as a percentage of price.
- **It looks backward.** ATR reflects past bars. A scheduled data release or an earnings report can produce a move far larger than recent ATR suggests.
- **Gaps skip stops.** A stop order does not guarantee the fill price. In a gap, the exit can be well beyond your level, so real losses can exceed the planned risk.
- **Costs count.** Spreads and commissions effectively shrink your stop distance; include them when sizing.
- **Leverage magnifies everything.** If you trade CFDs or forex with leverage, remember that most retail accounts lose money on these products. A volatility-based stop manages risk; it does not remove it.

## The bottom line

ATR turns a vague question, how much room should I give this trade, into a number you can calculate and test. Use true range to measure volatility, a multiplier to set the stop, structure to refine it, and a fixed risk percentage to size the position so every trade costs roughly the same when it fails.

**Plug your entry, ATR-based stop and risk percentage into the [position size calculator](/en/tools#position-size) before your next trade.**
