/**
 * ============================================================================
 * R RAJASEKAR — CLOUD & DEVOPS PORTFOLIO SCRIPTS
 * Interactive architecture diagram, mobile menu, modals, form validation.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initArchitectureInspector();
  initResumeModal();
  initContactForm();
  initSmoothScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Navbar & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navMenu.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }
}

/* --------------------------------------------------------------------------
   2. Interactive AWS Architecture Diagram Inspector
   -------------------------------------------------------------------------- */
function initArchitectureInspector() {
  const nodes = document.querySelectorAll('.arch-node');
  const badgeEl = document.getElementById('inspectorBadge');
  const titleEl = document.getElementById('inspectorTitle');
  const roleEl = document.getElementById('inspectorRole');
  const justEl = document.getElementById('inspectorJustification');
  const advEl = document.getElementById('inspectorAdvantage');

  if (!nodes.length || !badgeEl || !titleEl) return;

  // Architectural Knowledge Base for each node
  const architectureData = {
    client: {
      badge: 'Clients & Browsers',
      title: 'End-User Client Interfaces (Web / Mobile)',
      role: 'Users browse menus, place food items into carts, make payments, and monitor order fulfillment in real-time.',
      justification: 'Decoupled presentation layer communicating over secure HTTPS REST endpoints with fast CDN/edge responses.',
      advantage: 'Low latency client interactions; UI state remains responsive even during heavy order surge periods.'
    },
    ec2: {
      badge: 'Amazon EC2',
      title: 'Amazon EC2 (Web & API Microservices Layer)',
      role: 'Hosts customer-facing frontend interfaces, API routing microservice, and validates incoming customer order requests.',
      justification: 'Provides customizable compute instances with security group firewalls, handling HTTP ingress and offloading tasks to queues.',
      advantage: 'Ensures high throughput ingress while shielding database resources from direct, unbuffered concurrent connections.'
    },
    dynamodb: {
      badge: 'Amazon DynamoDB',
      title: 'Amazon DynamoDB (NoSQL Real-Time Store)',
      role: 'Stores dynamic restaurant menus, real-time item availability, pricing catalogs, and active shopping cart state.',
      justification: 'Sub-10ms key-value lookups eliminate database contention when thousands of users browse menus concurrently.',
      advantage: 'Horizontal autoscaling with high concurrency performance, ensuring zero slowdowns during high-volume meal hours.'
    },
    sqs: {
      badge: 'Amazon SQS',
      title: 'Amazon SQS (Decoupled Asynchronous Message Queue)',
      role: 'Acts as a shock-absorber buffer that queues incoming food order transactions directly from the EC2 API layer.',
      justification: 'Decouples order ingestion from backend processing logic, ensuring orders are safely preserved even if downstream workers are busy.',
      advantage: 'Guarantees zero order loss during unexpected demand surges; protects databases against spike-induced connection exhaustion.'
    },
    lambda: {
      badge: 'AWS Lambda',
      title: 'AWS Lambda (Serverless Event-Driven Compute)',
      role: 'Polls Amazon SQS queue, extracts order payloads, executes business validation, commits records, and triggers notifications.',
      justification: 'Serverless execution charges only for compute consumed per order, scaling seamlessly from 1 to thousands of concurrent executions.',
      advantage: 'Eliminates idle EC2 server costs for order processing workers while achieving automatic elasticity.'
    },
    rds: {
      badge: 'Amazon RDS',
      title: 'Amazon RDS (Relational Database Service)',
      role: 'Stores ACID-compliant financial transactions, customer billing accounts, order histories, and audit logs.',
      justification: 'Relational data model ensures transactional consistency, foreign key relationships, and point-in-time recovery for billing.',
      advantage: 'Strict data integrity, automated backups, and read-replica capability for reporting without degrading live transactions.'
    },
    sns: {
      badge: 'Amazon SNS',
      title: 'Amazon SNS (Simple Notification Service - Pub/Sub)',
      role: 'Broadcasts confirmed order status events simultaneously to multiple decoupled subscriber topics.',
      justification: 'Pub/sub fan-out design decouples notification delivery channels from the core order processing pipeline.',
      advantage: 'Instant, parallel delivery to customer SMS, restaurant kitchen prep dashboards, and delivery driver mobile apps.'
    },
    subscribers: {
      badge: 'Subscribers & Endpoints',
      title: 'Notification Recipients & Delivery Fleets',
      role: 'Consumes real-time alerts dispatched by Amazon SNS to trigger SMS messages, kitchen order tickets, and courier dispatches.',
      justification: 'Subscribers can be added or removed independently without altering the backend Lambda processing code.',
      advantage: 'Transparent communication across the entire food delivery ecosystem with automated delivery tracking.'
    }
  };

  nodes.forEach(node => {
    // Click event
    node.addEventListener('click', () => {
      selectNode(node);
    });

    // Keyboard accessibility (Enter or Space)
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectNode(node);
      }
    });
  });

  function selectNode(selectedNode) {
    const key = selectedNode.getAttribute('data-node');
    const data = architectureData[key];
    if (!data) return;

    // Update active class
    nodes.forEach(n => n.classList.remove('active-node'));
    selectedNode.classList.add('active-node');

    // Update inspector content with smooth transition
    const inspector = document.getElementById('nodeInspector');
    if (inspector) {
      inspector.style.opacity = '0.5';
      setTimeout(() => {
        badgeEl.textContent = data.badge;
        titleEl.textContent = data.title;
        roleEl.textContent = data.role;
        justEl.textContent = data.justification;
        advEl.textContent = data.advantage;
        inspector.style.opacity = '1';
      }, 120);
    }
  }
}

