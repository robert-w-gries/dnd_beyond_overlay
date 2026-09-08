import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CharacterSelection } from '/src/features/CharacterSelection';
import { CharacterSheet } from '/src/features/CharacterSheet';

const AppRoutes = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<CharacterSelection />} />
        <Route path="character/:id" element={<CharacterSheet />} />
      </Routes>
    </MemoryRouter>
  );
};

export default AppRoutes;
