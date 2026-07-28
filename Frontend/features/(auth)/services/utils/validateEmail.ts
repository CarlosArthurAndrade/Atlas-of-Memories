export default function validateEmail(email: string): string | boolean {
    if(email.length == 0){
        return false
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    return regex.test(email)
}