import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CharacterSelection } from '@/features/CharacterSelection';
import { CharacterSheet } from '@/features/CharacterSheet';

const AppRoutes = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<CharacterSelection />}>
          <Route path="character/:id" element={<CharacterSheet />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export default AppRoutes;
