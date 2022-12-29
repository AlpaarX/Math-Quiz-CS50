# Math Quiz

## Quick introduction

Math Quiz is a game for training basic calculation skill. You will be tested in your ability to quickly solve math problems. This game is perfect for kids that need help improving their math skills, or just want to show off how fast they can do simple math.

Users can select various levels and different content, such as addition, subtraction, multiplication and division. Users will get the score according to their performance in the game.

#### Video Demo:  https://www.youtube.com/watch?v=rDKMcmN-Xwg

## How to play
The game has an infinite amount of levels, and as you get your level higher - difficulty increases. Each level has a fixed target score of 5 points that you need to achieve. If you want to skip an expression, you can do it using the 'skip' button, but you will lose 1 point. To save your highscore you need to press the 'stop' button on the game.

### Controls

>Enter - 'next' button

>Esc - 'skip' button

## How it works

The first goal is to create an infinite generator of basic math expressions. In order to do this, program initializes all four operators in array that are used for generating expression. Also, 2 variables for operands are initialized.
Then, after 'start' button is pressed, a series of nested functions are being invoked. 'Start' function is invoked directly from pressed button, then, a function gen is invoked which is also used by next function to generate expression.

    // Random operator and operand generation and assignment
    
    function gen() {
    
      numGen();
      
      index = Math.floor(Math.random() * 4);
      
      // Assignment of generated operands and operator
      
      document.getElementById("num1").textContent = num1;
      
      document.getElementById("op").textContent = op[index];
      
      document.getElementById("num2").textContent = num2;
      
      // Deletion of errorMsg and text input content
      
      document.getElementById("error-el").textContent = "";
      
      document.getElementById("answer-el").value = "";
      
    }
The operand generation functionality was separated into another function numGen purposefully, so that it could call itself if it does not meet certain requirements (such as float result of division).

After the answer was entered and 'next' button is pressed - function called 'next' is invoked. Program is checking which operator is present via switch, then calculations and answer comparisons are made inside a case.

    switch (index) {
          case "+":
            result = num1 + num2;
            if (result == answer) {
              getPoint();
              gen();
            } else wrongAns();
            break;
          case "-":
            result = num1 - num2;
            if (result == answer) {
              getPoint();
              gen();
            } else wrongAns();
            break;
          case "*":
            result = num1 * num2;
            if (result == answer) {
              getPoint();
              gen();
            } else wrongAns();
            break;
          case "/":
            result = num1 / num2;
            if (result == answer) {
              getPoint();
              gen();
            } else wrongAns();
            break;
        }

That's the base of my project! However, it has many more miscellaneous functions, such as dark theme, save highscore in localstorage, SFX and minor design changes depending on the state of the game

## About CS50
CS50 is a openware course from Havard University and taught by David J. Malan

Introduction to the intellectual enterprises of computer science and the art of programming. This course teaches students how to think algorithmically and solve problems efficiently. Topics include abstraction, algorithms, data structures, encapsulation, resource management, security, and software engineering. Languages include C, Python, and SQL plus students’ choice of: HTML, CSS, and JavaScript (for web development).

Thank you for all CS50.

Where I get CS50 course? https://cs50.harvard.edu/x/2020/