/* =========================================
   1. מאגר הנתונים (JSON Data)
   ========================================= */
const jobsData = [
    {
        title: "מלצר/ית",
        description: "קבלת הזמנה, זכירת פריטים והעברה למטבח.",
        img: "../MidTask/Photos/Waiter.jpg",
        dataJob: "מלצר",
        dataFunction: "זיכרון",
        tags: ["זיכרון פעולה", "סדר ביצוע"]
    },
    {
        title: "סדרן/ית",
        description: "סידור מוצרים לפי קטגוריות ותאריכים.",
        img: "../MidTask/Photos/Shelf organizer.jpg",
        dataJob: "סדרן",
        dataFunction: "ארגון",
        tags: ["ארגון", "קטגוריזציה"]
    },
    {
        title: "פועל/ת מחסן",
        description: "איסוף פריטים לפי רשימת משלוח בסדר נכון.",
        img: "../MidTask/Photos/Warehouse worker.jpg",
        dataJob: "פועל מחסן",
        dataFunction: "זיכרון",
        tags: ["זיכרון פעולה", "רצף"]
    },
    {
        title: "עובד/ת בית קפה",
        description: "הכנת משקה לפי מרכיבים ספציפיים.",
        img: "../MidTask/Photos/Coffee shop.jpg",
        dataJob: "ברסטה",
        dataFunction: "זיכרון",
        tags: ["זיכרון פעולה", "דיוק"]
    },
    {
        title: "עובד/ת ניקיון",
        description: "ביצוע משימות ניקיון לפי פרוטוקול מסודר.",
        img: "../MidTask/Photos/Cleaning worker.jpg",
        dataJob: "ניקיון",
        dataFunction: "רצף",
        tags: ["רצף פעולות", "שיטתיות"]
    },
    {
        title: "קופאי/ת",
        description: "סריקה וחיוב, המתנה למצב הנכון.",
        img: "../MidTask/Photos/Cashier.jpg",
        dataJob: "קופאי",
        dataFunction: "עיכוב",
        tags: ["עיכוב תגובה", "דיוק"]
    },
    {
        title: "פועל/ת ייצור",
        description: "הרכבת חלקים לפי רצף: בסיס, חלק A, חלק B.",
        img: "../MidTask/Photos/Factory worker.jpg",
        dataJob: "ייצור",
        dataFunction: "זיכרון",
        tags: ["זיכרון פעולה", "בקרת איכות"]
    }
];

