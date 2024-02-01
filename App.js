import 'react-native-gesture-handler'
import Navigation from './Navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { DataProvider } from './components/DataContext';


export default function App() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <DataProvider>
          <Navigation />
      </DataProvider>
    </ApplicationProvider>
    </>
  );  
}

// testing