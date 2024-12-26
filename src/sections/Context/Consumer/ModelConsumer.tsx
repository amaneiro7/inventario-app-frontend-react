import { ModelContextProvider } from "../ModelProvider";

export default function ModelConsumer({children}: React.PropsWithChildren) {
  return (
    <ModelContextProvider>
      {children}
    </ModelContextProvider>
    
  )
}
