import { LocationContextProvider } from "../LocationProvider";

export default function LocationConsumer({children}: React.PropsWithChildren) {
  return (
    <LocationContextProvider>
      {children}
    </LocationContextProvider>
    
  )
}
