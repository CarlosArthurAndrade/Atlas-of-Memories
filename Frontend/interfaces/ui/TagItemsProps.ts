export interface MenuTagItem {
    name: string,
    icon: React.JSX.Element
}

export interface SearchCardInputProps {
    placeholder: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}