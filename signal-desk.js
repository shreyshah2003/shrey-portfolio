// Illustrative exercises in separating signals, assumptions and decisions.
(() => {
  const readings = [
  {
    "text": "“My transfer hasn’t arrived.<br>Your system must be broken.”",
    "label": "Confirmed system failure",
    "good": "The reported delay is a signal. Check the route, timing and transaction status before naming a cause.",
    "bad": "A delay does not establish system failure. Which records would confirm where the transfer is?",
    "noise": "The frustration matters. Separate the customer’s experience from the explanation, then investigate both."
  },
  {
    "text": "“Three people asked for this.<br>We should build it next.”",
    "label": "A clear priority",
    "good": "Demand is a starting point. Ask who needs it, what problem it solves and how it compares with other priorities.",
    "bad": "Three requests do not settle priority. Consider reach, impact, alternatives and effort.",
    "noise": "A small sample can expose a real problem. Understand the need before dismissing it."
  },
  {
    "text": "“The numbers changed.<br>The release caused it.”",
    "label": "Proven cause",
    "good": "Treat the timing as a hypothesis. Check measurement, affected groups and other changes before attributing cause.",
    "bad": "Sequence alone does not establish cause. What comparison could test the release hypothesis?",
    "noise": "A change deserves a look. First establish which metric changed, by how much and for whom."
  },
  {
    "text": "“Revenue is up this month.<br>The business is healthier.”",
    "label": "Proven business health",
    "good": "Revenue is one signal. Compare margin, retention, costs and one-off effects before judging business health.",
    "bad": "Higher revenue can coexist with higher costs or weaker retention. Look at the wider picture.",
    "noise": "Growth is relevant. Ask what drove it and whether that growth is sustainable."
  },
  {
    "text": "“Support tickets are down.<br>Customers must be happier.”",
    "label": "Confirmed satisfaction",
    "good": "Check whether customers need less help, stopped using the product or cannot find support. Compare satisfaction and usage.",
    "bad": "Fewer tickets do not prove happier customers. Check contact access, activity and direct feedback.",
    "noise": "The drop may reveal an improvement or a hidden problem. Find out which before moving on."
  },
  {
    "text": "“One large customer wants it.<br>It belongs on the roadmap.”",
    "label": "An obvious commitment",
    "good": "Understand the underlying need, strategic fit and cost of delay. A valuable customer’s request still needs a trade-off.",
    "bad": "Account size matters, but it does not settle the roadmap. Consider reuse, opportunity cost and existing commitments.",
    "noise": "One request can carry significant business context. Explore the problem before accepting or rejecting the solution."
  },
  {
    "text": "“Sign-ups doubled.<br>Our campaign worked.”",
    "label": "Proven campaign impact",
    "good": "Check attribution, baseline and sign-up quality. Then see whether those users activate and return.",
    "bad": "The increase could have several causes. Compare channels, timing and a suitable baseline before assigning credit.",
    "noise": "The change is worth investigating. Volume becomes useful when you understand its source and quality."
  },
  {
    "text": "“This account looks unusual.<br>It must be fraud.”",
    "label": "Confirmed fraud",
    "good": "Unusual behaviour calls for proportionate review. Corroborate the signal and follow the relevant risk process.",
    "bad": "Unusual does not establish fraud. Seek supporting evidence and consider legitimate explanations.",
    "noise": "An anomaly can matter. Investigate carefully without treating suspicion as a verdict."
  },
  {
    "text": "“Engineering closed the issue.<br>The customer’s problem is solved.”",
    "label": "A resolved customer need",
    "good": "Check the customer-facing outcome. A technical fix needs verification, a clear explanation and follow-through.",
    "bad": "A closed issue is an internal status. Confirm the affected flow works and the customer understands the next step.",
    "noise": "The closure is useful context. Connect the technical update to what the customer can now do."
  },
  {
    "text": "“Everyone uses the workaround.<br>We do not need to fix it.”",
    "label": "No product problem",
    "good": "A workaround shows adaptation, not absence of friction. Understand its frequency, cost and risk before prioritising.",
    "bad": "Repeated workarounds can hide product debt. Compare the burden with the effort and impact of a fix.",
    "noise": "Repeated behaviour is evidence. Ask what users are compensating for and what it costs them."
  },
  {
    "text": "“The average response is faster.<br>The experience improved.”",
    "label": "A proven improvement",
    "good": "Look beyond the average: long waits, resolution quality and repeat contacts show whether the experience improved.",
    "bad": "A faster average can hide slower outliers or rushed answers. Check the distribution and quality of resolution.",
    "noise": "Speed matters to customers. Combine it with quality and follow-through to understand the outcome."
  },
  {
    "text": "“Two teams have different numbers.<br>One team must be wrong.”",
    "label": "A clear reporting error",
    "good": "Compare definitions, time windows and data sources first. Different numbers may answer different questions.",
    "bad": "Before assigning an error, align what is being counted, when it is counted and which source is used.",
    "noise": "The disagreement is a useful signal. Shared definitions can turn competing numbers into a better decision."
  }
];
  let current = 0;
  const feedback = document.querySelector('.feedback');
  const choices = [...document.querySelectorAll('.choice')];
  const counter = document.querySelector('#case-num');
  const statement = document.querySelector('#statement');
  function render() {
    const item = readings[current];
    statement.innerHTML = item.text;
    counter.textContent = String(current + 1).padStart(3, '0');
    choices[0].textContent = item.label;
    choices.forEach(button => button.setAttribute('aria-pressed', 'false'));
    feedback.textContent = 'What does the evidence support?';
  }
  choices.forEach(button => button.addEventListener('click', () => {
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    const key = button.dataset.answer === 'signal' ? 'good' : button.dataset.answer === 'fact' ? 'bad' : 'noise';
    feedback.textContent = readings[current][key];
  }));
  document.querySelector('#next').addEventListener('click', () => {
    current = (current + 1) % readings.length;
    render();
  });
  render();
})();
