import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

type Tab = "conversion" | "churn" | "support" | "devtime";

const tabs: { id: Tab; label: string }[] = [
  { id: "conversion", label: "Conversion" },
  { id: "churn", label: "Churn" },
  { id: "support", label: "Support" },
  { id: "devtime", label: "Dev Time" },
];

function InputRow({
  label, value, onChange, prefix, suffix, jurnyEstimate,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  jurnyEstimate?: string;
}) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-border/40 last:border-0">
      <div className="flex items-center w-52 flex-shrink-0 pt-1.5">
        <span className="text-xs text-foreground/60">{label}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden focus-within:ring-1 focus-within:ring-primary/40 transition-all">
          {prefix && (
            <span className="px-2.5 py-1.5 bg-secondary text-foreground/40 text-xs border-r border-border">
              {prefix}
            </span>
          )}
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-2.5 py-1.5 bg-transparent text-foreground text-sm font-medium outline-none min-w-0"
          />
          {suffix && (
            <span className="px-2.5 py-1.5 bg-secondary text-foreground/40 text-xs border-l border-border">
              {suffix}
            </span>
          )}
        </div>
        {jurnyEstimate && (
          <div className="flex items-center gap-1 mt-1">
            <Sparkles className="h-2.5 w-2.5 text-primary-glow flex-shrink-0" />
            <span className="text-[10px] text-primary-glow leading-tight">{jurnyEstimate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 bg-secondary/60 rounded-xl px-4 py-3 text-center">
      <p className="text-[11px] text-foreground/50 mb-0.5">{label}</p>
      <p className="text-lg font-bold text-foreground tracking-tight">{value}</p>
    </div>
  );
}

function fmt(n: number, decimals = 0) {
  if (!isFinite(n) || isNaN(n)) return "—";
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// compounding=true: each month adds a new cohort of customers who keep paying
// (conversion, churn). compounding=false: flat monthly saving (support, dev time).
// Month 1 is always the implementation phase — no returns yet.
function buildChartData(monthlyValue: number, cost: number, compounding: boolean) {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    if (month === 1) {
      return { month: `Mo 1`, value: 0, breakEven: false, setup: true };
    }
    const n = month - 1; // active months after implementation
    const cumulative = compounding
      ? Math.round(monthlyValue * (n * (n + 1)) / 2)
      : Math.round(monthlyValue * n);
    return {
      month: `Mo ${month}`,
      value: cumulative,
      breakEven: cost > 0 && cumulative >= cost,
      setup: false,
    };
  });
}

function calcBreakEven(monthlyValue: number, cost: number, compounding: boolean): number | null {
  if (monthlyValue <= 0 || cost <= 0) return null;
  if (compounding) {
    // solve n(n+1)/2 * mv >= cost  →  n = ceil((-1 + sqrt(1 + 8*cost/mv)) / 2)
    const n = Math.ceil((-1 + Math.sqrt(1 + (8 * cost) / monthlyValue)) / 2);
    return n + 1; // +1 for implementation month
  }
  return Math.ceil(cost / monthlyValue) + 1; // +1 for implementation month
}

const PURPLE = "hsl(263, 70%, 62%)";
const MUTED = "hsl(210, 20%, 88%)";
const SETUP = "hsl(210, 15%, 93%)";

function ROIChart({
  monthlyValue,
  cost,
  valueLabel,
  compounding,
}: {
  monthlyValue: number;
  cost: number;
  valueLabel: string;
  compounding: boolean;
}) {
  const data = buildChartData(monthlyValue, cost, compounding);
  const breakEvenMonth = calcBreakEven(monthlyValue, cost, compounding);
  const yr1Total = data[11].value;
  const maxVal = Math.max(yr1Total, cost) * 1.2 || 1;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">
          Cumulative {valueLabel} — 12 months
        </p>
        {breakEvenMonth && breakEvenMonth <= 12 ? (
          <span className="text-[11px] bg-primary/10 text-primary-glow font-semibold px-2.5 py-1 rounded-full">
            Break-even: month {breakEvenMonth}
          </span>
        ) : (
          <span className="text-[11px] bg-secondary text-foreground/40 font-medium px-2.5 py-1 rounded-full">
            Break-even: &gt;12 mo
          </span>
        )}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barSize={18}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 40% 92%)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "hsl(215 16% 55%)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(215 16% 55%)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
            domain={[0, maxVal]}
            width={44}
          />
          <RechartsTooltip
            formatter={(val: number, _name: string, props: { payload?: { setup?: boolean } }) =>
              props.payload?.setup ? ["Implementation phase", ""] : [`$${fmt(val)}`, valueLabel]
            }
            labelStyle={{ fontSize: 11 }}
            contentStyle={{
              borderRadius: 10,
              border: "1px solid hsl(210 40% 90%)",
              fontSize: 12,
            }}
            cursor={{ fill: "hsl(210 40% 96%)" }}
          />
          {cost > 0 && (
            <ReferenceLine
              y={cost}
              stroke="hsl(215 16% 60%)"
              strokeDasharray="5 3"
              strokeWidth={1.5}
            />
          )}
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.setup ? SETUP : entry.breakEven ? PURPLE : MUTED}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: SETUP }} />
          <span className="text-[10px] text-foreground/40">Implementation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: MUTED }} />
          <span className="text-[10px] text-foreground/40">Paying off investment</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: PURPLE }} />
          <span className="text-[10px] text-foreground/40">Pure return</span>
        </div>
      </div>

      <div className="mt-3 bg-primary/5 border border-primary/15 rounded-xl px-3 py-2.5">
        <p className="text-xs text-foreground/55 leading-relaxed">
          Month 1 reflects onboarding. From month 2, your improved product delivers consistent gains — the dashed line shows your total annual subscription cost.
        </p>
      </div>
    </div>
  );
}

