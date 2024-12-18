import ToolBar from './components/ToolBar/ToolBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home.tsx';
import NewContact from './containers/NewContact/NewContact.tsx';
import EditContact from './containers/EditContact/EditContact.tsx';


const App = () => (
  <>
    <header>
      <ToolBar/>
    </header>
    <main className="container mt-4">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newContact" element={<NewContact/>}/>
        <Route path="/editContact/:contactId" element={<EditContact/>}/>
        <Route path="*" element={<h3>Not found</h3>}/>
      </Routes>
    </main>
  </>
);

export default App;
