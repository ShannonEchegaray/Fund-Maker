import './App.css'
import Grid, {Image} from './components/grid/grid'
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

function App() {

  const images: Image[] = [
    {
      src: "Hola",
      size: {
        x: 2,
        y: 2
      },
      position: {
        x: 0,
        y: 0
      }
    },
    {
      src: "Adios",
      size: {
        x: 2,
        y: 2
      },
      position: {
        x: 0,
        y: 2
      }
    }
  ]

  return (
    <DndProvider
      backend={HTML5Backend}
    >
      <Grid 
        images={images} 
        size={{ x: 4, y: 8 }}
      />
    </DndProvider>
  )
}

export default App