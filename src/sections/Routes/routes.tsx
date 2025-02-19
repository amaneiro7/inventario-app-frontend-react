import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthContext } from '../Context/AuthContext.tsx'

const ProtectedRoute = lazy(
	async () =>
		await import('./ProtectedRoute.tsx').then(m => ({
			default: m.ProtectedRoute
		}))
)
const Login = lazy(async () => await import('../page/login/LoginPage.tsx'))
const ProfilePage = lazy(async () => await import('../page/profile/ProfilePage.tsx'))
const NotFound = lazy(async () => await import('../page/404/index.tsx'))
const Layout = lazy(async () => await import('../components/Layout.tsx'))
const DeviceConsumer = lazy(async () => await import('../Context/Consumer/DeviceConsumer.tsx'))
const ModelConsumer = lazy(async () => await import('../Context/Consumer/ModelConsumer.tsx'))
const LocationConsumer = lazy(async () => await import('../Context/Consumer/LocationConsumer.tsx'))
const Home = lazy(async () => await import('../page/home/Home.tsx'))
const Dashboard = lazy(async () => await import('../page/dashboard/Dashboard.tsx'))
const ListadoSitios = lazy(async () => await import('../page/ListadoSitios/ListadoSitios.tsx'))
const ListadoModelos = lazy(async () => await import('../page/ListadoModelos/ListadoModelos.tsx'))
const ListComputer = lazy(async () => await import('../page/ListWrapper/ListComputer/ListComputer.tsx'))
const ListMonitor = lazy(async () => await import('../page/ListWrapper/ListMonitor/ListMonitor.tsx'))
const ListFinantialPrinter = lazy(
	async () => await import('../page/ListWrapper/ListFinantialPrinterPrinter/ListFinantialPrinter.tsx')
)
const ListPartAndPieces = lazy(async () => await import('../page/ListWrapper/ListPartAndPieces/ListPartsAndPieces.tsx'))
const ListPrinters = lazy(async () => await import('../page/ListWrapper/ListPrinters/ListPrinter.tsx'))
const CreateEmployeeForm = lazy(async () => await import('../page/FormEmployee/CreateEmployeeForm.tsx'))
const CreateDeviceForm = lazy(async () => await import('../page/FormDevice/CreateDeviceForm.tsx'))
const CreateBrandForm = lazy(async () => await import('../page/FormBrand/CreateBrandForm.tsx'))
const CreateModelForm = lazy(async () => await import('../page/FormModel/CreateModelForm.tsx'))
const CreateLocationForm = lazy(async () => await import('../page/FormLocation/CreateLocationForm.tsx'))
const CreateProcessorForm = lazy(async () => await import('../page/FormProcessor/CreateProcessorForm.tsx'))
const CreateSiteForm = lazy(async () => await import('../page/FormSite/CreateSiteForm.tsx'))
const UserManagement = lazy(async () => await import('../page/user-management/UserManagement.tsx'))
const RegisterPage = lazy(async () => await import('../page/user-management/register/RegisterPage.tsx'))
const ManagementProfile = lazy(async () => await import('../page/user-management/profile/ManagementProfile.tsx'))

