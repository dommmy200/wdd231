const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function getCourses() {
    return courses;
}
function createAndAppend(total, output) {
    let totalCreditsOutput = document.createElement('p');
    totalCreditsOutput.classList.add('total-credits');
    totalCreditsOutput.textContent = `Total Credits: ${total}`;
    output.appendChild(totalCreditsOutput);
}
function createOutputHTML(courseArray) {
    let output = document.querySelector('#courses');
    output.innerHTML = ''; // Clear previous output
    let totalCredits = 0;
    let courseCardContainer = document.createElement('div');
    courseCardContainer.classList.add('cards-container');

    courseArray.forEach(course => {
        totalCredits += course.credits;
        let subjNum = `${course.subject} ${course.number}`;
        let courseCard = document.createElement('span');
        courseCard.classList.add('course-card');
        if (course.completed) {
            let textNode = document.createTextNode(`✓ ${subjNum}`);
            courseCard.appendChild(textNode);
            courseCardContainer.appendChild(courseCard);
        } else {
            let textNode = document.createTextNode(`${subjNum}`);
            courseCard.appendChild(textNode);
            courseCardContainer.appendChild(courseCard);
        }
    });

    output.innerHTML = courseCardContainer.outerHTML; // Append all course cards at once
    createAndAppend(totalCredits, output);
}
function main() {
    let allBtn = document.querySelectorAll('.course-buttons .course-button');
    allBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            
            if (btn.id === 'all') {
                let courses = getCourses();
                createOutputHTML(courses);
                displayDialog(courses);
            } else if (btn.id === 'cse') {
                let courses = getCourses().filter(course => course.subject === 'CSE');
                createOutputHTML(courses);
                displayDialog(courses);
            } else if (btn.id === 'wdd') {
                let courses = getCourses().filter(course => course.subject === 'WDD');
                createOutputHTML(courses);
                displayDialog(courses);
            }
        })
    });
}
function displayCourseDetails(course) {
    const courseDetails = document.querySelector('#course-details');
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
        <button id="close-modal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    // const openModal = document.querySelector(".open-button");
    const closeModal = document.querySelector("#close-modal");
    courseDetails.showModal();
  
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}
function displayDialog(courses) {
    let selectedArray = document.querySelectorAll('.course-card');
    selectedArray.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            let courseText = card.textContent.trim();
            if (courseText.includes('111')) {
                let course = courses.find(c => c.subject === 'CSE' && c.number === 111);
                if (!course) {
                    console.error('Course not found');
                    return;
                }
                displayCourseDetails(course);
            } else if (courseText.includes('210')) {
                let course = courses.find(c => c.subject === 'CSE' && c.number === 210);
                if (!course) {
                    console.error('Course not found');
                    return;
                }
                displayCourseDetails(course);
            } else if (courseText.includes('110')) {
                let course = courses.find(c => c.subject === 'CSE' && c.number === 110);
                if (!course) {
                    console.error('Course not found');
                    return;
                }
                displayCourseDetails(course);
            } else if (courseText.includes('130')) {
                let course = courses.find(c => c.subject === 'WDD' && c.number === 130);
                if (!course) {
                    console.error('Course not found');
                    return;
                }
                displayCourseDetails(course);
            } else if (courseText.includes('131')) {
                let course = courses.find(c => c.subject === 'WDD' && c.number === 131);
                if (!course) {
                    console.error('Course not found');
                    return;
                }
                displayCourseDetails(course);
            } else if (courseText.includes('231')) {
                let course = courses.find(c => c.subject === 'WDD' && c.number === 231);
                if (!course) {
                    console.error('Course not found');
                    return;
                }
                displayCourseDetails(course);
            } else {
                console.error('Course not found for the selected card');
            }
        });
    });
}
// Initialize the script
main();