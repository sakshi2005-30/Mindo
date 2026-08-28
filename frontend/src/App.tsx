import {Input} from "./components/InputComponent"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { PlusIcon, ShareIcon } from "./icons/PlusIcon"
import { Signin } from "./Signin"
import { Signup } from "./SignUp"

const App = () => {
  return (
    <div >
    <Button title="Add" variant="primary" startIcon={<PlusIcon size="md"/>}/>
      <Button title="Share" variant="secondary" startIcon={<ShareIcon size="md"/>} />

      <div className="grid grid-cols-4 gap-8">
        <Card title="How to typescript" contentType="youtube" description="How to apply systems thinking to solve complex problems in business and life." tags={["productivity", "focus", "work"]} link="https://www.youtube.com/live/HjdsR87AgRM?si=WNUHxdo16zl5EYYJ"/>
     
     <Card title="Learning typescript" description="A comprehensive guide to the Zettelkasten note-taking method pioneered by Niklas Luhmann." contentType="twitter" tags={["learn","code","twitter"]} link="https://x.com/Sakshi_305/status/2091618130439315966"/>
     <Card title="Learning typescript" description="A comprehensive guide to the Zettelkasten note-taking method pioneered by Niklas Luhmann." contentType="link" tags={["learn","code","twitter"]} link="https://x.com/Sakshi_305/status/2091618130439315966"/>
     
      </div>
      
     
      <Signup/>
      <Signin/>
    </div>
  )
}

export default App