/* =========================================
   2. לוגיקה ראשית (Main Logic)
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. יצירת הכרטיסיות מתוך ה-JSON
    renderJobs();

    // 2. הפעלת מנגנון החיפוש
    initSearch();

    // 3. הפעלת טופס הסקר
    initForm();
});


// פונקציה: יצירת כרטיסיות Bootstrap מתוך המערך
function renderJobs() {
    const container = document.getElementById('jobsContainer');
    
    // הוספת מחלקות של Grid לבוטסטראפ
    container.classList.add('row', 'g-4');

    // הכנת המודאל (בדיוק כמו קודם)
    const infoModalElement = document.getElementById('infoModal');
    let infoModal = null;
    if (infoModalElement) {
        infoModal = new bootstrap.Modal(infoModalElement);
    }

    // מעבר על המערך ויצירת אלמנטים
    jobsData.forEach(job => {
        
        // יצירת העוטף החיצוני (Column)
        // חשוב: הוספנו את המחלקה 'job-item' ואת ה-Data Attributes
        // כדי שהחיפוש (initSearch) ימשיך לעבוד אותו דבר
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-4 job-item';
        colDiv.setAttribute('data-job', job.dataJob);
        colDiv.setAttribute('data-function', job.dataFunction);

        // יצירת הכרטיס
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100 shadow-sm border-0 cursor-pointer';

        // תמונה
        const img = document.createElement('img');
        img.src = job.img;
        img.className = 'card-img-top job-card-img object-fit-cover';
        img.alt = job.title;

        // גוף הכרטיס
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column';

        // כותרת
        const h3 = document.createElement('h3');
        h3.className = 'card-title fw-bold mb-3 text-primary';
        h3.innerText = job.title;

        // תיאור
        const p = document.createElement('p');
        p.className = 'card-text flex-grow-1 text-secondary';
        p.innerText = job.description;

        // אזור תגיות
        const footerDiv = document.createElement('div');
        footerDiv.className = 'mt-3 pt-3 border-top tags-area';

        // יצירת התגיות בלולאה פנימית
        job.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'badge bg-light text-dark border me-1 rounded-pill';
            span.innerText = tag;
            footerDiv.appendChild(span);
        });

        // הרכבת הכרטיס
        cardBody.appendChild(h3);
        cardBody.appendChild(p);
        cardBody.appendChild(footerDiv);
        
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        
        colDiv.appendChild(cardDiv);
        
        // הזרקה לקונטיינר הראשי
        container.appendChild(colDiv);

        // חיבור אירוע לחיצה למודאל
        if (infoModal) {
            cardDiv.addEventListener('click', function() {
                // כותרת המודאל
                document.getElementById('modalTitle').innerText = job.title;

                // יצירת HTML לתגיות בתוך המודאל
                let tagsHtml = '<div class="mt-3">';
                job.tags.forEach(tag => {
                    tagsHtml += `<span class="badge bg-secondary me-1">${tag}</span>`;
                });
                tagsHtml += '</div>';

                // תוכן המודאל
                document.getElementById('modalBody').innerHTML = `
                    <div class="text-center mb-3">
                        <img src="${job.img}" class="img-fluid rounded modal-job-img" alt="${job.title}">
                    </div>
                    <p class="fs-5">${job.description}</p>
                    <div class="alert alert-info mt-3 mb-0">
                        תפקוד ניהולי מתורגל: <strong>${job.dataFunction}</strong>
                        ${tagsHtml}
                    </div>
                `;

                infoModal.show();
            });
        }
    });
}

// מנגנון חיפוש (נשאר כמעט אותו דבר, כי בנינו את ה-HTML באותה צורה)
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    // שליפת אלמנט ההודעה
    const noResultsMsg = document.getElementById('noResults');

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const jobItems = document.querySelectorAll('.job-item'); 
        
        // משתנה מעקב - האם מצאנו לפחות תוצאה אחת?
        let hasResults = false;

        jobItems.forEach(item => {
            const dataJob = (item.getAttribute('data-job') || '').toLowerCase();
            const dataFunction = (item.getAttribute('data-function') || '').toLowerCase();
            
            let title = '';
            const titleEl = item.querySelector('.card-title');
            if (titleEl) {
                title = titleEl.innerText.toLowerCase();
            }

            const isMatch =
                searchTerm === '' ||
                dataJob.includes(searchTerm) ||
                dataFunction.includes(searchTerm) ||
                title.includes(searchTerm);

            if (isMatch) {
                item.classList.remove('d-none');
                hasResults = true; // מצאנו התאמה!
            } else {
                item.classList.add('d-none');
            }
        });

        // בדיקה בסוף הלולאה: אם לא מצאנו כלום - נציג את ההודעה
        if (hasResults) {
            noResultsMsg.classList.add('d-none'); // הסתרת ההודעה
        } else {
            noResultsMsg.classList.remove('d-none'); // הצגת ההודעה
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// טיפול בטופס הסקר ושליחה (SCORM או מקומי)
function initForm() {
    const surveyForm = document.getElementById('surveyForm');
    const successModalElement = document.getElementById('successModal');
    let successModal = null;
    if (successModalElement) {
        successModal = new bootstrap.Modal(successModalElement);
    }

    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const workField = document.getElementById('workField').value;
            const preferredJob = document.getElementById('preferredJob').value;
            const experienceLevel = document.getElementById('experienceLevel').value;
            const hasExperienceInput = document.querySelector('input[name="hasExperience"]:checked');
            const hasExperience = hasExperienceInput ? hasExperienceInput.value : '';
            const additionalComments = document.getElementById('additionalComments').value;

            if (!workField || !preferredJob || !experienceLevel || !hasExperience) {
                alert('אנא מלא את כל שדות החובה');
                return;
            }

            // מצב מקומי – ללא SCORM
            if (typeof sendSurveyToLMS !== 'function') {
                console.log('מצב מקומי - ללא SCORM');
                if (successModal) {
                    successModal.show();
                } else {
                    alert('תודה! הסקר נשמר מקומית (ללא LMS).');
                }
                surveyForm.reset();
                return;
            }

            // ניסיון שליחה ל-LMS
            const success = sendSurveyToLMS(
                workField,
                preferredJob,
                experienceLevel,
                hasExperience,
                additionalComments
            );

            if (success) {
                if (successModal) {
                    successModal.show();
                } else {
                    alert('תודה! הסקר נשלח בהצלחה ל-LMS.');
                }
            } else {
                console.log('אין חיבור SCORM - ממשיכים במצב מקומי');
                if (successModal) {
                    successModal.show();
                } else {
                    alert('תודה! הסקר נשמר מקומית (ללא LMS).');
                }
            }

            surveyForm.reset();
        });
    }
}