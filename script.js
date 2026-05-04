<<<<<<< HEAD
// ===== TYPEWRITER =====
const roles=['Data Analyst','Business Intelligence Analyst'];
let ri=0,ci=0,del=false,pause=false;
const el=document.getElementById('typed');
const TS=110,DS=65,PT=2200,PD=500;

function type(){
  const w=roles[ri];
  if(pause)return;
  if(!del){
    el.textContent=w.slice(0,ci+1);ci++;
    if(ci===w.length){pause=true;setTimeout(()=>{pause=false;del=true;type()},PT);return}
    setTimeout(type,TS);
  }else{
    el.textContent=w.slice(0,ci-1);ci--;
    if(ci===0){del=false;ri=(ri+1)%roles.length;pause=true;setTimeout(()=>{pause=false;type()},PD);return}
    setTimeout(type,DS);
  }
}
type();

// ===== PROJECT DATA =====
const projects={
  medicare:{
    title:"Medicare Claims Cost & Utilization Analysis",
    tags:["Healthcare","Live Dashboard"],
    stack:["SQL","Python","dbt","Tableau"],
    images:["medicare-dashboard.png"],
    challenge:"CMS Medicare spends ~$73B annually on outpatient procedures with massive geographic and provider-level variation. Where should interventions focus to get the highest cost-reduction leverage?",
    dataSource:"CMS Medicare Physician & Other Practitioners Data (2023) — <strong>9.66M rows</strong>, 5,661 procedures, all US states and specialties.",
    approach:[
      "Built a <strong>dbt pipeline</strong> (staging → marts) with 10+ SQL models for reproducible, refreshable analysis.",
      "Developed a <strong>peer-benchmarked outlier model</strong> (specialty + state + procedure, 2σ threshold) to separate over-billing from over-utilization.",
      "Adjusted for geographic cost variation using <strong>GPCI</strong> to isolate true price differences from regional labor/rent."
    ],
    findings:[
      "<strong>24 procedures drove 50% of total spend</strong> — Pareto concentration means targeted intervention unlocks most savings.",
      "Flagged <strong>277K provider-procedure outliers</strong>; over-utilization drove <strong>2.5× more cost impact</strong> than over-billing.",
      "Nuclear imaging showed <strong>15× geographic variation</strong> after GPCI adjustment — a clear audit signal."
    ],
    impact:"Modeled 3 cost-reduction interventions projecting <strong>~$801M in annual savings potential</strong> with &lt;1% operational cost ratio on the highest-leverage option.",
    dashboard:"https://public.tableau.com/app/profile/akshitha.a2492/viz/MedicareClaimsCostAnalysis2023/Dashboard1",
    github:"https://github.com/akshitha-ag/Medicare-Caims-Analysis"
  },
  olist:{
    title:"Olist Customer Retention Analysis",
    tags:["E-commerce","Live Dashboard"],
    stack:["SQL","Python","Power BI"],
    images:["olist-dashboard-1.png","olist-dashboard-2.png"],
    challenge:"Olist (a Brazilian e-commerce marketplace) has a 3% repeat purchase rate. Why aren't customers coming back, and which segments hold recoverable revenue?",
    dataSource:"Brazilian E-Commerce Public Dataset by Olist (Kaggle) — <strong>93K customers</strong>, 9 linked tables, 2016–2018 order history.",
    approach:[
      "Built a <strong>cohort retention analysis</strong> and RFM segmentation in Python/SQL to diagnose the retention pattern.",
      "Tested <strong>4 hypotheses</strong> for why customers don't return: product category, review score, delivery time, and order value.",
      "Persisted analysis tables in Parquet/CSV and rebuilt core analyses in PostgreSQL to validate end-to-end."
    ],
    findings:[
      "<strong>Repeat purchase rate: 3.12%</strong> — 70.6% of all revenue comes from one-time buyers, a structural retention problem.",
      "<strong>Counterintuitive spend finding:</strong> low-spend customers return <em>more often</em> than high-spenders.",
      "<strong>R$3.8M sits in a \"Lost High-Value\" segment</strong> — customers who bought big once, never returned.",
      "Review score and delivery speed showed <strong>no meaningful signal</strong> on retention — ops isn't the blocker."
    ],
    impact:"Reframed the retention strategy: focus on <strong>category mix and nurturing low-value frequent buyers</strong> over high-ticket one-time purchasers.",
    github:"https://github.com/akshitha-ag/olist-retention-analysis"
  },
  lending:{
    title:"Lending Club Credit Risk Analysis",
    tags:["Fintech","Live Dashboard"],
    stack:["Python","SciPy","SQL","Looker Studio"],
    images:["lending-dashboard.png"],
    challenge:"Can a lender identify the riskiest borrowers before they default — without ML — and quantify the financial tradeoff?",
    dataSource:"Lending Club Loan Data (Kaggle) — <strong>1.3M+ real loan records</strong> (2007–2018), borrower attributes, credit grades, employment, and default outcomes.",
    approach:[
      "Performed EDA with <strong>Python (Pandas, SciPy)</strong> to identify borrower attributes correlating with default.",
      "Used <strong>statistical hypothesis testing</strong> (t-tests, chi-square) to confirm risk factors are significant.",
      "Engineered a <strong>rule-based risk tier system</strong> (Low / Medium / High / Very High) — defensible business logic, no black box.",
      "Computed cost-benefit tradeoffs: defaults caught vs good loans rejected, with loan-amount weighting."
    ],
    findings:[
      "Risk tier system produced a <strong>5× spread in default rates</strong> — Low: 9.1% → Very High: 46.2%.",
      "Rejecting High + Very High tiers prevents majority of defaults at a quantifiable revenue tradeoff.",
      "<strong>Statistical testing confirmed</strong> grade, employment length, and DTI are the most predictive — significant at p &lt; 0.001."
    ],
    impact:"Delivered a <strong>defensible, explainable risk policy</strong> that lending teams can implement and audit — with quantified financial tradeoffs for each tier.",
    dashboard:"https://datastudio.google.com/reporting/4145e81e-29c9-46d2-9bd0-30c0cf7c6268",
    github:"https://github.com/akshitha-ag/Lending-Club-Credit-Risk"
  },
  crm:{
    title:"CRM Sales Pipeline & Utilization Analysis",
    tags:["SaaS / Professional Services"],
    stack:["Python","SQL","Power BI","Salesforce"],
    images:["crm-dashboard.png"],
    challenge:"Revenue forecasts were consistently missing targets but leadership couldn't pinpoint where deals were dying in the pipeline or whether reps were actually productive.",
    dataSource:"Salesforce-style CRM dataset — <strong>52,000 opportunity records</strong> (2022–2024), 50 reps, 4 regions, 6 product lines, 9 deal stages.",
    approach:[
      "Built a <strong>Python ETL pipeline</strong> standardizing 21 stage name variants into 9, handling nulls, and engineering 8 KPI features.",
      "Wrote <strong>5 SQL queries</strong> analyzing leakage by stage, forecast gap by rep tier, rep utilization segmentation, quarterly KPIs, and time-to-value by product.",
      "Designed a <strong>4-page Power BI dashboard</strong> with DAX measures, interactive slicers, and 30+ visuals in exec-ready format."
    ],
    findings:[
      "<strong>3 stages = 51% of all revenue leakage</strong> — Prospecting, Qualification, and Needs Analysis are where deals die.",
      "<strong>10% forecast gap is systemic</strong> — consistent across Top, Mid, and Low rep tiers, meaning the CRM model needs recalibration.",
      "<strong>Activity ≠ performance</strong> — highest win-rate reps have lower activity scores. Quality beats volume.",
      "<strong>Enterprise Suite = 10x ROI</strong> — $1,579 value per sales day vs $157 for Starter Pack, same close time."
    ],
    impact:"Gave leadership a <strong>prioritized intervention list</strong> for the 3 leakage stages and surfaced a systemic forecasting issue across all rep tiers.",
    github:"https://github.com/akshitha-ag/Crm-Pipeline-Analysis"
  }
};

