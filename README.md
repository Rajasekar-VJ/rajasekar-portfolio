# R Rajasekar — Technical Support Professional & Aspiring Cloud/DevOps Engineer

Personal portfolio website for **R Rajasekar**, showcasing 3 years of enterprise technical support experience at Sutherland (supporting Amazon consumer devices and digital services), completed AWS cloud training with a hands-on food microservices project, and active DevOps specialization.

**Target Roles:** Cloud Engineer | AWS Cloud Support | Junior DevOps

---

## 📬 Contact & Social Details

- **Email:** [sekarvj05@gmail.com](mailto:sekarvj05@gmail.com)
- **LinkedIn:** [https://www.linkedin.com/in/raja-sekar-0652a8262](https://www.linkedin.com/in/raja-sekar-0652a8262)
- **GitHub:** [https://github.com/Rajasekar-VJ](https://github.com/Rajasekar-VJ)

---

## 🌟 Professional Summary & Highlights

> *"I am a technical support professional currently working at Sutherland, with experience supporting Amazon consumer devices and digital services. I have completed AWS training and am currently learning DevOps, with the goal of transitioning into a Cloud Engineer, AWS Cloud Support or Junior DevOps role."*

### 1. Enterprise Technical Support (Sutherland - Currently Working, 3 Years)
- **Role:** Technical Support Associate
- **Department:** D2 Technical Support Team
- **Amazon Products & Services Supported:**
  - **Fire TV Stick:** Device setup, network & Wi-Fi connectivity, HDMI display settings, audio/video synchronization, app crashes, and remote/firmware troubleshooting.
  - **Amazon Echo:** Device configuration, Wi-Fi pairing, multi-room audio, Bluetooth grouping, and Alexa voice-command diagnostics.
  - **Prime Video:** Digital streaming performance, playback buffering issues, DRM authorizations, and multi-device playback troubleshooting.
  - **Prime Gaming:** Gaming service integration, claim verification for digital rewards/loot, Twitch synchronization, and subscription-related support.
  - **Kindle eBooks & Devices:** E-reader hardware troubleshooting, screen responsiveness, Whispersync cloud sync, and digital content access support.
- **Transferable Competencies:** Systematic diagnostic troubleshooting, root cause analysis (RCA), analytical thinking, customer communication & de-escalation, and strict SLA compliance.
- *(Note: Experience represents enterprise consumer technical support; does not claim professional Cloud or DevOps administration.)*

### 2. Hands-on AWS Project: Food Microservices Website
- **Architecture:** Decoupled, asynchronous event-driven system built with 6 AWS services:
  - **Amazon EC2:** Frontend web tier & API routing microservice.
  - **Amazon SQS:** Decoupled message queue absorbing ordering traffic spikes.
  - **AWS Lambda:** Serverless compute triggered by queue events for instant order validation.
  - **Amazon DynamoDB:** Ultra-fast sub-10ms NoSQL store for restaurant menus & active carts.
  - **Amazon RDS:** Relational database for ACID transactional payment & order history records.
  - **Amazon SNS:** Multi-endpoint pub/sub fan-out delivering real-time SMS & kitchen alerts.
- **Interactive Architecture Flow:** Clickable SVG & HTML nodes allowing recruiters to inspect the system role and engineering advantage of each component live on the page.

### 3. Skills & Roadmap
- **AWS Cloud (Trained & Project-Validated):** EC2, RDS, DynamoDB, Lambda, SQS, SNS, S3, IAM, CloudWatch, VPC basics.
- **DevOps (In Progress - Target: 1 Month):** Docker (Containerization), Kubernetes, CI/CD (GitHub Actions), Git & GitHub, Linux Administration, Shell Scripting.
- **Technical Support & Operations:** Diagnostics, Root Cause Analysis, SLA Management, Customer Communication, SOP Execution.

---

## 📁 Project Structure

```text
d:/New folder (2)/
├── index.html       # Semantic HTML5 markup, meta tags, and structured JSON-LD
├── style.css        # Responsive dark navy & electric blue design tokens, glassmorphism
├── script.js        # Interactive architecture inspector, resume modal, form handling
├── preview.bat      # One-click batch launcher to preview in default browser
├── vercel.json      # Security headers and clean URLs for Vercel deployment
├── .gitignore       # Git ignore rules
└── README.md        # Documentation and deployment steps
```

---

## 🚀 How to Preview Locally

### Option 1: Double-Click `preview.bat` (Easiest)
Double-click `preview.bat` in Windows File Explorer. It opens `index.html` in your default browser.

### Option 2: Press F5 in VS Code
Press **F5** in VS Code (configured in `.vscode/launch.json` to launch `index.html` directly in Chrome or Edge).

### Option 3: Direct Browser Open
Double-click `index.html` in File Explorer.

---

## 🌐 Deploy to GitHub & Vercel

```powershell
cd "D:\New folder (2)"

# Initialize git repository
git init
git add .
git commit -m "feat: updated portfolio with Sutherland technical support and Amazon devices experience"

# Link to your GitHub repository
git branch -M main
git remote add origin https://github.com/Rajasekar-VJ/rajasekar-portfolio.git
git push -u origin main
```

In [Vercel](https://vercel.com):
1. Click **"Add New..."** &rarr; **"Project"**.
2. Import `Rajasekar-VJ/rajasekar-portfolio`.
3. Click **"Deploy"**.
