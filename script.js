// --- Gallery Elements ---
const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const photoCards = document.querySelectorAll(".photo-card");

// --- Modal Elements ---
const modal = document.getElementById("photoModal");
const modalContent = document.querySelector(".modal-content"); // NEW: Get the modal content element
const modalImg = document.getElementById("modalImage");
const photoTitle = document.getElementById("photoTitle");
const photoArtist = document.getElementById("photoArtist");
const photoYear = document.getElementById("photoYear");
const photoDescription = document.getElementById("photoDescription");
const closeBtn = document.querySelector(".close-btn");

// Hide the modal when the script runs
modal.style.display = "none"; 

// --- Horizontal Gallery Configuration ---
let currentIndex = 0;
const totalCards = photoCards.length;

// Card dimensions (300px width + 20px left margin + 20px right margin = 340)
const cardTotalWidth = 340; 
const cardLeftMargin = 20;

function updateGallery() {
    const translation = -(currentIndex * cardTotalWidth) + cardLeftMargin;
    gallery.style.transform = `translateX(${translation}px)`;
}

// Initialize the gallery position
updateGallery();


// --- Navigation Buttons (Horizontal Translation Logic) ---
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateGallery();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateGallery();
});

// --- Modal Display Logic ---
photoCards.forEach(card => {
    card.addEventListener("click", () => {
        // Step 1: Populate modal with image and info
        modal.style.display = "flex"; 
        modalImg.src = card.dataset.image;
        photoTitle.textContent = card.dataset.title;
        photoArtist.textContent = card.dataset.artist;
        photoYear.textContent = card.dataset.year;
        photoDescription.textContent = card.dataset.description;
        
        // IMPORTANT: Ensure fullscreen mode is OFF when modal is initially opened
        if (modalContent) {
            modalContent.classList.remove('fullscreen-mode');
        }
    });
});

// Step 2 & 3: Fullscreen Toggle on Image Click
if (modalImg && modalContent) {
    modalImg.addEventListener("click", () => {
        // Toggle the 'fullscreen-mode' class on the modal content element
        modalContent.classList.toggle('fullscreen-mode');
    });
}


// Close button functionality
closeBtn.onclick = () => {
    modal.style.display = "none";
    // Ensure fullscreen class is removed when closing the modal
    if (modalContent) {
        modalContent.classList.remove('fullscreen-mode');
    }
};

// Close modal when user clicks anywhere outside of it
window.onclick = e => {
    if (e.target === modal) {
        modal.style.display = "none";
        // Ensure fullscreen class is removed when closing the modal
        if (modalContent) {
            modalContent.classList.remove('fullscreen-mode');
        }
    }
};