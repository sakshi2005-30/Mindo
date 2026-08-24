import { Button } from "./components/ui/Button"
import { PlusIcon, ShareIcon } from "./icons/PlusIcon"

const App = () => {
  return (
    <div >
    <Button title="Add" variant="primary" startIcon={<PlusIcon size="md"/>}/>
      <Button title="Share" variant="secondary" startIcon={<ShareIcon size="md"/>} />
    </div>
  )
}

export default App