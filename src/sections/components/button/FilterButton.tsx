import { FilterIcon } from "../icon/FilterIcon";
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> { 
    className?: string;
 }
export function FilterButon({ className, ...props }: Props) {
    return (
      <button
        className={`self-end place-self-end h-10 px-4 w-min p-1 flex items-center will-change-transform text-secondary fill-purple-400 hover:scale-105 ${className}`}
        type='button'
        {...props}
      >
        <FilterIcon /> Filtros
      </button>
    )
}