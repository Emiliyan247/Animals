const knowledge = `
  animal(lion).
  animal(elephant).
  animal(eagle).
  animal(snake).
  animal(dog).

  is_mammal(lion).
  is_mammal(elephant).
  is_mammal(dog).
  is_bird(eagle).
  is_reptile(snake).
`;

const foodAnimations = {
  lion: '<img src="https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif" class="food-gif" alt="Lion" />',
  elephant: '<img src="https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif" class="food-gif" alt="Elephant" />',
  eagle: '<img src="https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif" class="food-gif" alt="Eagle" />',
  snake: '<img src="https://media.giphy.com/media/3o6ZsU1D2Fu3My4xFC/giphy.gif" class="food-gif" alt="Snake" />',
  dog: '<img src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif" class="food-gif" alt="Dog" />'
};

const session = pl.create(1000);
session.consult(knowledge);

function runQuery() {
  const query = document.getElementById("query").value.trim();
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  if (!query.endsWith('.')) {
    outputDiv.innerHTML = "❗ Моля, завършете заявката с точка (.)";
    return;
  }

  session.query(query, {
    success: function () {
      session.answers(answer => {
        if (answer === false) {
          outputDiv.innerHTML = "❌ Няма резултат.";
        } else {
          const vars = answer.links;
          let shown = false;
          for (let key in vars) {
            const item = vars[key].id;
            outputDiv.innerHTML += `<p>✅ ${key} = ${item}</p>`;
            if (foodAnimations[item]) {
              outputDiv.innerHTML += foodAnimations[item];
              shown = true;
            }
          }
          if (!shown) {
            outputDiv.innerHTML += "<p>⚠️ Няма GIF за това животно.</p>";
          }
        }
      });
    },
    error: function (err) {
      outputDiv.innerHTML = "⚠️ Грешка: " + err;
    }
  });
}
