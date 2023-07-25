import { faker } from '@faker-js/faker/locale/pt_BR';

import SelectSearch from './SelectSearch';

export default function App() {
  const options = new Array(20).fill(0).map(() => ({ label: faker.person.fullName(), value: faker.string.uuid() }));

  return (
    <div className='flex h-screen items-center py-10 flex-col'>
      <div className='w-[400px]'>
        <SelectSearch label='Seleciona uma pessoa' options={options} />
      </div>
    </div>
  );
}
