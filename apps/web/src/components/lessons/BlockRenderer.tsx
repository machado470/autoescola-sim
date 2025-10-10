/** Seleciona componente conforme tipo do bloco. */
import Quiz from '../quiz/Quiz'
import { TheoryCard } from './TheoryCard'
import { VideoLesson } from './VideoLesson'
import { SignsDrill } from './SignsDrill'
export function BlockRenderer({ block, onDone }: any){
  switch(block.kind){
    case 'card': return <TheoryCard {...block} onDone={onDone}/>
    case 'image': return <TheoryCard {...block} onDone={onDone}/>
    case 'video': return <VideoLesson {...block} onDone={onDone}/>
    case 'quiz': return <Quiz blockId={block.id} questions={block.questions} onDone={onDone}/>
    case 'drill-signs': return <SignsDrill {...block} onDone={onDone}/>
    default: return null
  }
}
