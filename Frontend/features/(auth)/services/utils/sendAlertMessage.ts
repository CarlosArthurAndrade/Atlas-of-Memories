import { SendAlertMessagePropTypes } from "../../interfaces/auth.interfaces"

export default function sendAlertMessage({ message, color, setMessage, setShowAlert, setColor}: SendAlertMessagePropTypes) {
    return new Promise<void>((resolve, reject) => {
        setMessage(message)
        setColor(color)
        setShowAlert(true)

        setTimeout(() => {
            setShowAlert(false)
            resolve()
        }, 3000)
        })

}