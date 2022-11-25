import React, { useState } from 'react';
import { FAB } from 'react-native-paper';
import AboutDialog from './dialogs/AboutDialog';
import LocationDialog from './dialogs/LocationDialog';

const Settings = () => {

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [locVisible, setLocVisible] = useState(false);
  const showLocDialog = () => setLocVisible(true);
  const hideLocDialog = () => setLocVisible(false);

  const [aboutVisible, setAboutVisible] = useState(false);
  const showAboutDialog = () => setAboutVisible(true);
  const hideAboutDialog = () => setAboutVisible(false);

  return (
    <>
      <FAB.Group
        open={open}
        visible
        variant="secondary"
        icon="cog"
        actions={[
          { icon: 'information-outline', label: 'About', onPress: showAboutDialog },
          { icon: 'dots-horizontal', label: 'Preferences' },
          { icon: 'map-marker-outline', label: 'Location', onPress: showLocDialog },

        ]}
        onStateChange={onStateChange} />
      <LocationDialog
        isVisible={locVisible}
        hide={hideLocDialog} />
      <AboutDialog
        isVisible={aboutVisible}
        hide={hideAboutDialog} />
    </>
  );
};

export default Settings;
