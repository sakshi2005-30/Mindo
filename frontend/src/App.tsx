import {Input} from "./components/InputComponent"
import { Button } from "./components/ui/Button"
import { Card } from "./components/ui/Card"
import { CrossIcon, PlusIcon, ShareIcon } from "./icons/PlusIcon"
import { Signin } from "./Signin"
import { Signup } from "./SignUp"
import { useState } from "react"
const App = () => {
  const [openSignin,setOpenSignin]=useState<boolean>(true);
  return (
    <div >
      <Signin/>
   <Button title="Signup" variant="primary"/>
   <Button title="Signin" variant="secondary"/>
    </div>
  )
}

export default App