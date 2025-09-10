window.onload = () => {

  const form = document.querySelector("#form");
  console.log(form);
  const search = document.querySelector("#search");
  const startQuizBtn = document.querySelector("#start-quiz-btn");

  const startQuiz = (e) => {
    e.preventDefault();
    const searchVal = search.value.trim();
    let currentIdx = 0;
    let attemptedAns = new Array(5).fill(null);
    let score = 0;
    const qns = [
      {
        question: "What is the capital city of Japan?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        correct: "Tokyo"
      },
      {
        question: "Which is the largest mammal on Earth?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale"
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        correct: "Leonardo da Vinci"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Mercury"],
        correct: "Mars"
      },
      {
        question: "What is the national sport of Nepal?",
        options: ["Volleyball", "Football", "Cricket", "Kho-Kho"],
        correct: "Volleyball"
      }
    ];

    Swal.fire({
      // title: "Playing Quiz !!",
      allowOutsideClick: false,
      showConfirmButton: false,
      showCloseButton: true,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      },
      html: `
      <div class="quiz-popup" id="quiz-popup" autofocus="off">
        <form class="qn-container" id="qn-container">
          
        </form>

        <div class="prev-next-btns">
          <button class="prev-btn" id="prev-btn"><i class="ri-arrow-left-s-line"></i></button>
          <button class="next-btn" id="next-btn"><i class="ri-arrow-right-s-line"></i></button>
        </div>

        <button class="submit-btn" form="qn-container">Submit</button>
      </div>
      `
    });

    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const quizPopup = document.querySelector("#quiz-popup");
    const qnContainer = document.querySelector("#qn-container");

    const embedQuestion = (obj) => {
      const str = `
        <h5 class="qn">${obj.question}</h5>
        <div class="ans-container">
          <div class="form-group">
            <label>${obj.options[0]}</label>
            <input type="radio" name="ans" value=${obj.options[0]} />
          </div>
          <div class="form-group">
            <label>${obj.options[1]}</label>
            <input type="radio" name="ans" value=${obj.options[1]} />
          </div>
          <div class="form-group">
            <label>${obj.options[2]}</label>
            <input type="radio" name="ans" value=${obj.options[2]} />
          </div>
          <div class="form-group">
            <label>${obj.options[3]}</label>
            <input type="radio" name="ans" value=${obj.options[3]} />
          </div>
        </div>
      `;

      qnContainer.innerHTML = str;
    }

    const enableDisable = () => {
      if (currentIdx >= 1 && currentIdx <= qns.length - 2) {
        nextBtn.removeAttribute("disabled");
        prevBtn.removeAttribute("disabled");
      }
      else if (currentIdx === 0) {
        prevBtn.setAttribute("disabled", "true");
      }
      else if (currentIdx >= qns.length - 1) {
        nextBtn.setAttribute("disabled", "true");
        prevBtn.removeAttribute("disabled");
      }
      else {
        nextBtn.removeAttribute("disabled");
        prevBtn.removeAttribute("disabled");
      }
    }

    enableDisable();
    embedQuestion(qns[currentIdx]);

    prevBtn.addEventListener("click", () => {
      currentIdx--;
      embedQuestion(qns[currentIdx]);
      enableDisable();
    });

    nextBtn.addEventListener("click", () => {
      currentIdx++;
      embedQuestion(qns[currentIdx]);
      enableDisable();
    });

    qnContainer.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("submit bhayo hai...");
      qns.forEach((obj, idx) => {
        if (attemptedAns[idx] === obj.correct)
          score++;
      });

      console.log("Score is : ", score);
      Swal.close();

      Swal.fire({
        title: "Quiz Finished 🎉",
        html: `<h3>Your Score: ${score} / ${qns.length}</h3>`,
        icon: "success",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        customClass: {
          popup: "score-popup"
        },
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });

      // resetting the variables so that it can have fresh data for the next time.
      score = 0;
      attemptedAns.fill(null);
    });

    qnContainer.addEventListener("change", (e) => {
      attemptedAns[currentIdx] = e.target.value;
    });
  }

  // startQuiz();
  form.addEventListener("submit", startQuiz);

  // select category filter logic
  const selectCategory = document.querySelector("#select-category");
  const categoryCards = document.querySelector("#category-cards");
  const categoryData = {
    "general knowledge": [
      {
        topic: "World Capitals",
        description: "Test your knowledge about capital cities around the world.",
        icon: '<i class="ri-map-pin-line icon"></i>'
      },
      {
        topic: "Famous Inventions",
        description: "Do you know who invented what? Try this quiz!",
        icon: '<i class="ri-lightbulb-flash-line icon"></i>'
      },
      {
        topic: "Food & Drinks",
        description: "Explore fun facts about international cuisine and beverages.",
        icon: '<i class="ri-restaurant-line icon"></i>'
      },
      {
        topic: "Books & Authors",
        description: "Identify the famous books and their authors.",
        icon: '<i class="ri-book-open-line icon"></i>'
      },
      {
        topic: "World Records",
        description: "Check if you know about Guinness World Records.",
        icon: '<i class="ri-trophy-line icon"></i>'
      },
      {
        topic: "Mythology",
        description: "Challenge yourself with myths and legends from around the globe.",
        icon: '<i class="ri-moon-foggy-line icon"></i>'
      }
    ],
    "science": [
      {
        topic: "Physics Basics",
        description: "From Newton’s laws to quantum mechanics.",
        icon: '<i class="ri-aliens-line icon"></i>'
      },
      {
        topic: "Human Anatomy",
        description: "Quiz on the human body and its complex systems.",
        icon: '<i class="ri-body-scan-line icon"></i>'
      },
      {
        topic: "Chemistry Elements",
        description: "Do you know your periodic table well?",
        icon: '<i class="ri-flask-line icon"></i>'
      },
      {
        topic: "Space & Astronomy",
        description: "Test your knowledge of planets, stars, and galaxies.",
        icon: '<i class="ri-planet-line icon"></i>'
      },
      {
        topic: "Earth Science",
        description: "From volcanoes to earthquakes, see what you know.",
        icon: '<i class="ri-landscape-line icon"></i>'
      },
      {
        topic: "Biology",
        description: "Plants, animals, and ecosystems in one quiz.",
        icon: '<i class="ri-leaf-line icon"></i>'
      }
    ],
    "mathematics": [
      {
        topic: "Algebra",
        description: "Test your ability to solve algebraic equations.",
        icon: '<i class="ri-functions icon"></i>'
      },
      {
        topic: "Geometry",
        description: "Shapes, angles, and properties of space.",
        icon: '<i class="ri-shapes-line icon"></i>'
      },
      {
        topic: "Probability",
        description: "How well do you understand chance and likelihood?",
        icon: '<i class="ri-dice-line icon"></i>'
      },
      {
        topic: "Calculus",
        description: "Challenge your limits with derivatives and integrals.",
        icon: '<i class="ri-infinity-line icon"></i>'
      },
      {
        topic: "Number Theory",
        description: "Prime numbers, divisibility, and more.",
        icon: '<i class="ri-numbers-line icon"></i>'
      },
      {
        topic: "Trigonometry",
        description: "Sines, cosines, and everything in between.",
        icon: '<i class="ri-triangle-line icon"></i>'
      }
    ],
    "history": [
      {
        topic: "Ancient Civilizations",
        description: "Egypt, Mesopotamia, Indus Valley, and more.",
        icon: '<i class="ri-community-line icon"></i>'
      },
      {
        topic: "World Wars",
        description: "Test your knowledge about WWI and WWII.",
        icon: '<i class="ri-sword-line icon"></i>'
      },
      {
        topic: "Famous Leaders",
        description: "Identify leaders and revolutionaries of the past.",
        icon: '<i class="ri-user-voice-line icon"></i>'
      },
      {
        topic: "American History",
        description: "From independence to modern times.",
        icon: '<i class="ri-flag-line icon"></i>'
      },
      {
        topic: "European History",
        description: "Kings, queens, empires, and revolutions.",
        icon: '<i class="ri-castle-line icon"></i>'
      },
      {
        topic: "Historical Monuments",
        description: "Do you know who built what and when?",
        icon: '<i class="ri-bank-line icon"></i>'
      }
    ],
    "sports": [
      {
        topic: "Football",
        description: "From FIFA World Cup to club legends.",
        icon: '<i class="ri-football-line icon"></i>'
      },
      {
        topic: "Cricket",
        description: "ODI, Test, T20 — how much do you know?",
        icon: '<i class="ri-gamepad-line icon"></i>'
      },
      {
        topic: "Olympics",
        description: "Test your knowledge of Olympic history.",
        icon: '<i class="ri-medal-line icon"></i>'
      },
      {
        topic: "Basketball",
        description: "NBA players, rules, and history.",
        icon: '<i class="ri-basketball-line icon"></i>'
      },
      {
        topic: "Tennis",
        description: "From Wimbledon to French Open champions.",
        icon: '<i class="ri-ping-pong-line icon"></i>'
      },
      {
        topic: "Hockey",
        description: "Field and ice hockey trivia.",
        icon: '<i class="ri-sword-line icon"></i>'
      }
    ],
    "politics": [
      {
        topic: "World Leaders",
        description: "Current and past presidents, PMs, and rulers.",
        icon: '<i class="ri-government-line icon"></i>'
      },
      {
        topic: "Political Ideologies",
        description: "Test your knowledge of democracy, communism, etc.",
        icon: '<i class="ri-government-line icon"></i>'
      },
      {
        topic: "UN & Organizations",
        description: "Know about global institutions like UN, WHO, WTO.",
        icon: '<i class="ri-global-line icon"></i>'
      },
      {
        topic: "Elections",
        description: "Quiz on famous elections and results.",
        icon: '<i class="ri-ball-pen-line icon"></i>'
      },
      {
        topic: "Constitutions",
        description: "How well do you know world constitutions?",
        icon: '<i class="ri-book-2-line icon"></i>'
      },
      {
        topic: "Revolutions",
        description: "Famous revolutions that changed history.",
        icon: '<i class="ri-fire-line icon"></i>'
      }
    ],
    "technology": [
      {
        topic: "Programming Languages",
        description: "Test your coding language knowledge.",
        icon: '<i class="ri-code-line icon"></i>'
      },
      {
        topic: "Artificial Intelligence",
        description: "From machine learning to neural networks.",
        icon: '<i class="ri-brain-line icon"></i>'
      },
      {
        topic: "Internet & Web",
        description: "How much do you know about the world wide web?",
        icon: '<i class="ri-wifi-line icon"></i>'
      },
      {
        topic: "Gadgets",
        description: "Smartphones, laptops, and more.",
        icon: '<i class="ri-smartphone-line icon"></i>'
      },
      {
        topic: "Cybersecurity",
        description: "Protecting the digital world from hackers.",
        icon: '<i class="ri-shield-keyhole-line icon"></i>'
      },
      {
        topic: "Tech Companies",
        description: "Apple, Google, Microsoft — quiz on tech giants.",
        icon: '<i class="ri-building-2-line icon"></i>'
      }
    ]
  };

  // const fetchData = async (category = 'general knowledge') => {
  //   const api = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=6`;
  //   const res = await fetch(api);
  //   const data = await res.json();
  //   return data;
  // }

  const displayCategory = async (category = "general knowledge") => {
    let data = "";
    categoryData[category].forEach((item) => {
      const str = `
              <div class="category-card">
                ${item.icon}
                <h3 class="title">${item.topic}</h3>
                <p class="description">${item.description}</p>
                <a href="#" class="btn">Play Quiz</a>
              </div>
            `;
      data += str;
    });
    categoryCards.innerHTML = data;
  }

  displayCategory();

  selectCategory.addEventListener("change", (e) => {
    const value = e.target.value.toLowerCase();
    displayCategory(value);
  });
}