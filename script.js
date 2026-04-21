const projects = {
  medicare: {
    title: "Medicare Claims Cost & Utilization Analysis",
    tags: ["Healthcare", "Live Dashboard"],
    stack: ["SQL", "Python", "dbt", "Tableau"],
    images: ["medicare-dashboard.png"],
    challenge: "CMS Medicare spends ~$73B annually on outpatient procedures with massive geographic and provider-level variation. Where should interventions focus to get the highest cost-reduction leverage?",
    dataSource: "CMS Medicare Physician & Other Practitioners Data (2023) — <strong>9.66M rows</strong>, 5,661 procedures, all US states and specialties.",
    approach: [
      "Built a <strong>dbt pipeline</strong> (staging → marts) with 10+ SQL models for reproducible, refreshable analysis.",
      "Developed a <strong>peer-benchmarked outlier model</strong> (specialty + state + procedure, 2σ threshold) to separate over-billing from over-utilization.",
      "Adjusted for geographic cost variation using <strong>GPCI (Geographic Practice Cost Index)</strong> to isolate true price differences from regional labor/rent."
    ],
    findings: [
      "<strong>24 procedures drove 50% of total spend</strong> — Pareto concentration means a small number of interventions unlocks most savings.",
      "Flagged <strong>277K provider-procedure outliers</strong>; over-utilization drove <strong>2.5× more cost impact</strong> than over-billing.",
      "Nuclear imaging showed <strong>15× geographic variation</strong> after GPCI adjustment — a clear audit signal."
    ],
    impact: "Modeled 3 cost-reduction interventions (targeted audit, geographic standardization, prior authorization), projecting <strong>~$801M in annual savings potential</strong> with &lt;1% operational cost ratio on the highest-leverage option.",
    dashboard: "https://public.tableau.com/app/profile/akshitha.a2492/viz/MedicareClaimsCostAnalysis2023/Dashboard1",
    github: "https://github.com/akshitha-ag/Medicare-Caims-Analysis"
  },
  olist: {
    title: "Olist Customer Retention Analysis",
    tags: ["E-commerce", "Live Dashboard"],
    stack: ["SQL", "Python", "Power BI"],
    images: ["olist-dashboard-1.png", "olist-dashboard-2.png"],
    challenge: "Olist (a Brazilian e-commerce marketplace) has a 3% repeat purchase rate. Why aren't customers coming back, and which segments hold recoverable revenue?",
    dataSource: "Brazilian E-Commerce Public Dataset by Olist (Kaggle) — <strong>93K customers</strong>, 9 linked tables, 2016–2018 order history.",
    approach: [
      "Built a <strong>cohort retention analysis</strong> and RFM segmentation in Python/SQL to diagnose the retention pattern.",
      "Tested <strong>4 hypotheses</strong> for why customers don't return: product category, review score, delivery time, and order value.",
      "Persisted analysis tables in Parquet/CSV and rebuilt core analyses in PostgreSQL to validate end-to-end."
    ],
    findings: [
      "<strong>Repeat purchase rate: 3.12%</strong> — 70.6% of all revenue comes from one-time buyers, a structural retention problem.",
      "<strong>Counterintuitive spend finding:</strong> low-spend customers return <em>more often</em> than high-spenders. High-ticket purchases are one-and-done.",
      "<strong>R$3.8M sits in a &quot;Lost High-Value&quot; segment</strong> — customers who bought big once, never returned. Prime win-back target.",
      "Review score and delivery speed showed <strong>no meaningful signal</strong> on retention — ops isn't the blocker."
    ],
    impact: "Reframed the retention strategy: instead of optimizing logistics or CX, focus on <strong>category mix and nurturing low-value frequent buyers</strong> over high-ticket one-time purchasers.",
    github: "https://github.com/akshitha-ag/olist-retention-analysis"
  }
};

const overlay = document.getElementById('modalOverlay');
const body = document.getElementById('modalBody');
const closeBtn = document.querySelector('.modal-close');

function openModal(projectKey) {
  const p = projects[projectKey];
  if (!p) return;

  let linksHtml = '';
  if (p.dashboard) linksHtml += `<a href="${p.dashboard}" target="_blank" rel="noopener" class="btn btn-primary">View live dashboard ↗</a>`;
  if (p.github) linksHtml += `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub repo ↗</a>`;

  let imagesHtml = '';
  if (p.images && p.images.length) {
    imagesHtml = `<div class="modal-images">${p.images.map(img => `<img src="${img}" alt="${p.title} dashboard" loading="lazy"/>`).join('')}</div>`;
  }

  body.innerHTML = `
    <h3>${p.title}</h3>
    <div class="modal-tags">
      ${p.tags.map(t => `<span class="tag ${t === p.tags[0] ? 'tag-domain' : ''}">${t}</span>`).join('')}
      ${p.stack.map(s => `<span class="tag">${s}</span>`).join('')}
    </div>

    ${imagesHtml}

    <div class="modal-section">
      <div class="modal-section-title">Challenge</div>
      <p>${p.challenge}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Data source</div>
      <p>${p.dataSource}</p>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Approach</div>
      <ul>${p.approach.map(a => `<li>${a}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Key findings</div>
      <ul>${p.findings.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">Business impact</div>
      <p>${p.impact}</p>
    </div>

    <div class="modal-links">${linksHtml}</div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.project));
});
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });