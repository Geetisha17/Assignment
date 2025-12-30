# 📊 Campaign Insights Dashboard

A real-time campaign analytics dashboard built with **React, TypeScript, and SSE**.
The application provides both **aggregated campaign insights** and **live performance tracking** with a clean, maintainable code.

---

## 🚀 Features

### 1. Aggregated Campaign Insights

* Displays overall campaign statistics:

  * Total, Active, Paused, Completed campaigns
  * Impressions, Clicks, Conversions, Spend
  * CTR, CPC, Conversion Rate
* Clean card-based UI optimized for readability

📸 **Screenshot**
>![Campaign Insights Overview](./assignment/images/Screenshot%202025-12-30%20170209.png)

> ![Campaign Insights Overview](./assignment/images/Screenshot%202025-12-30%20170507.png)

>![Campaign Insights Overview](./assignment/images/Screenshot%202025-12-30%20171134.png)

---

### 2. Real-Time Campaign Performance

* Live performance updates using **SSE**
* Tracks metrics over time:
  * Impressions
  * Clicks
  * Conversions
  * Spend

📸 **Screenshot**

> ![Campaign Insights Overview](./assignment/images/Screenshot%202025-12-30%20170715.png)

---

### 3. Interactive Data Visualization

* Built using **Recharts**
* Automatic scaling for different metrics

---

## 🛠 Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Frontend         | React + TypeScript       |
| Styling          | Tailwind CSS             |
| Charts           | Recharts                 |
| Data Fetching    | Axios                    |
| Routing          | React Router             |
| Realtime Updates | SSE |

---

## ▶️ Running the Project

```bash
npm install
npm start
```

Make sure to define the API base URL:

```env
REACT_APP_API_BASE_URL=your_backend_url
```
## 📌 Note

Built with a focus on clean structure, real-time updates, and simplicity.  
If you find this useful, feel free to give it a ⭐.
