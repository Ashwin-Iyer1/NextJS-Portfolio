---
category: Metrics
keywords: [oura, profile, personal info, card]
---

Small profile card — age, weight, height, biological sex and email as label/value rows. Not a chart; it sits alongside them in the dashboard.

```jsx
<PersonalInfoCard
  data={{ age: 21, weight: 72, height: 1.8, biological_sex: "male", email: "you@example.com" }}
/>
```

Units are appended for you: `weight` is kilograms and `height` is metres, so pass `1.8`, not `"1.8 m"`.

It accepts either the object or a single-entry array (the API returns a singleton), and renders a labelled empty state for `null`. Unlike the charts it sizes to its content, so it does not need a fixed-height parent.

Every row renders whether or not its field has a value, so omitting one leaves a labelled blank rather than dropping the row — pass all five, or accept the gap.

It shows the email address verbatim, so use a placeholder for anything shared publicly.