// ── Conversion ───────────────────────────────────────────────────
function ConversionTab() {
  const [signups, setSignups] = useState("2000");
  const [arpu, setArpu] = useState("300");
  const [improvement, setImprovement] = useState("0.5");
  const [cost, setCost] = useState("1000");

  const s = parseFloat(signups) || 0;
  const a = parseFloat(arpu) || 0;
  const imp = parseFloat(improvement) || 0;
  const c = parseFloat(cost) || 0;
  const annualCost = c * 12;

  const extraPerMonth = s * (imp / 100);
  const monthlyRevenue = extraPerMonth * a;
  const yr1Cumulative = monthlyRevenue * 12;
  const roi = annualCost > 0 ? ((yr1Cumulative - annualCost) / annualCost) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <InputRow label="Monthly visitors" value={signups} onChange={setSignups} />
        <InputRow label="ARPU (monthly per customer)" value={arpu} onChange={setArpu} prefix="$" />
        <InputRow
          label="Conversion lift from CX focus"
          value={improvement}
          onChange={setImprovement}
          suffix="%"
          jurnyEstimate="Jurny customers typically see 0.5–2% higher conversion vs. teams not optimizing CX"
        />
        <InputRow label="Monthly Cost" value={cost} onChange={setCost} prefix="$" suffix="/mo" />
      </div>
      <div className="flex flex-col gap-4">
        <ROIChart monthlyValue={monthlyRevenue} cost={annualCost} valueLabel="Added Revenue" compounding={false} />
        <div className="flex gap-2">
          <MetricPill label="Yr 1 Added Revenue" value={`$${fmt(yr1Cumulative)}`} />
          <MetricPill label="Extra customers / mo" value={fmt(extraPerMonth, 1)} />
          <MetricPill label="ROI" value={`${fmt(roi)}%`} />
        </div>
      </div>
    </div>
  );
}

// ── Churn ────────────────────────────────────────────────────────
function ChurnTab() {
  const [customers, setCustomers] = useState("5000");
  const [churnRate, setChurnRate] = useState("4");
  const [arpu, setArpu] = useState("300");
  const [reduction, setReduction] = useState("25");
  const [cost, setCost] = useState("1000");

  const c = parseFloat(customers) || 0;
  const cr = parseFloat(churnRate) || 0;
  const a = parseFloat(arpu) || 0;
  const r = parseFloat(reduction) || 0;
  const cost_ = parseFloat(cost) || 0;
  const annualCost = cost_ * 12;

  const retainedPerMonth = c * (cr / 100) * (r / 100);
  const monthlySaved = retainedPerMonth * a;
  const yr1Cumulative = monthlySaved * 12;
  const roi = annualCost > 0 ? ((yr1Cumulative - annualCost) / annualCost) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <InputRow label="Monthly active customers" value={customers} onChange={setCustomers} />
        <InputRow label="Monthly churn rate" value={churnRate} onChange={setChurnRate} suffix="%" />
        <InputRow label="ARPU (monthly per customer)" value={arpu} onChange={setArpu} prefix="$" />
        <InputRow
          label="Expected churn reduction"
          value={reduction}
          onChange={setReduction}
          suffix="%"
          jurnyEstimate="Jurny customers typically reduce churn by 20–30%"
        />
        <InputRow label="Monthly Cost" value={cost} onChange={setCost} prefix="$" suffix="/mo" />
      </div>
      <div className="flex flex-col gap-4">
        <ROIChart monthlyValue={monthlySaved} cost={annualCost} valueLabel="Saved Revenue" compounding={false} />
        <div className="flex gap-2">
          <MetricPill label="Yr 1 saved" value={`$${fmt(yr1Cumulative)}`} />
          <MetricPill label="Retained / mo" value={fmt(retainedPerMonth, 1)} />
          <MetricPill label="ROI" value={`${fmt(roi)}%`} />
        </div>
      </div>
    </div>
  );
}

