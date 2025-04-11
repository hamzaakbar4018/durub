import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Prompts from "./pages/Prompts"
import GptAssistants from "./pages/GptAssistants"
import "./index.css"
import Layout from "./pages/Layout"
import SavedPreferences from "./pages/SavedPreferences"
import Favorites from "./pages/Favorites"
import UserPrompts from "./pages/UserPrompts"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="prompts" element={<Prompts />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="saved-preferences" element={<SavedPreferences />} />
          <Route path="user-prompts" element={<UserPrompts />} />
          <Route path="gpt-assistants" element={<GptAssistants />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
