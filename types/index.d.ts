export type categoryObj = {
  id: number
  name: string
}

export type resultsObj = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}
