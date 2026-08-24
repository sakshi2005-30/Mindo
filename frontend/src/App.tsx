import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { PlusIcon, ShareIcon } from "./icons/PlusIcon"

const App = () => {
  return (
    <div >
    <Button title="Add" variant="primary" startIcon={<PlusIcon size="md"/>}/>
      <Button title="Share" variant="secondary" startIcon={<ShareIcon size="md"/>} />
    <Card title="How to typescript" contentType="youtube" description="How to apply systems thinking to solve complex problems in business and life." tags={["productivity", "focus", "work"]}/>
     
    </div>
  )
}

export default App