const ov=document.getElementById('modalOverlay');
const mb=document.getElementById('modalBody');
const cb=document.querySelector('.modal-close');

function openModal(k){
  const p=projects[k];if(!p)return;
  let lk='';
  if(p.dashboard)lk+=`<a href="${p.dashboard}" target="_blank" rel="noopener" class="btn btn-primary">View Live Dashboard ↗</a>`;
  if(p.github)lk+=`<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub Repo ↗</a>`;
  const im=(p.images&&p.images.length)?`<div class="modal-images">${p.images.map(i=>`<img src="${i}" alt="${p.title}" loading="lazy"/>`).join('')}</div>`:'';
  mb.innerHTML=`
    <h3>${p.title}</h3>
    <div class="modal-tags">
      ${p.tags.map((t,i)=>`<span class="tag ${i===0?'tag-domain':''}">${t}</span>`).join('')}
      ${p.stack.map(s=>`<span class="tag">${s}</span>`).join('')}
    </div>
    ${im}
    <div class="modal-section"><div class="modal-section-title">Challenge</div><p>${p.challenge}</p></div>
    <div class="modal-section"><div class="modal-section-title">Data source</div><p>${p.dataSource}</p></div>
    <div class="modal-section"><div class="modal-section-title">Approach</div><ul>${p.approach.map(a=>`<li>${a}</li>`).join('')}</ul></div>
    <div class="modal-section"><div class="modal-section-title">Key findings</div><ul>${p.findings.map(f=>`<li>${f}</li>`).join('')}</ul></div>
    <div class="modal-section"><div class="modal-section-title">Business impact</div><p>${p.impact}</p></div>
    <div class="modal-links">${lk}</div>
  `;
  ov.classList.add('active');document.body.style.overflow='hidden';
}
function closeModal(){ov.classList.remove('active');document.body.style.overflow=''}
document.querySelectorAll('.project-card').forEach(c=>c.addEventListener('click',()=>openModal(c.dataset.project)));
cb.addEventListener('click',closeModal);
ov.addEventListener('click',e=>{if(e.target===ov)closeModal()});
=======
// ===== TYPEWRITER =====
const roles=['Data Analyst','Business Intelligence Analyst'];
let ri=0,ci=0,del=false,pause=false;
const el=document.getElementById('typed');
const TS=110,DS=65,PT=2200,PD=500;

