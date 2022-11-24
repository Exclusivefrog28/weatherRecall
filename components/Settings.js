import React, { useState } from 'react';
import { FAB } from 'react-native-paper';
import LocationDialog from './LocationDialog';

const Settings = () => {

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const [locVisible, setLocVisible] = useState(false);
  const showLocDialog = () => setLocVisible(true);
  const hideLocDialog = () => setLocVisible(false);

  return (
    <>
      <FAB.Group
        open={open}
        visible
        variant="secondary"
        icon="cog"
        actions={[
          { icon: 'information-outline', label: 'About' },
          { icon: 'dots-horizontal', label: 'Preferences' },
          { icon: 'map-marker-outline', label: 'Location', onPress: showLocDialog },

        ]}
        onStateChange={onStateChange} />
      <LocationDialog
        isVisible={locVisible}
        hide={hideLocDialog} />
    </>
  );
};

export default Settings;
