import { DeviceContextProvider, LocationProps } from "../DeviceProvider";

export default function DeviceConsumer({children, location}: React.PropsWithChildren<{location?: LocationProps}>) {
  return (
    <DeviceContextProvider location={location}>
      {children}
    </DeviceContextProvider>
    
  )
}
