import { Room, TwilioError } from 'twilio-video';
import { useEffect } from 'react';

import { Callback } from '../../../types';

export default function useHandleRoomDisconnection(
  room: Room | null,
  onError: Callback,
  removeLocalAudioTrack: () => void,
  removeLocalVideoTrack: () => void,
  isSharingScreen: boolean,
  toggleScreenShare: () => void
) {
  useEffect(() => {
    if (room) {
      const onDisconnected = (_: Room, error: TwilioError) => {
        if (error) {
          onError(error);
        }

        removeLocalAudioTrack();
        removeLocalVideoTrack();
        if (isSharingScreen) {
          toggleScreenShare();
        }

        const params = new URLSearchParams(window.location.search);
        const complete_redirect_url = params.get('complete_redirect_url');

        // TODO - handle this w/ a redirect or failed UI state later
        if (typeof complete_redirect_url !== 'string') throw new Error('no token');

        window.location.replace(complete_redirect_url);
      };

      room.on('disconnected', onDisconnected);
      return () => {
        room.off('disconnected', onDisconnected);
      };
    }
  }, [room, onError, removeLocalAudioTrack, removeLocalVideoTrack, isSharingScreen, toggleScreenShare]);
}