// ── Support ──────────────────────────────────────────────────────
function SupportTab() {
  const [tickets, setTickets] = useState("2000");
  const [costPerTicket, setCostPerTicket] = useState("25");
  const [reduction, setReduction] = useState("30");
  const [projectCost, setProjectCost] = useState("1000");

  const t = parseFloat(tickets) || 0;
  const cpt = parseFloat(costPerTicket) || 0;
  const r = parseFloat(reduction) || 0;
  const pc = parseFloat(projectCost) || 0;
  const annualCost = pc * 12;

  const fewerPerMonth = t * (r / 100);
  const monthlySaved = fewerPerMonth * cpt;
  const yr1Cumulative = monthlySaved * 12;
  const roi = annualCost > 0 ? ((yr1Cumulative - annualCost) / annualCost) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <InputRow label="Monthly support tickets" value={tickets} onChange={setTickets} />
        <InputRow label="Cost per ticket" value={costPerTicket} onChange={setCostPerTicket} prefix="$" />
        <InputRow
          label="Expected ticket reduction"
          value={reduction}
          onChange={setReduction}
          suffix="%"
          jurnyEstimate="Jurny customers typically cut support volume by 20–35%"
        />
        <InputRow label="Monthly Cost" value={projectCost} onChange={setProjectCost} prefix="$" suffix="/mo" />
      </div>
      <div className="flex flex-col gap-4">
        <ROIChart monthlyValue={monthlySaved} cost={annualCost} valueLabel="Saved" compounding={false} />
        <div className="flex gap-2">
          <MetricPill label="Yr 1 saved" value={`$${fmt(yr1Cumulative)}`} />
          <MetricPill label="Fewer tickets / mo" value={fmt(fewerPerMonth, 0)} />
          <MetricPill label="ROI" value={`${fmt(roi)}%`} />
        </div>
      </div>
    </div>
  );
}

// ── Dev Time ─────────────────────────────────────────────────────
function DevTimeTab() {
  const [devs, setDevs] = useState("10");
  const [rate, setRate] = useState("150");
  const [hoursSaved, setHoursSaved] = useState("15");
  const [projectCost, setProjectCost] = useState("1000");

  const d = parseFloat(devs) || 0;
  const r = parseFloat(rate) || 0;
  const h = parseFloat(hoursSaved) || 0;
  const pc = parseFloat(projectCost) || 0;
  const annualCost = pc * 12;

  const hoursPerMonth = d * h;
  const monthlySaved = hoursPerMonth * r;
  const yr1Cumulative = monthlySaved * 12;
  const roi = annualCost > 0 ? ((yr1Cumulative - annualCost) / annualCost) * 100 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <InputRow label="Developers on team" value={devs} onChange={setDevs} />
        <InputRow label="Average hourly rate" value={rate} onChange={setRate} prefix="$" />
        <InputRow
          label="Hours saved / dev / month"
          value={hoursSaved}
          onChange={setHoursSaved}
          suffix="hrs"
          jurnyEstimate="Teams using Jurny save 8–12 hrs/dev/month in rework"
        />
        <InputRow label="Monthly Cost" value={projectCost} onChange={setProjectCost} prefix="$" suffix="/mo" />
      </div>
      <div className="flex flex-col gap-4">
        <ROIChart monthlyValue={monthlySaved} cost={annualCost} valueLabel="Dev Time Saved" compounding={false} />
        <div className="flex gap-2">
          <MetricPill label="Yr 1 saved" value={`$${fmt(yr1Cumulative)}`} />
          <MetricPill label="Hours saved / mo" value={fmt(hoursPerMonth, 0)} />
          <MetricPill label="ROI" value={`${fmt(roi)}%`} />
        </div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
const ROICalculator = () => {
  const [activeTab, setActiveTab] = useState<Tab>("conversion");

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-secondary rounded-3xl p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                How much can customer experience help?
              </h2>
            </div>

            <div className="bg-card rounded-3xl p-6 md:p-8 border border-primary/15">
            <div className="flex flex-wrap gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "bg-transparent text-foreground/60 border border-border hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "conversion" && <ConversionTab />}
            {activeTab === "churn" && <ChurnTab />}
            {activeTab === "support" && <SupportTab />}
            {activeTab === "devtime" && <DevTimeTab />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
