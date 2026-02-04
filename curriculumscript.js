const token = localStorage.getItem("jwtToken");
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!token || isLoggedIn !== "true") {
    alert("Morate biti prijavljeni da biste pristupili nastavnom planu!");
    window.location.href = "index.html";
}

let allCourses = [];
let selectedCourses = [];

async function fetchAllCourses() {
    try {
        const response = await fetch("https://www.fulek.com/data/api/supit/curriculum-list/hr", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Full API response:", data);
            
            allCourses = data.data || [];
            console.log(`Loaded ${allCourses.length} courses`);
            console.log("First course example:", allCourses[0]);
        } else {
            console.error("Failed to fetch courses, status:", response.status);
            alert("Greška pri dohvaćanju kolegija. Molimo pokušajte ponovno.");
        }
    } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Došlo je do greške pri dohvaćanju kolegija!");
    }
}

const searchInput = document.getElementById("course-search");
const autocompleteResults = document.getElementById("autocomplete-results");

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 1) {
        autocompleteResults.innerHTML = "";
        return;
    }
    
    const filtered = allCourses.filter(course => 
        course.kolegij && course.kolegij.toLowerCase().includes(query)
    );
    
    if (filtered.length > 0) {
        autocompleteResults.innerHTML = filtered
            .slice(0, 10) // Show max 10 results
            .map(course => `
                <div class="autocomplete-item" data-id="${course.id}">
                    ${course.kolegij}
                </div>
            `)
            .join("");
    } else {
        autocompleteResults.innerHTML = `
            <div class="autocomplete-item" style="cursor: default; color: #999;">
                Nema rezultata
            </div>
        `;
    }
});

autocompleteResults.addEventListener("click", async (e) => {
    if (e.target.classList.contains("autocomplete-item")) {
        const courseId = e.target.dataset.id;
        
        if (!courseId) return;
        
        if (selectedCourses.find(c => c.id == courseId)) {
            alert("Ovaj kolegij je već dodan!");
            return;
        }
        
        const course = allCourses.find(c => c.id == courseId);
        
        if (course) {
            selectedCourses.push(course);
            renderTable();
        }
        
        searchInput.value = "";
        autocompleteResults.innerHTML = "";
    }
});

function renderTable() {
    const tbody = document.getElementById("courses-tbody");
    
    if (selectedCourses.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-state">
                <td colspan="7">
                    <i class="material-symbols-outlined">school</i>
                    <p>Nema odabranih kolegija. Započnite pretraživanje iznad.</p>
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = selectedCourses.map((course, index) => `
            <tr>
                <td>${course.kolegij || 'N/A'}</td>
                <td>${course.ects || 0}</td>
                <td>${course.sati || 0}</td>
                <td>${course.predavanja || 0}</td>
                <td>${course.vjezbe || 0}</td>
                <td>${course.tip || 'N/A'}</td>
                <td>
                    <button class="delete-btn" onclick="removeCourse(${index})">
                        Ukloni
                    </button>
                </td>
            </tr>
        `).join("");
    }
    
    updateTotals();
}

function removeCourse(index) {
    selectedCourses.splice(index, 1);
    renderTable();
}

function updateTotals() {
    const totalEcts = selectedCourses.reduce((sum, course) => sum + (parseInt(course.ects) || 0), 0);
    const totalSati = selectedCourses.reduce((sum, course) => sum + (parseInt(course.sati) || 0), 0);
    const totalPredavanja = selectedCourses.reduce((sum, course) => sum + (parseInt(course.predavanja) || 0), 0);
    const totalVjezbe = selectedCourses.reduce((sum, course) => sum + (parseInt(course.vjezbe) || 0), 0);
    
    document.getElementById("total-ects").textContent = totalEcts;
    document.getElementById("total-sati").textContent = totalSati;
    document.getElementById("total-predavanja").textContent = totalPredavanja;
    document.getElementById("total-vjezbe").textContent = totalVjezbe;
}


document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !autocompleteResults.contains(e.target)) {
        autocompleteResults.innerHTML = "";
    }
});


fetchAllCourses();