function type(){
  const w=roles[ri];
  if(pause)return;
  if(!del){
    el.textContent=w.slice(0,ci+1);ci++;
    if(ci===w.length){pause=true;setTimeout(()=>{pause=false;del=true;type()},PT);return}
    setTimeout(type,TS);
  }else{
    el.textContent=w.slice(0,ci-1);ci--;
    if(ci===0){del=false;ri=(ri+1)%roles.length;pause=true;setTimeout(()=>{pause=false;type()},PD);return}
    setTimeout(type,DS);
  }
}
type();

// ===== PROJECT DATA =====
const projects={
  medicare:{
    title:"Medicare Claims Cost & Utilization Analysis",
    tags:["Healthcare","Live Dashboard"],
    stack:["SQL","Python","dbt","Tableau"],
    images:["medicare-dashboard.png"],
    challenge:"CMS Medicare spends ~$73B annually on outpatient procedures with massive geographic and provider-level variation. Where should interventions focus to get the highest cost-reduction leverage?",
    dataSource:"CMS Medicare Physician & Other Practitioners Data (2023) — <strong>9.66M rows</strong>, 5,661 procedures, all US states and specialties.",
    approach:[
      "Built a <strong>dbt pipeline</strong> (staging → marts) with 10+ SQL models for reproducible, refreshable analysis.",
      "Developed a <strong>peer-benchmarked outlier model</strong> (specialty + state + procedure, 2σ threshold) to separate over-billing from over-utilization.",
      "Adjusted for geographic cost variation using <strong>GPCI</strong> to isolate true price differences from regional labor/rent."
    ],
    findings:[
      "<strong>24 procedures drove 50% of total spend</strong> — Pareto concentration means targeted intervention unlocks most savings.",
      "Flagged <strong>277K provider-procedure outliers</strong>; over-utilization drove <strong>2.5× more cost impact</strong> than over-billing.",
      "Nuclear imaging showed <strong>15× geographic variation</strong> after GPCI adjustment — a clear audit signal."
    ],
    impact:"Modeled 3 cost-reduction interventions projecting <strong>~$801M in annual savings potential</strong> with &lt;1% operational cost ratio on the highest-leverage option.",
    dashboard:"https://public.tableau.com/app/profile/akshitha.a2492/viz/MedicareClaimsCostAnalysis2023/Dashboard1",
    github:"https://github.com/akshitha-ag/Medicare-Caims-Analysis"
  },
  olist:{
    title:"Olist Customer Retention Analysis",
    tags:["E-commerce","Live Dashboard"],
    stack:["SQL","Python","Power BI"],
    images:["olist-dashboard-1.png","olist-dashboard-2.png"],
    challenge:"Olist (a Brazilian e-commerce marketplace) has a 3% repeat purchase rate. Why aren't customers coming back, and which segments hold recoverable revenue?",
    dataSource:"Brazilian E-Commerce Public Dataset by Olist (Kaggle) — <strong>93K customers</strong>, 9 linked tables, 2016–2018 order history.",
    approach:[
      "Built a <strong>cohort retention analysis</strong> and RFM segmentation in Python/SQL to diagnose the retention pattern.",
      "Tested <strong>4 hypotheses</strong> for why customers don't return: product category, review score, delivery time, and order value.",
      "Persisted analysis tables in Parquet/CSV and rebuilt core analyses in PostgreSQL to validate end-to-end."
    ],
    findings:[
      "<strong>Repeat purchase rate: 3.12%</strong> — 70.6% of all revenue comes from one-time buyers, a structural retention problem.",
      "<strong>Counterintuitive spend finding:</strong> low-spend customers return <em>more often</em> than high-spenders.",
      "<strong>R$3.8M sits in a \"Lost High-Value\" segment</strong> — customers who bought big once, never returned.",
      "Review score and delivery speed showed <strong>no meaningful signal</strong> on retention — ops isn't the blocker."
    ],
    impact:"Reframed the retention strategy: focus on <strong>category mix and nurturing low-value frequent buyers</strong> over high-ticket one-time purchasers.",
    github:"https://github.com/akshitha-ag/olist-retention-analysis"
  },
  lending:{
    title:"Lending Club Credit Risk Analysis",
    tags:["Fintech","Live Dashboard"],
    stack:["Python","SciPy","SQL","Looker Studio"],
    images:["lending-dashboard.png"],
    challenge:"Can a lender identify the riskiest borrowers before they default — without ML — and quantify the financial tradeoff?",
    dataSource:"Lending Club Loan Data (Kaggle) — <strong>1.3M+ real loan records</strong> (2007–2018), borrower attributes, credit grades, employment, and default outcomes.",
    approach:[
      "Performed EDA with <strong>Python (Pandas, SciPy)</strong> to identify borrower attributes correlating with default.",
      "Used <strong>statistical hypothesis testing</strong> (t-tests, chi-square) to confirm risk factors are significant.",
      "Engineered a <strong>rule-based risk tier system</strong> (Low / Medium / High / Very High) — defensible business logic, no black box.",
      "Computed cost-benefit tradeoffs: defaults caught vs good loans rejected, with loan-amount weighting."
    ],
    findings:[
      "Risk tier system produced a <strong>5× spread in default rates</strong> — Low: 9.1% → Very High: 46.2%.",
      "Rejecting High + Very High tiers prevents majority of defaults at a quantifiable revenue tradeoff.",
      "<strong>Statistical testing confirmed</strong> grade, employment length, and DTI are the most predictive — significant at p &lt; 0.001."
    ],
    impact:"Delivered a <strong>defensible, explainable risk policy</strong> that lending teams can implement and audit — with quantified financial tradeoffs for each tier.",
    dashboard:"https://datastudio.google.com/reporting/4145e81e-29c9-46d2-9bd0-30c0cf7c6268",
    github:"https://github.com/akshitha-ag/Lending-Club-Credit-Risk"
  }
};

