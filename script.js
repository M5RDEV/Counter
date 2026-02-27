document.addEventListener('DOMContentLoaded', function () {
    // عناصر DOM
    const themeToggle = document.getElementById('themeToggle');
    const currentDhikr = document.getElementById('currentDhikr');
    const counterNumbers = document.getElementById('counterNumbers');
    const countBtn = document.getElementById('countBtn');
    const resetBtn = document.getElementById('resetBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    const maxCountInput = document.getElementById('maxCount');
    const groupsList = document.getElementById('groupsList');
    const addGroupBtn = document.getElementById('addGroupBtn');
    const groupEditModal = document.getElementById('groupEditModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const groupNameInput = document.getElementById('groupName');
    const dhikrList = document.getElementById('dhikrList');
    const dhikrTextInput = document.getElementById('dhikrText');
    const dhikrCountInput = document.getElementById('dhikrCount');
    const saveDhikrBtn = document.getElementById('saveDhikrBtn');
    const saveGroupBtn = document.getElementById('saveGroupBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const addToGroupBtn = document.getElementById('addToGroupBtn');
    const groupDropdown = document.getElementById('groupDropdown');

    // حالة التطبيق
    let state = {
        count: 0,
        maxCount: null,
        currentDhikr: null,
        currentGroup: null,
        editingDhikr: null,
        editingGroup: null,
        groups: [
            {
                id: '1',
                name: 'أذكار الصباح',
                dhikrs: {
                    'أصبحنا وأصبح الملك لله والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير': 1,
                    'اللهم بك أصبحنا وبك أمسينا وبك نحيا وبك نموت وإليك النشور': 1,
                    'رضيت بالله ربًا وبالإسلام دينًا وبمحمد صلى الله عليه وسلم نبيًا': 3,
                    'اللهم إني أصبحت أشهدك وأشهد حملة عرشك وملائكتك وجميع خلقك أنك أنت الله لا إله إلا أنت وحدك لا شريك لك وأن محمدًا عبدك ورسولك': 4,
                    'اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك فلك الحمد ولك الشكر': 1,
                    'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم': 7,
                    'سبحان الله وبحمده': 100,
                    'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم': 3,
                    'اللهم إني أسألك العافية في الدنيا والآخرة': 1,
                    'اللهم فاطر السماوات والأرض عالم الغيب والشهادة رب كل شيء ومليكه أعوذ بك من شر نفسي ومن شر الشيطان وشركه': 1,
                    'قراءة آية الكرسي': 1,
                    'قراءة سورة الإخلاص': 3,
                    'قراءة سورة الفلق': 3,
                    'قراءة سورة الناس': 3
                }
            },

            {
                id: '2',
                name: 'أذكار المساء',
                dhikrs: {
                    'أمسينا وأمسى الملك لله والحمد لله لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير': 1,
                    'اللهم بك أمسينا وبك أصبحنا وبك نحيا وبك نموت وإليك المصير': 1,
                    'رضيت بالله ربًا وبالإسلام دينًا وبمحمد صلى الله عليه وسلم نبيًا': 3,
                    'اللهم إني أمسيت أشهدك وأشهد حملة عرشك وملائكتك وجميع خلقك أنك أنت الله لا إله إلا أنت وحدك لا شريك لك وأن محمدًا عبدك ورسولك': 4,
                    'اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك فلك الحمد ولك الشكر': 1,
                    'حسبي الله لا إله إلا هو عليه توكلت وهو رب العرش العظيم': 7,
                    'سبحان الله وبحمده': 100,
                    'بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم': 3,
                    'اللهم إني أسألك العفو والعافية في ديني ودنياي وأهلي ومالي': 1,
                    'أعوذ بكلمات الله التامات من شر ما خلق': 3,
                    'قراءة آية الكرسي': 1,
                    'قراءة سورة الإخلاص': 3,
                    'قراءة سورة الفلق': 3,
                    'قراءة سورة الناس': 3
                }
            },

            {
                id: '3',
                name: 'أذكار النوم',
                dhikrs: {
                    'باسمك اللهم أموت وأحيا': 1,
                    'اللهم قني عذابك يوم تبعث عبادك': 3,
                    'سبحان الله': 33,
                    'الحمد لله': 33,
                    'الله أكبر': 34,
                    'اللهم أسلمت نفسي إليك وفوضت أمري إليك وألجأت ظهري إليك': 1,
                    'قراءة آية الكرسي': 1,
                    'قراءة سورة الإخلاص': 3,
                    'قراءة سورة الفلق': 3,
                    'قراءة سورة الناس': 3
                }
            },

            {
                id: '4',
                name: 'أذكار الاستيقاظ من النوم',
                dhikrs: {
                    'الحمد لله الذي أحيانا بعدما أماتنا وإليه النشور': 1,
                    'لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير سبحان الله والحمد لله ولا إله إلا الله والله أكبر ولا حول ولا قوة إلا بالله': 1
                }
            },

            {
                id: '5',
                name: 'الاستغفار',
                dhikrs: {
                    'أستغفر الله': 100,
                    'اللهم اغفر لي ذنبي كله دقه وجله وأوله وآخره وعلانيته وسره': 100,
                    'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه': 100,
                    'اللهم أنت ربي لا إله إلا أنت خلقتني وأنا عبدك وأنا على عهدك ووعدك ما استطعت': 1
                }
            },

            {
                id: '6',
                name: 'التسبيح',
                dhikrs: {
                    'سبحان الله': 100,
                    'الحمد لله': 100,
                    'الله أكبر': 100,
                    'لا إله إلا الله': 100,
                    'لا حول ولا قوة إلا بالله': 100,
                    'سبحان الله وبحمده سبحان الله العظيم': 100
                }
            },

            {
                id: '7',
                name: 'أذكار بعد الصلاة',
                dhikrs: {
                    'أستغفر الله': 3,
                    'اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام': 1,
                    'سبحان الله': 33,
                    'الحمد لله': 33,
                    'الله أكبر': 34,
                    'لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير': 1,
                    'قراءة آية الكرسي': 1
                }
            }
        ],
        darkMode: localStorage.getItem('darkMode') === 'true'
    };
    // وضع إضافة سريع: عند الضغط على + بدون مجموعة محددة
    state.addMode = false;

    // إنشاء عنصر الإشعارات في DOM
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);

    // دالة لعرض الإشعارات
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;

        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            notification.remove();
        });

        notification.appendChild(messageSpan);
        notification.appendChild(closeButton);

        notificationContainer.appendChild(notification);

        // إزالة الإشعار تلقائياً بعد 3 ثوان
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // حفظ الحالة محليًا على كل تغيير
    function saveState() {
        try {
            const toSave = {
                groups: state.groups,
                currentGroupId: state.currentGroup ? state.currentGroup.id : null,
                currentDhikr: state.currentDhikr,
                count: state.count,
                maxCount: state.maxCount,
                darkMode: state.darkMode
            };
            localStorage.setItem('counterState', JSON.stringify(toSave));
        } catch (e) {
            console.error('Failed to save state', e);
        }
    }

    // تهيئة التطبيق
    function init() {
        // استرجاع الحالة المحفوظة محليًا إن وجدت
        const saved = localStorage.getItem('counterState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.groups) state.groups = parsed.groups;
                if (parsed.darkMode !== undefined) {
                    state.darkMode = parsed.darkMode;
                    if (state.darkMode) {
                        document.documentElement.setAttribute('data-theme', 'dark');
                        themeToggle.checked = true;
                    }
                }
                if (parsed.currentGroupId) {
                    const g = state.groups.find(x => x.id === parsed.currentGroupId);
                    if (g) state.currentGroup = g;
                }
                state.currentDhikr = parsed.currentDhikr || null;
                state.count = parsed.count || 0;
                state.maxCount = parsed.maxCount || null;
            } catch (e) {
                console.error('Failed to parse saved state', e);
            }
        }
        // تحميل الوضع المظلم
        if (state.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }

        // عرض المجموعات
        renderGroups();

        // تحديث العداد
        updateCounter();
    }

    // تبديل الوضع المظلم
    themeToggle.addEventListener('change', function () {
        state.darkMode = this.checked;
        localStorage.setItem('darkMode', state.darkMode);

        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        saveState();
    });

    // فتح/إغلاق الإعدادات (مع إغلاق أي قوائم منسدلة مفتوحة لاحقًا)

    closeSettings.addEventListener('click', function () {
        settingsPanel.classList.remove('open');
        state.addMode = false;
        groupsList.classList.remove('add-mode');
    });

    // إضافة/تعديل المجموعات
    addGroupBtn.addEventListener('click', function () {
        openGroupModal(null);
    });

    function openGroupModal(group) {
        if (group) {
            state.editingGroup = { ...group, dhikrs: { ...group.dhikrs } };
            modalTitle.textContent = 'تعديل المجموعة';
            groupNameInput.value = group.name;

            // عرض الأذكار
            dhikrList.innerHTML = '';
            for (const [text, count] of Object.entries(group.dhikrs)) {
                addDhikrToModal(text, count);
            }
        } else {
            state.editingGroup = { id: '', name: '', dhikrs: {} };
            modalTitle.textContent = 'إضافة مجموعة جديدة';
            groupNameInput.value = '';
            dhikrList.innerHTML = '';
        }

        state.editingDhikr = null;
        dhikrTextInput.value = '';
        dhikrCountInput.value = '1';

        groupEditModal.classList.add('open');
    }

    function addDhikrToModal(text, count) {
        const dhikrItem = document.createElement('div');
        dhikrItem.className = 'dhikr-item';
        if (state.currentDhikr === text && state.currentGroup?.id === state.editingGroup?.id) {
            dhikrItem.classList.add('selected');
        }

        dhikrItem.innerHTML = `
            <span>${text} (${count} مرة)</span>
            <div class="dhikr-actions">
                <button class="edit-dhikr-btn" title="تعديل"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-dhikr-btn" title="حذف"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        dhikrItem.querySelector('.edit-dhikr-btn').addEventListener('click', function (e) {
            e.stopPropagation();
            state.editingDhikr = text;
            dhikrTextInput.value = text;
            dhikrCountInput.value = count;
        });

        dhikrItem.querySelector('.delete-dhikr-btn').addEventListener('click', function (e) {
            e.stopPropagation();
            deleteDhikr(text);
        });

        dhikrItem.addEventListener('click', function () {
            dhikrList.querySelectorAll('.dhikr-item').forEach(item => {
                item.classList.remove('selected');
            });
            dhikrItem.classList.add('selected');
        });

        dhikrList.appendChild(dhikrItem);
    }

    function deleteDhikr(text) {
        if (confirm(`هل تريد حذف الذكر "${text}"؟`)) {
            delete state.editingGroup.dhikrs[text];
            renderDhikrsInModal();
            // إذا كانت هذه المجموعة موجودة مسبقًا فحدّث المجموعات المحفوظة فورًا
            if (state.editingGroup.id) {
                const idx = state.groups.findIndex(g => g.id === state.editingGroup.id);
                if (idx !== -1) {
                    state.groups[idx] = { id: state.editingGroup.id, name: state.editingGroup.name, dhikrs: { ...state.editingGroup.dhikrs } };
                    renderGroups();
                }
            }
            showNotification('تم حذف الذكر بنجاح', 'success');
            saveState();
        }
    }

    function renderDhikrsInModal() {
        dhikrList.innerHTML = '';
        for (const [text, count] of Object.entries(state.editingGroup.dhikrs)) {
            addDhikrToModal(text, count);
        }
    }

    saveDhikrBtn.addEventListener('click', function () {
        const text = dhikrTextInput.value.trim();
        const count = parseInt(dhikrCountInput.value) || 1;

        if (!text) {
            showNotification('الرجاء إدخال نص الذكر', 'error');
            return;
        }

        if (state.editingDhikr) {
            // تعديل ذكر موجود
            if (state.editingDhikr !== text) {
                delete state.editingGroup.dhikrs[state.editingDhikr];
            }
            state.editingGroup.dhikrs[text] = count;
            state.editingDhikr = null;
            showNotification('تم تعديل الذكر بنجاح', 'success');
        } else {
            // إضافة ذكر جديد
            state.editingGroup.dhikrs[text] = count;
            showNotification('تم إضافة الذكر بنجاح', 'success');
        }

        renderDhikrsInModal();
        dhikrTextInput.value = '';
        dhikrCountInput.value = '1';
        // إذا كنّا نعدل مجموعة موجودة، حدّثها فورًا واحفظ محليًا
        if (state.editingGroup.id) {
            const idx = state.groups.findIndex(g => g.id === state.editingGroup.id);
            if (idx !== -1) {
                state.groups[idx] = { id: state.editingGroup.id, name: state.editingGroup.name, dhikrs: { ...state.editingGroup.dhikrs } };
                renderGroups();
            }
            saveState();
        }
    });

    saveGroupBtn.addEventListener('click', function () {
        const name = groupNameInput.value.trim();

        if (!name) {
            showNotification('الرجاء إدخال اسم المجموعة', 'error');
            return;
        }

        if (state.editingGroup.id) {
            // تعديل مجموعة موجودة
            const groupIndex = state.groups.findIndex(g => g.id === state.editingGroup.id);
            if (groupIndex !== -1) {
                state.groups[groupIndex] = {
                    id: state.editingGroup.id,
                    name: name,
                    dhikrs: { ...state.editingGroup.dhikrs }
                };
                showNotification('تم تعديل المجموعة بنجاح', 'success');
            }
        } else {
            // إضافة مجموعة جديدة
            state.editingGroup.id = Date.now().toString();
            state.editingGroup.name = name;
            state.groups.push({
                id: state.editingGroup.id,
                name: name,
                dhikrs: { ...state.editingGroup.dhikrs }
            });
            showNotification('تم إضافة المجموعة بنجاح', 'success');
        }

        renderGroups();
        groupEditModal.classList.remove('open');
        saveState();
    });

    cancelEditBtn.addEventListener('click', function () {
        groupEditModal.classList.remove('open');
    });

    closeModal.addEventListener('click', function () {
        groupEditModal.classList.remove('open');
    });

    // عرض المجموعات
    function renderGroups() {
        groupsList.innerHTML = '';

        // وضع الـ add-mode يغيّر سلوك النقر على المجموعة
        groupsList.classList.toggle('add-mode', state.addMode);

        state.groups.forEach(group => {
            const groupItem = document.createElement('div');
            groupItem.className = 'group-item';
            if (state.currentGroup?.id === group.id) {
                groupItem.classList.add('selected');
            }

            groupItem.innerHTML = `
                <span>${group.name} (${Object.keys(group.dhikrs).length} ذكر)</span>
                <div class="group-actions">
                    <button class="edit-group-btn" title="تعديل"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete-group-btn" title="حذف"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            groupItem.addEventListener('click', function () {
                if (state.addMode) {
                    // في وضع الإضافة: افتح نافذة تعديل المجموعة للسماح بإضافة ذكر جديد
                    openGroupModal(group);
                    // جهّز الحقول لإضافة ذكر
                    setTimeout(() => {
                        state.editingDhikr = null;
                        dhikrTextInput.value = '';
                        dhikrCountInput.value = '1';
                        dhikrTextInput.focus();
                    }, 50);
                    state.addMode = false;
                    groupsList.classList.remove('add-mode');
                } else {
                    selectGroup(group);
                }
            });

            groupItem.querySelector('.edit-group-btn').addEventListener('click', function (e) {
                e.stopPropagation();
                openGroupModal(group);
            });

            groupItem.querySelector('.delete-group-btn').addEventListener('click', function (e) {
                e.stopPropagation();
                if (confirm(`هل تريد حذف مجموعة "${group.name}"؟`)) {
                    deleteGroup(group);
                }
            });

            groupsList.appendChild(groupItem);
        });
    }

    // زر الإضافة داخل مربع العداد: يضيف ذكرًا للمجموعة الحالية أو يفتح قائمة منسدلة للاختيار
    let dropdownOpen = false;

    function closeGroupDropdown() {
        dropdownOpen = false;
        groupDropdown.classList.remove('open');
        groupDropdown.innerHTML = '';
        addToGroupBtn.classList.remove('dropdown-mode');
        // إذا كانت هناك مجموعة حالية، نظهر أيقونة الإغلاق، وإلا نُظهر زائد
        if (state.currentGroup) {
            addToGroupBtn.classList.add('group-open');
            addToGroupBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            addToGroupBtn.classList.remove('group-open');
            addToGroupBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
        }
        document.removeEventListener('click', onDocClickForDropdown);
        document.removeEventListener('keydown', onDocKeyDownForDropdown);
    }

    function onDocClickForDropdown(e) {
        if (!groupDropdown.contains(e.target) && e.target !== addToGroupBtn && !addToGroupBtn.contains(e.target)) {
            closeGroupDropdown();
        }
    }

    function onDocKeyDownForDropdown(e) {
        if (e.key === 'Escape') closeGroupDropdown();
    }

    function openGroupDropdown() {
        groupDropdown.innerHTML = '';
        state.groups.forEach(g => {
            const item = document.createElement('div');
            item.className = 'item';
            item.textContent = `${g.name} (${Object.keys(g.dhikrs).length})`;
            item.addEventListener('click', function (ev) {
                ev.stopPropagation();
                // اختر المجموعة مباشرةً لاستخدامها في التسبيح
                state.currentGroup = g;
                const dhikrs = Object.keys(g.dhikrs);
                if (dhikrs.length > 0) {
                    state.currentDhikr = dhikrs[0];
                    state.maxCount = g.dhikrs[state.currentDhikr];
                    state.count = state.maxCount; // ابدأ العد من القيمة الكاملة
                } else {
                    state.currentDhikr = null;
                    state.maxCount = null;
                    state.count = 0;
                }
                updateCounter();
                // غلق القائمة (وستعرض الدالة أيقونة الإغلاق تلقائيًا إذا كانت هناك مجموعة محددة)
                closeGroupDropdown();
            });
            groupDropdown.appendChild(item);
        });

        // موقع القائمة بالقرب من الزر
        const rect = addToGroupBtn.getBoundingClientRect();
        const dropdownWidth = Math.min(320, Math.max(200, rect.width * 4));
        groupDropdown.style.minWidth = dropdownWidth + 'px';
        // نضعها أسفل الزر
        groupDropdown.style.left = (rect.left) + 'px';
        groupDropdown.style.top = (rect.bottom + 8) + 'px';

        groupDropdown.classList.add('open');
        addToGroupBtn.classList.add('dropdown-mode');
        addToGroupBtn.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
        dropdownOpen = true;
        document.addEventListener('click', onDocClickForDropdown);
        document.addEventListener('keydown', onDocKeyDownForDropdown);
    }

    addToGroupBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        // إذا كانت هناك مجموعة محددة والأيقونة في حالة 'group-open'، نغلق المجموعة
        if (state.currentGroup) {
            // إلغاء اختيار المجموعة والعودة للحالة الابتدائية (عداد مفتوح بدون نص)
            state.currentGroup = null;
            state.currentDhikr = null;
            state.maxCount = null;
            state.count = 0;
            updateCounter();
            addToGroupBtn.classList.remove('group-open');
            addToGroupBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            return;
        }

        if (dropdownOpen) {
            closeGroupDropdown();
        } else {
            openGroupDropdown();
        }
    });

    // إغلاق القائمة عند فتح لوحة الإعدادات التقليدية
    settingsBtn.addEventListener('click', function () {
        closeGroupDropdown();
        settingsPanel.classList.add('open');
    });

    function deleteGroup(group) {
        state.groups = state.groups.filter(g => g.id !== group.id);
        if (state.currentGroup?.id === group.id) {
            state.currentGroup = null;
            state.currentDhikr = null;
            state.maxCount = null;
            state.count = 0;
            updateCounter();
        }
        renderGroups();
        showNotification('تم حذف المجموعة بنجاح', 'success');
        saveState();
    }

    // اختيار مجموعة وذكر
    function selectGroup(group) {
        state.currentGroup = group;
        const dhikrs = Object.keys(group.dhikrs);
        if (dhikrs.length > 0) {
            state.currentDhikr = dhikrs[0];
            state.maxCount = group.dhikrs[state.currentDhikr];
            state.count = state.maxCount; // بدء العد التنازلي من القيمة الكاملة
        } else {
            state.currentDhikr = null;
            state.maxCount = null;
            state.count = 0;
        }
        updateCounter();
        settingsPanel.classList.remove('open');
        saveState();
    }

    // العداد - العد التنازلي
    countBtn.addEventListener('click', function () {
        if (state.maxCount !== null) {
            if (state.count > 0) {
                state.count--;

                if (state.count === 0) {
                    // انتقل للذكر التالي عند الانتهاء
                    moveToNextDhikr();
                }
            }
        } else {
            // إذا كان العداد مفتوحًا بدون حد أقصى
            state.count++;
        }

        updateCounter();
        saveState();
    });

    resetBtn.addEventListener('click', function () {
        if (state.maxCount !== null) {
            state.count = state.maxCount; // إعادة التعيين إلى القيمة الكاملة
        } else {
            state.count = 0;
        }
        updateCounter();
        saveState();
    });

    function moveToNextDhikr() {
        if (!state.currentGroup) return;

        const dhikrs = Object.keys(state.currentGroup.dhikrs);
        const currentIndex = dhikrs.indexOf(state.currentDhikr);

        // عرض إشعار انتهاء الذكر الحالي
        showDhikrCompletionNotification();

        // إذا كان هناك أذكار أخرى في المجموعة
        if (currentIndex < dhikrs.length - 1) {
            const nextIndex = currentIndex + 1;
            state.currentDhikr = dhikrs[nextIndex];
            state.maxCount = state.currentGroup.dhikrs[state.currentDhikr];
            state.count = state.maxCount; // بدء العد التنازلي من القيمة الكاملة
        } else {
            // إذا كانت هذه آخر ذكر في المجموعة
            showGroupCompletionNotification();
            state.currentDhikr = dhikrs[0];
            state.maxCount = state.currentGroup.dhikrs[state.currentDhikr];
            state.count = state.maxCount; // بدء العد التنازلي من القيمة الكاملة
        }

        updateCounter();
    }

    function showDhikrCompletionNotification() {
        showNotification(`تم الانتهاء من الذكر: ${state.currentDhikr}`, 'success');
    }

    function showGroupCompletionNotification() {
        showNotification(`تهانينا! لقد أكملت مجموعة ${state.currentGroup.name}`, 'success');
    }

    // تحديث العداد
    function updateCounter() {
        // تحديث العدد الحالي
        const countStr = state.count.toString();
        counterNumbers.innerHTML = '';

        if (countStr.length > 4) {
            const numberDiv = document.createElement('div');
            numberDiv.className = 'counter-number';
            numberDiv.textContent = countStr;
            counterNumbers.appendChild(numberDiv);
        } else {
            // عرض الأرقام بشكل صحيح (بدون عكس)
            for (let i = 0; i < countStr.length; i++) {
                const numberDiv = document.createElement('div');
                numberDiv.className = 'counter-number';
                numberDiv.textContent = countStr[i];
                counterNumbers.appendChild(numberDiv);
            }
        }


        // تحديث الذكر الحالي: إذا لم تُختر مجموعة نُخفي العنصر
        if (state.currentDhikr) {
            currentDhikr.textContent = state.currentDhikr;
            currentDhikr.style.display = 'flex';
        } else {
            currentDhikr.textContent = '';
            currentDhikr.style.display = 'none';
        }

        // تحديث العدد الأقصى في الإعدادات
        maxCountInput.value = state.maxCount !== null ? state.maxCount : '';
    }

    // تغيير العدد الأقصى يدويًا
    maxCountInput.addEventListener('change', function () {
        const value = parseInt(this.value);
        state.maxCount = isNaN(value) ? null : value;

        if (state.maxCount !== null) {
            state.count = Math.min(state.count, state.maxCount);
            updateCounter();
        }
    });

    // بدء التشغيل
    init();
});