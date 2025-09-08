window.onload = () => {

  const form = document.querySelector("#form");
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

}