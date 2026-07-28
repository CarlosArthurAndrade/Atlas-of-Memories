import { useState } from "react"

export default function useChangeUsername() {
    const [inputNewUsernameValue, setNewUsername] = useState<string>('')
    
    return { inputNewUsernameValue, setNewUsername }
}