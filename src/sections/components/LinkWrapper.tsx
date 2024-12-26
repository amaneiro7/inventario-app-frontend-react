import { Link } from 'react-router-dom'
export function LinkWrapper({ text, url }: { text: string, url: string }) {
    return (
      <Link
        aria-label={text}
        title={text}
        to={url}
      >
        {text}
      </Link>
    )

}