export interface QuestionInterface {
    body: string;
    answers: AnswerInterface[] ;
    _id: string;
}

export type AnswerInterface = {
    answerId: number;
    body: string;
    audioSrc : string | undefined;
}

export type userAnswerInterface = {
    questionId: string;
    answerId: number
}

export type scoreInterface = {
    name: string;
    score: number;
    timeStamp: string,
    _id: string;
    __v: number,
    isMe?: boolean
}

export type contextStore = {
    board?: scoreInterface[] | null,
    getBoardFromDb: () => void,
    myScore: scoreInterface | null,
    postMyScore: (score: scoreInterface) => void,
    setNewBoard: (score: scoreInterface[]) => void,
    boardResult: null | scoreInterface[],
    setNewBoardResult: (newBoard: scoreInterface[] | null) => void,
    playSound: (url: string) => void
    
  }



