document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. Theme Switcher Logic (Dark/Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    if (themeToggleBtn && themeIcon) {
        // Check saved preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            document.body.classList.remove('light-theme');
            themeIcon.className = 'fas fa-moon';
        } else {
            document.body.classList.add('light-theme');
            themeIcon.className = 'fas fa-sun';
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
    document.addEventListener('click', (event) => {
        const btn = event.target.closest('.code-preview-header i');
        if (!btn) return;

        const preElement = btn.closest('.code-preview')?.querySelector('pre code');
        if (!preElement) return;

        const codeText = preElement.innerText;

        navigator.clipboard.writeText(codeText).then(() => {
            const originalClassName = btn.className;
            btn.className = 'fas fa-check text-neon';
            setTimeout(() => {
                btn.className = originalClassName;
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar código: ', err);
        });
    });

    // ==========================================
    // 5. Dynamic Tips Manager (localStorage)
    // ==========================================
    const tipsStorageKey = 'portfolio-tips';

    function getTips() {
        const stored = localStorage.getItem(tipsStorageKey);
        if (!stored) {
            return [];
        }

        try {
            const parsed = JSON.parse(stored);
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.warn('Falha ao ler dicas armazenadas.', error);
            return [];
        }
    }

    function saveTips(tips) {
        localStorage.setItem(tipsStorageKey, JSON.stringify(tips));
    }

    function showTipsMessage(message) {
        const messageEl = document.getElementById('tips-message');
        if (!messageEl) return;
        messageEl.textContent = message;
        messageEl.classList.remove('hidden');
    }

    function resetTipForm() {
        const tipIdInput = document.getElementById('tip-id-edit');
        const tipTitleInput = document.getElementById('tip-title');
        const tipSubtitleInput = document.getElementById('tip-subtitle');
        const tipDescriptionInput = document.getElementById('tip-description');
        const tipCodeTitleInput = document.getElementById('tip-code-title');
        const tipCodeInput = document.getElementById('tip-code');
        const formTitle = document.getElementById('tips-form-title');
        const cancelBtn = document.getElementById('btn-cancel-edit');
        const tipsForm = document.getElementById('tips-form');

        if (tipIdInput) tipIdInput.value = '';
        if (tipTitleInput) tipTitleInput.value = '';
        if (tipSubtitleInput) tipSubtitleInput.value = '';
        if (tipDescriptionInput) tipDescriptionInput.value = '';
        if (tipCodeTitleInput) tipCodeTitleInput.value = '';
        if (tipCodeInput) tipCodeInput.value = '';
        if (formTitle) formTitle.textContent = 'Cadastrar nova dica';
        if (cancelBtn) cancelBtn.classList.add('hidden');
        if (tipsForm) tipsForm.classList.add('hidden');
    }

    function renderTips() {
        const tipsList = document.getElementById('tips-list');
        if (!tipsList) return;

        const tips = getTips();

        if (!tips.length) {
            tipsList.innerHTML = `
                <div class="detail-card">
                    <div class="detail-card-body">
                        <p style="margin: 0;">Nenhuma dica adicional salva ainda. Use o formulário acima para criar a primeira.</p>
                    </div>
                </div>
            `;
            return;
        }

        tipsList.innerHTML = tips.map((tip) => `
            <div class="detail-card">
                <div class="card-left-accent"></div>
                <div class="detail-card-header">
                    <div class="card-icon bg-blue-glow"><i class="fas fa-lightbulb text-neon"></i></div>
                    <div class="card-title-area">
                        <h3>${escapeHtml(tip.title)}</h3>
                        <p class="card-subtitle">${escapeHtml(tip.subtitle)}</p>
                    </div>
                </div>
                <div class="detail-card-body">
                    <p>${escapeHtml(tip.description)}</p>
                    <div class="code-preview mb-4">
                        <div class="code-preview-header">
                            <span>${escapeHtml(tip.codeTitle)}</span>
                            <i class="far fa-copy cursor-pointer hover:text-neon" title="Copiar código"></i>
                        </div>
                        <pre><code>${escapeHtml(tip.codeContent)}</code></pre>
                    </div>
                    <div class="comment-form-row" style="justify-content: flex-end; gap: 0.75rem; flex-wrap: wrap;">
                        <button type="button" class="btn-toggle-comments" data-action="edit-tip" data-tip-id="${tip.id}">Editar</button>
                        <button type="button" class="btn-submit-comment" data-action="delete-tip" data-tip-id="${tip.id}">Excluir</button>
                    </div>
                </div>
            </div>
        `).join('');

        tipsList.querySelectorAll('[data-action="edit-tip"]').forEach((button) => {
            button.addEventListener('click', () => {
                const tipId = button.getAttribute('data-tip-id');
                const tip = getTips().find((item) => item.id === tipId);
                if (!tip) return;

                const tipIdInput = document.getElementById('tip-id-edit');
                const tipTitleInput = document.getElementById('tip-title');
                const tipSubtitleInput = document.getElementById('tip-subtitle');
                const tipDescriptionInput = document.getElementById('tip-description');
                const tipCodeTitleInput = document.getElementById('tip-code-title');
                const tipCodeInput = document.getElementById('tip-code');
                const formTitle = document.getElementById('tips-form-title');
                const cancelBtn = document.getElementById('btn-cancel-edit');
                const tipsForm = document.getElementById('tips-form');

                if (tipIdInput) tipIdInput.value = tip.id;
                if (tipTitleInput) tipTitleInput.value = tip.title;
                if (tipSubtitleInput) tipSubtitleInput.value = tip.subtitle;
                if (tipDescriptionInput) tipDescriptionInput.value = tip.description;
                if (tipCodeTitleInput) tipCodeTitleInput.value = tip.codeTitle;
                if (tipCodeInput) tipCodeInput.value = tip.codeContent;
                if (formTitle) formTitle.textContent = 'Editar dica';
                if (cancelBtn) cancelBtn.classList.remove('hidden');
                if (tipsForm) tipsForm.classList.remove('hidden');

                tipsForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        tipsList.querySelectorAll('[data-action="delete-tip"]').forEach((button) => {
            button.addEventListener('click', () => {
                const tipId = button.getAttribute('data-tip-id');
                const tips = getTips().filter((item) => item.id !== tipId);
                saveTips(tips);
                renderTips();
                showTipsMessage('Dica removida do navegador.');
            });
        });
    }

    const tipsForm = document.getElementById('tips-form');
    const resetTipsBtn = document.getElementById('btn-reset-tips');
    const toggleTipFormBtn = document.getElementById('btn-toggle-tip-form');

    if (tipsForm) {
        tipsForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const tipIdInput = document.getElementById('tip-id-edit');
            const title = document.getElementById('tip-title')?.value.trim();
            const subtitle = document.getElementById('tip-subtitle')?.value.trim();
            const description = document.getElementById('tip-description')?.value.trim();
            const codeTitle = document.getElementById('tip-code-title')?.value.trim();
            const codeContent = document.getElementById('tip-code')?.value.trim();

            if (!title || !subtitle || !description || !codeTitle || !codeContent) {
                showTipsMessage('Preencha todos os campos para salvar a dica.');
                return;
            }

            const tips = getTips();
            const newTip = {
                id: tipIdInput?.value || `tip-${Date.now()}`,
                title,
                subtitle,
                description,
                codeTitle,
                codeContent
            };

            const updatedTips = tipIdInput?.value
                ? tips.map((tip) => tip.id === tipIdInput.value ? newTip : tip)
                : [newTip, ...tips];

            saveTips(updatedTips);
            renderTips();
            resetTipForm();
            showTipsMessage(tipIdInput?.value ? 'Dica atualizada com sucesso.' : 'Dica salva no navegador.');
        });
    }

    if (toggleTipFormBtn) {
        toggleTipFormBtn.addEventListener('click', () => {
            const tipsForm = document.getElementById('tips-form');
            const cancelBtn = document.getElementById('btn-cancel-edit');
            if (tipsForm) {
                tipsForm.classList.remove('hidden');
                document.getElementById('tip-title')?.focus();
            }
            if (cancelBtn) cancelBtn.classList.add('hidden');
            document.getElementById('tip-id-edit').value = '';
            document.getElementById('tips-form-title').textContent = 'Cadastrar nova dica';
        });
    }

    if (resetTipsBtn) {
        resetTipsBtn.addEventListener('click', () => {
            if (window.confirm('Limpar as dicas salvas neste navegador?')) {
                saveTips([]);
                renderTips();
                resetTipForm();
                showTipsMessage('Lista limpa.');
            }
        });
    }

    if (document.getElementById('btn-cancel-edit')) {
        document.getElementById('btn-cancel-edit').addEventListener('click', resetTipForm);
    }

    renderTips();

    // ==========================================
    // 6. Interactive Tips & Comments Logic
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
