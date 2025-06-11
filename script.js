const knowledge = `
  food(apple).
  food(carrot).
  food(pizza).
  food(banana).
  food(coffee).
  food(tea).
  food(broccoli).
  food(orange_juice).

  is_fruit(apple).
  is_fruit(banana).
  is_fruit(orange_juice).

  is_vegetable(carrot).
  is_vegetable(broccoli).

  is_drink(coffee).
  is_drink(tea).
  is_drink(orange_juice).

  is_junk_food(pizza).
`;

const foodAnimations = {
  apple: '<img src="https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif" class="food-gif" alt="Apple" />',
  banana: '<img src="https://media.giphy.com/media/3o6ZsW1oVs0d3dX2c0/giphy.gif" class="food-gif" alt="Banana" />',
  carrot: '<img src="https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif" class="food-gif" alt="Carrot" />',
  coffee: '<img src="https://media.giphy.com/media/l0MYC0LajbaPoEADu/giphy.gif" class="food-gif" alt="Coffee" />',
  tea: '<img src="https://media.giphy.com/media/J2HYidPzFfJ6ZsQCJx/giphy.gif" class="food-gif" alt="Tea" />',
  pizza: '<img src="https://media.giphy.com/media/11tTNkNy1SdXGg/giphy.gif" class="food-gif" alt="Pizza" />',
  broccoli: '<img src="https://media.giphy.com/media/9V5qwZzLKyzfai4nP0/giphy.gif" class="food-gif" alt="Broccoli" />',
  orange_juice: '<img src="https://media.giphy.com/media/7CNRyHnGz4n3aD9tFg/giphy.gif" class="food-gif" alt="Orange Juice" />'
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
            outputDiv.innerHTML += "<p>⚠️ Няма GIF за този продукт.</p>";
          }
        }
      });
    },
    error: function (err) {
      outputDiv.innerHTML = "⚠️ Грешка: " + err;
    }
  });
}