const ov=document.getElementById('modalOverlay');
const mb=document.getElementById('modalBody');
const cb=document.querySelector('.modal-close');

function openModal(k){
  const p=projects[k];if(!p)return;
  let lk='';
  if(p.dashboard)lk+=`<a href="${p.dashboard}" target="_blank" rel="noopener" class="btn btn-primary">View Live Dashboard ↗</a>`;
  if(p.github)lk+=`<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-ghost">GitHub Repo ↗</a>`;
  const im=(p.images&&p.images.length)?`<div class="modal-images">${p.images.map(i=>`<img src="${i}" alt="${p.title}" loading="lazy"/>`).join('')}</div>`:'';
  mb.innerHTML=`
    <h3>${p.title}</h3>
    <div class="modal-tags">
      ${p.tags.map((t,i)=>`<span class="tag ${i===0?'tag-domain':''}">${t}</span>`).join('')}
      ${p.stack.map(s=>`<span class="tag">${s}</span>`).join('')}
    </div>
    ${im}
    <div class="modal-section"><div class="modal-section-title">Challenge</div><p>${p.challenge}</p></div>
    <div class="modal-section"><div class="modal-section-title">Data source</div><p>${p.dataSource}</p></div>
    <div class="modal-section"><div class="modal-section-title">Approach</div><ul>${p.approach.map(a=>`<li>${a}</li>`).join('')}</ul></div>
    <div class="modal-section"><div class="modal-section-title">Key findings</div><ul>${p.findings.map(f=>`<li>${f}</li>`).join('')}</ul></div>
    <div class="modal-section"><div class="modal-section-title">Business impact</div><p>${p.impact}</p></div>
    <div class="modal-links">${lk}</div>
  `;
  ov.classList.add('active');document.body.style.overflow='hidden';
}
function closeModal(){ov.classList.remove('active');document.body.style.overflow=''}
document.querySelectorAll('.project-card').forEach(c=>c.addEventListener('click',()=>openModal(c.dataset.project)));
cb.addEventListener('click',closeModal);
ov.addEventListener('click',e=>{if(e.target===ov)closeModal()});
>>>>>>> 2041fcc3088027e944dd3eda480a947b8d76c902
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});