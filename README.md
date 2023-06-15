
# Music-Trivia 

This is a Trivia game in the subject of music theory. I built it for fun and practice.

Come and play!: https://music-trivia-frontend.onrender.com/

## Technologies

The application utilize:

-   React app built with Vite for better peformance than create-react-app.
-   TypeScript for better readebility and less buggs and annoying buggs.
-   styled-components for easier way to write CSS.
-   React hooks (useState, useEffect and createContext).
-   react-router-dom.
-   global Audio() object for sounds.


## Demo

![music trivia](https://raw.githubusercontent.com/TalMoshel1/music-trivia/main/musicDemo.gif)




## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Purple | ![#C6B9FF](https://via.placeholder.com/10/C6B9FF?text=+) #C6B9FF |
| Yellow | ![##ffc700](https://via.placeholder.com/10/ffc700?text=+) #ffc700 |
| Green | ![#00d1a0](https://via.placeholder.com/10/00b48a?text=+) #00d1a0 |

## Documentation

main.tsx returns the Routes to the application. the outer Route is
Home.tsx (its return the 'Outlet', being wrapped by a createContext variable) and the inner route is App.tsx.

The App.tsx component does three things: 
- Fetch questions from a URL, convert them to an object and save it in a variable managed by useState hook of React. That happens once after the application has been rendered for the first time.
    the list contain objects of that type:
```
    export interface QuestionInterface {
        body: string;
        answers: AnswerInterface[] ;
        _id: string;
    }
```

- Set the questions variable to an empty list, when the Board of the Top 10 participants has been loaded.
- display a Button of 'START' to get the first question, with an input to write your name that will be associated with your score number.
- its manage the different components that the user sees on his screen, depened on whether the game has finished, whether the game has started and whether the questions are already set inside a variable or not.

The Quiz.tsx component does three things: 
- it has a function that increment a number from 0 to 9, indiciating which question will be shown on the screen. 

- saving an object of question and answer to the userAnswerInterface variable by using setState function. the object is of that Schema: 
```
    export type userAnswerInterface = {
        questionId: string;
        answerId: number
    }
```

- a function with the input of list of the type of userAnswerInterface mentioned above , returns an output of: ```
``` 
    export type scoreInterface = {
        name: string;
        score: number;
        timeStamp: string,
        _id: string;
        __v: number,
        isMe?: boolean
    }
```

Board.tsx component does two things:

- getting the boardResult as a child from Quiz.tsx. it return in JS logic, a map function that iterates throw the scores, return a <Score> component to each score.

- button to start over a new game, using full reload of the application with:
```
  function reload() {
    return window.location.reload();
  }
  ```

## API Reference
    
#### Get 10 questions

```http
  GET /api/question
```

#### Post to create a new quetsions

```http
  POST /api/question
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :--------------------------------      |
| `body`    | `string` | **Required**. the body of the question |
| `answers` | `array`  | **Required**. must contain id and body to every object of an answer, answers's length must be 4     |
| `answerId`| `number` | **Required**. The correct answer's id  |

#### Calc questions answers

```http
  POST /api/score
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `answers` | `array`  | **userAnswerInterface** items array |
| `name`    | `string` | Players name                        |


#### Get score board

```http
  GET /api/score
```

  
## Run Locally

Clone the project

```bash
  git clone https://github.com/TalMoshel1/music-trivia.git
```

Go to the project directory

```bash
  cd music-trivia
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
    
    
## Acknowledgements

 - Thanks To ![Elior Tabeka](https://github.com/EliorTabeka) and Alon Dai who assisted me to overcome the challenges in this project.
    
## Contact    
    
feel free to conact me in linkedin: https://www.linkedin.com/in/tal-moshel/ .
    
Come and play!: https://music-trivia-frontend.onrender.com/



