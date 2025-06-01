document.addEventListener('DOMContentLoaded', function() {
    // Loading screen animation
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;

    if (loadingScreen && (getComputedStyle(loadingScreen).opacity !== '0' || getComputedStyle(loadingScreen).visibility !== 'hidden')) {
        document.body.classList.add('no-scroll');
    }
    
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress > 100) progress = 100;
        if (loadingProgress) loadingProgress.textContent = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.visibility = 'hidden';
                    loadingScreen.style.display = 'none'; 
                }
                document.body.classList.remove('no-scroll');
                initPortfolio();
            }, 500);
        }
    }, 80); 
    
    function initPortfolio() {
        // Initialize Vanta.js background
        if (typeof VANTA !== 'undefined' && document.getElementById('vanta-hero-bg')) {
            VANTA.NET({
                el: "#vanta-hero-bg", 
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x4A90E2, 
                backgroundColor: 0x0A0F1E, 
                points: 10.00,
                maxDistance: 25.00,
                spacing: 18.00,
                showDots: true
            });
        } else {
            console.warn('VANTA.NET or #vanta-hero-bg not found.');
        }
        
        // Theme toggle functionality
        const themeSwitch = document.getElementById('theme-switch');
        const currentTheme = localStorage.getItem('theme') || 'dark'; 
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (themeSwitch) {
            if (currentTheme === 'light') {
                themeSwitch.checked = true;
            }
            themeSwitch.addEventListener('change', function() {
                const newTheme = this.checked ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                if (typeof VANTA !== 'undefined' && VANTA.current && VANTA.current.destroy) {
                    VANTA.current.destroy();
                }
                if (typeof VANTA !== 'undefined' && document.getElementById('vanta-hero-bg')) {
                    VANTA.NET({
                        el: "#vanta-hero-bg",
                        mouseControls: true, touchControls: true, gyroControls: false,
                        minHeight: 200.00, minWidth: 200.00, scale: 1.00, scaleMobile: 1.00,
                        color: newTheme === 'light' ? 0x3478F6 : 0x4A90E2, 
                        backgroundColor: newTheme === 'light' ? 0xF4F7FC : 0x0A0F1E, 
                        points: 10.00, maxDistance: 25.00, spacing: 18.00, showDots: true
                    });
                }
            });
        }
        
        const menuBtn = document.querySelector('.menu-btn');
        const navbar = document.querySelector('.navbar');
        const body = document.body;
        
        if (menuBtn && navbar) {
            menuBtn.addEventListener('click', function() {
                navbar.classList.toggle('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-times');
                    icon.classList.toggle('fa-bars');
                }
                body.classList.toggle('no-scroll');
            });
        
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    if (navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        const icon = menuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                        body.classList.remove('no-scroll');
                    }
                });
            });
        
            document.addEventListener('click', function(event) {
                if (navbar && menuBtn) { 
                    const isClickInsideNavbar = navbar.contains(event.target);
                    const isClickOnMenuButton = menuBtn.contains(event.target);
                
                    if (!isClickInsideNavbar && !isClickOnMenuButton && navbar.classList.contains('active')) {
                        navbar.classList.remove('active');
                        const icon = menuBtn.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                        body.classList.remove('no-scroll');
                    }
                }
            });
        }
        
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', function() {
                header.classList.toggle('sticky', window.scrollY > 50);
            });
        }
        
        if (typeof Typed !== 'undefined') {
            if (document.querySelector('.typing')) {
                new Typed('.typing', {
                    strings: ['Software Engineer', 'Web Developer', 'IoT Architect', 'Mobile App Innovator', 'Creative Technologist'],
                    typeSpeed: 70, backSpeed: 40, loop: true, backDelay: 1800
                });
            }
            if (document.querySelector('.typing-2')) {
                new Typed('.typing-2', {
                    strings: ['Problem Solver', 'Full-Stack Developer', 'IoT Enthusiast', 'UX Advocate', 'Data Explorer'],
                    typeSpeed: 70, backSpeed: 40, loop: true, backDelay: 1800
                });
            }
        }
        
        if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                origin: 'bottom', distance: '50px', duration: 800, delay: 100,
                easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)', reset: false
            });
            
            sr.reveal('.section-title', { origin: 'top', delay: 50 });
            sr.reveal('.home-content .text-1, .home-content .text-2, .home-content .text-3', { interval: 150, origin: 'left' });
            sr.reveal('.home-content .btn-container, .social-icons-home, .visitor-counter-container', { interval: 100, origin: 'bottom' });
            sr.reveal('.home-image-container', { origin: 'right', distance: '80px', delay: 300 });
            sr.reveal('.about-image-column', { origin: 'left' });
            sr.reveal('.about-text-column', { origin: 'right' });
            sr.reveal('.about-facts .fact-card', { interval: 150 });
            sr.reveal('.skills-description-column', { origin: 'left'});
            sr.reveal('.skills-chart-column', { origin: 'right' });
            sr.reveal('.timeline-item', { interval: 200, distance: '30px' });
            sr.reveal('.contact-info-column .info-card', { interval: 100, origin: 'left' });
            sr.reveal('.contact-form-column .form-field, .contact-form-column .form-submit', { interval: 100, origin: 'bottom' });
            sr.reveal('.footer-column', {interval: 100});
        }
        
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveLink() {
            if (sections.length === 0 || navLinks.length === 0) return;
            let index = sections.length;
            const offset = window.innerHeight * 0.5; 
            
            while(--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {}
            
            navLinks.forEach((link) => link.classList.remove('active'));
            
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (index < 0 || window.scrollY < (sections[0] ? sections[0].offsetTop - offset : 0)) { 
                if(homeLink) homeLink.classList.add('active');
            } else if (sections[index]) {
                const activeSectionId = sections[index].id;
                const activeLink = document.querySelector(`.nav-link[href="#${activeSectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
                else if (homeLink) homeLink.classList.add('active');
            } else if (homeLink) {
                 homeLink.classList.add('active');
            }
        }
        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); 
        
        const scrollBtn = document.querySelector('.scroll-up-btn');
        if(scrollBtn){
            window.addEventListener('scroll', function() {
                scrollBtn.classList.toggle('active', this.scrollY > 300);
            });
            scrollBtn.addEventListener('click', (e) => {
                e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'});
            });
        }
        
        const contactForm = document.getElementById('contactForm'); 
        const successModal = document.getElementById('successModal');
        
        if (contactForm && successModal) {
            const successCloseTriggers = successModal.querySelectorAll('.success-close-modal-trigger');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                // No need to specifically delete 'attachment' from formData as the input is removed from HTML
                
                const submitButton = this.querySelector('button[type="submit"]');
                const originalButtonContent = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                
                fetch(this.action, {
                    method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) return response.text();
                    return response.json().then(data => Promise.reject(data));
                })
                .then(() => { 
                    successModal.style.display = 'flex'; body.classList.add('no-scroll');
                })
                .catch(error => {
                    console.error('Form Submission Error:', error);
                    alert(`Could not send message: ${error.message || 'Please try again.'}`);
                })
                .finally(() => {
                    submitButton.disabled = false; submitButton.innerHTML = originalButtonContent;
                    contactForm.reset();
                    // No file name display to clear
                });
            });
            
            const closeTheSuccessModal = () => {
                successModal.style.display = 'none'; body.classList.remove('no-scroll');
            };
            successCloseTriggers.forEach(trigger => trigger.addEventListener('click', closeTheSuccessModal));
            window.addEventListener('click', (event) => {
                if (event.target === successModal) closeTheSuccessModal();
            });
            window.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && successModal.style.display === 'flex') closeTheSuccessModal();
            });
        }
        
        const yearElement = document.querySelector('.current-year');
        if (yearElement) yearElement.textContent = new Date().getFullYear();
        
        const counterElement = document.querySelector('.counter-number');
        if (counterElement) {
            let count = parseInt(localStorage.getItem('portfolioVisitorCount_Nethru_W_Futuristic') || '0') + 1;
            localStorage.setItem('portfolioVisitorCount_Nethru_W_Futuristic', count.toString());
            
            let current = 0; const target = count; const duration = 1500; 
            const stepTime = Math.max(10, Math.abs(Math.floor(duration / target)));
            
            const updateCounter = () => {
                const increment = Math.ceil(target / (duration / stepTime));
                current = Math.min(current + increment, target);
                counterElement.textContent = current;
                if (current < target) setTimeout(updateCounter, stepTime);
            };
            if (target > 0) updateCounter(); else counterElement.textContent = target;
        }
        
        const aiBtn = document.querySelector('.ai-assistant-btn');
        const aiPanel = document.querySelector('.ai-assistant-panel');
        const closeAiBtn = document.querySelector('.close-ai');
        const aiInput = document.querySelector('.ai-text-input');
        const aiSendBtn = document.querySelector('.ai-send');
        const aiVoiceBtn = document.querySelector('.ai-voice');
        const aiConversation = document.querySelector('.ai-conversation');
        
        if (aiBtn && aiPanel && closeAiBtn && aiInput && aiSendBtn && aiVoiceBtn && aiConversation) {
            aiBtn.addEventListener('click', () => aiPanel.classList.toggle('active'));
            closeAiBtn.addEventListener('click', () => aiPanel.classList.remove('active'));
            
            const aiResponses = {
                "hello": "Greetings! I am Nethru's AI Portfolio Assistant. How may I direct your query today?",
                "hi": "Hi there! Ready to explore Nethru's capabilities? Ask away!",
                "hey": "Hey! I can provide insights into Nethru's skills, projects, and more.",
                "about": "Nethru is a forward-thinking Software Engineering Undergraduate, specializing in Web & Mobile Development, IoT systems, and advanced Database Management. He thrives on crafting innovative solutions. More details are in the 'About Me' section.",
                "skills": "Nethru commands a versatile tech stack including Java, Python, C++, JavaScript, Flutter, SQL, and cloud platforms. The 'Skills Matrix' section offers a visual breakdown of his expertise.",
                "projects": "Nethru's portfolio features diverse projects such as a Video Games Data Analytics Platform, an IoT Smart Rice Cooker, and an AgriGrow Exchange web platform. Navigate to 'Project Showcase' for an interactive view.",
                "education": "Nethru is advancing his BSc (Hons) in Computing at NIBM, Galle, building upon a Diploma in Software Engineering. His foundational education was at Richmond College. The 'Educational Trajectory' section has specifics.",
                "contact": "To connect with Nethru, please use the 'Get in Touch' section. His primary email is wickramasekaranethru@gmail.com, and phone lines are 0720560125 / 0713964397.",
                "resume": "Nethru's comprehensive CV is available for download in the 'About Me' section via the 'Download CV' button.",
                "cv": "Nethru's comprehensive CV is available for download in the 'About Me' section via the 'Download CV' button.",
                "thank you": "You're most welcome! Can I assist with anything further?",
                "thanks": "My pleasure! Feel free to ask more questions.",
                "bye": "Farewell! Enjoy your exploration of Nethru's digital domain.",
                "default": "My apologies, I'm still calibrating my understanding for that query. Try asking about 'skills', 'projects', or 'how to contact Nethru'."
            };

            function addMessageToConversation(text, isUser = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'ai-message' + (isUser ? ' user-message' : '');
                messageDiv.innerHTML = `
                    <div class="ai-avatar ${isUser ? 'user-avatar' : 'ai-robot-avatar'}"><i class="fas ${isUser ? 'fa-user-astronaut' : 'fa-robot'}"></i></div>
                    <div class="ai-text">${text}</div>`;
                aiConversation.appendChild(messageDiv);
                aiConversation.scrollTop = aiConversation.scrollHeight; 
            }
            
            function processUserInput(input) {
                const normalizedInput = input.toLowerCase().trim();
                let responseKey = "default";
                const keywordMap = {
                    "about": ["about", "who is nethru", "tell me about him", "nethru's profile"],
                    "skills": ["skill", "what can he do", "technologies", "expertise", "proficient"],
                    "projects": ["project", "work", "portfolio item", "case studies", "showcase"],
                    "education": ["education", "study", "degree", "school", "academic"],
                    "contact": ["contact", "email", "phone", "reach him", "connect"],
                    "resume": ["cv", "resume", "download cv", "curriculum vitae"],
                    "hello": ["hello", "hi", "hey", "greetings", "good day"],
                    "thank you": ["thank", "thanks", "appreciate"],
                    "bye": ["bye", "goodbye", "see you", "later", "farewell"]
                };
                for (const key in keywordMap) {
                    if (keywordMap[key].some(keyword => normalizedInput.includes(keyword))) {
                        responseKey = key; break;
                    }
                }
                addMessageToConversation(aiResponses[responseKey]);
            }
            
            aiSendBtn.addEventListener('click', function() {
                const userInput = aiInput.value.trim();
                if (userInput) {
                    addMessageToConversation(userInput, true); processUserInput(userInput);
                    aiInput.value = ''; aiInput.focus();
                }
            });
            aiInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') aiSendBtn.click(); });
            
            if ('webkitSpeechRecognition' in window) {
                const recognition = new webkitSpeechRecognition();
                recognition.continuous = false; recognition.interimResults = false; recognition.lang = 'en-US';
                
                aiVoiceBtn.addEventListener('click', () => {
                    if (aiVoiceBtn.classList.contains('listening')) recognition.stop();
                    else try { recognition.start(); } catch(e) { console.error("Speech start error:", e); addMessageToConversation("Voice input error. Check permissions.");}
                });
                recognition.onstart = () => { aiVoiceBtn.classList.add('listening'); aiVoiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>'; };
                recognition.onresult = (event) => { aiInput.value = event.results[0][0].transcript; aiSendBtn.click(); };
                recognition.onerror = (event) => {
                    console.error("Speech error", event.error);
                    let msg = "Voice input failed.";
                    if (event.error === 'no-speech') msg = "No speech detected.";
                    else if (event.error === 'audio-capture') msg = "Microphone error.";
                    else if (event.error === 'not-allowed') msg = "Mic permission denied.";
                    addMessageToConversation(msg);
                };
                recognition.onend = () => { aiVoiceBtn.classList.remove('listening'); aiVoiceBtn.innerHTML = '<i class="fas fa-microphone"></i>'; };
            } else { aiVoiceBtn.style.display = 'none'; }
        }
        
        const portfolioSkillsData = {
            "Programming Languages": [
                { name: "Java", level: 85, icon: "fab fa-java" }, { name: "Python", level: 80, icon: "fab fa-python" },
                { name: "C++", level: 75, icon: "fas fa-file-code" }, { name: "C#", level: 75, icon: "fas fa-file-code" },
                { name: "Dart", level: 70, icon: "fas fa-mobile-screen-button" }, { name: "PHP", level: 70, icon: "fab fa-php" },
                { name: "C", level: 65, icon: "fas fa-file-code" }
            ],
            "Web Development": [
                { name: "HTML5", level: 90, icon: "fab fa-html5" }, { name: "CSS3", level: 88, icon: "fab fa-css3-alt" },
                { name: "JavaScript (ES6+)", level: 78, icon: "fab fa-js-square" }, { name: "ReactJS", level: 70, icon: "fab fa-react" },
                { name: "Node.js", level: 65, icon: "fab fa-node-js" }, { name: "Spring Boot", level: 60, icon: "fas fa-leaf" },
                { name: "Tailwind CSS", level: 68, icon: "fas fa-wind" }, { name: ".NET Framework", level: 70, icon: "fab fa-windows" }
            ],
            "Database Management": [
                { name: "SQL", level: 80, icon: "fas fa-database" }, { name: "MySQL", level: 80, icon: "fas fa-database" }, 
                { name: "MongoDB", level: 70, icon: "fas fa-database" }, { name: "SQLite", level: 70, icon: "fas fa-database" },
                { name: "Oracle DB", level: 60, icon: "fas fa-database" }
            ],
            "Mobile Development": [
                { name: "Flutter", level: 65, icon: "fas fa-mobile-screen-button" }, { name: "Android (Kotlin)", level: 70, icon: "fab fa-android" }
            ],
            "Tools & Technologies": [
                { name: "Git & GitHub", level: 90, icon: "fab fa-github" }, { name: "GitHub Actions", level: 60, icon: "fab fa-github-alt" },
                { name: "Firebase", level: 65, icon: "fas fa-fire" }, { name: "Arduino (IoT)", level: 75, icon: "fas fa-microchip" },
                { name: "Embedded Systems", level: 70, icon: "fas fa-cogs" }, { name: "Pandas", level: 75, icon: "fas fa-table-columns" }, 
                { name: "Tableau", level: 60, icon: "fas fa-chart-pie" }, { name: "GUI Development", level: 70, icon: "fas fa-desktop" },
                { name: "Figma", level: 70, icon: "fab fa-figma" }, { name: "Postman", level: 80, icon: "fas fa-rocket" }, 
                { name: "Data Structures", level: 75, icon: "fas fa-project-diagram" }, { name: "OOP Concepts", level: 85, icon: "fas fa-cubes" },
                { name: "API Development", level: 70, icon: "fas fa-code-branch" }
            ]
        };
        initSkillsVisualization(portfolioSkillsData); 
        
        const portfolioProjectsData = [
            {
                id: 1, title: "Video Games Data Analytics Platform",
                shortDescription: "End-to-end analytics pipeline for 70k+ game records for market trend insights using Python, BigQuery, and Tableau.",
                description: "Designed and implemented a comprehensive data analytics pipeline processing 71,716 video game records for market trend analysis. Performed extensive data cleaning (Python Pandas), built a scalable data warehouse (Google BigQuery), and developed interactive Tableau dashboards. Created advanced data models and integrated an end-to-end data pipeline.",
                image: "images/project_video_games_analytics.jpg",
                technologies: ["Python", "Google BigQuery", "Tableau", "Pandas", "SQL", "ETL"],
                category: "data",
                details: {
                    "Project Overview": "A comprehensive data analytics platform for video game market analysis, processing over 70,000 records to deliver insights into market trends, sales performance, and genre popularity.",
                    "Key Features Implemented": ["Data ingestion and cleaning (Python Pandas) for 71,716 records.", "Scalable data warehousing with Google BigQuery.", "Interactive and dynamic dashboards created in Tableau for visualization.", "Advanced data modeling to identify trends and correlations.", "Full end-to-end automated data pipeline."],
                    "Technologies Stack": "Python (Pandas, NumPy), Google BigQuery, SQL, Tableau, Data Warehousing Principles, ETL Processes.",
                    "Challenges & Innovative Solutions": "Efficiently managed large-scale dataset processing. Ensured high data integrity via robust validation. Designed intuitive, user-centric dashboards for complex data interpretation."
                },
                links: [{ text: "Explore on GitHub", url: "https://github.com/Nethru2002/Video-Games-Data-Analytics-Platform", icon: "fab fa-github" }]
            },
            {
                id: 2, title: "IoT Smart Rice Cooker",
                shortDescription: "Arduino-based IoT rice cooker with remote mobile app control and real-time cooking status monitoring.",
                description: "Engineered an IoT-enabled smart rice cooker utilizing Arduino. This intelligent kitchen appliance offers remote control via a mobile application and provides real-time monitoring of the cooking cycle, significantly enhancing user convenience and cooking precision.",
                image: "images/project_rice_cooker.jpg",
                technologies: ["Arduino", "C++ (Embedded)", "IoT Protocols", "Sensors", "Firebase"],
                category: "iot",
                details: {
                    "Project Overview": "An innovative IoT-enabled rice cooker designed to integrate smart technology into everyday kitchen tasks, allowing remote operation and precise cooking monitoring.",
                    "Key Features Implemented": ["Remote command and control through a dedicated mobile interface.", "Real-time updates on cooking progress, temperature, and estimated completion.", "Integration of temperature and moisture sensors for optimized cooking results.", "Automated cooking programs tailored to different rice varieties and quantities.", "User alert system for safety and cycle completion notifications."],
                    "Technologies Stack": "Arduino (ESP32/ESP8266), C++ for embedded systems, MQTT/HTTP communication, Temperature & Moisture Sensors, Firebase for backend and app connectivity.",
                    "Learning & Outcomes": "Developed expertise in embedded systems, sensor data acquisition, IoT device communication, and fundamental Man-Machine Interface (MMI) design for mobile applications."
                },
                links: [{ text: "Code on GitHub", url: "https://github.com/Nethru2002/Automatic_Rice_Cooker", icon: "fab fa-github" }]
            },
            {
                id: 3, title: "Rare Crop Home - Agricultural Product Exchange System",
                shortDescription: "Full-stack web platform connecting farmers and consumers for rare crop trading using PHP, MySQL, and Bootstrap.",
                description: "Designed and developed a comprehensive web-based agricultural product exchange platform connecting farmers directly with customers for rare crop trading and distribution. Implemented a full-stack solution using PHP backend, MySQL database, and responsive Bootstrap 5 frontend. Features include user management, product management with CRUD, inventory tracking, shopping cart, order processing, and secure payment gateway.",
                image: "images/project_rare_crop_home.jpg",
                technologies: ["PHP", "MySQL", "Bootstrap 5", "JavaScript", "HTML/CSS"],
                category: "web",
                details: {
                    "Project Overview": "A web platform designed to bridge the gap between farmers cultivating rare crops and consumers seeking unique agricultural products. It aims to foster direct trade, enhance transparency, and support local farming communities.",
                    "Key Features Implemented": ["Secure user registration and role-based dashboards for farmers and customers.", "Comprehensive product listing with detailed descriptions, pricing, and inventory management.", "Efficient shopping cart and order processing system.", "Admin panel for site management, user oversight, and transaction monitoring.", "Responsive design ensuring accessibility across various devices using Bootstrap 5."],
                    "Technologies Stack": "Backend: PHP. Database: MySQL. Frontend: HTML, CSS, JavaScript, Bootstrap 5.",
                    "Project Goal": "To create a dedicated marketplace for rare agricultural products, empowering small-scale farmers and providing consumers access to a wider variety of produce."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 4, title: "EcoPulse - Environmental Impact Tracker",
                shortDescription: "Desktop app for monitoring carbon footprint, water usage, and waste, featuring MVC, SQLite, and Material Design.",
                description: "Designed and developed a comprehensive desktop application to help users monitor and minimize their environmental impact including carbon footprint, water consumption, and waste generation. Implemented MVC architecture, SQLite database, Material Design UI, gamification, and social networking features.",
                image: "images/project_ecopulse.jpg",
                technologies: ["C#", ".NET Framework", "SQLite", "Material Design", "MVC"],
                category: "desktop",
                details: {
                    "Project Overview": "EcoPulse is a desktop application aimed at empowering individuals to track and reduce their personal environmental impact through insightful data visualization and actionable suggestions.",
                    "Key Features Implemented": ["Tracking modules for carbon emissions, water usage, and waste production.", "Data visualization through charts and reports to illustrate trends and progress.", "Gamification elements (points, badges) to encourage sustainable habits.", "SQLite database for local data storage and persistence.", "User-friendly interface based on Material Design principles.", "Implementation of the Model-View-Controller (MVC) architectural pattern for organized code structure."],
                    "Technologies Stack": "C#, .NET Framework (Windows Forms or WPF), SQLite, Material Design libraries (e.g., MaterialSkin), Charting libraries.",
                    "Impact Goal": "To raise awareness about individual environmental contributions and provide tools for users to make more sustainable lifestyle choices."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 5, title: "4-Way Traffic Light System",
                shortDescription: "Arduino-based 4-way traffic light system with optimized timing algorithms for enhanced traffic simulation.",
                description: "Designed and developed a 4-way traffic light system with optimized timing algorithms. Enhanced traffic management by simulating real-world scenarios.",
                image: "images/project_traffic_light.jpg",
                technologies: ["Arduino", "Embedded Systems", "C++"],
                category: "iot",
                details: {
                    "Project Overview": "A hardware project focused on creating an intelligent 4-way traffic light controller using an Arduino microcontroller. The system aims to optimize traffic flow through adaptive timing.",
                    "Key Features Implemented": ["Control logic for a standard 4-way intersection (Red, Yellow, Green LEDs for each direction).", "Implementation of basic and potentially adaptive timing algorithms based on simulated inputs or predefined patterns.", "Hardware interfacing with LEDs and potentially sensors.", "Modular C++ code for easy modification and expansion."],
                    "Technologies Stack": "Arduino (Uno/Nano or similar), C++, LEDs, Resistors, Breadboard, Jumper Wires.",
                    "Learning Focus": "Understanding embedded system programming, real-time control logic, hardware-software interaction, and traffic management principles at a basic level."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 6, title: "Ceylon Creations",
                shortDescription: "Full-stack Fair Trade web platform connecting Sri Lankan artisans with global consumers using MERN stack and cloud deployment.",
                description: "Developed a full-stack Fair Trade web platform connecting Sri Lankan artisans directly with global consumers, promoting cultural heritage and fair pricing. Engineered secure e-commerce functionalities, integrated crowdfunding modules, implemented JWT-based user authentication, and built a Skill Development Hub. Mapped tourism features and deployed using cloud hosting (AWS/Google Cloud) with MongoDB Atlas.",
                image: "images/project_ceylon_creations.png",
                technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Bootstrap", "AWS/GCP"],
                category: "web",
                details: {
                    "Project Overview": "Ceylon Creations is an e-commerce and community platform dedicated to promoting Sri Lankan artisans and their crafts on a global scale, emphasizing fair trade principles and cultural preservation.",
                    "Key Features Implemented": ["Secure user authentication (JWT) and role-based access (Artisans, Consumers, Admins).", "Product catalog with artisan profiles, product details, and e-commerce capabilities (cart, checkout).", "Integrated crowdfunding module for artisan projects or community initiatives.", "Skill Development Hub with resources and learning materials.", "Mapping of tourism features related to artisan locations or cultural sites.", "Cloud deployment on AWS/Google Cloud with MongoDB Atlas for database hosting."],
                    "Technologies Stack": "Frontend: React.js, Bootstrap. Backend: Node.js, Express.js. Database: MongoDB (Atlas). Authentication: JSON Web Tokens (JWT). Cloud: AWS or Google Cloud Platform.",
                    "Objective": "To create a sustainable online ecosystem that supports Sri Lankan artisans by providing market access, fair compensation, and opportunities for skill enhancement, while offering consumers authentic, ethically sourced products."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 7, title: "Library Management System",
                shortDescription: "SQL-based desktop system for efficient library operations, featuring ER diagrams and normalized database design.",
                description: "Designed and developed a comprehensive library management system using SQL for efficient operations and resource management. Created ER diagrams, implemented a normalized database structure with 9 interconnected tables, and developed DDL/DML operations.",
                image: "images/project_library_management.png",
                technologies: ["SQL", "Database Design", "ER Modeling", "MySQL", "Java/C# (GUI)"],
                category: "desktop",
                details: {
                    "Project Overview": "A robust system for managing library resources, member information, and borrowing/returning processes, built upon a well-structured relational database.",
                    "Key Features Implemented": ["Member registration and management.", "Book cataloging with search and filter capabilities.", "Check-in/check-out system for book borrowing and returns.", "Fine calculation for overdue books.", "Generation of reports.", "Database design including ER diagrams and normalization to 3NF with 9 tables.", "Implementation of DDL for schema creation and DML for data manipulation."],
                    "Technologies Stack": "Database: SQL (MySQL). Backend Logic/GUI: Java (Swing/JavaFX) or C# (WinForms/WPF).",
                    "Focus": "Efficient data management, relational database design principles, and core library operational workflows."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 8, title: "Computer Shop Management System",
                shortDescription: "Desktop GUI application for computer shop operations with database mapping, inventory, and payment processing.",
                description: "Designed and developed a comprehensive computer shop management system with complete database schema mapping and logical design for efficient business operations. Built an intuitive GUI application with 9 specialized forms, role-based access control, inventory management, and payment processing.",
                image: "images/project_computer_shop.jpg",
                technologies: ["GUI Development", "Database Design", "Java/C# (assumed)", "SQL", "Inventory Mgt"],
                category: "desktop",
                details: {
                    "Project Overview": "A specialized management system tailored for computer retail and service shops, streamlining sales, inventory, customer relations, and financial transactions.",
                    "Key Features Implemented": ["Product inventory management with stock tracking, categories, and pricing.", "Sales processing with invoice generation and payment handling.", "Customer database with purchase history and contact information.", "Role-based access control for different staff levels.", "Service and repair order tracking module.", "Intuitive GUI with 9 specialized forms for various operations.", "Reporting features for sales analysis, stock levels, and financial summaries."],
                    "Technologies Stack": "GUI Framework (Java Swing/JavaFX or C# WinForms/WPF), Database (MySQL, SQLite), Reporting tools.",
                    "Objective": "To provide a user-friendly and efficient software solution for managing the day-to-day operations of a computer shop."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 9, title: "PetCare Mobile App",
                shortDescription: "Android Kotlin app for pet health record management with Firebase, Google Maps, Room DB, and offline capabilities.",
                description: "Developed a comprehensive mobile application using native Android with Kotlin for digital pet health record management. Integrated Firebase Authentication, Google Maps SDK, Room Database, Retrofit, and Glide. Features include dual-user interface for pet owners and veterinarians, offline data storage, and GPS-based veterinarian search.",
                image: "images/project_petcare.png",
                technologies: ["Android Native", "Kotlin", "Firebase", "Google Maps", "Room DB", "Retrofit", "Glide"],
                category: "mobile",
                details: {
                    "Project Overview": "PetCare is a native Android mobile application designed to simplify pet health management for both pet owners and veterinarians, offering a centralized platform for records and communication.",
                    "Key Features Implemented": ["Secure user authentication via Firebase for pet owners and veterinarians.", "Digital pet health records (vaccinations, appointments, medical history).", "Dual-interface catering to the specific needs of owners and vets.", "Offline data access using Room Database for critical information.", "GPS-based search for nearby veterinarians using Google Maps SDK.", "Efficient image loading with Glide.", "Networking for data synchronization using Retrofit."],
                    "Technologies Stack": "Development Language: Kotlin. Platform: Native Android. Backend/Auth: Firebase. Local Storage: Room. Networking: Retrofit. Image Loading: Glide. Maps: Google Maps SDK.",
                    "User Value": "Provides a convenient and organized way to manage pet health, improving communication between pet owners and veterinarians and ensuring timely care."
                },
                links: [/* Add GitHub link if available */]
            },
            {
                id: 10, title: "Customer Purchase Prediction (ML)",
                shortDescription: "Python/Scikit-learn model for predicting customer purchase behavior, comparing ML algorithms with EDA and web deployment.",
                description: "Developed a predictive machine learning model to analyze customer purchasing behavior and forecast product category preferences using Python and scikit-learn. Implemented and compared four machine learning algorithms (K-Means, KNN, Decision Tree, Logistic Regression), performed extensive EDA, and developed a web-based interface for model deployment.",
                image: "images/project_customer_prediction.jpg",
                technologies: ["Python", "Scikit-learn", "Machine Learning", "Pandas", "Flask/Django"],
                category: "data",
                details: {
                    "Project Overview": "A machine learning project focused on predicting customer purchase patterns and product category preferences to enable targeted marketing and inventory management.",
                    "Key Features Implemented": ["Extensive Exploratory Data Analysis (EDA) to understand customer data.", "Implementation and comparative analysis of four ML algorithms: K-Means Clustering, K-Nearest Neighbors (KNN), Decision Trees, and Logistic Regression.", "Model training, tuning, and evaluation using appropriate metrics.", "Development of a web-based interface (e.g., using Flask or Django) for easy model interaction and deployment.", "Forecasting future product category preferences based on historical data."],
                    "Technologies Stack": "Programming Language: Python. ML Libraries: Scikit-learn. Data Manipulation: Pandas, NumPy. Visualization: Matplotlib, Seaborn. Web Framework (for UI): Flask or Django.",
                    "Application": "The model can be used by e-commerce businesses for personalized recommendations, targeted advertising campaigns, and optimizing stock levels."
                },
                links: [/* Add GitHub link if available */]
            }
        ];

        initProjects(portfolioProjectsData);

        const funFactBtn = document.querySelector('.fun-fact-btn');
        if (funFactBtn) {
            const funFacts = [
                "Nethru is deeply intrigued by the fusion of artificial intelligence and the creative arts.",
                "He champions the idea that technology's ultimate strength lies in connecting and empowering individuals.",
                "In his leisure, Nethru delves into game development and explores the nuances of music production.",
                "A staunch advocate for lifelong learning, he is perpetually acquiring new skills and knowledge.",
                "Nethru is driven by a passion for architecting user-centric and impactful digital experiences."
            ];
            const funFactDisplay = document.getElementById('funFactDisplay');
            funFactBtn.addEventListener('click', () => {
                const randomIndex = Math.floor(Math.random() * funFacts.length);
                if (funFactDisplay) {
                    funFactDisplay.style.opacity = '0'; 
                    setTimeout(() => {
                        funFactDisplay.textContent = funFacts[randomIndex];
                        funFactDisplay.style.opacity = '1';
                    }, 300);
                } else { alert(funFacts[randomIndex]); }
            });
        }
    } 
}); 

function initSkillsVisualization(skillsDataSource) {
    if (!skillsDataSource || Object.keys(skillsDataSource).length === 0) {
        console.warn("Skills data is empty or not provided.");
        return;
    }
    const visualizationBtns = document.querySelectorAll('.visualization-btn');
    const radarChartContainer = document.querySelector('.skills-radar-chart');
    const barsContainer = document.querySelector('.skills-bars');
    const gridContainer = document.querySelector('.skills-grid');

    if (!radarChartContainer || !barsContainer || !gridContainer || !radarChartContainer.querySelector('#radarChart')) {
        console.warn("Skill visualization containers or radarChart canvas not found.");
        return;
    }
    
    createRadarChart(skillsDataSource, radarChartContainer.querySelector('#radarChart'));
    createSkillBars(skillsDataSource, barsContainer);
    createSkillGrid(skillsDataSource, gridContainer);

    visualizationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            visualizationBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            
            radarChartContainer.style.display = view === 'radar' ? 'block' : 'none';
            barsContainer.style.display = view === 'bars' ? 'block' : 'none';
            gridContainer.style.display = view === 'grid' ? 'grid' : 'none';

            if (typeof ScrollReveal !== 'undefined') {
                if (view === 'bars') ScrollReveal().reveal(barsContainer.querySelectorAll('.skill-category'), { interval: 100, origin: 'left', viewFactor: 0.5, reset: true });
                if (view === 'grid') ScrollReveal().reveal(gridContainer.querySelectorAll('.skill-grid-item'), { interval: 50, origin: 'bottom', distance: '30px', viewFactor: 0.3, reset: true });
            }
        });
    });

    const initialActiveBtn = document.querySelector('.visualization-btn[data-view="radar"].active') || document.querySelector('.visualization-btn[data-view="radar"]');
    if (initialActiveBtn) {
        initialActiveBtn.click(); 
    } else if (visualizationBtns.length > 0) {
        visualizationBtns[0].click();
    }
}

function createRadarChart(skillsDataSource, canvasElement) {
    if (!canvasElement || typeof Chart === 'undefined') {
        console.warn("Radar chart canvas or Chart.js not found.");
        return;
    }
    const ctx = canvasElement.getContext('2d');

    let allSkillsFlat = [];
    for (const category in skillsDataSource) {
        skillsDataSource[category].forEach(skill => {
            allSkillsFlat.push({ name: skill.name, level: skill.level });
        });
    }

    const labels = allSkillsFlat.map(skill => skill.name);
    const data = allSkillsFlat.map(skill => skill.level);

    if (canvasElement.chartInstance) {
        canvasElement.chartInstance.destroy();
    }

    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-accent').trim();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
    const textSecondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
    const cardBgColor = getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim();
    const primaryFont = getComputedStyle(document.documentElement).getPropertyValue('--primary-font').trim();

    canvasElement.chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Proficiency Level',
                data: data,
                backgroundColor: `${accentColor}4D`, 
                borderColor: accentColor,     
                borderWidth: 2,
                pointBackgroundColor: accentColor,
                pointRadius: labels.length > 15 ? 2 : 3,
                pointHoverRadius: labels.length > 15 ? 3 : 5,
                pointBorderColor: cardBgColor, 
                pointHoverBorderColor: accentColor
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: borderColor }, 
                    grid: { color: borderColor },
                    pointLabels: { 
                        color: textSecondaryColor,
                        font: { 
                            size: labels.length > 20 ? 7 : (labels.length > 15 ? 8 : 10),
                            family: primaryFont 
                        },
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: textSecondaryColor,
                        showLabelBackdrop: false,
                        stepSize: 20,
                        beginAtZero: true,
                        max: 100,
                         font: { family: primaryFont } 
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: { 
                        color: textColor,
                        font: { size: 12, family: primaryFont },
                        padding: 15 
                    }
                },
                tooltip: {
                    backgroundColor: cardBgColor,
                    titleColor: accentColor,
                    bodyColor: textColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            const originalSkill = allSkillsFlat[context.dataIndex];
                            return `${originalSkill.name}: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

function createSkillBars(skillsDataSource, container) {
    container.innerHTML = ''; 
    Object.keys(skillsDataSource).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);
        
        const skillsListDiv = document.createElement('div');
        skillsListDiv.className = 'skills-list';
        
        skillsDataSource[category].forEach(skill => {
            const skillItemDiv = document.createElement('div');
            skillItemDiv.className = 'skill-item';
            skillItemDiv.innerHTML = `
                <div class="skill-info">
                    <span class="skill-name">${skill.name}</span>
                    <span class="skill-percent">${skill.level}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%;"></div>
                </div>
            `;
            skillsListDiv.appendChild(skillItemDiv);
        });
        
        categoryDiv.appendChild(skillsListDiv);
        container.appendChild(categoryDiv);
    });
}

function createSkillGrid(skillsDataSource, container) {
    container.innerHTML = ''; 
    let allSkillsFlat = [];
    Object.keys(skillsDataSource).forEach(category => {
        skillsDataSource[category].forEach(skill => {
            allSkillsFlat.push({
                name: skill.name,
                level: skill.level,
                icon: skill.icon || 'fas fa-code' 
            });
        });
    });
            
    allSkillsFlat.forEach(skill => {
        const skillGridItem = document.createElement('div');
        skillGridItem.className = 'skill-grid-item';
        
        skillGridItem.innerHTML = `
            <i class="${skill.icon} skill-icon"></i>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">${getSkillLevelText(skill.level)}</div>
            <div class="skill-percentage-bar">
                 <div class="skill-percentage-progress" style="width: ${skill.level}%;"></div>
            </div>
        `;
        container.appendChild(skillGridItem);
    });
}

function getSkillLevelText(percent) {
    if (percent >= 85) return 'Expert';
    if (percent >= 70) return 'Advanced';
    if (percent >= 50) return 'Proficient';
    if (percent >= 30) return 'Intermediate';
    return 'Foundational';
}

function initProjects(projectsDataSource) {
    const projectsContent = document.querySelector('.projects-content');
    const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const projectModal = document.querySelector('.project-modal');
    const projectsLoadingMsg = document.querySelector('.projects-loading-message');
    
    if (!projectsContent || !projectModal) {
        if(projectsLoadingMsg) projectsLoadingMsg.textContent = "Error: Project display area not found.";
        return;
    }
    if(projectsLoadingMsg) projectsLoadingMsg.style.display = 'none';

    const projectModalCloseBtn = projectModal.querySelector('.close-modal');
    const projectModalBody = projectModal.querySelector('.modal-body');

    function displayProjects(filter = 'all') {
        projectsContent.innerHTML = ''; 
        const filteredProjects = filter === 'all' ? projectsDataSource : projectsDataSource.filter(p => p.category.toLowerCase() === filter.toLowerCase());

        if (filteredProjects.length === 0) {
            projectsContent.innerHTML = `<p class="no-projects-message">No projects found in the "${filter}" category. Try 'All Projects'.</p>`;
            return;
        }

        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card animate__animated animate__fadeInUp'; 
            card.dataset.id = project.id;
            card.innerHTML = `
                <div class="project-img">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.shortDescription}</p>
                    <div class="project-tech">
                        ${project.technologies.slice(0, 4).map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            `;
            projectsContent.appendChild(card);
        });
    }

    function openProjectModal(projectId) {
        const project = projectsDataSource.find(p => p.id == projectId); 
        if (!project || !projectModalBody) return;

        let detailsHtml = '';
        if (project.details) {
            for (const [sectionTitle, sectionContent] of Object.entries(project.details)) {
                detailsHtml += `<div class="modal-project-section"><h3>${sectionTitle}</h3>`;
                if (Array.isArray(sectionContent)) {
                    detailsHtml += `<ul>${sectionContent.map(item => `<li>${item}</li>`).join('')}</ul>`;
                } else {
                    detailsHtml += `<p>${sectionContent}</p>`;
                }
                detailsHtml += `</div>`;
            }
        }

        let linksHtml = '';
        if (project.links && project.links.length > 0) {
            linksHtml = project.links.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="modal-project-link">
                    <i class="${link.icon}"></i> ${link.text}
                </a>
            `).join('');
        }

        projectModalBody.innerHTML = `
            <div class="modal-project-header">
                <div class="modal-project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                </div>
                <div class="modal-project-info-main">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <div class="modal-project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="modal-project-details">${detailsHtml}</div>
            ${linksHtml ? `<div class="modal-project-links">${linksHtml}</div>` : ''}
        `;
        projectModal.style.display = 'flex';
        document.body.classList.add('no-scroll');
        const modalContent = projectModal.querySelector('.project-modal-content');
        if (modalContent) modalContent.scrollTop = 0;
    }

    if (projectsContent) {
        projectsContent.addEventListener('click', function(e) {
            const card = e.target.closest('.project-card');
             if (card) { 
                const projectId = card.dataset.id;
                openProjectModal(projectId);
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayProjects(this.dataset.filter);
        });
    });

    const closeTheProjectModal = () => {
        if (projectModal) projectModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    };
    if(projectModalCloseBtn) projectModalCloseBtn.addEventListener('click', closeTheProjectModal);
    
    if (projectModal) {
        projectModal.addEventListener('click', function(event) { 
            if (event.target === projectModal) {
                closeTheProjectModal();
            }
        });
    }
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && projectModal && projectModal.style.display === 'flex') {
            closeTheProjectModal();
        }
    });

    displayProjects();
}

Chart.defaults.font.family = getComputedStyle(document.documentElement).getPropertyValue('--primary-font').trim();