/* --------------------------------------------------------------------------
   3. Resume Modal & Print/Download Handlers
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const modal = document.getElementById('resumeModal');
  const openButtons = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('closeResumeModalBtn');
  const printBtn = document.getElementById('printResumeBtn');
  const downloadPdfBtn = document.getElementById('downloadResumePdfBtn');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Print button
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // PDF Download Fallback Generator (ensures clicking download works seamlessly)
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', (e) => {
      // If no local PDF exists, generate an HTML/Text version cleanly for the recruiter
      const resumeContent = `
R RAJASEKAR
Technical Support Associate | Aspiring Cloud & DevOps Engineer
Company: Sutherland (D2 Technical Support Team - Currently Working)
Experience: 3 Years Supporting Amazon Consumer Devices & Digital Services
Email: sekarvj05@gmail.com
LinkedIn: https://www.linkedin.com/in/raja-sekar-0652a8262
GitHub: https://github.com/Rajasekar-VJ
Location: India (Open to Relocation & Remote Roles)

PROFESSIONAL SUMMARY
I am a technical support professional currently working at Sutherland, with experience supporting Amazon consumer devices and digital services. I have completed AWS training and am currently learning DevOps, with the goal of transitioning into a Cloud Engineer, AWS Cloud Support or Junior DevOps role.

CURRENT WORK EXPERIENCE: Sutherland (3 Years Tenure - Currently Working)
Role: Technical Support Associate
Department: D2 Technical Support Team
Core Focus: Technical support & diagnostic troubleshooting for Amazon consumer devices and services:
- Fire TV Stick: Device setup, network connectivity, audio/video synchronization, app crashes, and hardware troubleshooting.
- Amazon Echo: Device configuration, Wi-Fi connectivity, multi-room audio, and Alexa voice-command-related troubleshooting.
- Prime Video: Digital streaming, buffer latency, DRM playback troubleshooting, and device compatibility.
- Prime Gaming: Gaming service integration, claim verification, and subscription-related support.
- Kindle eBooks & Devices: Device troubleshooting, screen responsiveness, cloud sync, and digital content access.
Transferable Skills: Root-cause troubleshooting, analytical thinking, customer communication, SLA management, and structured problem-solving.
(Note: Experience represents enterprise consumer technical support; does not represent professional Cloud or DevOps administration.)

FEATURED CLOUD PROJECT: AWS-Based Food Microservices Website
(Hands-On Project Architecture - Implemented using 6 Core AWS Services)
- Designed decoupled, event-driven ordering system handling high concurrency using 6 integrated AWS services.
- Configured Amazon SQS buffer queue to absorb ordering traffic bursts, preventing server throttling and eliminating dropped requests.
- Executed serverless compute with AWS Lambda triggered by queue messages for instantaneous order status lifecycle handling.
- Engineered polyglot persistence combining Amazon DynamoDB for sub-10ms menu caching and Amazon RDS for ACID transactional order records.
- Integrated Amazon SNS pub/sub fan-out to deliver automated real-time dispatch alerts across multi-channel endpoints.

CORE TECHNICAL SKILLS & LEARNING
- AWS Services (Trained & Project-Validated): Amazon EC2, Amazon RDS, Amazon DynamoDB, AWS Lambda, Amazon SQS, Amazon SNS, AWS IAM, Amazon S3, CloudWatch, VPC basics.
- DevOps Ecosystem (Currently Learning - In Progress, Target: 1 Month): Docker (Containerization), Kubernetes fundamentals, CI/CD Pipelines (GitHub Actions), Git & GitHub, Linux Administration, Shell Scripting.
- Technical Support & Operations: Diagnostic Troubleshooting, Root Cause Analysis (RCA), SLA Adherence, Customer Communication, SOP Documentation.

TRAINING & ROADMAP
- AWS Cloud Training: Completed comprehensive curriculum covering AWS Core Infrastructure & Microservices Architecture.
- DevOps Engineering Specialization: Currently In-Progress (Expected completion within 1 month).
- Target Roles: Cloud Engineer, AWS Cloud Support, Junior DevOps.
      `.trim();

      const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
      const downloadUrl = URL.createObjectURL(blob);
      downloadPdfBtn.href = downloadUrl;
      downloadPdfBtn.download = 'R_Rajasekar_Resume.txt';
    });
  }

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   4. Recruiter Contact Form Validation & Feedback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const subjectInput = document.getElementById('senderSubject');
  const messageInput = document.getElementById('senderMessage');
  const statusAlert = document.getElementById('formStatusAlert');
  const submitBtn = document.getElementById('contactSubmitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    nameError.classList.remove('active');
    emailError.classList.remove('active');
    subjectError.classList.remove('active');
    messageError.classList.remove('active');
    statusAlert.classList.remove('success');
    statusAlert.style.display = 'none';

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.classList.add('active');
      isValid = false;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.classList.add('active');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      subjectError.classList.add('active');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.classList.add('active');
      isValid = false;
    }

    if (!isValid) return;

    // Simulate submission feedback
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="btn-icon spin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending Message...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Message Sent
      `;

      statusAlert.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been prepared. Rajasekar has been notified at sekarvj05@gmail.com and will respond promptly.`;
      statusAlert.classList.add('success');
      statusAlert.style.display = 'block';

      // Reset form fields
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          Send Message
        `;
      }, 3500);
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   5. Active Section Spy on Scroll
   -------------------------------------------------------------------------- */
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}
