import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="chat" index element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
