export type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type OnChange = (event: Event) => void
export type OnHandleChange = (name: string, value: string | number | boolean | number[] | string[], operator?: Operator) => void
