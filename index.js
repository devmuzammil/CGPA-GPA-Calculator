let semesters = [];
        let courses = [];

        function addCourse() {
            const courseInputs = document.getElementById('course-inputs');
            const newInputGroup = document.createElement('div');
            newInputGroup.className = 'card course-row';
            newInputGroup.innerHTML = `
                <input type="text" placeholder="Course Name" class="course-name w-full md:w-1/3 px-4 py-3 bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500">
                <input type="number" placeholder="Credit Hours" class="credit-hours w-full md:w-1/3 px-4 py-3 bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500" min="1" max="3">
                <select class="grade w-full md:w-1/3 px-4 py-3 bg-gray-800 text-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500">
                    <option value="4.0">A</option>
                    <option value="3.67">A-</option>
                    <option value="3.33">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.67">B-</option>
                    <option value="2.33">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.87">C-</option>
                    <option value="1.33">D+</option>
                    <option value="1.0">D</option>
                    <option value="0">F</option>
                </select>
                <button onclick="removeCourse(this)" class="text-red-400 hover:text-red-600 font-semibold">Remove</button>
            `;
            courseInputs.appendChild(newInputGroup);
        }

        function removeCourse(button) {
            button.parentElement.remove();
        }

        function calculateGPA() {
            let totalProduct = 0;
            let totalCreditHours = 0;
            const courseRows = document.querySelectorAll('.course-row');

            courseRows.forEach(row => {
                const creditHours = parseFloat(row.querySelector('.credit-hours').value);
                const gradePoint = parseFloat(row.querySelector('.grade').value);

                if (!isNaN(creditHours) && !isNaN(gradePoint)) {
                    totalProduct += creditHours * gradePoint;
                    totalCreditHours += creditHours;
                }
            });

            const gpa = totalCreditHours ? (totalProduct / totalCreditHours).toFixed(2) : 0;
            document.getElementById('gpa-result').textContent = `Your GPA for this semester is: ${gpa}`;
            return parseFloat(gpa);
        }

        function addSemester() {
            const gpa = calculateGPA();
            if (gpa > 0) {
                semesters.push(gpa);
                calculateCGPA();
                resetCourses();
            } else {
                alert("Please enter valid course details.");
            }
        }

        function calculateCGPA() {
            if (semesters.length > 0) {
                const cgpa = (semesters.reduce((acc, gpa) => acc + gpa, 0) / semesters.length).toFixed(2);
                document.getElementById('cgpa-result').textContent = `Your CGPA is: ${cgpa}`;
            }
        }

        function resetCourses() {
            document.getElementById('course-inputs').innerHTML = '';
            addCourse();
            document.getElementById('gpa-result').textContent = '';
        }

        /*addCourse();*/