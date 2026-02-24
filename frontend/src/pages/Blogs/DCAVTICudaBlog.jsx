import BlogLayout from '../../layouts/BlogLayout'
import { BlogSection, BlogList, BlogLink, BlogImage, CodeBox } from '../../components/blog'
import VixTriggers from '../../assets/BlogImages/DCAVIXCuda/vix_triggers.png'
import WeeklyInvestment from '../../assets/BlogImages/DCAVIXCuda/weekly_investment.png'
import EquityCurves from '../../assets/BlogImages/DCAVIXCuda/equity_curves.png'
import RunningAdvantage from '../../assets/BlogImages/DCAVIXCuda/running_advantage.png'
import MonteCarlo from '../../assets/BlogImages/DCAVIXCuda/monte_carlo_roi.png'
import Timing from '../../assets/BlogImages/DCAVIXCuda/timing.png'

export default function DCAVIXCudaBlog() {
  return (
    <BlogLayout
      title="VIX Scaled Enhanced DCA Trading with Cuda Acceleration"
      description="Does buying more during market crashes actually beat a fixed weekly investment? 100,000 GPU-accelerated simulations find out."
      date="February, 2026"
      image={EquityCurves}
    >
      <BlogSection title="Introduction">
        <p><strong>Dollar-cost averaging (DCA)</strong> is the simplest long-term investing strategy: pick an amount, invest it on a fixed schedule, and never deviate regardless of what the market is doing. This has been proven to work very well.</p>
        <p>But there's a version of the same idea with one extra rule: when the market is in genuine freefall, buy more. Not because you're trying to time the bottom (you can't) but because you've committed in advance to being greedy when others are fearful. That's <strong>VIX-Enhanced DCA</strong>.</p>
        <BlogList items={[
          'VIX below 30: invest your normal weekly amount (1×)',
          'VIX at or above 30: invest double (2×)',
          'VIX at or above 40: invest triple (3×)',
        ]} />
        <p>The asset is <BlogLink href="https://investor.vanguard.com/investment-products/etfs/profile/vti">VTI</BlogLink> — Vanguard's Total Stock Market ETF, which holds over 3,500 US companies at a 0.03% annual fee. Using a single broad-market ETF means we're testing the strategy itself, not stock picking.</p>
      </BlogSection>

      <BlogSection title="What is the VIX?">
        <p>The VIX (CBOE Volatility Index) measures how much fear is priced into S&P 500 options over the next 30 days. A reading around 15 means calm markets. Above 30 signals real stress: major corrections, geopolitical shocks, economic crises. Above 40 is rare and typically coincides with full-blown crashes. The COVID crash of March 2020 sent it above 80.</p>
        <p>The hypothesis is simple: a high VIX means assets are temporarily cheaper due to fear, not fundamentals. If you believe in the long-run trajectory of the US market, those are exactly the moments you want to be buying more.</p>
        <p>Over the 10-year window (2016–2026), here's how often each threshold was hit:</p>
        <CodeBox language="Python" code={`df['multiplier'] = np.where(df['VIX'] >= 40, 3.0,
                   np.where(df['VIX'] >= 30, 2.0, 1.0))

weeks_above_30 = (df['VIX'] >= 30).sum()
weeks_above_40 = (df['VIX'] >= 40).sum()
print(f"Weeks VIX ≥ 30 : {weeks_above_30}  ({weeks_above_30/len(df)*100:.1f}%)")
print(f"Weeks VIX ≥ 40 : {weeks_above_40}  ({weeks_above_40/len(df)*100:.1f}%)")`} output={`Weeks VIX ≥ 30 : 29  (5.6%)
Weeks VIX ≥ 40 : 8   (1.5%)`} />
        <p>The 2× and 3× zones are rare: just 5.6% and 1.5% of weeks respectively. The chart below shows exactly when those spikes hit relative to VTI's price history.</p>
        <BlogImage src={VixTriggers} alt="VTI price with VIX trigger zones" caption="VTI price (yellow) overlaid with VIX levels and the 2×/3× trigger zones." />
        <p>You can see the two main spikes: COVID in early 2020 and a smaller stress period around the 2025 tariff introduction. Those are when the enhanced strategy adds extra capital, when prices are depressed.</p>
        <BlogImage src={WeeklyInvestment} alt="Weekly investment amount over time" caption="Weekly investment amount for each strategy. The spikes are the 2× and 3× buy-in weeks." />
      </BlogSection>

      <BlogSection title="Running 100,000 Simulations on a GPU">
        <p>Rather than test a single $100/week scenario, I ran 100,000 simulations simultaneously — one for every weekly investment amount between $50 and $2,000 — using a custom CUDA kernel written in C. This is the Monte Carlo component: see if the VIX strategy outperforms across the full range of investor budgets, not just one.</p>
        <p>The core CUDA concept is the <strong>kernel</strong>: a C function that runs not once but thousands of times simultaneously, each time on a different GPU thread with its own unique ID. Each thread handles exactly one simulation — one weekly investment amount — and runs the full 10-year loop independently.</p>
        <p>A few terms worth knowing before reading the code:</p>
        <BlogList items={[
          'Thread — the smallest unit of execution on a GPU. Each thread runs the same kernel but on different data.',
          'Block — a group of threads scheduled together. We use 256 threads per block.',
          'Grid — the full collection of all blocks. With 100,000 simulations our grid has enough blocks to cover every thread.',
          'Host / Device — host is the CPU and its RAM; device is the GPU and its own separate memory. Data must be explicitly copied between the two.',
        ]} />
        <CodeBox language="C" code={`__global__ void dca_kernel(
    const float* __restrict__ prices,
    const float* __restrict__ vix_mult,
    int    n_weeks,
    float  min_weekly_amt,
    float  amt_step,
    float* out_std_final,
    float* out_vix_final,
    float* out_std_invested,
    float* out_vix_invested
) {
    int sim_id = blockIdx.x * blockDim.x + threadIdx.x;
    float weekly_amt = min_weekly_amt + sim_id * amt_step;

    float shares_std = 0.0f;  float invested_std = 0.0f;
    float shares_vix = 0.0f;  float invested_vix = 0.0f;

    for (int w = 0; w < n_weeks; w++) {
        float price = prices[w];
        float mult  = vix_mult[w];

        shares_std   += weekly_amt / price;
        invested_std += weekly_amt;

        float vix_buy = weekly_amt * mult;
        shares_vix   += vix_buy / price;
        invested_vix += vix_buy;
    }

    float last_price = prices[n_weeks - 1];
    out_std_final[sim_id]    = shares_std * last_price;
    out_vix_final[sim_id]    = shares_vix * last_price;
    out_std_invested[sim_id] = invested_std;
    out_vix_invested[sim_id] = invested_vix;
}`} />
        <p>Each thread derives its weekly amount from its <code>sim_id</code>, then loops through all 522 weeks accumulating shares and dollars invested for both strategies. The kernel is compiled with <code>nvcc</code> and launched from Python via subprocess, with the price and VIX data passed as binary files.</p>
      </BlogSection>

      <BlogSection title="GPU vs CPU Performance">
        <p>The same 100,000 simulations were also run using NumPy on the CPU for a direct comparison. NumPy vectorizes well across the week dimension but still processes simulations in large sequential batches. The GPU runs all 100,000 simultaneously with no batching at all.</p>
        <CodeBox language="Python" code={`prices_2d = vti_prices[np.newaxis, :]      # (1, W)
amts_2d   = weekly_amounts[:, np.newaxis]  # (S, 1)

cpu_std_shares = (amts_2d / prices_2d).sum(axis=1)
vix_buys       = amts_2d * vix_mult[np.newaxis, :]
cpu_vix_shares = (vix_buys / prices_2d).sum(axis=1)`} output={`CPU total time         : 518.8 ms

Wall-clock speedup     : 0.5x faster on GPU
Kernel-only speedup   : 2.0x faster`} />
        <BlogImage src={Timing} alt="CPU vs GPU timing comparison" caption="GPU kernel is 2× faster in isolation, but total wall-clock time is slower due to I/O and memory transfer overhead." />
        <p>The result is more nuanced than a simple "GPU wins." The kernel itself runs in 261ms vs 519ms for NumPy — a genuine 2× speedup. But the total wall-clock time including subprocess startup, binary file I/O, and memory transfers between host and device brings the GPU total to 948ms.</p>
        <p>This is a common pitfall with GPU benchmarking: the raw compute advantage can be wiped out by transfer overhead unless your dataset is large enough or your kernel is complex enough to justify it. For 100,000 × 522-week simulations with simple arithmetic, NumPy's tight vectorization is competitive. Scale up to millions of simulations or more expensive per-week computations and the GPU advantage compounds significantly.</p>
      </BlogSection>

      <BlogSection title="Results">
        <p>For the base case of $100/week over 10 years:</p>
        <CodeBox language="Python" code={`print(f"  {'Metric':<28} {'Standard':>10} {'VIX-Enh':>10}")
print(f"  {'Total Invested ($)':<28} {52_200:>10,} {55_900:>10,}")
print(f"  {'Final Portfolio Value ($)':<28} {110_206:>10,} {118_721:>10,}")
print(f"  {'Profit ($)':<28} {58_006:>10,} {62_821:>10,}")
print(f"  {'ROI (%)':<28} {'111.1%':>10} {'112.4%':>10}")
print(f"  {'VIX-Enhanced Advantage':<28} {'→':>10} {'+$8,515':>10}")`} output={`  Metric                         Standard    VIX-Enh
  Total Invested ($)               52,200     55,900
  Final Portfolio Value ($)       110,206    118,721
  Profit ($)                       58,006     62,821
  ROI (%)                          111.1%     112.4%
  VIX-Enhanced Advantage                →     +8,515`} />
        <BlogImage src={EquityCurves} alt="Portfolio equity curves over 10 years" caption="Solid lines are portfolio value, dashed lines are total capital invested. The gap between them is profit." />
        <p>The VIX strategy ends $8,515 ahead on a $100/week base. It also invested $3,700 more in total across those high-VIX weeks, so the edge comes from deploying extra capital at below-average prices, not just by putting more money in unconditionally.</p>
        <BlogImage src={RunningAdvantage} alt="Running dollar advantage of VIX strategy" caption="Right after a VIX spike the enhanced strategy can briefly trail standard DCA, then pulls ahead as extra shares compound." />
        <p>The running advantage chart reveals something worth understanding: immediately after a VIX spike the enhanced strategy can actually fall behind standard DCA. You deployed 2× or 3× into what might still be a falling market. The advantage only materializes as recovery happens and those extra cheap shares compound. This requires conviction (and cash reserves) at exactly the moment fear is highest.</p>
        <BlogImage src={MonteCarlo} alt="ROI across 100,000 simulations" caption="VIX-enhanced strategy consistently outperforms standard DCA across every weekly investment amount from $50 to $2,000." />
        <p>Across all 100,000 simulations the VIX-enhanced strategy outperformed by an average of +1.26% ROI. The gap is consistent across every investment level, which confirms it's a structural advantage from buying at better prices — not a quirk of one particular budget size.</p>
      </BlogSection>

      <BlogSection title="Takeaways">
        <BlogList items={[
          'VIX-Enhanced DCA beats standard DCA, but only by ~1.3% ROI over 10 years. The edge is consistent, but modest.',
          'The extra capital requirement matters. You need liquidity reserves ready to deploy 2× or 3× during crashes, which is psychologically the hardest time to have cash sitting idle.',
          'GPU parallelism is powerful but not always faster end-to-end. For this problem size, memory transfer overhead neutralizes the kernel speedup. The GPU would dominate at much larger simulation counts or more expensive kernels.',
          'Pre-committing to rules removes the worst enemy: yourself. The multipliers are decided in advance, so there\'s nothing to second-guess when the market is down 30%.',
        ]} />
      </BlogSection>
    </BlogLayout>
  )
}