document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. Theme Switcher Logic (Dark/Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    if (themeToggleBtn && themeIcon) {
        // Check saved preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
        } else {
            document.body.classList.remove('light-theme');
            themeIcon.className = 'fas fa-moon';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            
            if (isLight) {
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('portfolio-theme', 'light');
            } else {
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('portfolio-theme', 'dark');
            }
        });
    }

    // ==========================================
    // 1. SPA Tab Navigation Logic
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTabId = item.getAttribute('data-tab');

            // Remove active class from all buttons and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active-content'));

            // Add active class to clicked button and target section
            item.classList.add('active');
            const targetSection = document.getElementById(targetTabId);
            if (targetSection) {
                targetSection.classList.add('active-content');
                
                // Scroll to top of content area on mobile when tab changes
                if (window.innerWidth <= 991) {
                    window.scrollTo({
                        top: document.querySelector('.content-area').offsetTop - 20,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================
    // 2. Typing Effect for Profile Subtitle
    // ==========================================
    const typingElement = document.getElementById('typing-text');
    const professions = [
        "BI DEVELOPER",
        "DATA ENGINEER",
        "QLIK & TALEND EXPERT",
        "WEB DEVELOPER"
    ];
    
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let delayBetweenTerms = 2000;

    function handleTyping() {
        const currentText = professions[professionIndex];
        
        if (isDeleting) {
            // Delete characters
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // delete faster
        } else {
            // Write characters
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Handle states
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at completion before deleting
            isDeleting = true;
            typingSpeed = delayBetweenTerms;
        } else if (isDeleting && charIndex === 0) {
            // Move to next profession
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500; // brief pause before writing next word
        }

        setTimeout(handleTyping, typingSpeed);
    }

    // Start typing effect
    if (typingElement) {
        // Initialize style to support typing blinking cursor
        typingElement.style.borderRight = "2px solid #4ade80";
        handleTyping();
    }

    // ==========================================
    // 3. Scheduler Form Handling
    // ==========================================
    const scheduleForm = document.getElementById('schedule-form');
    const schedulerSuccess = document.getElementById('scheduler-success');
    const dateInput = document.getElementById('sched-date');

    // Pre-fill date to tomorrow
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        let mm = tomorrow.getMonth() + 1; // Months start at 0
        let dd = tomorrow.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedTomorrow = `${yyyy}-${mm}-${dd}`;
        dateInput.value = formattedTomorrow;
        dateInput.min = formattedTomorrow; // Prevent choosing past dates
    }

    if (scheduleForm) {
        scheduleForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate sending data API/fetch request
            const submitBtn = scheduleForm.querySelector('.btn-submit-sched');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Agendando...';

            setTimeout(() => {
                // Success actions
                scheduleForm.classList.add('hidden');
                schedulerSuccess.classList.remove('hidden');
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }, 1800);
        });
    }

    // ==========================================
    // 4. Code Preview Copy Functionality
    // ==========================================
    const copyButtons = document.querySelectorAll('.code-preview-header i');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const preElement = btn.closest('.code-preview').querySelector('pre code');
            if (preElement) {
                const codeText = preElement.innerText;
                
                navigator.clipboard.writeText(codeText).then(() => {
                    // Visual feedback
                    btn.className = 'fas fa-check text-neon';
                    setTimeout(() => {
                        btn.className = 'far fa-copy cursor-pointer hover:text-neon';
                    }, 2000);
                }).catch(err => {
                    console.error('Falha ao copiar código: ', err);
                });
            }
        });
    });

    // ==========================================
    // 5. Interactive Tips & Comments Logic
    // ==========================================
    const defaultComments = {
        'qlik-inc-load': [
            {
                name: 'Gustavo Santos',
                text: 'Muito bom! Uso essa estratégia em um projeto com base de 100M de linhas e a carga caiu de 4 horas para 12 minutos.',
                date: '23/06/2026 10:12'
            },
            {
                name: 'Mariana Lima',
                text: 'Excelente explicação. Uma dúvida: como você trata a exclusão física de registros na origem quando usa carga incremental?',
                date: '23/06/2026 10:45'
            }
        ],
        'sql-dedup': [
            {
                name: 'Roberto Costa',
                text: 'Window functions são vida! Essa estratégia com ROW_NUMBER() é clássica e super performática para limpar as tabelas de staging no Snowflake.',
                date: '23/06/2026 09:30'
            }
        ]
    };

    function initComments() {
        Object.keys(defaultComments).forEach(id => {
            if (!localStorage.getItem(`comments-${id}`)) {
                localStorage.setItem(`comments-${id}`, JSON.stringify(defaultComments[id]));
            }
        });
    }

    function getComments(id) {
        const stored = localStorage.getItem(`comments-${id}`);
        return stored ? JSON.parse(stored) : [];
    }

    function saveComment(id, name, text) {
        const comments = getComments(id);
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        comments.push({ name, text, date: dateStr });
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
        return comments;
    }

    function renderComments(sectionEl) {
        const tipId = sectionEl.getAttribute('data-tip-id');
        const commentsList = sectionEl.querySelector('.comments-list');
        const commentCountSpan = sectionEl.querySelector('.comment-count');
        const comments = getComments(tipId);

        // Update count
        if (commentCountSpan) {
            commentCountSpan.textContent = comments.length;
        }

        // Render items
        if (commentsList) {
            commentsList.innerHTML = comments.map(comment => `
                <div class="comment-item">
                    <div class="comment-header">
                        <span class="comment-author">${escapeHtml(comment.name)}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-content">${escapeHtml(comment.text)}</div>
                </div>
            `).join('');
            
            // Auto scroll comments to bottom on load
            commentsList.scrollTop = commentsList.scrollHeight;
        }
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }

    // Initialize comments in localStorage
    initComments();

    // Attach Toggle and Form Listeners to all comment sections
    const commentSections = document.querySelectorAll('.comments-section');

    commentSections.forEach(section => {
        const toggleBtn = section.querySelector('.btn-toggle-comments');
        const container = section.querySelector('.comments-container');
        const form = section.querySelector('.comment-form');

        // Initial render
        renderComments(section);

        // Toggle open/close comments
        if (toggleBtn && container) {
            toggleBtn.addEventListener('click', () => {
                const isHidden = container.classList.contains('hidden');
                
                if (isHidden) {
                    container.classList.remove('hidden');
                    toggleBtn.classList.add('active-toggle');
                    // Scroll to see the full content
                    setTimeout(() => {
                        container.querySelector('.comments-list').scrollTop = container.querySelector('.comments-list').scrollHeight;
                    }, 50);
                } else {
                    container.classList.add('hidden');
                    toggleBtn.classList.remove('active-toggle');
                }
            });
        }

        // Add comment submission handler
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const tipId = section.getAttribute('data-tip-id');
                const nameInput = form.querySelector('.comment-input-name');
                const textInput = form.querySelector('.comment-input-text');
                
                if (nameInput.value.trim() && textInput.value.trim()) {
                    saveComment(tipId, nameInput.value.trim(), textInput.value.trim());
                    
                    // Reset inputs
                    nameInput.value = '';
                    textInput.value = '';

                    // Re-render
                    renderComments(section);
                }
            });
        }
    });

});
