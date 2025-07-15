// Wedding Guest App JavaScript
class WeddingGuestApp {
    constructor() {
        this.weddingData = null;
        this.countdownInterval = null;
        this.currentQuizQuestion = 0;
        this.userAnswers = [];
        this.quizCompleted = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadWeddingData();
    }
    
    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
        
        // Modal close events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePhotoModal();
            }
        });
        
        document.getElementById('photo-modal').addEventListener('click', (e) => {
            if (e.target.id === 'photo-modal') {
                this.closePhotoModal();
            }
        });
    }
    
    async loadWeddingData() {
        try {
            // Get wedding ID from URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const weddingId = urlParams.get('id');
            
            if (!weddingId) {
                this.showError('No wedding ID provided');
                return;
            }
            
            // In a real implementation, this would fetch from your server
            // For now, we'll simulate loading with sample data
            await this.simulateDataLoading(weddingId);
            
            // Try to load actual data from GitHub Pages or your hosting
            // const response = await fetch(`./data/wedding-${weddingId}.json`);
            // if (response.ok) {
            //     this.weddingData = await response.json();
            // } else {
            //     throw new Error('Wedding data not found');
            // }
            
            this.renderWeddingData();
            this.showMainContent();
            
        } catch (error) {
            console.error('Failed to load wedding data:', error);
            this.showError('Failed to load wedding information');
        }
    }
    
    async simulateDataLoading(weddingId) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sample wedding data (this would normally come from your exported JSON)
        this.weddingData = {
            weddingID: weddingId,
            weddingInfo: {
                brideName: "Nelli",
                groomName: "Timo",
                weddingDate: "Saturday, July 19, 2025",
                weddingStartTime: "2:00 PM",
                venueName: "Terrassenhof",
                venueAddress: "123 Wedding Lane, Beautiful City, 12345",
                welcomeQuote: "Two hearts, one love, endless joy",
                messageFromCouple: "We are so excited to celebrate this special day with all our loved ones. Thank you for being part of our journey!",
                dressCode: "Cocktail attire - please wear elegant, semi-formal clothing",
                giftInformation: "Your presence is the only present we need! If you'd like to give a gift, a contribution to our honeymoon fund would be wonderful.",
                contactInfo: "For questions, contact us at: nelli.timo@wedding.com or call (555) 123-4567",
                parkingInfo: "Free parking is available at the venue. Additional parking can be found at the community center across the street."
            },
            timeline: [
                {
                    id: "1",
                    title: "Wedding Ceremony",
                    description: "Join us as we exchange vows in a beautiful outdoor ceremony",
                    date: "July 19, 2025",
                    time: "2:00 PM",
                    location: "Garden Pavilion",
                    isImportant: true
                },
                {
                    id: "2", 
                    title: "Cocktail Hour",
                    description: "Enjoy drinks and appetizers while we take photos",
                    date: "July 19, 2025",
                    time: "3:00 PM",
                    location: "Terrace Lounge",
                    isImportant: false
                },
                {
                    id: "3",
                    title: "Reception Dinner",
                    description: "Three-course dinner and celebration",
                    date: "July 19, 2025", 
                    time: "5:00 PM",
                    location: "Main Ballroom",
                    isImportant: true
                },
                {
                    id: "4",
                    title: "Dancing & Party",
                    description: "Let's dance the night away!",
                    date: "July 19, 2025",
                    time: "8:00 PM", 
                    location: "Dance Floor",
                    isImportant: false
                }
            ],
            quiz: {
                questions: [
                    {
                        id: "1",
                        question: "Where did Nelli and Timo first meet?",
                        answers: [
                            { id: "1a", text: "At university", isCorrect: false },
                            { id: "1b", text: "At a coffee shop", isCorrect: true },
                            { id: "1c", text: "Through mutual friends", isCorrect: false },
                            { id: "1d", text: "At work", isCorrect: false }
                        ]
                    },
                    {
                        id: "2", 
                        question: "What is their favorite vacation destination?",
                        answers: [
                            { id: "2a", text: "Paris, France", isCorrect: false },
                            { id: "2b", text: "Tokyo, Japan", isCorrect: false },
                            { id: "2c", text: "Santorini, Greece", isCorrect: true },
                            { id: "2d", text: "New York City", isCorrect: false }
                        ]
                    },
                    {
                        id: "3",
                        question: "How many years have they been together?",
                        answers: [
                            { id: "3a", text: "2 years", isCorrect: false },
                            { id: "3b", text: "3 years", isCorrect: false },
                            { id: "3c", text: "4 years", isCorrect: true },
                            { id: "3d", text: "5 years", isCorrect: false }
                        ]
                    }
                ]
            },
            photos: [
                {
                    id: "1",
                    filename: "engagement-photo-1.jpg",
                    uploadDate: "June 15, 2025, 3:30 PM",
                    uploaderName: "Sarah",
                    base64Data: "" // Would contain actual image data
                },
                {
                    id: "2", 
                    filename: "couple-portrait.jpg",
                    uploadDate: "June 20, 2025, 7:45 PM",
                    uploaderName: "Admin",
                    base64Data: "" // Would contain actual image data
                }
            ],
            exportDate: new Date().toISOString()
        };
    }
    
    renderWeddingData() {
        if (!this.weddingData) return;
        
        // Update page title
        const coupleNames = `${this.weddingData.weddingInfo.brideName} & ${this.weddingData.weddingInfo.groomName}`;
        document.title = `${coupleNames} - Wedding`;
        document.getElementById('wedding-title').textContent = coupleNames;
        
        // Render wedding info
        this.renderWeddingInfo();
        
        // Render timeline
        this.renderTimeline();
        
        // Render photos
        this.renderPhotos();
        
        // Render quiz
        this.renderQuiz();
        
        // Start countdown
        this.startCountdown();
    }
    
    renderWeddingInfo() {
        const info = this.weddingData.weddingInfo;
        
        // Basic info
        document.getElementById('wedding-date').textContent = info.weddingDate;
        document.getElementById('wedding-time').textContent = info.weddingStartTime;
        document.getElementById('venue-name').textContent = info.venueName;
        document.getElementById('venue-address').textContent = info.venueAddress;
        
        // Optional info cards - show only if content exists
        this.showCardIfContent('welcome-card', info.welcomeQuote || info.messageFromCouple, () => {
            if (info.welcomeQuote) {
                document.getElementById('welcome-quote').textContent = info.welcomeQuote;
                document.getElementById('welcome-quote').style.display = 'block';
            } else {
                document.getElementById('welcome-quote').style.display = 'none';
            }
            
            if (info.messageFromCouple) {
                document.getElementById('couple-message').textContent = info.messageFromCouple;
                document.getElementById('couple-message').style.display = 'block';
            } else {
                document.getElementById('couple-message').style.display = 'none';
            }
        });
        
        this.showCardIfContent('dress-code-card', info.dressCode, () => {
            document.getElementById('dress-code').textContent = info.dressCode;
        });
        
        this.showCardIfContent('gift-info-card', info.giftInformation, () => {
            document.getElementById('gift-info').textContent = info.giftInformation;
        });
        
        this.showCardIfContent('contact-card', info.contactInfo, () => {
            document.getElementById('contact-info').textContent = info.contactInfo;
        });
        
        this.showCardIfContent('parking-card', info.parkingInfo, () => {
            document.getElementById('parking-info').textContent = info.parkingInfo;
        });
    }
    
    showCardIfContent(cardId, content, renderCallback) {
        const card = document.getElementById(cardId);
        if (content && content.trim()) {
            card.style.display = 'block';
            renderCallback();
        } else {
            card.style.display = 'none';
        }
    }
    
    renderTimeline() {
        const container = document.getElementById('timeline-events');
        
        if (!this.weddingData.timeline || this.weddingData.timeline.length === 0) {
            container.innerHTML = '<div class="no-timeline"><div class="no-timeline-icon">📅</div><h3>No Events Scheduled</h3><p>The timeline will be updated as events are planned!</p></div>';
            return;
        }
        
        container.innerHTML = this.weddingData.timeline.map(event => `
            <div class="timeline-item ${event.isImportant ? 'important' : ''}">
                <div class="timeline-header">
                    <h3 class="timeline-title">${event.title}</h3>
                    <span class="timeline-time">${event.time}</span>
                </div>
                <p class="timeline-description">${event.description}</p>
                ${event.location ? `<p class="timeline-location">${event.location}</p>` : ''}
            </div>
        `).join('');
    }
    
    renderPhotos() {
        const gallery = document.getElementById('photo-gallery');
        const noPhotos = document.getElementById('no-photos');
        
        if (!this.weddingData.photos || this.weddingData.photos.length === 0) {
            gallery.style.display = 'none';
            noPhotos.style.display = 'block';
            return;
        }
        
        gallery.style.display = 'grid';
        noPhotos.style.display = 'none';
        
        gallery.innerHTML = this.weddingData.photos.map(photo => `
            <div class="photo-item" onclick="openPhotoModal('${photo.id}')">
                <div class="photo-image" style="background: linear-gradient(135deg, #f5f5f5, #e0e0e0); display: flex; align-items: center; justify-content: center; color: #999; font-size: 24px;">
                    📸
                </div>
                <div class="photo-info">
                    <div class="photo-filename">${photo.filename}</div>
                    <div class="photo-uploader">By ${photo.uploaderName}</div>
                    <div class="photo-date">${photo.uploadDate}</div>
                </div>
            </div>
        `).join('');
    }
    
    renderQuiz() {
        const container = document.getElementById('quiz-container');
        const noQuiz = document.getElementById('no-quiz');
        
        if (!this.weddingData.quiz || !this.weddingData.quiz.questions || this.weddingData.quiz.questions.length === 0) {
            container.style.display = 'none';
            noQuiz.style.display = 'block';
            return;
        }
        
        container.style.display = 'block';
        noQuiz.style.display = 'none';
        
        this.renderQuizQuestion();
    }
    
    renderQuizQuestion() {
        const container = document.getElementById('quiz-container');
        const questions = this.weddingData.quiz.questions;
        
        if (this.quizCompleted) {
            this.renderQuizResult();
            return;
        }
        
        if (this.currentQuizQuestion >= questions.length) {
            this.completeQuiz();
            return;
        }
        
        const question = questions[this.currentQuizQuestion];
        const progress = this.currentQuizQuestion + 1;
        const total = questions.length;
        
        container.innerHTML = `
            <div class="quiz-progress" style="text-align: center; margin-bottom: 20px; color: var(--secondary-gray); font: var(--font-caption);">
                Question ${progress} of ${total}
            </div>
            <div class="quiz-question">
                <h3 class="quiz-question-text">${question.question}</h3>
                <div class="quiz-answers">
                    ${question.answers.map(answer => `
                        <button class="quiz-answer" onclick="selectQuizAnswer('${answer.id}', ${answer.isCorrect})">
                            ${answer.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    selectQuizAnswer(answerId, isCorrect) {
        this.userAnswers.push({ questionIndex: this.currentQuizQuestion, answerId, isCorrect });
        
        // Show correct answer
        const answers = document.querySelectorAll('.quiz-answer');
        answers.forEach(answer => {
            answer.style.pointerEvents = 'none';
            if (answer.textContent.trim() === event.target.textContent.trim()) {
                answer.classList.add(isCorrect ? 'correct' : 'incorrect');
            } else if (isCorrect === false) {
                // Find and highlight the correct answer
                const correctAnswerText = this.weddingData.quiz.questions[this.currentQuizQuestion].answers.find(a => a.isCorrect).text;
                if (answer.textContent.trim() === correctAnswerText) {
                    answer.classList.add('correct');
                }
            }
        });
        
        // Move to next question after delay
        setTimeout(() => {
            this.currentQuizQuestion++;
            this.renderQuizQuestion();
        }, 2000);
    }
    
    completeQuiz() {
        this.quizCompleted = true;
        this.renderQuizResult();
    }
    
    renderQuizResult() {
        const container = document.getElementById('quiz-container');
        const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
        const totalQuestions = this.weddingData.quiz.questions.length;
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        
        let message = '';
        if (percentage >= 80) {
            message = "Excellent! You know the couple very well! 🎉";
        } else if (percentage >= 60) {
            message = "Great job! You know quite a bit about them! 👏";
        } else if (percentage >= 40) {
            message = "Not bad! There's still more to learn about the couple! 😊";
        } else {
            message = "You might want to spend more time with the couple! 😄";
        }
        
        container.innerHTML = `
            <div class="quiz-result">
                <div class="quiz-score">${correctAnswers}/${totalQuestions}</div>
                <h3>Quiz Complete!</h3>
                <p>${message}</p>
                <button onclick="restartQuiz()" style="margin-top: 20px; background: var(--wedding-menu-active); color: white; border: none; padding: 12px 24px; border-radius: 12px; font: var(--font-headline); cursor: pointer;">
                    Take Quiz Again
                </button>
            </div>
        `;
    }
    
    restartQuiz() {
        this.currentQuizQuestion = 0;
        this.userAnswers = [];
        this.quizCompleted = false;
        this.renderQuizQuestion();
    }
    
    startCountdown() {
        // Calculate target date (July 19, 2025 at 2:00 PM)
        const targetDate = new Date('2025-07-19T14:00:00');
        
        this.countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance < 0) {
                clearInterval(this.countdownInterval);
                document.getElementById('countdown').innerHTML = '<div style="text-align: center; color: var(--wedding-menu-active); font: var(--font-headline);">The big day is here! 🎉</div>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }, 1000);
    }
    
    switchTab(tabName) {
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }
    
    openPhotoModal(photoId) {
        const photo = this.weddingData.photos.find(p => p.id === photoId);
        if (!photo) return;
        
        document.getElementById('modal-photo-title').textContent = photo.filename;
        document.getElementById('modal-photo-uploader').textContent = `Uploaded by ${photo.uploaderName}`;
        document.getElementById('modal-photo-date').textContent = photo.uploadDate;
        
        // In a real implementation, you would set the src to the actual image
        // document.getElementById('modal-photo').src = `data:image/jpeg;base64,${photo.base64Data}`;
        
        document.getElementById('photo-modal').style.display = 'flex';
    }
    
    closePhotoModal() {
        document.getElementById('photo-modal').style.display = 'none';
    }
    
    showMainContent() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }
    
    showError(message) {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('error').style.display = 'flex';
        document.querySelector('.error-content p').textContent = message;
    }
}

// Global functions for event handlers
function selectQuizAnswer(answerId, isCorrect) {
    app.selectQuizAnswer(answerId, isCorrect);
}

function restartQuiz() {
    app.restartQuiz();
}

function openPhotoModal(photoId) {
    app.openPhotoModal(photoId);
}

function closePhotoModal() {
    app.closePhotoModal();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WeddingGuestApp();
});