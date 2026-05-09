import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { FAQ } from './pages/FAQ'
import { HostileReview } from './pages/HostileReview'
import { Methods } from './pages/Methods'
import { Overview } from './pages/Overview'
import { Paper } from './pages/Paper'
import { Protocols } from './pages/Protocols'
import { References } from './pages/References'
import { ReviewPacket } from './pages/ReviewPacket'
import { TrustNetwork } from './pages/TrustNetwork'
import { ToyPage } from './pages/ToyPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Overview />} />
        <Route path="paper" element={<Paper />} />
        <Route path="toy" element={<ToyPage />} />
        <Route path="trust-network" element={<TrustNetwork />} />
        <Route path="protocols" element={<Protocols />} />
        <Route path="methods" element={<Methods />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="objections" element={<HostileReview />} />
        <Route path="review" element={<ReviewPacket />} />
        <Route path="references" element={<References />} />
      </Route>
    </Routes>
  )
}
