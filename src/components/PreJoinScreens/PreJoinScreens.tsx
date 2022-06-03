import React, { useState, useEffect } from 'react';
import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import IntroContainer from '../IntroContainer/IntroContainer';
import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
import { useAppState } from '../../state';
import { useLocation } from 'react-router-dom';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function PreJoinScreens() {
  const { user } = useAppState();
  const { getAudioAndVideoTracks } = useVideoContext();
  const query = useQuery();

  const [roomName, setRoomName] = useState<string>('');

  const [mediaError, setMediaError] = useState<Error>();

  useEffect(() => {
    const room_name = query.get('room_name');

    if (room_name) {
      setRoomName(room_name);
    }
  }, [user, query]);

  useEffect(() => {
    if (!mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, mediaError]);

  return (
    <IntroContainer>
      <MediaErrorSnackbar error={mediaError} />
      <DeviceSelectionScreen name={query.get('patient_name') || ''} roomName={roomName} />
    </IntroContainer>
  );
}