export default function AppRoutes(): JSX.Element {
	const {
		useAuth: { isSignIn }
	} = useAuthContext()
	return (
		<Routes>
			<Route
				path="/login"
				element={
					<Suspense>
						<Login isSignIn={isSignIn} />
					</Suspense>
				}
			/>
			<Route
				path="/"
				element={
					<ProtectedRoute isSignIn={isSignIn}>
						<Suspense>
							<Layout />
						</Suspense>
					</ProtectedRoute>
				}
			>
				<Route
					path="/"
					element={
						<Suspense>
							<Home />
						</Suspense>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<Suspense>
							<Dashboard />
						</Suspense>
					}
				/>
				<Route
					path="/profile"
					element={
						<Suspense>
							<ProfilePage />
						</Suspense>
					}
				/>
				<Route
					path="/employee/add"
					element={
						<Suspense>
							<CreateEmployeeForm />
						</Suspense>
					}
				/>
				<Route
					path="/employee/edit/:id"
					element={
						<Suspense>
							<CreateEmployeeForm />
						</Suspense>
					}
				/>
				<Route
					path="/brand/add"
					element={
						<Suspense>
							<CreateBrandForm />
						</Suspense>
					}
				/>
				<Route
					path="/brand/edit/:id"
					element={
						<Suspense>
							<CreateBrandForm />
						</Suspense>
					}
				/>

				<Route
					path="/processor/add"
					element={
						<Suspense>
							<CreateProcessorForm />
						</Suspense>
					}
				/>
				<Route
					path="/processor/edit/:id"
					element={
						<Suspense>
							<CreateProcessorForm />
						</Suspense>
					}
				/>

				<Route
					path="/site/add"
					element={
						<Suspense>
							<CreateSiteForm />
						</Suspense>
					}
				/>
				<Route
					path="/site/edit/:id"
					element={
						<Suspense>
							<CreateSiteForm />
						</Suspense>
					}
				/>

				{/* Rutas para el manejo de listados de ubicaciones  */}
				<Route
					path="/location"
					element={
						<Suspense>
							<LocationConsumer>
								<ListadoSitios />
							</LocationConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/location/add"
					element={
						<Suspense>
							<LocationConsumer>
								<CreateLocationForm />
							</LocationConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/location/edit/:id"
					element={
						<Suspense>
							<LocationConsumer>
								<CreateLocationForm />
							</LocationConsumer>
						</Suspense>
					}
				/>

				{/* Rutas para el manejo de listados de modelos  */}
				<Route
					path="/model"
					element={
						<Suspense>
							<ModelConsumer>
								<ListadoModelos />
							</ModelConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/model/add"
					element={
						<Suspense>
							<ModelConsumer>
								<CreateModelForm />
							</ModelConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/model/edit/:id"
					element={
						<Suspense>
							<ModelConsumer>
								<CreateModelForm />
							</ModelConsumer>
						</Suspense>
					}
				/>

				{/* Rutas para el manejo de listados de dispositivos  */}
				<Route
					path="/computer"
					element={
						<Suspense>
							<DeviceConsumer location="computer">
								<ListComputer />
							</DeviceConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/monitor"
					element={
						<Suspense>
							<DeviceConsumer location="monitor">
								<ListMonitor />
							</DeviceConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/finantialprinter"
					element={
						<Suspense>
							<DeviceConsumer location="finantialPrinter">
								<ListFinantialPrinter />
							</DeviceConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/printer"
					element={
						<Suspense>
							<DeviceConsumer location="printer">
								<ListPrinters />
							</DeviceConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/parts"
					element={
						<Suspense>
							<DeviceConsumer location="parts">
								<ListPartAndPieces />
							</DeviceConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/device/add"
					element={
						<Suspense>
							<DeviceConsumer>
								<CreateDeviceForm />
							</DeviceConsumer>
						</Suspense>
					}
				/>
				<Route
					path="/device/edit/:id"
					element={
						<Suspense>
							<DeviceConsumer>
								<CreateDeviceForm />
							</DeviceConsumer>
						</Suspense>
					}
				/>

				{/* Rutas para la gestion de usuario */}
				<Route
					path="/user-management"
					element={
						<Suspense>
							<UserManagement />
						</Suspense>
					}
				>
					<Route
						path="register"
						element={
							<Suspense>
								<RegisterPage />
							</Suspense>
						}
					/>
					<Route
						path="edit/:id"
						element={
							<Suspense>
								<RegisterPage />
							</Suspense>
						}
					/>
					<Route
						path="profile/:id"
						element={
							<Suspense>
								<ManagementProfile />
							</Suspense>
						}
					/>
				</Route>
			</Route>
			<Route
				path="*"
				element={
					<Suspense>
						<NotFound />
					</Suspense>
				}
			/>
		</Routes>
	)
}
