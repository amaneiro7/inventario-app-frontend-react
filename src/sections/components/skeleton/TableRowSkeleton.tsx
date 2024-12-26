export function TableRowSkeleton({ totalTd }: { totalTd?: number }) {
    const repeatedElement = new Array(10).fill(0)
    return (
      <>
        {repeatedElement.map((_, index) => (
          <tr key={index} className='animate-pulse w-full [&>td]:odd:bg-slate-300 [&>td]:even:bg-slate-400'>
            {new Array(totalTd ?? 10).fill(0).map((_, index) => (
              <td key={index} className='h-6' />
                    ))}
          </tr>
            ))}
      </>
    )
}